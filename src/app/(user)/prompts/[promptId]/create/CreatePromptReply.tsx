'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { usePromptStore } from '@/stores/usePromptStore';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/components/RichTextEditor';

interface CreatePromptReplyFormProps {
  promptId: string;
}

const CreatePromptReplyForm = ({ promptId }: CreatePromptReplyFormProps) => {
  const [replyText, setReplyText] = useState('');
  const { submitPromptEntry, isLoading } = usePromptStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!replyText.trim()) return;

    await submitPromptEntry(promptId, replyText.trim());
    setReplyText('');
    router.push(`/prompts/${promptId}`);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <RichTextEditor
          value={replyText}
          onChange={setReplyText}
          placeholder="Write your story or poem here..."
        />
      </div>
      <div className="flex justify-end pt-4 border-t border-[#FFC300]/10">
        <Button
          variant={'beeDark'}
          type="button"
          onClick={() => router.push(`/prompts/${promptId}`)}
          className="mr-4 p-5"
        >
          Cancel
        </Button>
        <Button
          variant="beeYellow"
          type="submit"
          disabled={isLoading || !replyText.trim()}
        >
          {isLoading ? 'Submitting...' : 'Submit Entry'}
        </Button>
      </div>
    </form>
  );
};
export default CreatePromptReplyForm;
