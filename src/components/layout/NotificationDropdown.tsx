'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell } from 'lucide-react';
import { useNotificationStore } from '@/stores/useNotificationStore';
import { useEffect } from 'react';
import Image from 'next/image';
import friendIcon from '@/assets/icons/friends.png';
import myBooksIcon from '@/assets/icons/my-books.png';
import clubIcon from '@/assets/icons/hive.png';
import pencilIcon from '@/assets/icons/pencil.png';
import { MessageCircle } from 'lucide-react'; // for replies

export function NotificationDropdown() {
  const { count, notifications, fetchCount, fetchNotifications } =
    useNotificationStore();

  useEffect(() => {
    fetchCount();
    fetchNotifications();

    // Poll every 30 seconds for updates
    const interval = setInterval(() => {
      fetchCount();
      fetchNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchCount, fetchNotifications]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'friend':
        return <Image src={friendIcon} alt="Friends" width={16} height={16} />;
      case 'book':
        return <Image src={myBooksIcon} alt="Books" width={16} height={16} />;
      case 'club':
        return <Image src={clubIcon} alt="Clubs" width={16} height={16} />;
      case 'prompt':
        return <Image src={pencilIcon} alt="Prompts" width={16} height={16} />;
      case 'reply':
        return <MessageCircle size={16} className="text-yellow-500" />;
      default:
        return <Bell size={16} />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <Bell size={24} className="text-[#FFC300]" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-yellow-500 text-slate-800 text-xs rounded-full px-1 font-medium">
              {count}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 bg-[#1d1d1d] border-0 max-h-96 overflow-y-auto"
        align="start"
      >
        <DropdownMenuLabel className="text-white mainFont text-lg">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {notifications.length === 0 ? (
            <DropdownMenuItem disabled className="text-yellow-500">
              No new notifications
            </DropdownMenuItem>
          ) : (
            notifications.slice(0, 10).map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex items-start space-x-3 p-3"
              >
                <div className="shrink-0">{getIcon(notification.type)}</div>
                <div className="flex-1">
                  <p className="text-white text-sm">{notification.message}</p>
                  <p className="text-gray-400 text-xs">
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
        {notifications.length > 10 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-yellow-500 text-center">
              View All Notifications
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
