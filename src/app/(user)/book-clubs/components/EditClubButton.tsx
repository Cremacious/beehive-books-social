'use client';
import { Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

const EditClubButton = ({ clubId }: { clubId: number }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(`/book-clubs/${clubId}/settings`);
      }}
      className="px-4 py-2 bg-[#FFC300] text-[#1E3A4B] rounded-lg hover:bg-[#FFD700] transition-all flex items-center gap-2 font-medium"
    >
      <Settings className="w-4 h-4" />
      Manage
    </button>
  );
};
export default EditClubButton;
