import { Compass, Home, Plus, User, Users } from 'lucide-react';

const BottomNavBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#252525] flex justify-around items-center shadow-2xl z-50 md:hidden">
      <div className="flex flex-col items-center justify-center space-y-0.5 text-gray-400">
        <Home size={22} />
        <span className="text-[10px]">Home</span>
      </div>
      <div className="flex flex-col items-center justify-center space-y-0.5 text-gray-400">
        <Compass size={22} />
        <span className="text-[10px]">Discover</span>
      </div>

      <div className="p-3 rounded-full bg-[#FFC300] shadow-xl transform -translate-y-4 border-4 border-[#1E3A4B] cursor-pointer">
        <Plus size={28} className="text-[#1E3A4B]" />
      </div>

      <div className="flex flex-col items-center justify-center space-y-0.5 text-[#FFC300]">
        <User size={22} />
        <span className="text-[10px] font-semibold">Hive</span>
      </div>
      <div className="flex flex-col items-center justify-center space-y-0.5 text-gray-400">
        <Users size={22} />
        <span className="text-[10px]">Clubs</span>
      </div>
    </nav>
  );
};

export default BottomNavBar;
