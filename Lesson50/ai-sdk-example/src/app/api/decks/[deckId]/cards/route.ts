import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ deckId: string }> }
) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const { deckId } = await params;
    const body = await request.json();
    const { front, back } = body;

    if (!front || !back) {
      return NextResponse.json({ error: 'Front and back are required' }, { status: 400 });
    }

    const deckRef = adminDb.doc(`decks/${deckId}`);
    const deckSnap = await deckRef.get();
    
    if (!deckSnap.exists) {
      return NextResponse.json({ error: 'Deck not found' }, { status: 404 });
    }

    const deckData = deckSnap.data();
    if (deckData?.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // TODO: add schema for card data
    const cardData = {
      front,
      back,
      deckId,
      userId,
      state: 'new', // new, learning, review
      interval: 0, // days until next review
      easeFactor: 2.5, // multiplier for interval
      repetitions: 0, // number of times reviewed
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await adminDb.collection(`decks/${deckId}/cards`).add(cardData);
    await deckRef.update({
      cardCount: (deckData.cardCount ?? 0) + 1
    });


    return NextResponse.json({ 
      id: docRef.id,
      ...cardData,
      createdAt: cardData.createdAt,
      updatedAt: cardData.updatedAt,
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating card:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
