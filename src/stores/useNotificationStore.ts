import { create } from 'zustand';
import {
  getNotificationsAction,
  getNotificationsCountAction,
} from '@/actions/user.actions';

interface Notification {
  id: string;
  type: 'friend' | 'book' | 'club' | 'prompt' | 'reply';
  message: string;
  createdAt: Date;
  from?: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
}

interface NotificationStore {
  count: number;
  notifications: Notification[];
  isLoading: boolean;
  fetchCount: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  count: 0,
  notifications: [],
  isLoading: false,
  fetchCount: async () => {
    try {
      const { total } = await getNotificationsCountAction();
      set({ count: total });
    } catch (error) {
      console.error('Error fetching notification count:', error);
    }
  },
  fetchNotifications: async () => {
    set({ isLoading: true });
    try {
      const { notifications } = await getNotificationsAction();
      set({ notifications, isLoading: false });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      set({ isLoading: false });
    }
  },
}));
