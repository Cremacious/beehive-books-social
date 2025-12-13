import { create } from 'zustand';
import {
  createReadingListAction,
  editReadingListAction,
  deleteReadingListAction,
  addBookToListAction,
  removeBookFromListAction,
  toggleBookReadStatusAction,
  getReadingListsAction,
  getReadingListAction,
  setCurrentBookAction,
} from '@/actions/reading-list.actions';
import { toast } from 'sonner';

export interface ReadingListItem {
  id: string;
  title: string;
  author: string;
  addedAt: Date;
  isRead: boolean;
  bookId: string | null;
}

export interface ReadingList {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  items: ReadingListItem[];
  currentBookId: string | null;
  _count?: {
    items: number;
  };
}

interface ReadingListStoreType {
  readingLists: ReadingList[];
  currentList: ReadingList | null;
  isLoading: boolean;
  isEditing: boolean;
  createReadingList: (formData: FormData) => Promise<void>;
  editReadingList: (listId: string, formData: FormData) => Promise<void>;
  deleteReadingList: (listId: string) => Promise<void>;
  addBookToList: (listId: string, formData: FormData) => Promise<void>;
  removeBookFromList: (listId: string, itemId: string) => Promise<void>;
  toggleBookReadStatus: (listId: string, itemId: string) => Promise<void>;
  fetchReadingLists: () => Promise<void>;
  fetchReadingList: (listId: string) => Promise<void>;
  setCurrentList: (list: ReadingList | null) => void;
  setCurrentBook: (listId: string, itemId: string) => Promise<void>;
  setIsEditing: (editing: boolean) => void;
}

export const useReadingListStore = create<ReadingListStoreType>((set, get) => ({
  readingLists: [],
  currentList: null,
  isLoading: false,
  isEditing: false,

  createReadingList: async (formData: FormData) => {
    set({ isLoading: true });
    try {
      const newList = await createReadingListAction(formData);
      set((state) => ({
        readingLists: [newList, ...state.readingLists],
      }));
      toast.success('Reading list created!');
    } catch (error) {
      toast.error((error as Error).message || 'Failed to create reading list');
    } finally {
      set({ isLoading: false });
    }
  },

  editReadingList: async (listId: string, formData: FormData) => {
    set({ isLoading: true });
    try {
      const updatedList = await editReadingListAction(listId, formData);

      set((state) => ({
        readingLists: state.readingLists.map((list) =>
          list.id === listId
            ? {
                ...list,
                ...updatedList,
                items: list.items,
              }
            : list
        ),
        currentList:
          state.currentList?.id === listId
            ? {
                ...state.currentList,
                ...updatedList,
                items: state.currentList.items,
              }
            : state.currentList,
      }));
      toast.success('Reading list updated!');
    } catch (error) {
      toast.error((error as Error).message || 'Failed to update reading list');
    } finally {
      set({ isLoading: false });
    }
  },

  deleteReadingList: async (listId: string) => {
    set({ isLoading: true });
    try {
      await deleteReadingListAction(listId);
      set((state) => ({
        readingLists: state.readingLists.filter((list) => list.id !== listId),
        currentList:
          state.currentList?.id === listId ? null : state.currentList,
      }));
      toast.success('Reading list deleted!');
    } catch (error) {
      toast.error((error as Error).message || 'Failed to delete reading list');
    } finally {
      set({ isLoading: false });
    }
  },

  addBookToList: async (listId: string, formData: FormData) => {
    set({ isLoading: true });
    try {
      await addBookToListAction(listId, formData);
      if (get().currentList?.id === listId) {
        await get().fetchReadingList(listId);
      }
      toast.success('Book added to list!');
    } catch (error) {
      toast.error((error as Error).message || 'Failed to add book to list');
    } finally {
      set({ isLoading: false });
    }
  },

  removeBookFromList: async (listId: string, itemId: string) => {
    set({ isLoading: true });
    try {
      await removeBookFromListAction(listId, itemId);
      if (get().currentList?.id === listId) {
        set((state) => ({
          currentList: state.currentList
            ? {
                ...state.currentList,
                items: state.currentList.items.filter(
                  (item) => item.id !== itemId
                ),
              }
            : null,
        }));
      }
      toast.success('Book removed from list!');
    } catch (error) {
      toast.error(
        (error as Error).message || 'Failed to remove book from list'
      );
    } finally {
      set({ isLoading: false });
    }
  },

  toggleBookReadStatus: async (listId: string, itemId: string) => {
    try {
      await toggleBookReadStatusAction(listId, itemId);
      if (get().currentList?.id === listId) {
        set((state) => ({
          currentList: state.currentList
            ? {
                ...state.currentList,
                items: state.currentList.items.map((item) =>
                  item.id === itemId ? { ...item, isRead: !item.isRead } : item
                ),
              }
            : null,
        }));
      }
    } catch (error) {
      toast.error((error as Error).message || 'Failed to update book status');
    }
  },

  setCurrentBook: async (listId: string, itemId: string) => {
    set({ isLoading: true });
    try {
      const result = await setCurrentBookAction(listId, itemId);
      if (result.success) {
        toast.success(result.message);
        await get().fetchReadingList(listId);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error((error as Error).message || 'Failed to set current book');
    } finally {
      set({ isLoading: false });
    }
  },

  fetchReadingLists: async () => {
    set({ isLoading: true });
    try {
      const readingLists = await getReadingListsAction();
      set({ readingLists });
    } catch (error) {
      toast.error((error as Error).message || 'Failed to load reading lists');
    } finally {
      set({ isLoading: false });
    }
  },

  fetchReadingList: async (listId: string) => {
    set({ isLoading: true });
    try {
      const readingList = await getReadingListAction(listId);
      set({ currentList: readingList });
    } catch (error) {
      toast.error((error as Error).message || 'Failed to load reading list');
    } finally {
      set({ isLoading: false });
    }
  },
  setCurrentList: (list: ReadingList | null) => set({ currentList: list }),
  setIsEditing: (editing: boolean) => set({ isEditing: editing }),
}));
