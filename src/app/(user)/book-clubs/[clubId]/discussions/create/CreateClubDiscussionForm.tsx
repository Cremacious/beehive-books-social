'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MessageSquare, FileText, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useClubStore } from '@/stores/useClubStore';
import { discussionSchema } from '@/lib/schemas';
import { useRouter } from 'next/navigation';
interface CreateClubDiscussionFormProps {
  clubId: string;
}

export default function CreateClubDiscussionForm({
  clubId,
}: CreateClubDiscussionFormProps) {
  const router = useRouter();
  const createClubDiscussion = useClubStore(
    (state) => state.createClubDiscussion
  );
  const isLoading = useClubStore((state) => state.isLoading);

  const form = useForm<z.infer<typeof discussionSchema>>({
    resolver: zodResolver(discussionSchema),
  });

  function onSubmit(values: z.infer<typeof discussionSchema>) {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    createClubDiscussion(clubId, formData);
    router.push(`/book-clubs/${clubId}/discussions`);
  }

  return (
    <div className="rounded-2xl shadow-xl p-4 md:p-10 darkContainer2">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-[#FFC300]" />
            </div>
            <label className="text-lg font-semibold text-white">
              Discussion Title
            </label>
          </div>
          <input
            {...form.register('title')}
            type="text"
            placeholder="Enter your discussion title..."
            className="w-full p-4 searchStyle"
          />
          {form.formState.errors.title && (
            <p className="text-red-400 text-sm flex items-center gap-2">
              <span className="text-xs">⚠️</span>
              {form.formState.errors.title.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-[#FFC300]" />
            </div>
            <label className="text-lg font-semibold text-white">
              Discussion Content
            </label>
          </div>
          <textarea
            {...form.register('content')}
            placeholder="Share your thoughts, questions, or start a conversation about the book..."
            rows={8}
            className="w-full p-4 searchStyle resize-y"
          />
          {form.formState.errors.content && (
            <p className="text-red-400 text-sm flex items-center gap-2">
              <span className="text-xs">⚠️</span>
              {form.formState.errors.content.message}
            </p>
          )}
        </div>

        <div className="flex justify-end pt-6 border-t border-[#FFC300]/10">
          <Button
            variant={'beeYellow'}
            type="submit"
            disabled={isLoading}
            className="items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
            <span>
              {isLoading ? 'Creating Discussion...' : 'Create Discussion'}
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
}
