'use client';

import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { Sparkles, BadgeCheck, Calendar, FileText } from 'lucide-react';
import Link from 'next/link';

const WritingPrompts = () => {
  const prompts = [
    {
      id: '1',
      title: 'Daily Writing Prompt',
      createdAt: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      status: 'OPEN',
      _count: {
        entries: 42,
      },
    },
  ];

  return (
    <section className="darkContainer2 rounded-2xl shadow-xl p-6 ">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-xl mainFont text-white">Writing Prompts</h3>
        </div>
        <Link href="#">
          <Button variant="beeYellow" size="sm">
            View All
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {prompts.map((item, index) => (
          <div
            key={index}
            className="relative group rounded-xl p-6 shadow-lg darkContainer3"
          >
            <div className="flex items-center gap-3 mb-2">
              <BadgeCheck
                className={`w-4 h-4 ${
                  item.status === 'OPEN' ? 'text-green-400' : 'text-red-400'
                }`}
              />
              <span
                className={`font-semibold ${
                  item.status === 'OPEN' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {item.status === 'OPEN' ? 'Open' : 'Closed'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
            <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
              <Calendar className="w-4 h-4" />
              Ends {formatDate(item.endDate.toLocaleString())}
            </div>
            <div className="flex items-center gap-2 text-[#FFC300] font-semibold">
              <FileText className="w-4 h-4" />
              {item._count?.entries || 0} entries
            </div>
            <div className="flex justify-end">
              <Link href={`/prompts/${item.id}`}>
                <Button variant={'beeYellow'} size={'sm'} className="mt-4">
                  View
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WritingPrompts;
