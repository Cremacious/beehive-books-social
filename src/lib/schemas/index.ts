import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string().min(1, 'Book title is required'),
  author: z.string().min(1, 'Author name is required'),
  category: z.string().min(1, 'Category is required'),
  genre: z.string().min(1, 'Genre is required'),
  description: z.string().min(1, 'Description is required'),
  privacy: z.string().min(1, 'Privacy setting is required'),
  cover: z.string().optional(),
});

export const chapterSchema = z.object({
  chapterTitle: z.string().min(1, 'Chapter title is required'),
  notes: z.string().optional(),
  content: z.string().min(1, 'Chapter content is required'),
});

export const clubCreateSchema = z.object({
  clubName: z.string().min(1, 'Club name is required'),
  description: z.string().min(1, 'Club description is required'),
  currentBookTitle: z.string().min(1, 'Current book title is required'),
  currentBookAuthor: z.string().min(1, 'Current book author is required'),
  currentBookChapters: z
    .number()
    .min(1, 'Number of chapters must be at least 1'),
  privacy: z.enum(['public', 'private', 'invite-only']),
  rules: z.string().nullable().optional(),
  invites: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export const discussionSchema = z.object({
  title: z.string().min(1, 'Discussion title is required'),
  content: z.string().min(1, 'Discussion content is required'),
});
