'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BookOpen, Users, FileText, Send, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useClubStore } from '@/stores/useClubStore';
import { clubCreateSchema } from '@/lib/schemas';

interface EditClubFormProps {
  club: {
    id: string;
    clubName: string;
    description: string;
    currentBookTitle: string;
    currentBookAuthor: string;
    currentBookChapters: number;
    privacy: 'public' | 'private' | 'invite-only';
    rules?: string | null;
    invites?: string[];
    tags?: string[];
  };
}

export default function EditClubForm({ club }: EditClubFormProps) {
  const editClub = useClubStore((state) => state.editClub);
  const isLoading = useClubStore((state) => state.isLoading);

  const form = useForm<z.infer<typeof clubCreateSchema>>({
    resolver: zodResolver(clubCreateSchema),
    defaultValues: {
      clubName: club.clubName,
      description: club.description,
      currentBookTitle: club.currentBookTitle,
      currentBookAuthor: club.currentBookAuthor,
      currentBookChapters: club.currentBookChapters,
      privacy: club.privacy,
      rules: club.rules || '',
      invites: club.invites || [],
      tags: club.tags || [],
    },
  });

  function onSubmit(values: z.infer<typeof clubCreateSchema>) {
    const formData = new FormData();
    formData.append('clubName', values.clubName);
    formData.append('description', values.description);
    formData.append('currentBookTitle', values.currentBookTitle);
    formData.append('currentBookAuthor', values.currentBookAuthor);
    formData.append(
      'currentBookChapters',
      values.currentBookChapters.toString()
    );
    formData.append('privacy', values.privacy);
    if (values.rules) formData.append('rules', values.rules);
    if (values.invites) {
      values.invites.forEach((invite) => formData.append('invites', invite));
    }
    if (values.tags) {
      values.tags.forEach((tag) => formData.append('tags', tag));
    }
    editClub(club.id, formData);
  }

  return (
    <div className="rounded-2xl shadow-xl p-4 md:p-10 darkContainer2">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-[#FFC300]" />
            </div>
            <label className="text-lg font-semibold text-white">
              Club Name
            </label>
          </div>
          <input
            {...form.register('clubName')}
            type="text"
            placeholder="Enter your club name..."
            className="w-full p-4 searchStyle"
          />
          {form.formState.errors.clubName && (
            <p className="text-red-400 text-sm flex items-center gap-2">
              <span className="text-xs">⚠️</span>
              {form.formState.errors.clubName.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-[#FFC300]" />
            </div>
            <label className="text-lg font-semibold text-white">
              Description
            </label>
          </div>
          <textarea
            {...form.register('description')}
            placeholder="Describe your book club..."
            rows={4}
            className="w-full p-4 searchStyle resize-y"
          />
          {form.formState.errors.description && (
            <p className="text-red-400 text-sm flex items-center gap-2">
              <span className="text-xs">⚠️</span>
              {form.formState.errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-[#FFC300]" />
              </div>
              <label className="text-lg font-semibold text-white">
                Current Book Title
              </label>
            </div>
            <input
              {...form.register('currentBookTitle')}
              type="text"
              placeholder="Book title..."
              className="w-full p-4 searchStyle"
            />
            {form.formState.errors.currentBookTitle && (
              <p className="text-red-400 text-sm flex items-center gap-2">
                <span className="text-xs">⚠️</span>
                {form.formState.errors.currentBookTitle.message}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-[#FFC300]" />
              </div>
              <label className="text-lg font-semibold text-white">Author</label>
            </div>
            <input
              {...form.register('currentBookAuthor')}
              type="text"
              placeholder="Book author..."
              className="w-full p-4 searchStyle"
            />
            {form.formState.errors.currentBookAuthor && (
              <p className="text-red-400 text-sm flex items-center gap-2">
                <span className="text-xs">⚠️</span>
                {form.formState.errors.currentBookAuthor.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#FFC300]" />
            </div>
            <label className="text-lg font-semibold text-white">
              Number of Chapters
            </label>
          </div>
          <input
            {...form.register('currentBookChapters', { valueAsNumber: true })}
            type="number"
            min="1"
            placeholder="Number of chapters..."
            className="w-full p-4 searchStyle"
          />
          {form.formState.errors.currentBookChapters && (
            <p className="text-red-400 text-sm flex items-center gap-2">
              <span className="text-xs">⚠️</span>
              {form.formState.errors.currentBookChapters.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-[#FFC300]" />
            </div>
            <label className="text-lg font-semibold text-white">
              Privacy Setting
            </label>
          </div>
          <select
            {...form.register('privacy')}
            className="w-full p-4 searchStyle"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="invite-only">Invite Only</option>
          </select>
          {form.formState.errors.privacy && (
            <p className="text-red-400 text-sm flex items-center gap-2">
              <span className="text-xs">⚠️</span>
              {form.formState.errors.privacy.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-[#FFC300]" />
            </div>
            <label className="text-lg font-semibold text-white">
              Club Rules (Optional)
            </label>
          </div>
          <textarea
            {...form.register('rules')}
            placeholder="Set some ground rules for your club..."
            rows={3}
            className="w-full p-4 searchStyle resize-y"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <Tag className="w-4 h-4 text-[#FFC300]" />
            </div>
            <label className="text-lg font-semibold text-white">
              Tags (Optional)
            </label>
          </div>
          <input
            {...form.register('tags')}
            type="text"
            placeholder="Add tags separated by commas..."
            className="w-full p-4 searchStyle"
          />
        </div>

        <div className="flex justify-end pt-6 border-t border-[#FFC300]/10">
          <Button
            variant={'beeYellow'}
            type="submit"
            disabled={isLoading}
            className="items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
            <span>{isLoading ? 'Updating Club...' : 'Update Club'}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
