'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
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

const formSchema = z.object({
  username: z.string().min(1),
  email: z.string(),
  password: z.string().min(1),
  confirmPassword: z.string().min(1),
});

export default function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
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

              <FormMessage />
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
                <Input
                  className="w-full px-4 py-3 rounded-lg border border-yellow-400/50 bg-black/50 text-white placeholder-white/50 focus:outline-none focus:border-yellow-400/70 focus:ring-1 focus:ring-yellow-400/70 transition-all"
                  placeholder=""
                  type=""
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant={'beeYellow'} className="w-full mt-6 ">
          Sign In
        </Button>
      </form>
    </Form>
  );
}
