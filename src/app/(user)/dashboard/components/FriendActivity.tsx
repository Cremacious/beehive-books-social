'use client';

import { User } from 'lucide-react';

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
    className="flex items-center gap-3 py-3 px-3 rounded-xl transition group cursor-pointer border border-transparent hover:border-[#FFC300] hover:bg-[#252525] bg-[#1b1b1b]"
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
      <p className="text-sm text-white truncate font-medium group-hover:text-[#FFC300]">
        <span className="font-semibold text-white">{name}</span> {activity}
      </p>
      <span className="text-xs text-[#FFC300]/60">{time}</span>
    </div>
  </div>
);

const FriendActivity = () => {
  return (
    <section className="bg-[#1b1b1b] rounded-2xl shadow-xl p-6 border border-[#2a2a2a] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFC300]/10 rounded-xl flex items-center justify-center">
            <span className="text-2xl">👥</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Friend Activity</h3>
            <p className="text-sm text-[#FFC300]/60">
              See what your friends are up to
            </p>
          </div>
        </div>
        <button className="text-sm text-[#FFC300] hover:text-white transition-colors">
          View all
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {friends.slice(0, 3).map((activity) => (
          <SocialItem key={activity.id} {...activity} />
        ))}
      </div>
    </section>
  );
};

export default FriendActivity;
