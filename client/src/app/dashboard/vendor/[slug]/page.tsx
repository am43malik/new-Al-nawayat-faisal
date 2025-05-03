"use client";

import * as z from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, UserPlus } from "lucide-react";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { addVendors } from "@/lib/http/api";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import BreadCrumb from "@/components/ui/breadcrumb";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { useState } from "react";

interface LocationState {
  formatted_address: string;
  lat: number;
  lng: number;
}

const initialState: LocationState = {
  formatted_address: "",
  lat: 19.0759837,
  lng: 72.8776559,
};

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
  password: z.string(),
});

export default function AddVendors() {
  const [formState, setFormState] = useState<LocationState>(initialState);
  const router = useRouter();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["addVendor"],
    mutationFn: async (data: any) => {
      return await addVendors(data);
    },
    onSuccess: (data) => {
      form.reset();
      toast.success(data.data.message);
      router.push("/dashboard/vendor");
    },
    onError(error, variables, context) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.errors[0].msg);
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      mutate({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        mobileNo: values.mobileNo,
        address: [
          {
            formatted_address: formState.formatted_address,
            lat: formState.lat,
            lng: formState.lng,
          },
        ],
        password: values.password,
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  }

  const breadcrumbItems = [
    { title: "Vendors", link: "/dashboard/vendor" },
    { title: "Add Vendor", link: "/dashboard/vendor/new" },
  ];

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    if (place.geometry && place.geometry.location) {
      setFormState((prev) => ({
        ...prev,
        formatted_address: place.formatted_address || "",
        lat: place!.geometry!.location!.lat(),
        lng: place!.geometry!.location!.lng(),
      }));
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <ScrollArea className="h-full">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex-1 space-y-4 py-5">
        <div className="container mx-auto">
          <Card className="max-w-5xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <UserPlus className="h-6 w-6" />
                Add a New Vendor
              </CardTitle>
              <CardDescription>
                Add a new vendor to your supplier network.
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
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Acme Supplies"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter the First Name of the vendor.
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
                            <Input
                              placeholder="e.g., Acme Supplies"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter the Last Name of the vendor.
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
                              placeholder="e.g., contact@acmesupplies.com"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            The primary contact email for the vendor.
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
                            The primary contact number for the vendor.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Secure@123" {...field} />
                          </FormControl>
                          <FormDescription>Enter the Password.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="gird grid-cols-1 tems-center">
                    <div>
                      <Label htmlFor="location">Search Location</Label>
                      <Autocomplete
                        onLoad={(autocomplete) => {
                          autocomplete.addListener("place_changed", () => {
                            const place = autocomplete.getPlace();
                            handlePlaceSelect(place);
                          });
                        }}
                      >
                        <Input
                          id="location"
                          placeholder="Search to update location"
                        />
                      </Autocomplete>
                    </div>
                    <div className="mt-6">
                      <Label htmlFor="formatted-address">Address</Label>
                      <Input
                        id="formatted-address"
                        value={formState.formatted_address}
                        readOnly
                      />
                    </div>
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
                          Adding Vendor...
                        </>
                      ) : (
                        "Add Vendor"
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
