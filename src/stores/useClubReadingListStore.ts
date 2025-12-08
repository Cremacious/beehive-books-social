import { create } from 'zustand';
import {
  addBookToClubListAction,
  removeBookFromClubListAction,
  toggleClubBookReadStatusAction,
  getClubReadingListAction,
  setClubCurrentBookAction,
} from '@/actions/club.actions';
import { toast } from 'sonner';

export interface ClubReadingListItem {
  id: string;
  title: string;
  author: string;
  addedAt: Date;
  isRead: boolean;
  bookId: string | null;
  order: number;
  book?: {
    id: string;
    title: string;
    author: string;
  } | null;
}

export interface ClubReadingList {
  id: string;
  name: string;
  description: string;
  currentBookId: string | null;
  currentBook?: {
    id: string;
    title: string;
    author: string;
    chapterCount: number;
  } | null;
  readingList: ClubReadingListItem[];
  userRole: string;
}

interface ClubReadingListStoreType {
  currentList: ClubReadingList | null;
  isLoading: boolean;
  isEditing: boolean;
  addBookToList: (clubId: string, formData: FormData) => Promise<void>;
  removeBookFromList: (clubId: string, itemId: string) => Promise<void>;
  toggleBookReadStatus: (clubId: string, itemId: string) => Promise<void>;
  setCurrentBook: (clubId: string, itemId: string) => Promise<void>;
  fetchReadingList: (clubId: string) => Promise<void>;
  setCurrentList: (list: ClubReadingList | null) => void;
  setIsEditing: (editing: boolean) => void;
}

export const useClubReadingListStore = create<ClubReadingListStoreType>(
  (set, get) => ({
    currentList: null,
    isLoading: false,
    isEditing: false,

    addBookToList: async (clubId: string, formData: FormData) => {
      set({ isLoading: true });
      try {
        const result = await addBookToClubListAction(clubId, formData);
        if (result.success) {
          toast.success(result.message);

          await get().fetchReadingList(clubId);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error('Failed to add book');
        console.log(error);
      } finally {
        set({ isLoading: false });
      }
    },

    removeBookFromList: async (clubId: string, itemId: string) => {
      set({ isLoading: true });
      try {
        const result = await removeBookFromClubListAction(clubId, itemId);
        if (result.success) {
          toast.success(result.message);

          await get().fetchReadingList(clubId);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error('Failed to remove book');
        console.log(error);
      } finally {
        set({ isLoading: false });
      }
    },

    toggleBookReadStatus: async (clubId: string, itemId: string) => {
      set({ isLoading: true });
      try {
        const result = await toggleClubBookReadStatusAction(clubId, itemId);
        if (result.success) {
          toast.success(result.message);

          await get().fetchReadingList(clubId);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error('Failed to update read status');
        console.log(error);
      } finally {
        set({ isLoading: false });
      }
    },

    fetchReadingList: async (clubId: string) => {
      set({ isLoading: true });
      try {
        const readingList = await getClubReadingListAction(clubId);
        set({ currentList: readingList });
      } catch (error) {
        toast.error('Failed to fetch reading list');
        console.log(error);
      } finally {
        set({ isLoading: false });
      }
    },

    setCurrentBook: async (clubId: string, itemId: string) => {
      set({ isLoading: true });
      try {
        const result = await setClubCurrentBookAction(clubId, itemId);
        if (result.success) {
          toast.success(result.message);

          await get().fetchReadingList(clubId);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error('Failed to set current book');
        console.log(error);
      } finally {
        set({ isLoading: false });
      }
    },

    setCurrentList: (list: ClubReadingList | null) => {
      set({ currentList: list });
    },

    setIsEditing: (editing: boolean) => {
      set({ isEditing: editing });
    },
  })
);
