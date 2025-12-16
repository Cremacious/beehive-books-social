'use client';

import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signUp } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const PasswordInput = ({
  placeholder,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  showPassword?: boolean;
  setShowPassword?: (show: boolean) => void;
}) => {
  const [internalShow, setInternalShow] = useState(false);
  const show = props.showPassword ?? internalShow;
  const setShow = props.setShowPassword ?? setInternalShow;

  return (
    <div className="relative">
      <Input
        {...props}
        type={show ? 'text' : 'password'}
        className="w-full px-4 py-3 pr-12 rounded-lg border border-yellow-400/50 bg-black/50 text-white placeholder-white/50 focus:outline-none focus:border-yellow-400/70 focus:ring-1 focus:ring-yellow-400/70 transition-all"
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400 hover:text-yellow-300 transition-colors"
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

const formSchema = z
  .object({
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await signUp.email({
        name: values.username,
        email: values.email,
        password: values.password,
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-md font-medium text-yellow-400 mb-2">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  className="w-full px-4 py-3 rounded-lg border border-yellow-400/50 bg-black/50 text-white placeholder-white/50 focus:outline-none focus:border-yellow-400/70 focus:ring-1 focus:ring-yellow-400/70 transition-all"
                  placeholder=""
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription className="block text-md font-medium text-white mb-2">
                This is your public display name.
              </FormDescription>
              <FormMessage className="text-white" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-md font-medium text-yellow-400 mb-2">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  className="w-full px-4 py-3 rounded-lg border border-yellow-400/50 bg-black/50 text-white placeholder-white/50 focus:outline-none focus:border-yellow-400/70 focus:ring-1 focus:ring-yellow-400/70 transition-all"
                  placeholder=""
                  type="email"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-white" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-md font-medium text-yellow-400 mb-2">
                Password
              </FormLabel>
              <FormControl>
                <PasswordInput
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  placeholder=""
                  {...field}
                />
              </FormControl>

              {/* <FormMessage className="text-white" /> */}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-md font-medium text-yellow-400 mb-2">
                Confirm Password
              </FormLabel>
              <FormControl>
                <PasswordInput
                  showPassword={showConfirmPassword}
                  setShowPassword={setShowConfirmPassword}
                  placeholder=""
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-white" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant={'beeYellow'}
          className="w-full mt-6"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? 'Creating Account...'
            : 'Create Account'}
        </Button>
      </form>
    </Form>
  );
}
