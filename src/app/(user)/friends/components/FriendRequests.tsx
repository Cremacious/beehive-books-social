'use client';

import { Check, UserPlus, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFriendStore } from '@/stores/useFriendStore';
import { useNotificationStore } from '@/stores/useNotificationStore';
import { useEffect } from 'react';
import Image from 'next/image';

const FriendRequests = () => {
  const { acceptFriendRequest, declineFriendRequest } = useFriendStore();
  const { notifications, fetchNotifications, isLoading } =
    useNotificationStore();

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const friendNotifications = notifications.filter((n) => n.type === 'friend');

  const handleAccept = async (requestId: string) => {
    await acceptFriendRequest(requestId);
    fetchNotifications();
  };

  const handleDecline = async (requestId: string) => {
    await declineFriendRequest(requestId);
    fetchNotifications();
  };

  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-4 md:p-4">
      <h2 className="text-2xl mainFont  text-yellow-400 mb-4 flex items-center gap-2">
        Friend Requests
      </h2>

      <div className="mb-6 min-h-[200px] flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
            <p className="text-white/60 text-sm">Loading friend requests...</p>
          </div>
        ) : friendNotifications.length > 0 ? (
          <div className="space-y-3 w-full">
            {friendNotifications.map((notification) => {
              const requestId = notification.id.replace('friend-', '');
              return (
                <div
                  key={notification.id}
                  className="darkContainer3 rounded-xl p-3 md:p-4 min-h-[120px] md:min-h-[140px]"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex items-center justify-center shrink-0">
                      {notification.from?.image ? (
                        <Image
                          src={notification.from.image}
                          alt={notification.from.name || 'User'}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-yellow-500/20 rounded-full flex items-center justify-center">
                          <span className="text-yellow-400 font-semibold text-sm md:text-base">
                            {notification.from?.name?.charAt(0) || 'U'}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white truncate text-sm md:text-base">
                        {notification.from?.name || 'Unknown User'}
                      </h4>
                      <p className="text-white/60 text-xs md:text-sm">
                        {notification.from?.email || 'email@example.com'}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <Button
                      size={'sm'}
                      variant={'beeYellow'}
                      onClick={() => handleAccept(requestId)}
                    >
                      <Check className="w-3 h-3 md:w-4 md:h-4" />
                      Accept
                    </Button>
                    <Button
                      size={'sm'}
                      variant={'beeDark'}
                      onClick={() => handleDecline(requestId)}
                    >
                      <X className="w-3 h-3 md:w-4 md:h-4" />
                      Decline
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-4 md:p-6 text-center w-full">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
            </div>
            <h4 className="text-base md:text-lg font-semibold text-white mb-2">
              No Incoming Requests
            </h4>
            <p className="text-white/60 text-xs md:text-sm mb-4">
              When writers want to connect with you, their requests will appear
              here.
            </p>
            <button className="bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 py-2 px-4 rounded-lg font-medium transition-colors text-sm md:text-base">
              Find Writers to Follow
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default FriendRequests;
