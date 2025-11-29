import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import Link from 'next/link';

interface PromptEntryListItemProps {
  entry: {
    id: number;
    author: string;
    avatar: string | null;
    content: string;
    submittedAt: string;
  };
}

const PromptEntryListItem = ({ entry }: PromptEntryListItemProps) => {
  return (
    <div key={entry.id} className="darkContainer3 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-7 h-7 bg-[#FFC300]/10 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-[#FFC300]" />
        </div>
        <span className="text-white font-semibold">{entry.author}</span>
        <span className="text-white/50 text-xs">{entry.submittedAt}</span>
      </div>
      <div className="text-white/80 leading-relaxed whitespace-pre-line">
        {entry.content}
      </div>
      <div className="flex justify-end mt-4">
        <Link href={`/prompts/44/${entry.id}`}>
          <Button variant={'beeYellow'}>Read</Button>
        </Link>
      </div>
    </div>
  );
};
export default PromptEntryListItem;
