'use client';
import { Bell } from 'lucide-react';
import { useNotificationStore } from '@/stores/useNotificationStore';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import friendIcon from '@/assets/icons/friends.png';
import myBooksIcon from '@/assets/icons/my-books.png';
import clubIcon from '@/assets/icons/hive.png';
import pencilIcon from '@/assets/icons/pencil.png';
import { MessageCircle } from 'lucide-react';

export function NotificationDropdown() {
  const { count, notifications, fetchCount, fetchNotifications, markAsRead } =
    useNotificationStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCount();
    fetchNotifications();

    const interval = setInterval(() => {
      fetchCount();
      fetchNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchCount, fetchNotifications]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleTriggerClick = () => {
    markAsRead();
    setIsOpen(!isOpen);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderNotificationMessage = (notification: any) => {
    const { message, fromUserId, fromUserName } = notification;

    if (!fromUserId || !fromUserName) {
      return message;
    }

    // Find the user name in the message and replace with link
    const parts = message.split(fromUserName);
    if (parts.length < 2) return message;

    return (
      <>
        {parts[0]}
        <a
          href={`/profile/${fromUserId}`}
          className="text-[#FFC300] hover:underline cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          {fromUserName}
        </a>
        {parts.slice(1).join(fromUserName)}
      </>
    );
  };

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
    <div className="relative" ref={dropdownRef}>
      <div
        className="relative flex items-center justify-center md:border-2 md:bg-yellow-500/10 rounded-2xl py-2 border-yellow-500/30 w-full cursor-pointer"
        onClick={handleTriggerClick}
      >
        <div className="relative">
          <Bell size={24} className="text-[#FFC300]" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-yellow-500 text-slate-800 text-xs rounded-full px-1 font-medium">
              {count}
            </span>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-[#1d1d1d] border-0 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-yellow-500/30">
            <h3 className="text-white mainFont text-lg">Notifications</h3>
          </div>

          <div className="py-2">
            {notifications.length === 0 ? (
              <div className="px-4 py-2 text-yellow-500 text-sm opacity-60">
                No new notifications
              </div>
            ) : (
              notifications.slice(0, 10).map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start space-x-3 p-3 hover:bg-yellow-800/30 cursor-pointer"
                >
                  <div className="shrink-0">{getIcon(notification.type)}</div>
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      {renderNotificationMessage(notification)}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 10 && (
            <>
              <div className="border-t border-gray-700"></div>
              <div className="px-4 py-2 text-yellow-500 text-center text-sm cursor-pointer hover:bg-gray-800">
                View All Notifications
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
