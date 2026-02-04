'use client';

import { Plus, ChevronUp, ChevronDown, Save } from 'lucide-react'; // Add Save icon
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import ChapterListItem from '../../components/ChapterListItem';
import openBook from '@/assets/icons/open-book.png';
import { useBookStore } from '@/stores/useBookStore';
import { useState } from 'react'; // For local state

interface BookWithChapters {
  id: string;
  chapters: {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    wordCount: number;
    commentCount: number;
    bookId: string;
    order: number | null;
    authorNotes: string | null;
  }[];
}

const ChapterDisplay = ({ book }: { book: BookWithChapters }) => {
  const { updateChapterOrder } = useBookStore();
  const [isEditingOrder, setIsEditingOrder] = useState(false);
  const [chapters, setChapters] = useState(
    [...book.chapters].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  );

  const handleUpdateOrder = () => {
    if (isEditingOrder) {
      const chapterOrder = chapters.map((ch) => ch.id);
      updateChapterOrder(book.id, chapterOrder);
      setIsEditingOrder(false);
    } else {
      setIsEditingOrder(true);
    }
  };

  const moveChapter = (index: number, direction: 'up' | 'down') => {
    const newChapters = [...chapters];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newChapters.length) return;
    [newChapters[index], newChapters[targetIndex]] = [
      newChapters[targetIndex],
      newChapters[index],
    ];
    setChapters(newChapters);
  };

  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-2 md:p-10 min-h-[450px] max-w-5xl mx-auto">
      <div className="flex md:flex-row flex-col justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-white flex items-center gap-2 p-2 mainFont">
          Chapters
        </h2>
        <div className="w-full md:w-auto">
          {book.chapters.length !== 0 && (
            <div className="flex flex-row gap-4">
              <Link
                className="md:flex hidden"
                href={`/my-books/${book.id}/create-chapter`}
              >
                <Button
                  size={'lg'}
                  variant={'beeYellow'}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-5 h-5 text-black" />
                  Add Chapter
                </Button>
              </Link>
              <Button
                onClick={handleUpdateOrder}
                size={'lg'}
                variant={'beeDark'}
                className="md:flex hidden"
              >
                {isEditingOrder ? (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Order
                  </>
                ) : (
                  'Update Order'
                )}
              </Button>
              <div className="mt-4 md:mt-0 w-full">
                <Link
                  className="md:hidden block"
                  href={`/my-books/${book.id}/create-chapter`}
                >
                  <Button
                    variant={'beeYellow'}
                    className="flex items-center gap-2 w-full"
                  >
                    <Plus className="w-5 h-5 text-black" />
                    Add Chapter
                  </Button>
                </Link>
                <Button
                  onClick={handleUpdateOrder}
                  size={'lg'}
                  variant={'beeDark'}
                  className="md:hidden block w-full mt-3"
                >
                  {isEditingOrder ? (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Save Order
                    </>
                  ) : (
                    'Update Order'
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {chapters.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <div className="iconCircle">
              <Image
                src={openBook}
                alt="Empty Shelf"
                height={100}
                width={100}
              />
            </div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-3">
              No Chapters Yet
            </h3>
            <p className="text-white/70 mb-8 max-w-md leading-relaxed">
              Your story is waiting to be told! Start building your novel by
              adding your first chapter. Each chapter is a step closer to
              completing your masterpiece.
            </p>
            <Link className="" href={`/my-books/${book.id}/create-chapter`}>
              <Button size={'lg'} variant={'beeYellow'} className="">
                <Plus className="w-5 h-5 text-black" />
                Add Chapter
              </Button>
            </Link>
          </div>
        ) : (
          chapters.map((chapter, index) => (
            <div key={chapter.id} className="flex items-center gap-4">
              {isEditingOrder && (
                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant={'beeYellow'}
                    onClick={() => moveChapter(index, 'up')}
                    disabled={index === 0}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={'beeYellow'}
                    onClick={() => moveChapter(index, 'down')}
                    disabled={index === chapters.length - 1}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
              )}
              <ChapterListItem
                chapter={chapter}
                chapterId={chapter.id}
                index={index}
                bookId={book.id}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChapterDisplay;
