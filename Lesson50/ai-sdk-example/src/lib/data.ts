'use server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { Deck, Card, CardState } from '@/types';
import { cookies } from 'next/headers';

export async function getAuthenticatedUserId() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('__session')?.value;
  if (!sessionCookie) {
    return [];
  }

  try {
    const decodedIdToken = await adminAuth.verifySessionCookie(
      sessionCookie,
      true,
    );
    if (!decodedIdToken)
      throw new Error('Unable to verify user from session cookie');
    return decodedIdToken.uid;
  } catch (error) {
    console.error('Error fetching current user', error);
    return [];
  }
}

export async function getUserDecks(): Promise<Deck[]> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return [];
  }

  try {
    const decksRef = adminDb.collection(`decks`);
    const snapshot = await decksRef.where('userId', '==', userId).get();

    const decks = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    }) as Deck[];

    return decks;
  } catch (error) {
    console.error('Error fetching decks:', error);
    return [];
  }
}

export async function getDeck(deckId: string): Promise<Deck | null> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return null;
  }

  try {
    const deckRef = adminDb.doc(`decks/${deckId}`);
    const deckSnap = await deckRef.get();

    if (!deckSnap.exists) {
      return null;
    }

    const deckData = deckSnap.data();
    if (deckData?.userId !== userId) {
      return null;
    }

    return {
      id: deckId,
      ...deckData,
      createdAt: deckData.createdAt,
      updatedAt: deckData.updatedAt,
    } as Deck;
  } catch (error) {
    console.error('Error fetching deck:', error);
    return null;
  }
}

export async function getDeckCards(deckId: string): Promise<Card[]> {
  try {
    // First verify the deck belongs to the user
    const deck = await getDeck(deckId);
    if (!deck) {
      return [];
    }

    const cardsRef = adminDb.collection(`decks/${deckId}/cards`);
    const querySnapshot = await cardsRef.get();

    const cards = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          lastReview: doc.data().lastReview,
          createdAt: doc.data().createdAt,
          updatedAt: doc.data().updatedAt,
        } as Card),
    );

    return cards;
  } catch (error) {
    console.error('Error fetching cards:', error);
    return [];
  }
}

export async function getReviewCards(deckId: string): Promise<Card[]> {
  try {
    const deck = await getDeck(deckId);
    console.log('deck', deck);
    if (!deck) {
      return [];
    }

    const dailyLimit = deck.dailyReviewLimit || 20;

    const cardsRef = adminDb.collection(`decks/${deckId}/cards`);
    const querySnapshot = await cardsRef.get();

    const now = new Date();
    const cards = querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          lastReview: data.lastReview,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        } as Card;
      })
      .filter((card) => {
        console.log('card', card);
        if (card.state === CardState.New) return true;
        if (
          card.state === CardState.Learning ||
          card.state === CardState.Review
        ) {
          const lastReview = card.lastReview || card.createdAt;
          // TODO: add error handling for the case where lastReview date is not available
          const nextReview = new Date(
            new Date(lastReview).getTime() + card.interval * 24 * 60 * 60 * 1000)
          ;
          console.log(lastReview, nextReview);
          return now >= nextReview;
        }
        return false;
      })
      .sort((a, b) => {
        // Prioritize new cards, then by next review date
        if (a.state === CardState.New && b.state !== CardState.New) return -1;
        if (b.state === CardState.New && a.state !== CardState.New) return 1;

        const aNextReview = a.lastReview
          ? new Date(new Date(a.lastReview).getTime() + a.interval * 24 * 60 * 60 * 1000)
          : a.createdAt;
        const bNextReview = b.lastReview
          ? new Date(new Date(b.lastReview).getTime() + b.interval * 24 * 60 * 60 * 1000)
          : b.createdAt;

        return aNextReview.getTime() - bNextReview.getTime();
      })
      .slice(0, dailyLimit); // Limit the number of cards to the daily review limit

    return cards;
  } catch (error) {
    console.error('Error fetching review cards:', error);
    return [];
  }
}
