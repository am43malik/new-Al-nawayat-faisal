"use client";

import * as z from "zod";
import type React from "react";
import { useState } from "react";
import BreadCrumb from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { addSlider } from "@/lib/http/api";
import { AxiosError } from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  images: z
    .any()
    .refine((files) => files?.length > 0, "At least one image is required."),
  isActive: z.boolean().default(true),
});

export default function Page() {
  const [previews, setPreviews] = useState<string[]>([]);

  const breadcrumbItems = [
    { title: "Banner", link: "/dashboard/banner" },
    { title: "Add Banner", link: "/dashboard/banner/new" },
  ];

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["addSlider"],
    mutationFn: async (data: FormData) => {
      return await addSlider(data);
    },
    onSuccess: () => {
      form.reset();
      setPreviews([]);
      router.push("/dashboard/banner");
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.errors[0].msg);
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();

      if (values.images) {
        Array.from(values.images).forEach((file, index) => {
          formData.append("files", file as File);
        });
      }

      formData.append("status", values.isActive ? "active" : "inactive");
      formData.append("type", "banner");

      mutate(formData);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const newPreviews: string[] = [];

      for (const file of files) {
        newPreviews.push(URL.createObjectURL(file));
      }

      form.setValue("images", e.target.files);
      setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const currentFiles = form.getValues("images");
    if (currentFiles) {
      const dataTransfer = new DataTransfer();
      const files = Array.from(currentFiles);

      files.splice(index, 1);

      files.forEach((file) => {
        dataTransfer.items.add(file as File);
      });

      form.setValue("images", dataTransfer.files);

      // Update previews
      const newPreviews = [...previews];
      newPreviews.splice(index, 1);
      setPreviews(newPreviews);
    }
  };

  return (
    <ScrollArea className="h-full">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex-1 space-y-4 py-5">
        <div className="container mx-auto">
          <Card className="max-w-5xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Tag className="h-6 w-6" />
                Add Banner Images
              </CardTitle>
              <CardDescription>
                Add multiple images to your banner. Images will be displayed in
                the order they are uploaded.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel>Banner Images</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <Input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              multiple
                              onChange={handleImageChange}
                              {...field}
                            />
                            {previews.length > 0 && (
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                                {previews.map((preview, index) => (
                                  <div key={index} className="relative group">
                                    <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
                                      <Image
                                        src={preview || "/placeholder.svg"}
                                        alt={`Preview ${index + 1}`}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <Button
                                      type="button"
                                      variant="soft"
                                      color="destructive"
                                      size="icon"
                                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                      onClick={() => removeImage(index)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Upload images (390px height, 612px, max 2MB each)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Activate Banner
                          </FormLabel>
                          <FormDescription>
                            Toggle to set the banner as active or inactive
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full sm:w-auto"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        "Upload Images"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}
