'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { useAuth } from '@/components/auth-provider';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface CardCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  deckId: string;
}

export function CardCreateModal({
  isOpen,
  onClose,
  deckId,
}: CardCreateModalProps) {
  // I've removed the auth to keep the example simpler but it's implemented in the same way we did for ecom app
  const { user } = useAuth();
  const router = useRouter();
  const [newCard, setNewCard] = useState({ front: '', back: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardsAdded, setCardsAdded] = useState(0);
  const [originalInput, setOriginalInput] = useState('');
  const [correctedInput, setCorrectedInput] = useState('');
  const [translationLoading, setTranslationLoading] = useState(false);

  function handleUpdateOriginal() {
    const updatedFront = newCard.front.replace(originalInput, correctedInput);
    setNewCard((prev) => ({ ...prev, front: updatedFront }));
  }

  async function handleFrontBlur() {
    setOriginalInput(newCard.front);
    console.log('About to translate', newCard.front);

    if (newCard.front?.length > 1 && !newCard.back) {
      const token = await user?.getIdToken();

      setTranslationLoading(true);

      const response = await fetch(`/api/translation/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ front: newCard.front, originalLanguage: 'sv' }),
      });

      if (!response.ok) {
        setTranslationLoading(false);

        throw new Error('Failed to fetch translations');
      }

      const data = await response.json();

      setTranslationLoading(false);

      setNewCard((prev) => ({
        ...prev,
        front: prev.front + ' | ' + data.example,
        back: data.translation + ' | ' + data.exampleTranslation,
      }));
      setCorrectedInput(data.inputCorrected);
    }
  }

  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCard.front.trim() || !newCard.back.trim()) {
      setError('Front and back are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = await user?.getIdToken();
      const response = await fetch(`/api/decks/${deckId}/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCard),
      });

      if (!response.ok) {
        throw new Error('Failed to create card');
      }

      setNewCard({ front: '', back: '' });
      setCorrectedInput('');
      setOriginalInput('');
      setCardsAdded((prev) => prev + 1);
      router.refresh();
    } catch (err) {
      setError('Failed to create card');
      console.error('Error creating card:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className='fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50'
      onClick={onClose}
    >
      <div
        className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='mb-6 flex items-center justify-between'>
          <h3 className='text-2xl font-semibold text-gray-900 dark:text-white'>
            Add New Card
          </h3>
          <Badge className='mb-4'>
            {cardsAdded} {cardsAdded === 1 ? 'card added' : 'cards added'}
          </Badge>
        </div>

        {error && (
          <div className='bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-4 text-center'>
            {error}
          </div>
        )}
        {/* Create a shared component form div wrapping Label and Input and from the Form element */}
        <form onSubmit={handleCreateCard} className='space-y-6'>
          <div className='grid w-full max-w-sm items-center gap-3'>
            <Label htmlFor='front'>Front</Label>
            {correctedInput && (
              <div>
                <span>Did you mean {correctedInput}?</span>
                <Button
                  variant='ghost'
                  onClick={handleUpdateOriginal}
                  type='button'
                >
                  Update
                </Button>
              </div>
            )}
            <Textarea
              id='front'
              rows={3}
              placeholder='e.g., Hello'
              value={newCard.front}
              onChange={(e) =>
                setNewCard({ ...newCard, front: e.target.value.trim() })
              }
              onBlur={handleFrontBlur}
              required
            />
          </div>
          <div className='grid w-full max-w-sm items-center gap-3'>
            <Label htmlFor='back'>Back</Label>
            <Textarea
              id='back'
              rows={3}
              placeholder={translationLoading ? 'Loading...': 'e.g., Hola'}
              value={newCard.back}
              onChange={(e) => setNewCard({ ...newCard, back: e.target.value })}
              required
            />
          </div>
          <div className='flex justify-end gap-3'>
            <Button type='button' onClick={onClose} variant={'secondary'}>
              Close
            </Button>
            <Button type='submit' disabled={loading}>
              {loading ? 'Adding...' : 'Add Card'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
