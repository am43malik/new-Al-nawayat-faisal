"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Loader2, Tag, Upload } from "lucide-react";

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
import { Separator } from "@/components/ui/separator";
import { useMutation, useQuery } from "@tanstack/react-query";
import { creatSubCategory, getCategories } from "@/lib/http/api";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { validateSingleImage } from "@/lib/image-validation";
import { CategoryData } from "@/types";
import BreadCrumb from "@/components/ui/breadcrumb";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Sub-category name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  status: z.enum(["active", "inactive"]).optional(),
  categoryId: z.string({
    required_error: "Please select a parent category.",
  }),
  image: z
    .any()
    .refine((files) => files?.length === 1, "Image is required.")
    .refine(
      async (files) => {
        if (!files?.[0]) return false;
        const result = await validateSingleImage(files[0]);
        return result.isValid;
      },
      {
        message:
          "Invalid image. Must be a square image between 200x200 and 1200x1200 pixels, and less than 2MB.",
      }
    ),
});

const Page = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryData[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "active",
      categoryId: "",
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["getCategories"],
    queryFn: async () => {
      return await getCategories().then((res) => res.data);
    },
  });

  useEffect(() => {
    if (data) {
      setCategories(data.data);
    }
  }, [data]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["createSubCategory"],
    mutationFn: async (data: any) => {
      return await creatSubCategory(data);
    },
    onSuccess: () => {
      form.reset();
      router.push("/dashboard/sub-category");
      toast.success("Sub-category created successfully");
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
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("categoryId", values.categoryId);
      formData.append("status", values.status || "active");
      if (values.image?.[0]) {
        formData.append("file", values.image[0]);
      }
      mutate(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong!");
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const result = await validateSingleImage(file);

      if (!result.isValid) {
        toast.error("Invalid Image");
        e.target.value = "";
        return;
      }

      form.setValue("image", e.target.files);
    }
  };

  const breadcrumbItems = [
    { title: "Sub-Category", link: "/dashboard/sub-category" },
    { title: "Add Sub-Category", link: "/dashboard/sub-category/new" },
  ];

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div className="container mx-auto py-5">
        <Card className="max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Tag className="h-6 w-6" />
              Create New Sub-Category
            </CardTitle>
            <CardDescription>
              Add a new sub-category under an existing category to organize your
              products effectively.
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
                        <FormLabel>Sub-Category Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Summer T-Shirts"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Choose a unique name for this sub-category.
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
                        <FormLabel>Parent Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a parent category" />
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
                          placeholder="Provide a brief description of the sub-category..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Explain what types of products belong in this
                        sub-category.
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
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select sub-category status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Set whether this sub-category should be active or
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
                        <FormLabel>Sub-Category Image</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <Input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              onChange={handleImageChange}
                              {...field}
                            />
                            {value?.[0] && (
                              <div className="relative aspect-square w-48 overflow-hidden rounded-lg border">
                                <Image
                                  src={URL.createObjectURL(value[0])}
                                  alt="Preview"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Upload a square sub-category image (200x200px to
                          1200x1200px, max 2MB)
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
                        Creating...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Create Sub-Category
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Page;
