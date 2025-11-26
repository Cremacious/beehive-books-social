import { Heart, MessageCircle, Plus } from 'lucide-react';
import Link from 'next/link';
import { DiscussionType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import CreateDiscussionModal from '../[clubId]/discussions/components/CreateDiscussionModal';

const ClubDiscussionPreview = ({
  discussions,
}: {
  discussions: DiscussionType[];
}) => {
  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-[#FFC300]" />
          </div>
          <h2 className="text-xl font-bold text-white">Discussions</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <CreateDiscussionModal size="sm" />
          <Link href={`/book-clubs/1/discussions`} className="w-full md:w-auto">
            <Button
              size={'sm'}
              variant={'beeYellow'}
              className="w-full md:w-auto"
            >
              View Discussions
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {discussions.map((discussion) => (
          <div
            key={discussion.id}
            className="rounded-xl p-4 darkContainer3 highlightYellow"
          >
            <h4 className="font-semibold text-white mb-2">
              {discussion.title}
            </h4>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm">
              <div className="flex items-center gap-4">
                <span className="text-[#FFC300]/60">
                  by {discussion.author}
                </span>
                <span className="text-white/70 flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  {discussion.replies} replies
                </span>
                <span className="text-white/70 flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {discussion.likes}
                </span>
                <span className="text-white/70">{discussion.lastActivity}</span>
              </div>
              <div className="flex">
                <Link
                  className="w-full"
                  href={`/book-clubs/1/discussions/${discussion.id}`}
                >
                  <Button className="w-full" variant="beeYellow" size="sm">
                    Read
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubDiscussionPreview;
