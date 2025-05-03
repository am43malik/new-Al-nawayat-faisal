"use client";

import * as z from "zod";
import BreadCrumb from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getLocationById, updateLocation } from "@/lib/http/api";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ILocation } from "@/types";

interface LocationState {
  formatted_address: string;
  lat: number;
  lng: number;
  minOrderAmount: string;
  deliveryCharge: string;
  estDeliveryTime: string;
  estDeliveryTimeUnit: string;
}

const initialState: LocationState = {
  formatted_address: "",
  lat: 0,
  lng: 0,
  minOrderAmount: "",
  deliveryCharge: "",
  estDeliveryTime: "",
  estDeliveryTimeUnit: "Hours",
};

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const [formState, setFormState] = useState<LocationState>(initialState);
  const [hasLocationChanged, setHasLocationChanged] = useState(false);

  const breadcrumbItems = [
    { title: "Locations", link: "/dashboard/location" },
    { title: "Update Location", link: "/dashboard/location/update" },
  ];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const { data, isLoading } = useQuery({
    queryKey: ["getLocationById", id],
    queryFn: async () => {
      if (!id) throw new Error("No ID provided");
      return await getLocationById(id).then((res) => res.data);
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setFormState({
        formatted_address: data.formatted_address,
        lat: data.lat,
        lng: data.lng,
        minOrderAmount: data.minOrderAmount.toString(),
        deliveryCharge: data.deliveryCharge.toString(),
        estDeliveryTime: data.estDeliveryTime.toString(),
        estDeliveryTimeUnit: data.estDeliveryTimeUnit,
      });
    }
  }, [data]);

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    if (place.geometry && place.geometry.location) {
      setFormState((prev) => ({
        ...prev,
        formatted_address: place.formatted_address || "",
        lat: place!.geometry!.location!.lat(),
        lng: place!.geometry!.location!.lng(),
      }));
      setHasLocationChanged(true);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateLocation"],
    mutationFn: async (data: any) => {
      if (!id) throw new Error("No ID provided");
      return await updateLocation(data, id);
    },
    onSuccess: () => {
      toast.success("Location updated successfully!");
      router.push("/dashboard/location");
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.errors[0].msg);
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = {
      ...(hasLocationChanged && {
        formatted_address: formState.formatted_address,
        lat: formState.lat,
        lng: formState.lng,
      }),
      minOrderAmount: parseFloat(formState.minOrderAmount),
      deliveryCharge: parseFloat(formState.deliveryCharge),
      estDeliveryTime: parseFloat(formState.estDeliveryTime),
      estDeliveryTimeUnit: formState.estDeliveryTimeUnit,
    };

    mutate(submitData);
  };

  if (!isLoaded || isLoading) return <div>Loading...</div>;

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Update Delivery Location</CardTitle>
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
                <Input id="location" placeholder="Search to update location" />
              </Autocomplete>
            </div>
            <div>
              <Label htmlFor="formatted-address">Current Address</Label>
              <Input
                id="formatted-address"
                value={formState.formatted_address}
                readOnly
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="min-order">Minimum Order Amount (₹  )</Label>
                <Input
                  id="min-order"
                  type="number"
                  value={formState.minOrderAmount}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      minOrderAmount: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="delivery-charge">Delivery Charge (₹  )</Label>
                <Input
                  id="delivery-charge"
                  type="number"
                  value={formState.deliveryCharge}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      deliveryCharge: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="est-delivery-time">Est. Delivery Time</Label>
                <Input
                  id="est-delivery-time"
                  type="number"
                  value={formState.estDeliveryTime}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      estDeliveryTime: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="est-delivery-time-unit">Time Unit</Label>
                <Select
                  value={formState.estDeliveryTimeUnit}
                  onValueChange={(value) =>
                    setFormState((prev) => ({
                      ...prev,
                      estDeliveryTimeUnit: value,
                    }))
                  }
                >
                  <SelectTrigger id="est-delivery-time-unit">
                    <SelectValue>{formState.estDeliveryTimeUnit}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Minutes">Minutes</SelectItem>
                    <SelectItem value="Hours">Hours</SelectItem>
                    <SelectItem value="Days">Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
