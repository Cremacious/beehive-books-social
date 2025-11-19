'use client';

import { Bell, ChevronRight } from 'lucide-react';

const NotificationPreview = ({
  text,
  time,
  icon = <Bell size={18} className="text-[#252525]" />,
  unread = false,
}: {
  text: string;
  time: string;
  icon?: React.ReactNode;
  unread?: boolean;
}) => (
  <div
    className={`flex items-center gap-3 py-3 px-3 rounded-xl transition group cursor-pointer border border-transparent hover:border-[#FFC300] hover:bg-[#f5d878] ${
      unread ? 'bg-[#f5d878]' : 'bg-white'
    }`}
    tabIndex={0}
    role="button"
    aria-label={text}
  >
    <div className="shrink-0 relative">
      {icon}
      {unread && (
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FFC300] rounded-full border-2 border-white" />
      )}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-[#252525] truncate font-medium group-hover:text-[#1E3A4B]">
        {text}
      </p>
      <span className="text-xs text-[#5A7D9A]">{time}</span>
    </div>
    <button
      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-[#FFC300]/20"
      title="Mark as read"
      tabIndex={-1}
    >
      <ChevronRight size={18} className="text-[#252525]" />
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
    <section className="bg-[#1b1b1b] p-0 rounded-2xl shadow-xl border border-[#EEE] flex flex-col">
      <div className="flex items-center justify-between px-6 pt-5 pb-2">
        <h3 className="text-lg font-bold text-[#252525] flex items-center gap-2">
          <Bell size={22} className=" text-yellow-400" />
          <span className="text-yellow-400">Notifications</span>
        </h3>
        <button
          className="text-xs  text-yellow-400 font-semibold hover:underline focus:outline-none"
          onClick={() => {}}
        >
          View all
        </button>
      </div>
      <div className="flex flex-col gap-1 px-2 pb-3">
        {notifications.slice(0, 3).map((notif) => (
          <NotificationPreview key={notif.id} {...notif} />
        ))}
      </div>
    </section>
  );
};

export default DashboardNotifications;
