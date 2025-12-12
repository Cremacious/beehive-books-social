import { Heart, MessageCircle, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { DiscussionFullType } from '@/lib/types';
import { formatLastActivity, countTotalReplies } from '@/lib/utils';
import Image from 'next/image';
import socialImage from '@/assets/icons/social.png';

interface ClubDiscussionPreviewProps {
  discussions: DiscussionFullType[];
  clubId: string;
}

const ClubDiscussionPreview = ({
  discussions,
  clubId,
}: ClubDiscussionPreviewProps) => {
  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl mainFont text-white">Discussions</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          {discussions.length > 0 && (
            <>
              <Link href={`/book-clubs/${clubId}/discussions/create`}>
                <Button
                  className="w-full md:w-auto"
                  size={'sm'}
                  variant={'beeYellow'}
                >
                  <Plus className="w-5 h-5" />
                  New Discussion
                </Button>
              </Link>
            </>
          )}
          <Link
            href={`/book-clubs/${clubId}/discussions`}
            className="w-full md:w-auto"
          >
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
        {discussions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
            <div className="iconCircle">
              <Image
                src={socialImage}
                alt="No discussions"
                height={100}
                width={100}
              />
            </div>
            <h3 className="text-2xl font-bold text-[#FFC300] mb-3">
              No Discussions Yet
            </h3>
            <p className="text-white/70 mb-8 max-w-md leading-relaxed">
              Start the conversation! Create the first discussion to get your
              book club talking.
            </p>
            <Link href={`/book-clubs/${clubId}/discussions/create`}>
              <Button size={'lg'} variant={'beeYellow'}>
                <Plus className="w-5 h-5" />
                New Discussion
              </Button>
            </Link>
          </div>
        ) : (
          discussions.map((discussion) => {
            const repliesCount = countTotalReplies(discussion.comments);
            const lastActivity =
              discussion.comments.length > 0
                ? formatLastActivity(
                    discussion.comments[
                      discussion.comments.length - 1
                    ].createdAt.toISOString()
                  )
                : formatLastActivity(discussion.createdAt.toISOString());

            return (
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
                      by {discussion.author.user.name}
                    </span>
                    <span className="text-white/70 flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {repliesCount} replies
                    </span>
                    <span className="text-white/70 flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {discussion.likes}
                    </span>
                    <span className="text-white/70">{lastActivity}</span>
                  </div>
                  <div className="flex">
                    <Link
                      className="w-full"
                      href={`/book-clubs/${clubId}/discussions/${discussion.id}`}
                    >
                      <Button className="w-full" variant="beeYellow" size="sm">
                        Read
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ClubDiscussionPreview;
