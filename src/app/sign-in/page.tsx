import React from 'react';
import Link from 'next/link';
import NewPage from '@/components/layout/NewPage';
import { Button } from '@/components/ui/button';
import SignInForm from './SignInForm';

const SignInPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-linear-to-b from-yellow-400 to-yellow-500 p-">
      <div className="w-full max-w-md mx-auto space-y-8">
        {/* Sign In Form */}
        <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10">
          {/* <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-yellow-400/50 bg-black/50 text-white placeholder-white/50 focus:outline-none focus:border-yellow-400/70 focus:ring-1 focus:ring-yellow-400/70 transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-3 rounded-lg border border-yellow-400/50 bg-black/50 text-white placeholder-white/50 focus:outline-none focus:border-yellow-400/70 focus:ring-1 focus:ring-yellow-400/70 transition-all"
                placeholder="Create a password"
              />
            </div>

            <Button type="submit" variant={'beeYellow'} className="w-full ">
              Sign In
            </Button>
          </form> */}
          <SignInForm />

          <div className="mt-6 text-center">
            <p className="text-white/70 text-sm">
              Don&apos;t have an account?{' '}
              <Link
                href="/sign-up"
                className="text-yellow-400 hover:text-yellow-300 transition"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
