export enum CardState {
  New = 'new',
  Learning = 'learning',
  Review = 'review',
}

export enum ReviewRating{
  Again = 'again',
  Good = 'good',
  Easy = 'easy',
}

export enum CardReviewState {
  Question = 'question',
  Answer = 'answer',
  Completed = 'completed',
}

export interface Card {
  id: string;
  front: string;
  back: string;
  state: CardState;
  interval: number;
  easeFactor: number;
  repetitions: number;
  lastReview?: Date;
  createdAt: Date;
  updatedAt: Date;
  deckId: string;
  userId: string;
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  cardCount: number;
  dailyReviewLimit?: number;
}
