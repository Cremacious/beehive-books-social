'use client';

import { BookOpen, Target, TrendingUp, Calendar } from 'lucide-react';

const WritingStats = () => {
  const stats = [
    {
      icon: <BookOpen size={20} className="text-[#FFC300]" />,
      label: 'Words Today',
      value: '2,847',
      change: '+12% from yesterday',
      color: 'text-green-400',
    },
    {
      icon: <Target size={20} className="text-[#FFC300]" />,
      label: 'Current Streak',
      value: '7 days',
      change: 'Keep it up! 🐝',
      color: 'text-yellow-400',
    },
    {
      icon: <TrendingUp size={20} className="text-[#FFC300]" />,
      label: 'Monthly Goal',
      value: '68%',
      change: '32% to go',
      color: 'text-blue-400',
    },
    {
      icon: <Calendar size={20} className="text-[#FFC300]" />,
      label: 'Writing Sessions',
      value: '23',
      change: 'This month',
      color: 'text-purple-400',
    },
  ];

  return (
    <section className="bg-[#1b1b1b] rounded-2xl shadow-xl p-6 border border-[#2a2a2a]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#FFC300]/10 rounded-xl flex items-center justify-center">
          <span className="text-2xl">📊</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Writing Progress</h3>
          <p className="text-sm text-[#FFC300]/60">
            Track your literary journey
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#252525] rounded-xl p-4 border border-[#3a3a3a]"
          >
            <div className="flex items-center gap-2 mb-2">
              {stat.icon}
              <span className="text-xs text-gray-400 font-medium">
                {stat.label}
              </span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {stat.value}
            </div>
            <div className={`text-xs ${stat.color}`}>{stat.change}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WritingStats;
