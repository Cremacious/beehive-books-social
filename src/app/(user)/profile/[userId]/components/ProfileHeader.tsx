import Image from 'next/image';
import { Calendar, BookOpen } from 'lucide-react';

interface ProfileHeaderProps {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    createdAt: Date;
  };
  bookCount: number;
  isOwnProfile: boolean;
}

export default function ProfileHeader({
  user,
  bookCount,
  isOwnProfile,
}: ProfileHeaderProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };

  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10">
      <div className="flex flex-col md:flex-row gap-6">
    
        <div className="shrink-0">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-[#FFC300]/10 rounded-full flex items-center justify-center overflow-hidden">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl md:text-5xl text-[#FFC300] font-bold">
                {user.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

   
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
              {user.name}
            </h1>
            <p className="text-white/70 text-lg">
              {isOwnProfile ? 'Your Profile' : 'Writer'}
            </p>
          </div>

    
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#FFC300]" />
              <span className="text-white font-medium">
                {bookCount} {bookCount === 1 ? 'Book' : 'Books'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#FFC300]" />
              <span className="text-white/70">
                Joined {formatDate(user.createdAt)}
              </span>
            </div>
          </div>

         
          <div className="text-white/80">
            <p className="italic">
              &ldquo;Passionate writer sharing stories with the world.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
