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
  seenNotificationIds: Set<string>;
  fetchCount: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
  markAsRead: () => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  count: 0,
  notifications: [],
  isLoading: false,
  seenNotificationIds: (() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('seenNotificationIds');
      return stored ? new Set(JSON.parse(stored)) : new Set<string>();
    }
    return new Set<string>();
  })(),
  fetchCount: async () => {
    try {
      const { notifications } = await getNotificationsAction();
      const { seenNotificationIds } = get();

      const unseenCount = notifications.filter(
        (n) => !seenNotificationIds.has(n.id)
      ).length;

      set({ count: unseenCount });
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
    const { notifications, seenNotificationIds } = get();

    const newSeenIds = new Set(seenNotificationIds);
    notifications.forEach((n) => newSeenIds.add(n.id));

    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'seenNotificationIds',
        JSON.stringify([...newSeenIds])
      );
    }

    set({
      seenNotificationIds: newSeenIds,
      count: 0,
    });
  },
}));
