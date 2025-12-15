import Link from 'next/link';
// import { DiscussionType } from '@/lib/types';
import { Clock, MessageSquare, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

interface DiscussionItem {
  id: string;
  title: string;
  author: string;
  replies: number;
  lastActivity: string;
  likes: number;
  createdAt: string;
}

interface DiscussionListItemProps {
  discussion: DiscussionItem;
  clubId: string;
}

const DiscussionListItem = ({
  discussion,
  clubId,
}: DiscussionListItemProps) => {
  return (
    <div className="darkContainer3 rounded-xl p-4 md:p-6 mb-4">
      <div className="flex flex-col gap-4">
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-bold text-white mb-3 wrap-break-word">
            {discussion.title}
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 shrink-0" />
              <span className="truncate max-w-[120px] md:max-w-[200px]">
                {discussion.author}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>{discussion.replies} replies</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 shrink-0" />
              <span>{formatDate(discussion.lastActivity)}</span>
            </div>
          </div>
        </div>
        <div className="flex w-full md:w-auto">
          <Link
            href={`/book-clubs/${clubId}/discussions/${discussion.id}`}
            className="w-full md:w-auto"
          >
            <Button variant={'beeYellow'} className="w-full md:w-auto">
              View
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default DiscussionListItem;
