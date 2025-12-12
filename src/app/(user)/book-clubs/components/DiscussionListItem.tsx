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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-bold text-white mb-2 wrap-break-word">
            {discussion.title}
          </h3>
          <div className="grid grid-cols-2 md:flex md:flex-row gap-2 md:gap-4 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="truncate max-w-[140px] md:max-w-none">
                {discussion.author}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              {discussion.replies} replies
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              { formatDate(discussion.lastActivity)}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end mt-2 md:mt-0 w-full md:w-auto">
          <Link
            href={`/book-clubs/${clubId}/discussions/${discussion.id}`}
            className="w-full md:w-auto"
          >
            <Button variant={'beeYellow'} className="w-full md:w-auto ">
              View
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default DiscussionListItem;
