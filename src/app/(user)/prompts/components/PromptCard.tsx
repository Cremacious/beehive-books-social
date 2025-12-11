import { Button } from '@/components/ui/button';
import { BadgeCheck, Calendar, FileText } from 'lucide-react';
import Link from 'next/link';

interface PromptCardProps {
  prompt: {
    id: string;
    title: string;
    createdAt: Date;
    endDate: Date;
    status: 'OPEN' | 'CLOSED';
    _count?: {
      entries: number;
    };
  };
}

const PromptCard = ({ prompt }: PromptCardProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div
      key={prompt.id}
      className="relative group rounded-xl p-6 shadow-lg darkContainer2"
    >
      <div className="flex items-center gap-3 mb-2">
        <BadgeCheck
          className={`w-4 h-4 ${
            prompt.status === 'OPEN' ? 'text-green-400' : 'text-red-400'
          }`}
        />
        <span
          className={`font-semibold ${
            prompt.status === 'OPEN' ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {prompt.status === 'OPEN' ? 'Open' : 'Closed'}
        </span>
      </div>
      <h3 className="text-lg font-bold text-white mb-1">{prompt.title}</h3>
      <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
        <Calendar className="w-4 h-4" />
        Ends {formatDate(prompt.endDate)}
      </div>
      <div className="flex items-center gap-2 text-[#FFC300] font-semibold">
        <FileText className="w-4 h-4" />
        {prompt._count?.entries || 0} entries
      </div>
      <div className="flex justify-end">
        <Link href={`/prompts/${prompt.id}`}>
          <Button variant={'beeYellow'} size={'sm'} className="mt-4">
            View
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default PromptCard;
