import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string().min(1, 'Book title is required'),
  author: z.string().min(1, 'Author name is required'),
  category: z.string().min(1, 'Category is required'),
  genre: z.string().min(1, 'Genre is required'),
  description: z.string().min(1, 'Description is required'),
  privacy: z.string().min(1, 'Privacy setting is required'),
});

export const chapterSchema = z.object({
  chapterTitle: z.string().min(1, 'Chapter title is required'),
  notes: z.string().optional(),
  content: z.string().min(1, 'Chapter content is required'),
});
