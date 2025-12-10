import NewPage from '@/components/layout/NewPage';
import {
  ArrowLeft,
  User,
  MessageSquare,
  Heart,
  Reply,
  Clock,
  Eye,
} from 'lucide-react';
import Link from 'next/link';
import DiscussionReplySection from './components/DiscussionReplySection';
import DiscussionReply from './components/DiscussionReply';
import { getRoleColor, formatDate } from '@/lib/utils';
import { getClubDiscussionByIdAction } from '@/actions/club.actions';

const DiscussionThreadPage = async ({
  params,
}: {
  params: Promise<{ clubId: string; discussionId: string }>;
}) => {
  const { clubId, discussionId } = await params;

  const discussion = await getClubDiscussionByIdAction(clubId, discussionId);

  return (
    <NewPage>
      <div className="w-full max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href={`/book-clubs/${clubId}/discussions`}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Discussions
          </Link>
        </div>

        <div className="overflow-hidden">
          <div className="px-6 py-4 darkContainer2 rounded-2xl shadow-xl mb-4">
            <h1 className="text-2xl font-bold text-white mb-2">
              {discussion.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                {discussion.likes} likes
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                {discussion.comments.length + 1} posts
              </div>
            </div>
          </div>

          <div className="p-6 darkContainer2 rounded-2xl shadow-xl">
            <div className="flex gap-4">
              <div className="w-48 shrink-0">
                <div className="darkContainer3 rounded-2xl p-4 ">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-[#FFC300]/20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-[#FFC300]" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {discussion.author.user.name}
                      </div>
                      <div
                        className={`text-xs ${getRoleColor(
                          discussion.author.role
                        )}`}
                      >
                        {discussion.author.role}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-white/60 space-y-1">
                    <div>
                      Joined:{' '}
                      {new Date(
                        discussion.author.joinedAt
                      ).toLocaleDateString()}
                    </div>
                    <div>Posts: {discussion.author.postCount}</div>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4 text-sm text-white/60">
                  <Clock className="w-4 h-4" />
                  Posted {discussion.createdAt.toLocaleDateString()}
                </div>
                <div className="text-white/90 leading-relaxed whitespace-pre-line">
                  {discussion.content}
                </div>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#2a2a2a]">
                  <button className="flex items-center gap-2 text-white/60 hover:text-[#FFC300] transition-colors">
                    <Heart className="w-4 h-4" />
                    Like ({discussion.likes})
                  </button>
                  <button className="flex items-center gap-2 text-white/60 hover:text-[#FFC300] transition-colors">
                    <Reply className="w-4 h-4" />
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {discussion.comments.map((reply, index) => (
            <DiscussionReply key={reply.id} reply={reply} index={index} />
          ))}
        </div>

        <DiscussionReplySection
          discussionId={discussionId}
          initialComments={discussion.comments}
        />
      </div>
    </NewPage>
  );
};

export default DiscussionThreadPage;
