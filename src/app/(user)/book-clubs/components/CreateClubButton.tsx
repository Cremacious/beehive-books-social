'use client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CreateClubButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/book-clubs/create')}
      className="px-8 py-4 bg-linear-to-r from-[#FFC300] to-[#FFD700] text-[#1E3A4B] font-bold rounded-2xl shadow-lg hover:shadow-[#FFC300]/20 hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-3"
    >
      <Plus className="w-5 h-5" />
      <span>Create Club</span>
    </button>
  );
};

export default CreateClubButton;
