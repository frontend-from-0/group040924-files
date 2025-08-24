'use server';
// Anna to check why use server is needed here. Aren't all NextJS components server componetn by default?

import { stripe } from '@/utils/stripe';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function checkout(formData: FormData) {
  const productId = formData.get('productId');
  const origin = (await headers()).get('origin');

  if (!productId || typeof productId !== 'string') {
    throw new Error('Invalid product ID');
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1RtBS9QitHtctVUTVPL5QlKn',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });

    if (session.url) {
      redirect(session.url);
    } else {
      throw new Error('Session URL is null');
    }
  } catch (err) {
    console.error('Error creating checkout session', err);
    throw err;
  }
}