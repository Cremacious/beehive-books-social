import NewPage from '@/components/layout/NewPage';
import Image from 'next/image';
import { Edit, MessageCircle, FileText, Hash, Plus } from 'lucide-react';
import ChapterListItem from '../components/ChapterListItem';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getBookByIdAction } from '@/actions/book.actions';
import defaultImage from '@/assets/stock/cover.jpeg';

import openBook from '@/assets/icons/open-book.png';
import BackButton from '@/components/shared/BackButton';
import ChapterDisplay from './components/ChapterDisplay';

const BookPage = async ({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) => {
  const { bookId } = await params;

  const book = await getBookByIdAction(bookId);

  return (
    <NewPage>
      <BackButton text="Back to My Books" href="/my-books" />
      <div className="w-full space-y-8 ">
        <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10 ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-48 h-64 md:w-56 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={book.cover ?? defaultImage}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl mainFont font-bold text-yellow-400 mb-2">
                    {book.title}
                  </h1>
                  <p className="text-xl text-white mb-4">by {book.author}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="backgroundYellow  px-3 py-1 rounded-full text-sm font-medium">
                      {book.genre}
                    </span>
                    <span className="backgroundYellow px-3 py-1 rounded-full text-sm font-medium">
                      {book.category}
                    </span>
                  </div>
                </div>
                <Link
                  className="hidden md:flex items-center gap-2 "
                  href={`/my-books/${book.id}/edit`}
                >
                  <Button size={'lg'} variant={'beeYellow'} className="">
                    <Edit className="w-4 h-4 text-black" />
                    Edit Book
                  </Button>
                </Link>
              </div>

              <p className="text-white leading-relaxed mb-6">
                {book.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <FileText className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="text-2xl font-bold text-white">
                      {book.chapterCount}
                    </span>
                  </div>
                  <p className="text-sm text-white">Chapters</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Hash className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="text-2xl font-bold text-white">
                      {book.wordCount.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-white">Words</p>
                </div>
                <div className="text-center col-span-2 md:col-span-1">
                  <div className="flex items-center justify-center mb-1">
                    <MessageCircle className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="text-2xl font-bold text-white">
                      {book.commentCount}
                    </span>
                  </div>
                  <p className="text-sm text-white">Comments</p>
                </div>
              </div>
            </div>
          </div>

          <Link className="md:hidden" href={`/my-books/${book.id}/edit`}>
            <Button size={'lg'} variant={'beeYellow'} className="w-full mt-6">
              <Edit className="w-4 h-4 text-black" />
              Edit Book
            </Button>
          </Link>
        </div>
        <ChapterDisplay book={book} />
      </div>
    </NewPage>
  );
};

export default BookPage;
