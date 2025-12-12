import { MessageCircle } from 'lucide-react';
import NewPage from '@/components/layout/NewPage';
import PromptEntryListItem from './PromptEntryListItem';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getAllUserFriendsAction } from '@/actions/friend.actions';
import InvitePrompts from './components/InvitePrompts';
import { getAuthenticatedUser } from '@/lib/auth-server';
import { getPromptAction } from '@/actions/prompt.actions';

const PromptPage = async ({
  params,
}: {
  params: Promise<{ promptId: string }>;
}) => {
  const { promptId } = await params;
  const prompt = await getPromptAction(promptId);
  const friends = await getAllUserFriendsAction();
  const { user } = await getAuthenticatedUser();
  const currentUserId = user?.id;

  return (
    <NewPage>
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10">
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl mainFont text-yellow-400 mb-2">
                {prompt.title}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white font-medium">
                  {prompt.user.name}
                </span>
                <span className="text-white/50 text-sm">
                  • Ends {new Date(prompt.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <Link href={`/prompts/${promptId}/edit`}>
              <Button variant={'beeYellow'}>Edit</Button>
            </Link>
          </div>
          <p className="text-white/80 leading-relaxed mb-6">
            {prompt.description}
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2 flex items-center gap-2">
              Participants
              <span className="yellowBadge w-7 h-7">
                {prompt.invitedUsers.length}
              </span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {prompt.invitedUsers.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-2 bg-[#232323] border border-[#FFC300]/10 rounded-lg px-4 py-2"
                >
                  <span className="text-white font-medium">{p.name}</span>
                </div>
              ))}
              {prompt.invitedUsers.length === 0 && (
                <span className="text-white/60">No participants yet</span>
              )}
            </div>
          </div>
          <InvitePrompts
            friends={friends}
            prompt={prompt}
            currentUserId={currentUserId}
          />
        </div>

        <div className="darkContainer2 rounded-2xl shadow-xl p-2 md:p-8">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-2 mb-6">
              <div className="flex flex-row items-center gap-2">
                <h2 className="text-2xl mainFont text-white">Entries</h2>
              </div>
              <span className="yellowBadge w-7 h-7">
                {prompt._count?.entries || 0}
              </span>
            </div>

            <Link href={`/prompts/${promptId}/create`}>
              <Button variant={'beeYellow'}>Create Reply</Button>
            </Link>
          </div>

          <div className="space-y-6">
            {prompt.entries?.map((entry) => (
              <PromptEntryListItem
                key={entry.id}
                entry={{
                  id: entry.id,
                  author: entry.user.name,
                  avatar: null,
                  content: entry.content,
                  submittedAt: entry.createdAt.toISOString().split('T')[0],
                }}
                promptId={promptId}
              />
            ))}
          </div>
          {prompt.entries?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
              <MessageCircle className="w-8 h-8 text-[#FFC300] mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                No entries yet
              </h3>
              <p className="text-white/60">
                Be the first to submit your story or poem for this prompt!
              </p>
            </div>
          )}
        </div>
      </div>
    </NewPage>
  );
};

export default PromptPage;
