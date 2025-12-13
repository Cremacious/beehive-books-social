import NewPage from '@/components/layout/NewPage';

import { getPromptEntryByIdAction } from '@/actions/prompt.actions';

import PromptCommentSection from './PromptCommentSection';

const PromptEntryPage = async ({
  params,
}: {
  params: Promise<{ entryId: string }>;
}) => {
  const { entryId } = await params;
  const entry = await getPromptEntryByIdAction(entryId);

  return (
    <NewPage>
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl mainFont text-yellow-400 mb-3">
                Entry by {entry?.user?.name}
              </h1>
              <div className="flex items-center gap-6 text-white/70">
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    Added {entry?.createdAt.toLocaleDateString()}
                  </span>
                </div> 
              </div>
            </div>
          </div>

          <div className="prose prose-lg prose-invert max-w-none">
            <div
              className="text-white/90 leading-relaxed font-serif text-lg"
              dangerouslySetInnerHTML={{ __html: entry?.content || '' }}
            />
          </div>
        </div>

        <PromptCommentSection comments={entry?.comments || []} />
      </div>
    </NewPage>
  );
};

export default PromptEntryPage;
