'use client';
import Image from 'next/image';
import Link from 'next/link';
import coverImage from '@/assets/stock/cover.jpeg';

const BookCard = ({
  id,
  title,
  author,
  genre,
}: {
  id: number;
  title: string;
  author: string;
  genre: string;
}) => {
  return (
    <Link href={`/my-books/${id}`}>
      <div className="flex flex-col w-full group rounded-2xl shadow-lg darkContainer3 overflow-hidden ">
        <div className="relative w-full h-40 overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-300"
            draggable={false}
          />
        </div>

        <div className="flex flex-col gap-2 p-4 bg-[#2a2a2a] h-[120px]">
          <h3
            className="text-sm font-bold text-white truncate leading-tight"
            title={title}
          >
            {title}
          </h3>
          <p className="text-xs text-[#FFC300] font-medium truncate">
            {author}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-[10px] bg-[#FFC300]/20 text-[#FFC300] px-2 py-1 rounded-md font-semibold">
              {genre}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default BookCard;
