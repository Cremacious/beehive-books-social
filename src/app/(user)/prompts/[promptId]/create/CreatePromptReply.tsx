'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { usePromptStore } from '@/stores/usePromptStore';
import { useRouter } from 'next/navigation';

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
        <label className="block text-white font-semibold mb-2">
          Your Writing
        </label>
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Write your story or poem here..."
          rows={8}
          className="w-full bg-[#232323] border border-[#FFC300]/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 resize-none"
          required
        />
      </div>
      <div className="flex justify-end pt-4 border-t border-[#FFC300]/10">
        <Button
          variant="beeYellow"
          type="submit"
          disabled={isLoading || !replyText.trim()}
          className="font-bold px-6 py-3"
        >
          {isLoading ? 'Submitting...' : 'Submit Entry'}
        </Button>
      </div>
    </form>
  );
};
export default CreatePromptReplyForm;
