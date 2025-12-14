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
  lastAcknowledgedTotal: number;
  fetchCount: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
  markAsRead: () => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  count: 0,
  notifications: [],
  isLoading: false,
  lastAcknowledgedTotal: (() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('notificationAcknowledgedTotal');
      return stored ? parseInt(stored, 10) : 0;
    }
    return 0;
  })(),
  fetchCount: async () => {
    try {
      const { total } = await getNotificationsCountAction();
      const { lastAcknowledgedTotal } = get();

      const displayCount = Math.max(0, total - lastAcknowledgedTotal);
      set({ count: displayCount });
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
  markAsRead: () => {
    const { count } = get();

    set((state) => {
      const newAcknowledgedTotal = state.lastAcknowledgedTotal + count;

      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'notificationAcknowledgedTotal',
          newAcknowledgedTotal.toString()
        );
      }
      return {
        lastAcknowledgedTotal: newAcknowledgedTotal,
        count: 0,
      };
    });
  },
}));
