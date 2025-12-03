'use client';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, FileText, BookOpen, NotebookPen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { chapterSchema } from '@/lib/schemas/index';
import { useBookStore } from '@/stores/useBookStore';

export default function CreateChapterForm() {
  const createChapter = useBookStore((state) => state.createChapter);
  const form = useForm<z.infer<typeof chapterSchema>>({
    resolver: zodResolver(chapterSchema),
  });

  async function onSubmit(values: z.infer<typeof chapterSchema>) {
    await createChapter('bookId-placeholder', values);
  }

  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-4 md:p-10 ">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-[#FFC300]" />
            </div>
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
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <span className="text-lg">
                <NotebookPen className="w-4 h-4 text-[#FFC300]" />
              </span>
            </div>
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
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#FFC300]" />
            </div>
            <div>
              <label className="text-lg font-semibold text-white">
                Chapter Content
              </label>
              <p className="text-[#FFC300]/60 text-sm">
                Write your story here. Let your creativity flow!
              </p>
            </div>
          </div>
          <textarea
            {...form.register('content')}
            placeholder="Begin your chapter... Every great story starts with a single word."
            rows={20}
            className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl p-6 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all resize-y font-serif text-lg leading-relaxed"
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
            disabled={form.formState.isSubmitting}
            className=" items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed "
          >
            <Save className="w-5 h-5" />
            <span>
              {form.formState.isSubmitting
                ? 'Creating Chapter...'
                : 'Create Chapter'}
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
}
