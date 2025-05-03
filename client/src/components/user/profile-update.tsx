import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ImageUpload } from "@/lib/image-upload";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { Label } from "@/components/ui/label";
import { UserData } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  mobileNo: z.string().optional(),
  image: z.any(),
});

interface ProfileUpdateProps {
  profile: UserData;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
}

export function ProfileUpdate({
  profile,
  onSubmit,
  onCancel,
}: ProfileUpdateProps) {
  const [address, setAddress] = useState({
    formatted_address: profile.address[0]?.formatted_address || "",
    lat: profile.address[0]?.lat || 0,
    lng: profile.address[0]?.lng || 0,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      email: profile.email || "",
      mobileNo: profile.mobileNo?.toString() || "",
      image: profile.avatar || undefined,
    },
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    if (place.geometry && place.geometry.location) {
      setAddress({
        formatted_address: place.formatted_address || "",
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append("file", value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    formData.append(
      "address",
      JSON.stringify([
        {
          formatted_address: address.formatted_address,
          lat: address.lat,
          lng: address.lng,
        },
      ])
    );

    onSubmit(formData);
  };

  if (!isLoaded) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={value}
                      onChange={onChange}
                      className="max-w-[400px] mx-auto"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobileNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Search Location</Label>
                <div className="relative">
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
                      className="w-full"
                    />
                  </Autocomplete>
                </div>
              </div>
              <div>
                <Label htmlFor="formatted-address">Current Address</Label>
                <Input
                  id="formatted-address"
                  value={address.formatted_address}
                  readOnly
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                className={cn(
                  "bg-black border-black text-white hover:bg-black hover:border-black"
                )}
                type="button"
                variant="outline"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#BD844C] hover:bg-[#9e6f3f] text-white border-[#BD844C] hover:border-[#BD844C]"
                type="submit"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
