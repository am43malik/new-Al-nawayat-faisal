"use client";

import BreadCrumb from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, UserPlus, PlusCircle, Trash2 } from "lucide-react";
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserById, updateUser } from "@/lib/http/api";
import { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Roles } from "@/constants";
import { Checkbox } from "@/components/ui/checkbox";

const addressSchema = z.object({
  formatted_address: z.string(),
  lat: z.number(),
  lng: z.number(),
  isDefault: z.boolean().default(false),
});

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "firstName must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "lastName must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  mobileNo: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  role: z.string(),
  address: z.array(addressSchema).min(1, "At least one address is required"),
  userId: z.any(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Page() {
  const breadcrumbItems = [
    { title: "Users", link: "/dashboard/user" },
    {
      title: "Update Users",
      link: "/dashboard/user/update",
    },
  ];

  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();
  const [autocompletes, setAutocompletes] = useState<
    google.maps.places.Autocomplete[]
  >([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
      role: "",
      address: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "address",
  });

  const { data } = useQuery({
    queryKey: ["getUserById", id],
    queryFn: async () => {
      return await getUserById(String(id)).then((res) => res.data);
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      form.reset({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobileNo: String(data.mobileNo),
        role: data.role,
        address: data.address || [],
      });
    }
  }, [data, form]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async (data: FormValues) => {
      return await updateUser(data, String(id));
    },
    onSuccess: (data) => {
      form.reset();
      toast.success(data.data.message);
      router.push("/dashboard/user");
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.errors[0].msg);
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      mutate({
        ...values,
        userId: data._id,
      });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  const handlePlaceSelect =
    (index: number) => (place: google.maps.places.PlaceResult) => {
      if (place.geometry && place.geometry.location) {
        const newAddress = {
          formatted_address: place.formatted_address || "",
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          isDefault: index === 0,
        };
        form.setValue(`address.${index}`, newAddress);
      }
    };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <ScrollArea className="h-full">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex-1 space-y-4 py-5">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="container mx-auto">
            <Card className="max-w-5xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <UserPlus className="h-6 w-6" />
                  Update User
                </CardTitle>
                <CardDescription>Update User Details.</CardDescription>
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
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., John" {...field} />
                            </FormControl>
                            <FormDescription>
                              Enter the First Name of the User.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Doe" {...field} />
                            </FormControl>
                            <FormDescription>
                              Enter the Last Name of the User.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="e.g., john.doe@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              The primary contact email for the User.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="mobileNo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="e.g., +1 (555) 123-4567"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              The primary contact number for the User.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value={Roles.RETAILER}>
                                  retailer
                                </SelectItem>
                                <SelectItem value={Roles.USER}>user</SelectItem>
                                <SelectItem value={Roles.ADMIN}>
                                  admin
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>Select user role</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-4">
                      <Label>Addresses</Label>
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="space-y-2 p-4 border rounded-md"
                        >
                          <FormField
                            control={form.control}
                            name={`address.${index}.formatted_address`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address {index + 1}</FormLabel>
                                <Autocomplete
                                  onLoad={(autocomplete) => {
                                    const newAutocompletes = [...autocompletes];
                                    newAutocompletes[index] = autocomplete;
                                    setAutocompletes(newAutocompletes);
                                    autocomplete.addListener(
                                      "place_changed",
                                      () => {
                                        const place = autocomplete.getPlace();
                                        handlePlaceSelect(index)(place);
                                      }
                                    );
                                  }}
                                >
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Search to update location"
                                    />
                                  </FormControl>
                                </Autocomplete>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`address.${index}.isDefault`}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(checked) => {
                                      field.onChange(checked);
                                      if (checked) {
                                        form.setValue(
                                          "address",
                                          form
                                            .getValues("address")
                                            .map((addr, i) => ({
                                              ...addr,
                                              isDefault: i === index,
                                            }))
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Set as default address</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          {index > 0 && (
                            <Button
                              type="button"
                              color="destructive"
                              variant="outline"
                              size="sm"
                              onClick={() => remove(index)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove Address
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          append({
                            formatted_address: "",
                            lat: 0,
                            lng: 0,
                            isDefault: false,
                          })
                        }
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Another Address
                      </Button>
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
                            Saving...
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
