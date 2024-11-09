const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const supabaseUrl = 'https://wdzcrmjkardnxllwinml.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Middleware
app.use(cors());
app.use(express.static('dist'));

// Create checkout session endpoint
app.post('/api/create-checkout', express.json(), async (req, res) => {
  try {
    const { purchaseId, amount, ticketCount, customerName } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${ticketCount} Raffle Tickets`,
              description: 'Tesla Model Y Raffle Entry',
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
      metadata: {
        purchase_id: purchaseId,
        customer_name: customerName,
      },
    });

    // Update purchase with session ID
    await supabase
      .from('ticket_purchases')
      .update({ stripe_session_id: session.id })
      .eq('id', purchaseId);

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Stripe webhook endpoint
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const purchaseId = session.metadata.purchase_id;

      if (purchaseId) {
        const { error } = await supabase
          .from('ticket_purchases')
          .update({
            payment_status: 'completed',
            payment_intent_id: session.payment_intent
          })
          .eq('id', purchaseId);

        if (error) {
          console.error('Error updating purchase:', error);
          return res.status(500).json({ error: 'Failed to update purchase status' });
        }
      }
      break;
    }
  }

  res.json({ received: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});