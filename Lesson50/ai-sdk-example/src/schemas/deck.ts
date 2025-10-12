import { z } from 'zod';

export const deckSchema = z.object({
  title: z.string().min(1).max(150),
  description: z.string().max(300).optional(),
  userId: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});