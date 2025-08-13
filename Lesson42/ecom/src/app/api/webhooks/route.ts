import { stripe } from '@/utils/stripe';
import { NextRequest } from 'next/server';


export const POST = async (req: NextRequest) => {
  const body = await req.text();

  const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

  if (!STRIPE_WEBHOOK_SECRET) {
    console.warn('STRIPE_WEBHOOK_SECRET is not set');
    return new Response('Internal Server error', { status: 500 });
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    console.warn('Stripe signature is missing');
    return new Response('Bad Request', { status: 400 });
  }

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    );
  }
  catch (err) {
    console.error('Error constructing Stripe event:', err);
    return new Response('Bad Request', { status: 400 });
  }

  console.log('Received Stripe event:', event.type);

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Checkout session completed:', session);
      // TODO: Handle the checkout session completed event
      break;
    case 'checkout.session.expired':
      const expiredSession = event.data.object;
      console.log('Checkout session completed:', expiredSession);
      // Handle the checkout session expired event
      break;   
    default:
      console.warn(`Unhandled event type: ${event.type}`);
      return new Response('Event type not handled', { status: 400 });
  }
  
  return new Response('Event received', { status: 200 });
}

export const GET = () => {
  return new Response('Received webhook test request', { status: 200 });
}