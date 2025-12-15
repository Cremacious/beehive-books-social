import Image from 'next/image';
import Link from 'next/link';
import logoImage from '@/assets/final-logo.png';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#222222] text-white">
      <section className="relative py-12 md:py-20 px-4 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto text-center">
          <Image
            src={logoImage}
            alt="Beehive Books Social Logo"
            width={300}
            height={75}
            className="mx-auto mb-6 w-full max-w-sm md:max-w-md lg:max-w-lg"
          />
          <p className="text-xl md:text-2xl lg:text-3xl mainFont text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
            Where writers, readers, and book lovers connect in a vibrant
            literary community
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <Link href="/dashboard">
              <Button
                variant={'beeYellow'}
                size={'lg'}
                className="w-full sm:w-auto"
              >
                Join the Hive
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button
                variant={'beeDark'}
                size={'lg'}
                className="w-full sm:w-auto"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#303030]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl mainFont text-center mb-16 text-[#FFC300]">
            Discover the Power of Literary Connection
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl mainFont text-[#FFC300]">
                Host Your Writing
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg">
                  Create and publish your books with complete creative control.
                  Build your literary portfolio chapter by chapter in our
                  comprehensive writing platform.
                </p>
                <ul className="space-y-2 text-base">
                  <li>
                    • Craft comprehensive book profiles with custom titles,
                    author details, rich descriptions, and professional book
                    covers
                  </li>
                  <li>
                    • Build your narrative chapter by chapter with our intuitive
                    writing interface and organizational tools
                  </li>
                  <li>
                    • Control your audience with flexible privacy settings -
                    publish publicly, keep private, or share exclusively with
                    friends
                  </li>
                  <li>
                    • Foster community engagement through chapter specific
                    commenting where friends can provide feedback and
                    encouragement
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <div className="transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <Image
                  src="/placeholder-book.jpg"
                  alt="Writing Interface"
                  width={500}
                  height={350}
                  className="rounded-xl shadow-2xl border-4 border-[#FFC300]/20"
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative order-2 lg:order-1">
              <div className="transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <Image
                  src="/placeholder-club.jpg"
                  alt="Book Club Interface"
                  width={500}
                  height={350}
                  className="rounded-xl shadow-2xl border-4 border-[#FFC300]/20"
                />
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h3 className="text-3xl md:text-4xl font-bold text-[#FFC300]">
                Book Clubs
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg">
                  Cultivate vibrant literary communities centered on collective
                  reading journeys. Establish or participate in curated book
                  clubs that foster deep literary analysis, meaningful
                  discussions, and lasting connections among passionate readers
                  and scholars.
                </p>
                <ul className="space-y-2 text-base">
                  <li>
                    • Establish comprehensive book club profiles with
                    distinctive names, detailed descriptions, governing rules,
                    and currently featured literary selections
                  </li>
                  <li>
                    • Curate your membership by extending personalized
                    invitations to users on your friend list
                  </li>
                  <li>
                    • Facilitate engaging dialogue through dedicated discussion
                    forums where members can initiate thought-provoking
                    conversation threads
                  </li>
                  <li>
                    • Maintain synchronized reading progress with integrated
                    tracking systems that coordinate group reading schedules and
                    milestones
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-[#FFC300]">
                Writing Prompts
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg">
                  Ignite your creative potential and establish consistent
                  writing routines through our writing prompt creation. Engage
                  in collaborative challenges that push creative boundaries
                  while building meaningful connections with a community of
                  passionate writers.
                </p>
                <ul className="space-y-2 text-base">
                  <li>
                    • Design and customize personalized writing prompts tailored
                    to specific genres, themes, or writing styles
                  </li>
                  <li>
                    • Extend invitations to your network of fellow writers to
                    participate in collaborative prompt challenges
                  </li>
                  <li>
                    • Engage in rich discussions and exchange constructive
                    feedback on prompt responses and creative approaches
                  </li>
                  <li>
                    • Establish structured timelines with deadline management to
                    maintain writing momentum and accountability
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <div className="transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <Image
                  src="/placeholder-prompt.jpg"
                  alt="Writing Prompts"
                  width={500}
                  height={350}
                  className="rounded-xl shadow-2xl border-4 border-[#FFC300]/20"
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <Image
                  src="/placeholder-list.jpg"
                  alt="Reading Lists"
                  width={500}
                  height={350}
                  className="rounded-xl shadow-2xl border-4 border-[#FFC300]/20"
                />
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h3 className="text-3xl md:text-4xl font-bold text-[#FFC300]">
                Reading Lists
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg">
                  Plan your reading experience through self created and dynamic
                  reading lists. Monitor your progress and maintain reading
                  goals.
                </p>
                <ul className="space-y-2 text-base">
                  <li>
                    • Design and maintain personalized reading collections.
                  </li>
                  <li>
                    • Adjust and update reading statuses to reflect current
                    progress.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#222222]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl mainFont mb-6 text-[#FFC300]">
            Ready to Join the Hive?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Connect with writers, readers, and book lovers from around the
            world. Start your literary journey today.
          </p>
          <Link href="/sign-up">
            <Button variant={'beeYellow'} size={'lg'} className="">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
