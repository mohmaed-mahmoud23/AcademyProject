/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useCreateArticleMutation } from "@/app/redux/slices/ApiSlice";
import { CreateArticleFormValues, createArticleSchema } from "@/lib/zodSecma";
import { useRouter } from "next/navigation";
export default function CreateArticles() {
  const  router = useRouter();
  const [createArticle, { isLoading }] = useCreateArticleMutation();
  
  const form = useForm<CreateArticleFormValues>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      title: "",
      content: "",
      image: undefined,
    },
  });

  const onSubmit = async (data: CreateArticleFormValues) => {



    try {
  const   resalt=    await createArticle({  
        title: data.title,
        content: data.content,
        image: data.image,
      }).unwrap();



toast.success(resalt.message);
form.reset();
router.push("/Admin/articles")

    } catch (error) {
      console.error("Error creating article:", error);
    }
  };

  return (
    <div className="  mx-auto p-6  w-full max-w-3xl animate-in fade-in zoom-in-95 duration-500">
      <h1 className="text-2xl font-bold mb-6">Create Article</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Article Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Content */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Article Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your article..."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files?.[0]);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Creating..." : "Create Article"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
