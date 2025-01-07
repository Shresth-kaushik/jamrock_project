import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_SECRET_KEY } from '../config';

const STRIPE_PUBLIC_KEY = 'pk_live_51M0RtXJvWxu1BuxDcS7xTtaUl8waTDAWTyEkbFFOkN9xj5EQmgycZ8wappE71k1UW0aPvanNHGfDDYsDVGqHHXZF00lehJMJvi';
export const stripe = loadStripe(STRIPE_PUBLIC_KEY);

interface CreatePaymentSessionParams {
  purchaseId: string;
  amount: number;
  tickets: number;
  customerName: string;
  phoneNumber: string;
}

export async function createPaymentSession({
  purchaseId,
  amount,
  tickets,
  customerName,
  phoneNumber,
}: CreatePaymentSessionParams) {
  try {
    // Create a checkout session directly instead of a payment link
    const sessionResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'payment_method_types[]': 'card',
        'mode': 'payment',
        'success_url': `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        'cancel_url': `${window.location.origin}/cancel`,
        'line_items[0][price_data][currency]': 'usd',
        'line_items[0][price_data][unit_amount]': Math.round(amount * 100).toString(),
        'line_items[0][price_data][product_data][name]': `Tesla Model Y Raffle - ${tickets} Tickets`,
        'line_items[0][price_data][product_data][description]': `Raffle entry for Tesla Model Y - ${tickets} tickets`,
        'line_items[0][quantity]': '1',
        'metadata[purchase_id]': purchaseId,
        'metadata[customer_name]': customerName,
        'metadata[phone_number]': phoneNumber,
        'metadata[tickets]': tickets.toString(),
      }),
    });

    if (!sessionResponse.ok) {
      const error = await sessionResponse.json();
      throw new Error(error.message || 'Failed to create checkout session');
    }

    const session = await sessionResponse.json();
    return {
      id: session.id,
      url: session.url
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}