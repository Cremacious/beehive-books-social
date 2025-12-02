import { create } from 'zustand';
import { createBookAction } from '@/actions/book.actions';

interface BookCreateData {
  title: string;
  author: string;
  category: string;
  genre: string;
  description: string;
  privacy: string;
  coverImage?: File;
}

interface BookStore {
  isLoading: boolean;
  error: string | null;
  createBook: (data: BookCreateData) => Promise<void>;
}

interface CreateBookFunction {
  (data: BookCreateData): Promise<void>;
}

interface BookStoreState {
  isLoading: boolean;
  error: string | null;
}

interface BookStoreActions {
  createBook: CreateBookFunction;
}

type BookStoreType = BookStoreState & BookStoreActions;

export const useBookStore = create<BookStoreType>((set) => ({
  isLoading: false,
  error: null,
  createBook: async (data: BookCreateData) => {
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
}));
