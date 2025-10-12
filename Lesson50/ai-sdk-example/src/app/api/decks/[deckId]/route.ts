import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { deckSchema } from '@/schemas/deck';

export async function PUT(
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
    const { title, description } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    // Check if deck exists and belongs to user
    const deckRef = adminDb.doc(`decks/${deckId}`);
    const deckSnap = await deckRef.get();
    
    if (!deckSnap.exists) {
      return NextResponse.json({ error: 'Deck not found' }, { status: 404 });
    }

    const deckData = deckSnap.data();
    if (deckData?.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const dateNow = new Date().toISOString();

    const parsed = deckSchema.safeParse({
      title,
      description, 
      userId
    });

    if (parsed.error) {
      // TODO: provide details error message
      return NextResponse.json({ error: 'Incorrect deck data' }, { status: 400 });
    }

    await deckRef.update({
      title,
      description,
      updatedAt: dateNow,
    });

    return NextResponse.json({ 
      id: deckId,
      ...deckData,
      title,
      description,
      updatedAt: dateNow,
    });
  } catch (error) {
    console.error('Error updating deck:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
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

    // Check if deck exists and belongs to user
    const deckRef = adminDb.doc(`decks/${deckId}`);
    const deckSnap = await deckRef.get();
    
    if (!deckSnap.exists) {
      return NextResponse.json({ error: 'Deck not found' }, { status: 404 });
    }

    const deckData = deckSnap.data();
    if (deckData?.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await deckRef.delete();

    return NextResponse.json({ message: 'Deck deleted successfully' });
  } catch (error) {
    console.error('Error deleting deck:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
