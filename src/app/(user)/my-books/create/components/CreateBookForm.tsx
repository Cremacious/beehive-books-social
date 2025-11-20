'use client';
import { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CloudUpload, Paperclip } from 'lucide-react';
// import {
//   FileInput,
//   FileUploader,
//   FileUploaderContent,
//   FileUploaderItem,
// } from '@/components/ui/file-upload';

const formSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  category: z.string(),
  genre: z.string().min(1),
  description: z.string(),
  privacy: z.string(),
  name_8193155233: z.string(),
});

export default function CreateBookForm() {
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
        className="space-y-10 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-yellow-400">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      type="text"
                      className="bg-white w-full"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-yellow-400">Author</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="text"
                      className="bg-white w-full"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-yellow-400">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder=""
                  className="resize-none bg-white w-full"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-yellow-400">Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white w-full">
                        <SelectValue placeholder="Public" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-yellow-400">Genre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type=""
                      className="bg-white w-full"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <FormField
              control={form.control}
              name="privacy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-yellow-400">Privacy</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white w-full">
                        <SelectValue placeholder="Public" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className=" rounded-lg p-8 text-center bg-yellow-400 transition-colors hover:bg-yellow-500">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="cover-upload"
          />
          <label htmlFor="cover-upload" className="cursor-pointer block">
            <div className="text-slate-800 mb-2 text-lg">Upload Book Cover</div>
            <div className=" text-slate-800">
              Click to select an image file (PNG, JPG, GIF)
            </div>
          </label>
        </div>

        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
