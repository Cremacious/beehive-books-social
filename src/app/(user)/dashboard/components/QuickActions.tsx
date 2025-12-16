'use client';

import Image from 'next/image';
import pencilIcon from '@/assets/icons/pencil.png';
import listIcon from '@/assets/icons/list.png';
import clubIcon from '@/assets/icons/hive.png';
import myBooksIcon from '@/assets/icons/my-books.png';
import { useRouter } from 'next/navigation';

const QuickActions = () => {
  const router = useRouter();

  const actions = [
    {
      icon: myBooksIcon,
      title: 'Create New Book',
      href: '/my-books/create',
      color: 'hover:bg-yellow-500/20 ',
    },
    {
      icon: clubIcon,
      title: 'Start A Book Club',
      href: '/book-clubs/create',
      color: 'hover:bg-yellow-500/20 ',
    },
    {
      icon: listIcon,
      title: 'Edit Reading Lists',
      href: '/reading-lists',
      color: 'hover:bg-yellow-500/20 ',
    },
    {
      icon: pencilIcon,
      title: 'Start A Writing Prompt',
      href: '/prompts/create',
      color: 'hover:bg-yellow-500/20 ',
    },
  ];

  return (
    <section className="darkContainer2 rounded-2xl shadow-xl p-6 w-full">
      <div className="flex items-center gap-3 mb-6">
        <div>
          <h3 className="text-xl mainFont text-white ">Quick Actions</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`darkContainer3 cursor-pointer rounded-2xl p-4 md:p-6 text-left transition-all group ${action.color}`}
            onClick={() => {
              router.push(`${action.href}`);
            }}
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 bg-[#FFC300]/10 rounded-lg group-hover:bg-[#FFC300]/20 transition-colors flex-shrink-0">
                <Image
                  src={action.icon}
                  alt={action.title}
                  width={20}
                  height={20}
                  className="w-5 h-5 md:w-6 md:h-6"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg md:text-xl lg:text-2xl text-white mainFont break-words leading-tight">
                  {action.title}
                </h4>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;
