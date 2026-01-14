'use client';

import { Button } from '../ui/button'
import { useBookStore } from '@/stores/useBookStore';
// import Link from 'next/link';

const ShareButton = ({ bookId }: { bookId: string }) => {
  const { copyURLToClipboard } = useBookStore();
  const handleClick = () => {
    const url = `${window.location.origin}/book/${bookId}`;
    copyURLToClipboard(url);
  };

  return (
    <div className="md:w-1/2 w-full">
      <Button onClick={handleClick} variant={'beeYellow'} className="w-full">
        Share Book
      </Button>
    </div>
  );
};
export default ShareButton;
