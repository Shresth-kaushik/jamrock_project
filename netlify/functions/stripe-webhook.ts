import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY!
);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const stripeSignature = event.headers['stripe-signature'];
  
  if (!stripeSignature) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing stripe signature' }),
    };
  }

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body!,
      stripeSignature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object as Stripe.Checkout.Session;
      const customerId = session.metadata?.customer_id;

      if (customerId) {
        const { error } = await supabase
          .from('ticket_purchases')
          .update({ 
            payment_status: 'completed',
            stripe_session_id: session.id,
            payment_intent_id: session.payment_intent as string
          })
          .eq('id', customerId);

        if (error) {
          console.error('Supabase update error:', error);
          return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to update purchase status' }),
          };
        }
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Webhook error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};