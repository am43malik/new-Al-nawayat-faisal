"use client";

import * as z from "zod";
import React from "react";
import BreadCrumb from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useMutation } from "@tanstack/react-query";
import { creatBrand } from "@/lib/http/api";
import { AxiosError } from "axios";
import Image from "next/image";
import { validateSingleImage } from "@/lib/image-validation";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Brand name must be at least 2 characters.",
  }),
  status: z.enum(["active", "inactive"]).optional(),
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

export default function Page() {
  const breadcrumbItems = [
    { title: "Brands", link: "/dashboard/brand" },
    { title: "Add Brand", link: "/dashboard/brand/new" },
  ];

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      status: "active",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["creatBrand"],
    mutationFn: async (data: any) => {
      return await creatBrand(data);
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
      formData.append("status", values.status || "active");
      if (values.image?.[0]) {
        formData.append("file", values.image[0]);
      }
      mutate(formData);
    } catch (error) {
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

  return (
    <ScrollArea className="h-full">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex-1 space-y-4 py-5">
        <div className="container mx-auto">
          <Card className="max-w-5xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Tag className="h-6 w-6" />
                Create New Brand
              </CardTitle>
              <CardDescription>
                Add a new Brand to organize your products effectively.
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
                            Choose a unique name for this category.
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
                              <SelectValue placeholder="Select brand status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Set whether this brand should be active or inactive.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel>Brand Image</FormLabel>
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
                          Upload a square brand image (200x200px to 1200x1200px,
                          max 2MB)
                        </FormDescription>
                        <FormMessage />
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
                          Creating...
                        </>
                      ) : (
                        "Create Brand"
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
