'use client';

import { Bell, ChevronRight } from 'lucide-react';

const NotificationPreview = ({
  text,
  time,
  icon = <Bell size={18} className="text-[#FFC300]" />,
  unread = false,
}: {
  text: string;
  time: string;
  icon?: React.ReactNode;
  unread?: boolean;
}) => (
  <div
    className="flex items-center gap-3 py-3 px-3 rounded-xl transition group cursor-pointer border border-transparent hover:border-[#FFC300]/30 hover:bg-[#252525] bg-[#1b1b1b]"
    tabIndex={0}
    role="button"
    aria-label={text}
  >
    <div className="shrink-0 relative">
      {icon}
      {unread && (
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FFC300] rounded-full border-2 border-[#1b1b1b]" />
      )}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-white truncate font-medium group-hover:text-[#FFC300]">
        {text}
      </p>
      <span className="text-xs text-[#FFC300]/60">{time}</span>
    </div>
    <button
      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-[#FFC300]/20"
      title="Mark as read"
      tabIndex={-1}
    >
      <ChevronRight size={18} className="text-[#FFC300]" />
    </button>
  </div>
);

const notifications = [
  {
    id: 1,
    text: 'Casper Egilter liked your chapter.',
    time: '12 min ago',
    unread: true,
  },
  { id: 2, text: 'Avery followed you.', time: '1 hr ago', unread: false },
  {
    id: 3,
    text: "New message in 'The Plot Thickens' Book Club.",
    time: '3 hrs ago',
    unread: true,
  },
];

const DashboardNotifications = () => {
  return (
    <section className="bg-[#1b1b1b] rounded-2xl shadow-xl p-6 border border-[#2a2a2a] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFC300]/10 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🔔</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Notifications</h3>
            <p className="text-sm text-[#FFC300]/60">
              Stay updated with your community
            </p>
          </div>
        </div>
        <button className="text-sm text-[#FFC300] hover:text-white transition-colors">
          View all
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {notifications.slice(0, 3).map((notif) => (
          <NotificationPreview key={notif.id} {...notif} />
        ))}
      </div>
    </section>
  );
};

export default DashboardNotifications;
