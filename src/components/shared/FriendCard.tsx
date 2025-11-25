'use client';

import Image from 'next/image';
import defaultImage from '@/assets/stock/stock-profile.jpg';
import { Button } from '@/components/ui/button';

const FriendCard = ({
  id,
  name,
  bio,
}: {
  id: number;
  name: string;
  bio: string;
}) => {
  return (
    <div className="darkContainer3 rounded-xl p-4 h-80 flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-yellow-500/30">
        <Image
          src={defaultImage}
          alt={name}
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>

      <h4 className="font-semibold text-white text-lg mb-3">{name}</h4>

      <div className="flex-1 mb-4">
        <p className="text-white/70 text-sm line-clamp-3 leading-relaxed">
          {bio.split('. ').slice(0, 3).join('. ') +
            (bio.split('. ').length > 3 ? '.' : '')}
        </p>
      </div>
      <Button className="w-full" variant={'beeYellow'}>
        View Profile
      </Button>
    </div>
  );
};

export default FriendCard;
