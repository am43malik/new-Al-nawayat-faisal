"use client";

import BreadCrumb from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Tag, X } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { createAttribute } from "@/lib/http/api";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Attribute name must be at least 2 characters.",
  }),
  values: z.array(z.string()).min(1, {
    message: "At least one option is required.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Page() {
  const breadcrumbItems = [
    { title: "Attributes", link: "/dashboard/attributes" },
    { title: "Add Attribute", link: "/dashboard/attributes/new" },
  ];

  const router = useRouter();
  const [currentOption, setCurrentOption] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      values: [],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["createAttribute"],
    mutationFn: async (data: FormValues) => {
      return await createAttribute(data);
    },
    onSuccess: () => {
      toast.success("Attribute created successfully!");
      form.reset();
      router.push("/dashboard/attributes");
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.errors[0].msg);
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentOption.trim()) {
      e.preventDefault();
      const newOption = currentOption.trim();
      const currentOptions = form.getValues("values");

      if (!currentOptions.includes(newOption)) {
        form.setValue("values", [...currentOptions, newOption]);
        setCurrentOption("");
      }
    }
  };

  const removeOption = (optionToRemove: string) => {
    const currentOptions = form.getValues("values");
    form.setValue(
      "values",
      currentOptions.filter((option) => option !== optionToRemove)
    );
  };

  async function onSubmit(values: FormValues) {
    try {
      mutate({ name: values.name, values: values.values });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  return (
    <ScrollArea className="h-full">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex-1 space-y-4 py-5">
        <div className="container mx-auto">
          <Card className="max-w-5xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Tag className="h-6 w-6" />
                Create New Attribute
              </CardTitle>
              <CardDescription>
                Add a new attribute to organize your products effectively.
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter attribute name (e.g., Size)"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This is the name that will be displayed for this
                          attribute.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="values"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>values</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <Input
                              placeholder="Type an value and press Enter (e.g., S, M, L)"
                              value={currentOption}
                              onChange={(e) => setCurrentOption(e.target.value)}
                              onKeyDown={handleKeyDown}
                            />
                            <div className="flex flex-wrap gap-2">
                              {field.value.map((option, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="px-3 py-1"
                                >
                                  {option}
                                  <button
                                    type="button"
                                    onClick={() => removeOption(option)}
                                    className="ml-2 hover:text-destructive"
                                  >
                                    <X className="h-3 w-3" />
                                    <span className="sr-only">
                                      Remove {option}
                                    </span>
                                  </button>
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Press Enter after typing each option to add it to the
                          list.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Creating..." : "Create Attribute"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}
