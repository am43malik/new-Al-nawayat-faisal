"use client";

import BreadCrumb from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import type React from "react";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSlidersById, updateSlider } from "@/lib/http/api";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

export default function Page() {
  const [previews, setPreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const formSchema = z
    .object({
      images: z.any(),
      isActive: z.boolean().default(true),
    })
    .refine(
      (data) => {
        // Get the number of files from the FileList if it exists
        const newImagesCount =
          data.images instanceof FileList ? data.images.length : 0;
        // Check if there are either existing images or new images
        const hasImages = existingImages.length + newImagesCount > 0;
        return hasImages;
      },
      {
        message: "At least one image is required.",
        path: ["images"], // This shows the error on the images field
      }
    );

  const breadcrumbItems = [
    { title: "Banners", link: "/dashboard/banner" },
    { title: "Update Banner", link: "/dashboard/banner/update" },
  ];

  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isActive: true,
    },
    context: {
      existingImages, // Add existingImages to the form context
    },
  });

  const { data } = useQuery({
    queryKey: ["getSlidersById", id],
    queryFn: async () => {
      return await getSlidersById(String(id)).then((res) => res.data);
    },
  });

  useEffect(() => {
    if (data) {
      setExistingImages(data.images || []);
      form.reset({
        isActive: data.status === "active",
        images: new DataTransfer().files, // Empty FileList
      });
    }
  }, [data, form]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateSlider"],
    mutationFn: async (data: FormData) => {
      return await updateSlider(data, String(id));
    },
    onSuccess: () => {
      toast.success("Banner updated successfully!");
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

      // Append new images if any
      if (values.images instanceof FileList && values.images.length > 0) {
        Array.from(values.images).forEach((file) => {
          formData.append("files", file as File);
        });
      }

      // Append existing images
      // existingImages.forEach((image) => {
      //   formData.append("files", image);
      // });

      formData.append("status", values.isActive ? "active" : "inactive");

      // Only proceed if there's at least one image (either existing or new)
      if (
        existingImages.length === 0 &&
        (!values.images || values.images.length === 0)
      ) {
        toast.error("At least one image is required");
        return;
      }

      mutate(formData);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const newPreviews = files.map((file) => URL.createObjectURL(file));

      form.setValue("images", e.target.files);
      setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  const removeNewImage = (index: number) => {
    const currentFiles = form.getValues("images");
    if (currentFiles) {
      const dataTransfer = new DataTransfer();
      const files = Array.from(currentFiles);
      files.splice(index, 1);

      // Check if removing this image would result in no images
      if (files.length === 0 && existingImages.length === 0) {
        toast.error("At least one image is required");
        return;
      }

      files.forEach((file) => dataTransfer.items.add(file as File));
      form.setValue("images", dataTransfer.files);

      const newPreviews = [...previews];
      newPreviews.splice(index, 1);
      setPreviews(newPreviews);
    }
  };

  const removeExistingImage = (index: number) => {
    const newExistingImages = [...existingImages];
    newExistingImages.splice(index, 1);

    // Only update if there will be at least one image remaining
    const currentNewImages = form.getValues("images");
    const newImagesCount =
      currentNewImages instanceof FileList ? currentNewImages.length : 0;

    if (newExistingImages.length + newImagesCount === 0) {
      toast.error("At least one image is required");
      return;
    }

    setExistingImages(newExistingImages);
  };

  return (
    <ScrollArea className="h-full">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex-1 space-y-4 p-5">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="container mx-auto">
            <Card className="max-w-5xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Tag className="h-6 w-6" />
                  Update Banner Images
                </CardTitle>
                <CardDescription>
                  Update your Banner images and settings. Current images will be
                  preserved unless removed.
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
                              {/* Existing Images */}
                              {existingImages.length > 0 && (
                                <>
                                  <div className="text-sm font-medium">
                                    Existing Images
                                  </div>
                                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {existingImages.map((image, index) => (
                                      <div
                                        key={`existing-${index}`}
                                        className="relative group"
                                      >
                                        <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
                                          <Image
                                            src={image || "/placeholder.svg"}
                                            alt={`Existing ${index + 1}`}
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
                                          onClick={() =>
                                            removeExistingImage(index)
                                          }
                                        >
                                          <X className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </>
                              )}
                              {/* New Images Preview */}
                              {previews.length > 0 && (
                                <>
                                  <div className="text-sm font-medium">
                                    New Images
                                  </div>
                                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {previews.map((preview, index) => (
                                      <div
                                        key={`new-${index}`}
                                        className="relative group"
                                      >
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
                                          onClick={() => removeNewImage(index)}
                                        >
                                          <X className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </>
                              )}
                            </div>
                          </FormControl>
                          <FormDescription>
                            Upload square images (200x200px to 1200x1200px, max
                            2MB each)
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
                              Toggle to set the Banner as active or inactive
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
                            Updating...
                          </>
                        ) : (
                          "Update Slider"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </Suspense>
      </div>
    </ScrollArea>
  );
}
