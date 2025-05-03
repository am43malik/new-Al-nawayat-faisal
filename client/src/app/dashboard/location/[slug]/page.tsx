"use client";

import { useState } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BreadCrumb from "@/components/ui/breadcrumb";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createLocation } from "@/lib/http/api";

interface Location {
  formatted_address: string;
  lat: number;
  lng: number;
}

const Page = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [minOrderAmount, setMinOrderAmount] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState("");
  const [estDeliveryTime, setEstDeliveryTime] = useState("");
  const [estDeliveryTimeUnit, setEstDeliveryTimeUnit] = useState("Days");

  const router = useRouter();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    if (place.geometry && place.geometry.location) {
      setLocation({
        formatted_address: place.formatted_address || "",
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["createLocation"],
    mutationFn: async (data: any) => {
      return await createLocation(data);
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      router.push("/dashboard/location");
    },
    onError(error, variables, context) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.errors[0].msg);
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) return;

    mutate({
      ...location,
      minOrderAmount: parseFloat(minOrderAmount),
      deliveryCharge: parseFloat(deliveryCharge),
      estDeliveryTime: parseFloat(estDeliveryTime),
      estDeliveryTimeUnit,
    });
  };

  if (!isLoaded) return <div>Loading...</div>;

  const breadcrumbItems = [
    { title: "Locations", link: "/dashboard/location" },
    { title: "Add Location", link: "/dashboard/location/new" },
  ];

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Add Delivery Location</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                <Input id="location" placeholder="What's your location?" />
              </Autocomplete>
            </div>
            <div>
              <Label htmlFor="formatted-address">Formatted Address</Label>
              <Input
                id="formatted-address"
                value={location?.formatted_address || ""}
                readOnly
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="min-order">Minimum Order Amount (₹  )</Label>
                <Input
                  id="min-order"
                  type="number"
                  value={minOrderAmount}
                  onChange={(e) => setMinOrderAmount(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="delivery-charge">Delivery Charge (₹  )</Label>
                <Input
                  id="delivery-charge"
                  type="number"
                  value={deliveryCharge}
                  onChange={(e) => setDeliveryCharge(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="est-delivery-time">Est. Delivery Time</Label>
                <Input
                  id="est-delivery-time"
                  type="number"
                  value={estDeliveryTime}
                  onChange={(e) => setEstDeliveryTime(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="est-delivery-time-unit">Time Unit</Label>
                <Select
                  value={estDeliveryTimeUnit}
                  onValueChange={setEstDeliveryTimeUnit}
                >
                  <SelectTrigger id="est-delivery-time-unit">
                    <SelectValue>{estDeliveryTimeUnit}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Minutes">Minutes</SelectItem>
                    <SelectItem value="Hours">Hours</SelectItem>
                    <SelectItem value="Days">Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default Page;
