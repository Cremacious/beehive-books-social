'use client';

import { Users, MessageCircle, Calendar, Crown } from 'lucide-react';

const BookClubs = () => {
  const clubs = [
    {
      name: 'Fantasy Writers Hive',
      members: 156,
      nextMeeting: 'Tomorrow 7 PM',
      recentActivity: 'New chapter discussion',
      role: 'Member',
    },
    {
      name: 'Romance Authors Circle',
      members: 89,
      nextMeeting: 'Friday 6 PM',
      recentActivity: 'Character development workshop',
      role: 'Moderator',
    },
    {
      name: 'Sci-Fi Storytellers',
      members: 234,
      nextMeeting: 'Next Week',
      recentActivity: 'World-building tips shared',
      role: 'Member',
    },
  ];

  return (
    <section className="bg-[#1b1b1b] rounded-2xl shadow-xl p-6 border border-[#2a2a2a]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFC300]/10 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🏛️</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Book Clubs</h3>
            <p className="text-sm text-[#FFC300]/60">
              Connect with fellow writers
            </p>
          </div>
        </div>
        <button className="text-sm text-[#FFC300] hover:text-white transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {clubs.map((club, index) => (
          <div
            key={index}
            className="bg-[#252525] rounded-xl p-4 border border-[#3a3a3a] hover:border-[#FFC300]/30 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{club.name}</h4>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    {club.members} members
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {club.nextMeeting}
                  </span>
                </div>
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  club.role === 'Moderator'
                    ? 'bg-[#FFC300]/20 text-[#FFC300]'
                    : 'bg-gray-600 text-gray-300'
                }`}
              >
                {club.role === 'Moderator' && (
                  <Crown size={10} className="inline mr-1" />
                )}
                {club.role}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MessageCircle size={14} />
              <span>{club.recentActivity}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 bg-[#FFC300]/10 hover:bg-[#FFC300]/20 text-[#FFC300] py-3 rounded-xl transition-colors font-medium">
        + Create New Club
      </button>
    </section>
  );
};

export default BookClubs;
