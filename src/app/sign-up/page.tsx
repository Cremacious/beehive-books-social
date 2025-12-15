import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoImage from '@/assets/final-logo.png';

import SignUpForm from './SignUpForm';

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-[#303030] relative overflow-hidden">
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-md mx-auto">
          <div className="darkContainer2 rounded-2xl shadow-2xl p-8 md:p-10 ">
            <Image
              src={logoImage}
              alt="Beehive Books Social Logo"
              width={200}
              height={50}
              className="mx-auto hover:scale-105 transition-transform duration-300"
            />

            <SignUpForm />

            <div className="mt-6 text-center">
              <p className="text-white/70 text-sm">
                Already have an account?{' '}
                <Link
                  href="/sign-in"
                  className="text-yellow-400 hover:text-yellow-300 transition"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-6 text-center space-y-2">
            <Link
              href="/"
              className="text-white hover:text-gray-400 text-sm transition-colors block"
            >
              ← Back to homepage
            </Link>
            {/* <Link
                href="/forgot-password"
                className="text-gray-500 hover:text-[#FFC300] text-sm transition-colors block"
              >
                Forgot your password?
              </Link> */}
          </div>
        </div>

        <div className="mt-12 text-center max-w-md">
          <p className="text-white text-xs leading-relaxed">
            Join thousands of writers, readers, and book lovers in our vibrant
            literary community. Share your stories, discover new books, and
            connect with fellow enthusiasts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
