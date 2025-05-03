"use client";

import * as z from "zod";
import BreadCrumb from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { KeyboardEvent, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAttributeById, updateAttribute } from "@/lib/http/api";
import { AxiosError } from "axios";
import { IAttribute } from "@/types";
import toast from "react-hot-toast";
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
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag, X } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Attribute name must be at least 2 characters.",
  }),
  values: z.array(z.string()).min(1, {
    message: "At least one value is required.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Page() {
  const router = useRouter();
  const [currentValue, setCurrentValue] = useState("");

  const breadcrumbItems = [
    { title: "Attributes", link: "/dashboard/attributes" },
    { title: "Update Attribute", link: "/dashboard/attributes/update" },
  ];

  const params = useSearchParams();
  const id = params.get("id");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      values: [],
    },
  });

  const { data } = useQuery({
    queryKey: ["getAttributeById", id],
    queryFn: async () => {
      return await getAttributeById(id!).then((res) => res.data);
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        values: data.values,
      });
    }
  }, [data, form]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateAttribute"],
    mutationFn: async (data: FormValues) => {
      return await updateAttribute(data, id!);
    },
    onSuccess: () => {
      toast.success("Attribute updated successfully!");
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
    if (e.key === "Enter" && currentValue.trim()) {
      e.preventDefault();
      const newValue = currentValue.trim();
      const currentValues = form.getValues("values");

      if (!currentValues.includes(newValue)) {
        form.setValue("values", [...currentValues, newValue]);
        setCurrentValue("");
      }
    }
  };

  const removeValue = (valueToRemove: string) => {
    const currentValues = form.getValues("values");
    form.setValue(
      "values",
      currentValues.filter((value) => value !== valueToRemove)
    );
  };

  async function onSubmit(values: FormValues) {
    try {
      mutate(values);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  return (
    <ScrollArea className="h-full">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex-1 space-y-4 p-5">
        <Card className="max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Tag className="h-6 w-6" />
              Update Attribute
            </CardTitle>
            <CardDescription>
              Modify the attribute details and values.
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
                        <Input placeholder="Enter attribute name" {...field} />
                      </FormControl>
                      <FormDescription>
                        The name of the attribute (e.g., Size, Color)
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
                      <FormLabel>Values</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <Input
                            placeholder="Type a value and press Enter"
                            value={currentValue}
                            onChange={(e) => setCurrentValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                          />
                          <div className="flex flex-wrap gap-2">
                            {field.value.map((value, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="px-3 py-1"
                              >
                                {value}
                                <button
                                  type="button"
                                  onClick={() => removeValue(value)}
                                  className="ml-2 hover:text-destructive"
                                >
                                  <X className="h-3 w-3" />
                                  <span className="sr-only">
                                    Remove {value}
                                  </span>
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Press Enter after typing each value to add it to the
                        list.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/dashboard/attributes")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Updating..." : "Update Attribute"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
