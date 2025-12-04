import { create } from 'zustand';
import {
  createBookAction,
  addChapterToBookAction,
  editBookAction,
  editChapterAction,
} from '@/actions/book.actions';
import { z } from 'zod';
import { bookSchema, chapterSchema } from '@/lib/schemas';
import { toast } from 'sonner';

import { redirect } from 'next/navigation';

interface BookStoreType {
  isLoading: boolean;
  error: string | null;
  createBook: (data: z.infer<typeof bookSchema>, file?: File) => Promise<void>;
  editBook: (
    bookId: string,
    data: z.infer<typeof bookSchema>,
    file?: File
  ) => Promise<void>;
  createChapter: (
    bookId: string,
    data: z.infer<typeof chapterSchema>
  ) => Promise<void>;
  editChapter: (
    bookId: string,
    chapterId: string,
    data: z.infer<typeof chapterSchema>
  ) => Promise<void>;
}

export const useBookStore = create<BookStoreType>((set) => ({
  isLoading: false,
  error: null,
  createBook: async (data: z.infer<typeof bookSchema>, file?: File) => {
    set({ isLoading: true, error: null });
    try {
      let coverUrl: string | undefined;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const uploadData = await response.json();
        if (uploadData.url) {
          coverUrl = uploadData.url;
        } else {
          throw new Error(uploadData.error || 'Upload failed');
        }
      }
      const response = await createBookAction(data, coverUrl);
      set({ isLoading: false });
      if (response.success) {
        toast.success(response.message);
        redirect('/my-books');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      set({
        isLoading: false,
      });
      throw error;
    }
  },
  editBook: async (
    bookId: string,
    data: z.infer<typeof bookSchema>,
    file?: File
  ) => {
    set({ isLoading: true, error: null });
    try {
      let coverUrl: string | undefined;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const uploadData = await response.json();
        if (uploadData.url) {
          coverUrl = uploadData.url;
        } else {
          throw new Error(uploadData.error || 'Upload failed');
        }
      }
      const response = await editBookAction(bookId, data, coverUrl);

      set({ isLoading: false });
      if (response.success) {
        toast.success(response.message);
        redirect(`/my-books/${bookId}`);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      set({
        isLoading: false,
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
      const response = await addChapterToBookAction(bookId, data);
      if (response.success) {
        toast.success(response.message);
        set({ isLoading: false });
        redirect(`/my-books/${bookId}`);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      throw error;
    }
  },
  editChapter: async (
    bookId: string,
    chapterId: string,
    data: z.infer<typeof chapterSchema>
  ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await editChapterAction(chapterId, data);
      if (response.success) {
        toast.success(response.message);
        set({ isLoading: false });
        redirect(`/my-books/${bookId}`);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      throw error;
    }
  },
}));
