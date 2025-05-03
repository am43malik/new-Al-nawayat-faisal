"use client";

import BreadCrumb from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Loader2, Save, Tag } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCategories,
  getSubCategoryById,
  updateSubCategory,
} from "@/lib/http/api";
import { AxiosError } from "axios";
import { CategoryData, SubCategory } from "@/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";

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
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  status: z.string().optional(),
  categoryId: z.string({
    required_error: "Please select a parent category.",
  }),
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
    { title: "Sub-Category", link: "/dashboard/sub-category" },
    { title: "Update Sub-Category", link: "/dashboard/sub-category/update" },
  ];

  const [categories, setCategories] = useState<CategoryData[]>([]);
  const router = useRouter();

  const params = useSearchParams();
  const id = params.get("id");

  const { data: categoryData } = useQuery({
    queryKey: ["getCategories"],
    queryFn: async () => {
      return await getCategories().then((res) => res.data);
    },
  });

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData.data);
    }
  }, [categoryData]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "",
      categoryId: "",
    },
  });

  const [subCategory, setSubCategory] = useState<SubCategory | null>(null);

  const { data } = useQuery({
    queryKey: ["subCategorySingle"],
    queryFn: async () => {
      return await getSubCategoryById(String(id)).then((res) => res.data);
    },
  });

  useEffect(() => {
    if (data) {
      setSubCategory(data);
    }
  }, [data]);

  useEffect(() => {
    form.reset({
      name: subCategory?.name,
      description: subCategory?.description,
      status: subCategory?.status,
      categoryId: subCategory?.categoryId._id,
    });
  }, [subCategory]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateSubCategory"],
    mutationFn: async (data: any) => {
      return await updateSubCategory(data, String(id));
    },
    onSuccess: () => {
      form.reset();
      router.push("/dashboard/sub-category");
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
      formData.append("description", values.description);
      formData.append("categoryId", values.categoryId);
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
      <div className="flex-1 py-5">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="container mx-auto">
            <Card className="max-w-5xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Tag className="h-6 w-6" />
                  Update Sub-Category
                </CardTitle>
                <CardDescription>
                  Update sub-category to organize your products effectively.
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
                            <FormLabel>Category Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Summer Collection"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Choose a unique name for this category.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={subCategory?.categoryId.name}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem
                                    key={category._id}
                                    value={category._id}
                                  >
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Choose the parent category for this sub-category.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide a brief description of the category..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Explain what types of products belong in this
                            category.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{subCategory?.status}</FormLabel>
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
                                <SelectItem value="inactive">
                                  Inactive
                                </SelectItem>
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
                                ) : subCategory?.image ? (
                                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                                    <Image
                                      src={subCategory.image}
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
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
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
