'use client';

import { Trophy, Award, Flame, BookOpen, Users } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    {
      icon: <Flame className="text-orange-400" size={24} />,
      title: 'Writing Streak Master',
      description: 'Write for 30 consecutive days',
      progress: 23,
      total: 30,
      unlocked: false,
    },
    {
      icon: <BookOpen className="text-blue-400" size={24} />,
      title: 'Novel Creator',
      description: 'Publish your first complete novel',
      progress: 1,
      total: 1,
      unlocked: true,
    },
    {
      icon: <Users className="text-green-400" size={24} />,
      title: 'Community Builder',
      description: 'Help 50 writers in book clubs',
      progress: 37,
      total: 50,
      unlocked: false,
    },
    {
      icon: <Trophy className="text-yellow-400" size={24} />,
      title: 'Contest Winner',
      description: 'Win a writing contest',
      progress: 0,
      total: 1,
      unlocked: false,
    },
  ];

  const recentBadges = [
    { name: 'First Chapter', icon: '📖', earned: '2 days ago' },
    { name: 'Book Club Member', icon: '🤝', earned: '1 week ago' },
    { name: 'Prompt Master', icon: '✍️', earned: '2 weeks ago' },
  ];

  return (
    <section className="bg-[#1b1b1b] rounded-2xl shadow-xl p-6 border border-[#2a2a2a]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#FFC300]/10 rounded-xl flex items-center justify-center">
          <span className="text-2xl">🏆</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Achievements</h3>
          <p className="text-sm text-[#FFC300]/60">
            Celebrate your writing journey
          </p>
        </div>
      </div>

      {/* Recent Badges */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-white mb-3">Recent Badges</h4>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {recentBadges.map((badge, index) => (
            <div
              key={index}
              className="shrink-0 bg-[#252525] rounded-xl p-3 border border-[#3a3a3a] text-center min-w-20"
            >
              <div className="text-2xl mb-1">{badge.icon}</div>
              <div className="text-xs font-medium text-white mb-1">
                {badge.name}
              </div>
              <div className="text-xs text-gray-400">{badge.earned}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Progress */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-white">
          Achievement Progress
        </h4>
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className={`bg-[#252525] rounded-xl p-4 border transition-colors ${
              achievement.unlocked
                ? 'border-[#FFC300]/50 bg-[#FFC300]/5'
                : 'border-[#3a3a3a]'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg ${
                  achievement.unlocked ? 'bg-[#FFC300]/20' : 'bg-gray-700'
                }`}
              >
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h5
                  className={`font-medium mb-1 ${
                    achievement.unlocked ? 'text-[#FFC300]' : 'text-white'
                  }`}
                >
                  {achievement.title}
                  {achievement.unlocked && (
                    <Award size={14} className="inline ml-2 text-[#FFC300]" />
                  )}
                </h5>
                <p className="text-sm text-gray-400 mb-3">
                  {achievement.description}
                </p>
                {!achievement.unlocked && (
                  <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>
                        {achievement.progress}/{achievement.total}
                      </span>
                      <span>
                        {Math.round(
                          (achievement.progress / achievement.total) * 100
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-[#FFC300] h-2 rounded-full transition-all"
                        style={{
                          width: `${
                            (achievement.progress / achievement.total) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
