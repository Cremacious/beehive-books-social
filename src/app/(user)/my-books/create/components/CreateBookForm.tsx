'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import {
  BookOpen,
  User,
  FileText,
  Tag,
  Eye,
  Upload,
  Save,
  Image as ImageIcon,
  BookText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  title: z.string().min(1, 'Book title is required'),
  author: z.string().min(1, 'Author name is required'),
  category: z.string().min(1, 'Category is required'),
  genre: z.string().min(1, 'Genre is required'),
  description: z.string().min(1, 'Description is required'),
  privacy: z.string().min(1, 'Privacy setting is required'),
});

const categories = [
  'Fiction',
  'Non-Fiction',
  'Poetry',
  'Memoir',
  'Biography',
  'Self-Help',
  'Academic',
  'Other',
];

const genres = [
  'Mystery',
  'Romance',
  'Science Fiction',
  'Fantasy',
  'Thriller',
  'Horror',
  'Historical Fiction',
  'Contemporary',
  'Literary Fiction',
  'Young Adult',
  'Children',
  'Other',
];

const privacyOptions = [
  {
    value: 'public',
    label: 'Public',
    description: 'Anyone can read your book',
  },
  {
    value: 'private',
    label: 'Private',
    description: 'Only you can access your book',
  },
  {
    value: 'friends',
    label: 'Friends Only',
    description: 'Only you and your friends can read your book',
  },
];

export default function CreateBookForm() {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log({ ...values, coverImage });
      toast.success('Book created successfully! 🐝', {
        description:
          'Your new book has been created. Start writing your first chapter!',
      });
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to create book. Please try again.');
    }
  }

  return (
    <div className="rounded-2xl shadow-xl p-4 md:p-10 darkContainer2">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#FFC300]" />
            </div>
            <label className="text-lg font-semibold text-white">
              Book Title
            </label>
          </div>
          <input
            {...form.register('title')}
            type="text"
            placeholder="Enter your book title..."
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
              <User className="w-4 h-4 text-[#FFC300]" />
            </div>
            <label className="text-lg font-semibold text-white">
              Author Name
            </label>
          </div>
          <input
            {...form.register('author')}
            type="text"
            placeholder="Your pen name or real name..."
            className="w-full p-4 searchStyle"
          />
          {form.formState.errors.author && (
            <p className="text-red-400 text-sm flex items-center gap-2">
              <span className="text-xs">⚠️</span>
              {form.formState.errors.author.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-[#FFC300]" />
              </div>
              <label className="text-lg font-semibold text-white">
                Category
              </label>
            </div>
            <select
              {...form.register('category')}
              className="w-full p-4 searchStyle"
            >
              <option value="" className="bg-[#1a1a1a] text-white">
                Select a category...
              </option>
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                  className="bg-[#1a1a1a] text-white"
                >
                  {category}
                </option>
              ))}
            </select>
            {form.formState.errors.category && (
              <p className="text-red-400 text-sm flex items-center gap-2">
                <span className="text-xs">⚠️</span>
                {form.formState.errors.category.message}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
                <Tag className="w-4 h-4 text-[#FFC300]" />
              </div>
              <label className="text-lg font-semibold text-white">Genre</label>
            </div>
            <select
              {...form.register('genre')}
              className="w-full p-4 searchStyle"
            >
              <option value="" className="bg-[#1a1a1a] text-white">
                Select a genre...
              </option>
              {genres.map((genre) => (
                <option
                  key={genre}
                  value={genre}
                  className="bg-[#1a1a1a] text-white"
                >
                  {genre}
                </option>
              ))}
            </select>
            {form.formState.errors.genre && (
              <p className="text-red-400 text-sm flex items-center gap-2">
                <span className="text-xs">⚠️</span>
                {form.formState.errors.genre.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <span className="text-lg">
                <BookText className="w-4 h-4 text-[#FFC300]" />
              </span>
            </div>
            <div>
              <label className="text-lg font-semibold text-white">
                Book Description
              </label>
              <p className="text-[#FFC300]/60 text-sm">
                Write a compelling summary that will hook your readers
              </p>
            </div>
          </div>
          <textarea
            {...form.register('description')}
            placeholder="Tell readers what your book is about. What makes it special? What can they expect?"
            rows={6}
            className="w-full searchStyle p-4  resize-y"
          />
          {form.formState.errors.description && (
            <p className="text-red-400 text-sm flex items-center gap-2">
              <span className="text-xs">⚠️</span>
              {form.formState.errors.description.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <Eye className="w-4 h-4 text-[#FFC300]" />
            </div>
            <div>
              <label className="text-lg font-semibold text-white">
                Privacy Settings
              </label>
              <p className="text-[#FFC300]/60 text-sm">
                Choose who can see your book
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {privacyOptions.map((option) => (
              <label
                key={option.value}
                className={`p-4  rounded-xl cursor-pointer transition-all ${
                  form.watch('privacy') === option.value
                    ? 'border-[#FFC300] bg-[#FFC300]/10'
                    : ' bg-[#1a1a1a] hover:border-[#FFC300]/40'
                }`}
              >
                <input
                  {...form.register('privacy')}
                  type="radio"
                  value={option.value}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="font-semibold text-white mb-1">
                    {option.label}
                  </div>
                  <div className="text-sm text-[#FFC300]/60">
                    {option.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
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
              <ImageIcon className="w-4 h-4 text-[#FFC300]" />
            </div>
            <div>
              <label className="text-lg font-semibold text-white">
                Book Cover
              </label>
              <p className="text-[#FFC300]/60 text-sm">
                Upload an eye-catching cover image (optional)
              </p>
            </div>
          </div>

          <div className="border-2 border-dashed border-[#FFC300]/20 rounded-xl p-8 text-center hover:border-[#FFC300]/40 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              className="hidden"
              id="cover-upload"
            />
            <label htmlFor="cover-upload" className="cursor-pointer block">
              {coverPreview ? (
                <div className="space-y-4">
                  <div className="w-32 h-48 mx-auto rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={coverPreview}
                      alt="Cover preview"
                      width={128}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-[#FFC300] font-medium">
                    Click to change cover image
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-[#FFC300]/10 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-8 h-8 text-[#FFC300]" />
                  </div>
                  <div>
                    <div className="text-white font-medium mb-2">
                      Upload Book Cover
                    </div>
                    <div className="text-[#FFC300]/60 text-sm">
                      Click to select an image (PNG, JPG, GIF) • Max 5MB
                    </div>
                  </div>
                </div>
              )}
            </label>
          </div>
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
              {form.formState.isSubmitting ? 'Creating Book...' : 'Create Book'}
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
}
