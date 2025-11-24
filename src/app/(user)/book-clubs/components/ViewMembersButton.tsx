'use client';
import { useRouter } from 'next/navigation';

const ViewMembersButton = ({ clubId }: { clubId: number }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(`/book-clubs/${clubId}/members`);
      }}
      className="px-3 py-1 bg-[#FFC300]/20 text-[#FFC300] rounded-lg hover:bg-[#FFC300]/30 transition-all text-sm"
    >
      View All
    </button>
  );
};
export default ViewMembersButton;
