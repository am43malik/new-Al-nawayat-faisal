"use client";

import BreadCrumb from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Tag } from "lucide-react";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getBrandById, updateBrand } from "@/lib/http/api";
import { AxiosError } from "axios";
import { CategoryData } from "@/types";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import Image from "next/image";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
  status: z.string().optional(),
  image: z
    .any()
    .optional()
    .refine(
      (files) =>
        !files || files?.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) =>
        !files ||
        files?.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

export default function Page() {
  const breadcrumbItems = [
    { title: "Brands", link: "/dashboard/brand" },
    { title: "Update Brand", link: "/dashboard/brand/update" },
  ];

  const router = useRouter();

  const params = useSearchParams();
  const id = params.get("id");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      status: "active",
    },
  });

  const [category, setCategory] = useState<CategoryData | null>(null);

  const { data } = useQuery({
    queryKey: ["getBrandById"],
    queryFn: async () => {
      return await getBrandById(String(id)).then((res) => res.data);
    },
  });

  useEffect(() => {
    if (data) {
      setCategory(data);
    }
  }, [data]);

  useEffect(() => {
    form.reset({
      name: category?.name,
      status: category?.status,
    });
  }, [category,form]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateBrand"],
    mutationFn: async (data: any) => {
      return await updateBrand(data, String(id));
    },
    onSuccess: () => {
      form.reset();
      router.push("/dashboard/brand");
    },
    onError(error, variables, context) {
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

      formData.append("name", values.name);

      if (values.status) {
        formData.append("status", values.status);
      }
      if (values.image?.[0]) {
        formData.append("file", values.image[0]);
      }
      mutate(formData);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

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
                  Update Brand
                </CardTitle>
                <CardDescription>
                  Update Brand to organize your products effectively.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Brand Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Zara" {...field} />
                            </FormControl>
                            <FormDescription>
                              Choose a unique name for this brand.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Set whether this category should be active or
                            inactive.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator />
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field: { onChange, value, ...field } }) => (
                          <FormItem>
                            <FormLabel>Category Image</FormLabel>
                            <FormControl>
                              <div className="space-y-4">
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    onChange(e.target.files);
                                  }}
                                  {...field}
                                />
                                {value?.[0] ? (
                                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                                    <Image
                                      src={URL.createObjectURL(value[0])}
                                      alt="Preview"
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                ) : category?.image ? (
                                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                                    <Image
                                      src={category.image}
                                      alt="Current category image"
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                ) : null}
                              </div>
                            </FormControl>
                            <FormDescription>
                              Upload a new image or keep the existing one.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

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
                          "Save"
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
