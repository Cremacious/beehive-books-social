'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { chapterSchema } from '@/lib/schemas/index';
import { useBookStore } from '@/stores/useBookStore';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/components/RichTextEditor';

export default function CreateChapterForm({ bookId }: { bookId: string }) {
  const router = useRouter();
  const createChapter = useBookStore((state) => state.createChapter);
  const form = useForm<z.infer<typeof chapterSchema>>({
    resolver: zodResolver(chapterSchema),
  });

  const content = form.watch('content');

  async function onSubmit(values: z.infer<typeof chapterSchema>) {
    await createChapter(bookId, values);
  }

  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-4 md:p-10 ">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="text-lg font-semibold text-white">
              Chapter Title
            </label>
          </div>
          <input
            {...form.register('chapterTitle')}
            type="text"
            placeholder="Enter your chapter title..."
            className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all"
          />
          {form.formState.errors.chapterTitle && (
            <p className="text-red-400 text-sm flex items-center gap-2">
              <span className="text-xs">⚠️</span>
              {form.formState.errors.chapterTitle.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div>
              <label className="text-lg font-semibold text-white">
                Author&apos;s Notes
              </label>
              <p className="text-[#FFC300]/60 text-sm">
                Optional notes for yourself or readers about this chapter
              </p>
            </div>
          </div>
          <textarea
            {...form.register('notes')}
            placeholder="Share your thoughts, inspiration, or notes about this chapter..."
            rows={4}
            className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all resize-none"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div>
              <label className="text-lg font-semibold text-white">
                Chapter Content
              </label>
              <p className="text-[#FFC300]/60 text-sm">
                Write your story here. Let your creativity flow!
              </p>
            </div>
          </div>
          <RichTextEditor
            value={content || ''}
            onChange={(value) => form.setValue('content', value)}
            placeholder="Begin your chapter... Every great story starts with a single word."
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
            variant={'beeDark'}
            className="p-5 mr-4"
            type="button"
            onClick={() => router.push(`/my-books/${bookId}`)}
          >
            Cancel
          </Button>
          <Button
            variant={'beeYellow'}
            type="submit"
            disabled={form.formState.isSubmitting}
            className=" items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed "
          >
            <Plus className="w-5 h-5" />
            <span>
              {form.formState.isSubmitting ? 'Creating..' : 'Create Chapter'}
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
}
