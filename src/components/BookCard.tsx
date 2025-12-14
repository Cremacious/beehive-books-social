'use client';
import Image from 'next/image';
import Link from 'next/link';
import defaultImage from '@/assets/stock/cover.jpeg';
import { Button } from './ui/button';

const BookCard = ({
  id,
  title,
  author,
  genre,
  coverImage,
  href,
  category,
}: {
  id: string;
  title: string;
  author: string;
  genre: string;
  coverImage: string | null;
  href?: string;
  category: string;
}) => {
  const bookHref = href || `/book/${id}`;

  return (
    <Link href={bookHref}>
      <div className="flex flex-col w-full group rounded-2xl shadow-lg darkContainer3 overflow-hidden ">
        <div className="relative w-full h-48 md:h-56 lg:h-64 xl:h-72 overflow-hidden">
          <Image
            src={coverImage ?? defaultImage}
            alt={title}
            fill
            className="object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-300"
            draggable={false}
          />
        </div>

        <div className="flex flex-col gap-3 p-3 md:p-4 bg-[#2a2a2a] min-h-[120px] md:min-h-[140px]">
          <div className="flex-1">
            <h3
              className="text-xs md:text-sm font-bold text-white truncate leading-tight mb-1"
              title={title}
            >
              {title}
            </h3>
            <p className="text-[10px] md:text-xs text-[#FFC300] font-medium truncate mb-2">
              {author}
            </p>
            <span className="text-[9px] md:text-[10px] bg-[#FFC300]/20 text-[#FFC300] px-2 py-1 rounded-md font-semibold">
              {genre}
            </span>
            <span className="text-[9px] md:text-[10px] ml-1 bg-[#FFC300]/20 text-[#FFC300] px-2 py-1 rounded-md font-semibold">
              {category}
            </span>
          </div>

          <Button variant={'beeYellow'} size={'sm'} className="mb-4">
            View Book
          </Button>
        </div>
      </div>
    </Link>
  );
};
export default BookCard;
