'use client';

import {
  PenTool,
  Users,
  Search,
  MessageSquare,
  BookOpen,
  Sparkles,
} from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      icon: <PenTool size={20} className="text-[#FFC300]" />,
      title: 'Start Writing',
      description: 'Begin a new chapter',
      color: 'hover:bg-blue-500/10 hover:border-blue-500/30',
    },
    {
      icon: <Users size={20} className="text-[#FFC300]" />,
      title: 'Join Book Club',
      description: 'Find your writing community',
      color: 'hover:bg-green-500/10 hover:border-green-500/30',
    },
    {
      icon: <Search size={20} className="text-[#FFC300]" />,
      title: 'Discover Books',
      description: 'Explore new stories',
      color: 'hover:bg-purple-500/10 hover:border-purple-500/30',
    },
    {
      icon: <MessageSquare size={20} className="text-[#FFC300]" />,
      title: 'Get Feedback',
      description: 'Share your work',
      color: 'hover:bg-orange-500/10 hover:border-orange-500/30',
    },
    {
      icon: <BookOpen size={20} className="text-[#FFC300]" />,
      title: 'Reading Challenge',
      description: 'Set monthly goals',
      color: 'hover:bg-pink-500/10 hover:border-pink-500/30',
    },
    {
      icon: <Sparkles size={20} className="text-[#FFC300]" />,
      title: 'Writing Prompt',
      description: 'Spark creativity',
      color: 'hover:bg-yellow-500/10 hover:border-yellow-500/30',
    },
  ];

  return (
    <section className="bg-[#1b1b1b] rounded-2xl shadow-xl p-6 border border-[#2a2a2a]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#FFC300]/10 rounded-xl flex items-center justify-center">
          <span className="text-2xl">⚡</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Quick Actions</h3>
          <p className="text-sm text-[#FFC300]/60">
            Jump into your writing journey
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`bg-[#252525] border border-[#3a3a3a] rounded-xl p-4 text-left transition-all group ${action.color}`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#FFC300]/10 rounded-lg group-hover:bg-[#FFC300]/20 transition-colors">
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-white text-sm mb-1">
                  {action.title}
                </h4>
                <p className="text-xs text-gray-400 leading-tight">
                  {action.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;
