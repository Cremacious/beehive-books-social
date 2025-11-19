'use client';

import { User, Users } from 'lucide-react';

const friends = [
  {
    id: 1,
    name: 'Leehie Pritens',
    activity: 'Finished a new chapter.',
    time: '1 min ago',
  },
  {
    id: 2,
    name: 'Casper Egilter',
    activity: "Published 'Novel Der Siray'.",
    time: '18 min ago',
  },
  {
    id: 3,
    name: 'Novey Hekiyan',
    activity: "Joined the 'Ink & Tea Society' Club.",
    time: '2 hrs ago',
  },
];

const SocialItem = ({
  name,
  activity,
  time,
  avatar,
}: {
  name: string;
  activity: string;
  time: string;
  avatar?: string;
}) => (
  <div
    className="flex items-center gap-3 py-3 px-3 rounded-xl transition group cursor-pointer border border-transparent hover:border-[#FFC300] hover:bg-[#f5d878] bg-white"
    tabIndex={0}
    role="button"
    aria-label={name + ' ' + activity}
  >
    <div className="shrink-0 relative">
      {avatar ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatar}
          alt={name}
          className="w-8 h-8 rounded-full object-cover border-2 border-[#FFC300] bg-gray-100"
        />
      ) : (
        <User
          size={28}
          className="text-[#FFC300] bg-[#252525] rounded-full p-1"
        />
      )}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-[#252525] truncate font-medium group-hover:text-[#1E3A4B]">
        <span className="font-semibold text-[#252525]">{name}</span> {activity}
      </p>
      <span className="text-xs text-[#5A7D9A]">{time}</span>
    </div>
  </div>
);

const FriendActivity = () => {
  return (
    <section className="bg-[#1b1b1b] p-0 rounded-2xl shadow-xl border border-[#EEE] flex flex-col">
      <div className="flex items-center justify-between px-6 pt-5 pb-2">
        <h3 className="text-lg font-bold text-[#252525] flex items-center gap-2">
          <Users size={22} className="text-yellow-400" />
          <span className="text-yellow-400">Friend Activity</span>
        </h3>
        <button
          className="text-xs text-yellow-400 font-semibold hover:underline focus:outline-none"
          onClick={() => {}}
        >
          View All
        </button>
      </div>
      <div className="flex flex-col gap-1 px-2 pb-3">
        {friends.slice(0, 3).map((activity) => (
          <SocialItem key={activity.id} {...activity} />
        ))}
      </div>
    </section>
  );
};

export default FriendActivity;
