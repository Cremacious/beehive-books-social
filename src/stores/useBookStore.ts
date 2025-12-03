import { create } from 'zustand';
import {
  createBookAction,
  addChapterToBookAction,
} from '@/actions/book.actions';
import { z } from 'zod';
import { bookSchema, chapterSchema } from '@/lib/schemas';

interface BookStoreType {
  isLoading: boolean;
  error: string | null;
  createBook: (data: z.infer<typeof bookSchema>) => Promise<void>;
  createChapter: (
    bookId: string,
    data: z.infer<typeof chapterSchema>
  ) => Promise<void>;
}

export const useBookStore = create<BookStoreType>((set) => ({
  isLoading: false,
  error: null,
  createBook: async (data: z.infer<typeof bookSchema>) => {
    set({ isLoading: true, error: null });
    try {
      console.log('Store creating book');
      await createBookAction(data);
      console.log('Book created in store');
      set({ isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to create book',
      });
      throw error;
    }
  },
  createChapter: async (
    bookId: string,
    data: z.infer<typeof chapterSchema>
  ) => {
    set({ isLoading: true, error: null });
    try {
      console.log('Store creating chapter');
      await addChapterToBookAction(bookId, data);
      console.log('Chapter created in store');
      set({ isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to create chapter',
      });
      throw error;
    }
  },
}));
