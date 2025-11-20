'use client';

import { Lightbulb, Clock, Sparkles, PenTool } from 'lucide-react';

const WritingPrompts = () => {
  const prompts = [
    {
      title: 'Daily Writing Prompt',
      prompt:
        'Write about a character who discovers they can hear the thoughts of inanimate objects. What secrets do they learn?',
      timeLeft: '23 hours left',
      difficulty: 'Medium',
      participants: 127,
    },
    {
      title: 'Community Challenge',
      prompt:
        'Write a 500-word story where the protagonist finds an old letter that changes their life forever.',
      timeLeft: '5 days left',
      difficulty: 'Easy',
      participants: 89,
    },
  ];

  return (
    <section className="bg-[#1b1b1b] rounded-2xl shadow-xl p-6 border border-[#2a2a2a]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#FFC300]/10 rounded-xl flex items-center justify-center">
          <span className="text-2xl">💡</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Writing Prompts</h3>
          <p className="text-sm text-[#FFC300]/60">Spark your creativity</p>
        </div>
      </div>

      <div className="space-y-4">
        {prompts.map((item, index) => (
          <div
            key={index}
            className="bg-[#252525] rounded-xl p-4 border border-[#3a3a3a]"
          >
            <div className="flex items-start gap-3 mb-3">
              <Lightbulb size={20} className="text-[#FFC300] mt-1 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                  {item.prompt}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {item.timeLeft}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full ${
                      item.difficulty === 'Easy'
                        ? 'bg-green-500/20 text-green-400'
                        : item.difficulty === 'Medium'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {item.difficulty}
                  </span>
                  <span className="flex items-center gap-1">
                    <PenTool size={12} />
                    {item.participants} writing
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-[#FFC300] hover:bg-[#FFD700] text-[#1E3A4B] py-2 px-4 rounded-lg font-medium transition-colors">
                Start Writing
              </button>
              <button className="px-4 py-2 bg-[#252525] hover:bg-[#3a3a3a] text-gray-300 rounded-lg transition-colors">
                View Entries
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 bg-[#FFC300]/10 hover:bg-[#FFC300]/20 text-[#FFC300] py-3 rounded-xl transition-colors font-medium flex items-center justify-center gap-2">
        <Sparkles size={16} />
        Generate Random Prompt
      </button>
    </section>
  );
};

export default WritingPrompts;
