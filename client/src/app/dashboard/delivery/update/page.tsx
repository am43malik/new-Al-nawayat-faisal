"use client";

import BreadCrumb from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { getDeliveryById, updateDelivery } from "@/lib/http/api";
import { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";

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
});

export default function Page() {
  const breadcrumbItems = [
    { title: "Delivery", link: "/dashboard/delivery" },
    {
      title: "Update Delivery Person",
      link: "/dashboard/delivery/update",
    },
  ];

  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();
  const [address, setAddress] = useState({
    formatted_address: "",
    lat: 0,
    lng: 0,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
    },
  });

  const { data } = useQuery({
    queryKey: ["getDeliveryById", id],
    queryFn: async () => {
      return await getDeliveryById(String(id)).then((res) => res.data);
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      console.log("data", data);
      form.reset({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobileNo: String(data.mobileNo),
      });
      setAddress(data.address[0]);
    }
  }, [data, form]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateDelivery"],
    mutationFn: async (data: any) => {
      return await updateDelivery(data, String(id));
    },
    onSuccess: (data) => {
      form.reset();
      toast.success(data.data.message);
      router.push("/dashboard/delivery");
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
      mutate({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        mobileNo: values.mobileNo,
        address: [
          {
            formatted_address: address.formatted_address,
            lat: address.lat,
            lng: address.lng,
          },
        ],
        userId: id,
      });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    if (place.geometry && place.geometry.location) {
      setAddress((prev) => ({
        ...prev,
        formatted_address: place.formatted_address || "",
        lat: place!.geometry!.location!.lat(),
        lng: place!.geometry!.location!.lng(),
      }));
    }
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  console.log("address", address);

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
                  Update Delivery
                </CardTitle>
                <CardDescription>Update Delivery Detsials.</CardDescription>
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
                              Enter the First Name of the delivery.
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
                              Enter the Last Name of the delivery.
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
                              The primary contact email for the delivery.
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
                              The primary contact number for the delivery.
                            </FormDescription>
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
                          value={address.formatted_address}
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
