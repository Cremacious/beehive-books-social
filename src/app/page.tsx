// Homepage for Beehive Books - A comprehensive social platform for writers and readers
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import bookImage from '@/assets/book-example.png';
import clubImage from '@/assets/bookclub-example.png';
import readingListImage from '@/assets/readinglist-example.png';
import promptImage from '@/assets/prompt-example.png';

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-[#303030]">
      {/* Hero Section */}
      <section className="darkContainer2 text-center py-24 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-lg">
          Beehive Books
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-white/80">
          A buzzing hive for writers and readers. Create, share, and collaborate
          on novels while building vibrant communities around the stories you
          love. Join thousands of authors and book enthusiasts in our thriving
          literary ecosystem.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition text-lg">
            Start Writing Today
          </button>
          <Link href="/dashboard">
            <button className="bg-black text-yellow-400 border border-yellow-400 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition text-lg">
              Dashboard
            </button>
          </Link>
          <Link href="/sign-in">
            <button className="bg-black text-yellow-400 border border-yellow-400 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition text-lg">
              Sign In
            </button>
          </Link>
          <Link href="/sign-up">
            <button className="bg-black text-yellow-400 border border-yellow-400 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition text-lg">
              Sign Up
            </button>
          </Link>
        </div>
      </section>

      {/* Banner */}
      {/* <section className="darkContainer3 py-12 text-center mx-4 md:mx-8 my-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-yellow-400">
          Join the Literary Revolution
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-lg text-white/70">
          Connect with writers, readers, and friends in a buzzing creative
          community. Your hive awaits - where every story matters and every
          reader counts.
        </p>
        <div className="mt-6">
          <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition">
            Join for Free
          </button>
        </div>
      </section> */}

      {/* Statistics Section */}
      {/* <section className="py-16 px-6 md:px-12 lg:px-24">
        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12">
          The Buzz in Numbers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="darkContainer3 rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-3xl font-bold text-yellow-400">25,000+</h3>
            <p className="text-lg text-white/70">Active Writers</p>
          </div>
          <div className="darkContainer3 rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-3xl font-bold text-yellow-400">150,000+</h3>
            <p className="text-lg text-white/70">Chapters Published</p>
          </div>
          <div className="darkContainer3 rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-3xl font-bold text-yellow-400">5,000+</h3>
            <p className="text-lg text-white/70">Book Clubs</p>
          </div>
          <div className="darkContainer3 rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-3xl font-bold text-yellow-400">1M+</h3>
            <p className="text-lg text-white/70">Comments & Reviews</p>
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <div className="my-8 px-2 md:px-8 space-y-8">
        {/* Feature 1 - Writing Tools */}
        <div className="darkContainer2 rounded-2xl shadow-xl p-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold text-yellow-400 mb-6">
                ✍️ Write & Share Your Stories
              </h3>
              <p className="text-xl text-white/80 mb-6">
                Transform your ideas into captivating stories with our intuitive
                writing interface. Draft chapters, organize your narrative, and
                publish your work to an engaged audience of fellow book lovers.
                Whether writing your first novel or your tenth masterpiece,
                Beehive Books provides the perfect hive for your creativity to
                flourish and grow.
              </p>

              <ul className="space-y-3 text-white/80">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span>Create new books to share online</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span>Collaboration with co-authors and beta readers</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span>See word count</span>
                </li>

                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span>Interactive comment system for reader feedback</span>
                </li>
              </ul>
            </div>
            {/* Image */}
            <div className="darkContainer3 rounded-xl shadow-xl md:p-6">
              <Image
                src={bookImage}
                alt="Featured Story"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Feature 2 - Book Clubs */}
        <div className="darkContainer2 rounded-2xl p-12 shadow-xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="darkContainer3 text-yellow-400 rounded-xl p-8 shadow-lg">
                <Image
                  src={clubImage}
                  alt="Book Club Example"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-yellow-400 mb-6">
                Create & Join Book Clubs
              </h3>
              <p className="text-xl text-white/80 mb-6">
                Foster meaningful connections through shared literary
                experiences. Create intimate book clubs with close friends or
                join public clubs to meet fellow book enthusiasts from around
                the world. Our platform facilitates rich discussions, structured
                reading schedules, and community events that bring stories to
                life in ways you never imagined.
              </p>

              <div className="darkContainer3 rounded-lg p-6 shadow-lg">
                <h4 className="font-semibold mb-4 text-lg text-yellow-400">
                  Popular Club Categories:
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🏰</span>
                    <span className="text-white/80">
                      Fantasy & Sci-Fi Adventures
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">💕</span>
                    <span className="text-white/80">
                      Romance & Contemporary Drama
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🔍</span>
                    <span className="text-white/80">
                      Mystery & Thriller Enthusiasts
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">📚</span>
                    <span className="text-white/80">
                      Literary Fiction Discussions
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">📖</span>
                    <span className="text-white/80">
                      Non-Fiction & Biography
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">✨</span>
                    <span className="text-white/80">New Release Reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3 - Reading Lists */}
        <div className="darkContainer2 rounded-2xl p-12 shadow-xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="">
              <h3 className="text-4xl font-bold text-yellow-400 mb-6">
                Curate Personal Reading Lists
              </h3>
              <p className="text-xl text-white/80 mb-6">
                Organize your entire literary journey with powerful,
                personalized reading lists. Whether you&apos;re tracking books
                you want to read, creating themed collections for different
                moods, or sharing carefully curated recommendations with friends
                and fellow readers, our comprehensive list system ensures you
                never lose track of great stories waiting to be discovered.
              </p>
            </div>
            <div className="space-y-6">
              <div className="darkContainer3 text-yellow-400 rounded-xl p-8 shadow-lg">
                <Image
                  src={readingListImage}
                  alt="Book Club Example"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Feature 4 - Writing Prompts */}
        <div className="darkContainer2 rounded-2xl p-12 shadow-xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="darkContainer3 text-yellow-400 rounded-xl p-8 shadow-lg">
                <Image
                  src={promptImage}
                  alt="Book Club Example"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-yellow-400 mb-6">
                Create & Join Book Clubs
              </h3>
              <p className="text-xl text-white/80 mb-6">
                Foster meaningful connections through shared literary
                experiences. Create intimate book clubs with close friends or
                join public clubs to meet fellow book enthusiasts from around
                the world. Our platform facilitates rich discussions, structured
                reading schedules, and community events that bring stories to
                life in ways you never imagined.
              </p>

              <div className="darkContainer3 rounded-lg p-6 shadow-lg">
                <h4 className="font-semibold mb-4 text-lg text-yellow-400">
                  Popular Club Categories:
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🏰</span>
                    <span className="text-white/80">
                      Fantasy & Sci-Fi Adventures
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">💕</span>
                    <span className="text-white/80">
                      Romance & Contemporary Drama
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🔍</span>
                    <span className="text-white/80">
                      Mystery & Thriller Enthusiasts
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">📚</span>
                    <span className="text-white/80">
                      Literary Fiction Discussions
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">📖</span>
                    <span className="text-white/80">
                      Non-Fiction & Biography
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">✨</span>
                    <span className="text-white/80">New Release Reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto ">
        <section className="darkContainer2 py-20 px-6 md:px-12 lg:px-24 rounded-2xl md:mx-8 my-8">
          <h2 className="text-4xl font-bold text-center text-yellow-400 mb-16">
            Your Journey Starts Here
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg">
                📝
              </div>
              <h3 className="text-xl font-bold text-yellow-400 mb-4">
                1. Create Your Literary Profile
              </h3>
              <p className="text-white/70 leading-relaxed">
                Sign up and build your personalized profile by sharing your
                reading preferences, favorite genres, writing interests, and
                literary goals. Our intelligent algorithm will help connect you
                with like-minded community members, relevant book clubs, and
                authors whose work aligns with your tastes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-3xl text-yellow-400 mx-auto mb-6 shadow-lg">
                📚
              </div>
              <h3 className="text-xl font-bold text-yellow-400 mb-4">
                2. Discover & Connect
              </h3>
              <p className="text-white/70 leading-relaxed">
                Explore our extensive library of user-generated stories and
                content, join book clubs that match your specific interests and
                reading level, connect with both emerging and established
                authors whose work resonates with your personal taste, and
                discover hidden literary gems through community recommendations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg">
                💬
              </div>
              <h3 className="text-xl font-bold text-yellow-400 mb-4">
                3. Engage & Discuss
              </h3>
              <p className="text-white/70 leading-relaxed">
                Participate in meaningful, thoughtful discussions about
                literature and storytelling, leave constructive and encouraging
                comments on stories that move you, engage with diverse writing
                prompts that challenge and inspire your creativity, and
                contribute to a supportive community atmosphere.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Call to Action */}

      <section className="darkContainer2 py-20 text-center rounded-2xl mx-4 md:mx-8 my-8">
        <h2 className="text-5xl font-bold text-yellow-400 mb-6">
          Ready to Join the Buzz?
        </h2>
        <p className="mt-4 text-xl text-white/80 max-w-2xl mx-auto mb-8">
          Start your literary adventure today and become part of a thriving hive
          of creativity, collaboration, and community. Whether youre here to
          read, write, or simply connect with fellow book lovers, your story
          begins now.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-yellow-400 text-black px-10 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition text-xl shadow-xl">
            Sign Up Now - Free!
          </button>
          <button className="border-2 border-yellow-400 text-yellow-400 px-10 py-4 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition text-xl">
            Explore as Guest
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="darkContainer2 py-12 px-6 ">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-yellow-400 mb-4">
                Beehive Books
              </h3>
              <p className="text-white/70 text-sm mb-4">
                The premier social platform for writers, readers, and book
                enthusiasts worldwide.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-yellow-400 rounded text-black text-center text-sm font-bold leading-8">
                  f
                </div>
                <div className="w-8 h-8 bg-yellow-400 rounded text-black text-center text-sm font-bold leading-8">
                  t
                </div>
                <div className="w-8 h-8 bg-yellow-400 rounded text-black text-center text-sm font-bold leading-8">
                  i
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-yellow-400 mb-4">
                For Writers
              </h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>
                  <a href="#" className="hover:text-yellow-400 transition">
                    Publishing Tools
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition">
                    Writing Prompts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition">
                    Author Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition">
                    Writing Groups
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-yellow-400 mb-4">
                For Readers
              </h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>
                  <a href="#" className="hover:text-yellow-400 transition">
                    Browse Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition">
                    Join Book Clubs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition">
                    Reading Lists
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition">
                    Community Discussions
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-yellow-400 mb-4">Support</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>
                  <a href="#" className="hover:text-yellow-400 transition">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition">
                    Community Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-yellow-400/20 mt-8 pt-8 text-center">
            <p className="text-white/60 text-sm">
              © 2025 Beehive Books. All rights reserved. Made with 💛 for the
              literary community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
