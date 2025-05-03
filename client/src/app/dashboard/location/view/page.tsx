"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getLocationById } from "@/lib/http/api";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { Pencil, ArrowLeft } from "lucide-react";

interface LocationDetails {
  formatted_address: string;
  lat: number;
  lng: number;
  minOrderAmount: number;
  deliveryCharge: number;
  estDeliveryTime: number;
  estDeliveryTimeUnit: string;
}

const mapContainerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "0.5rem",
};

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const [location, setLocation] = useState<LocationDetails | null>(null);

  const breadcrumbItems = [
    { title: "Locations", link: "/dashboard/location" },
    { title: "Location Details", link: "/dashboard/location/view" },
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
      setLocation(data);
    }
  }, [data]);

  if (!isLoaded || isLoading || !location) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={() => router.push(`/dashboard/location/update?id=${id}`)}
            className="flex items-center gap-2"
          >
            <Pencil className="h-4 w-4" />
            Edit Location
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Location Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Address
              </h3>
              <p className="text-base">{location.formatted_address}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Minimum Order
                </h3>
                <p className="text-base">
                  ₹  {location.minOrderAmount.toFixed(2)}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Delivery Charge
                </h3>
                <p className="text-base">
                  ₹  {location.deliveryCharge.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Estimated Delivery Time
              </h3>
              <p className="text-base">
                {location.estDeliveryTime} {location.estDeliveryTimeUnit}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Coordinates
              </h3>
              <p className="text-sm font-mono">
                {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Map View</CardTitle>
          </CardHeader>
          <CardContent>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={{ lat: location.lat, lng: location.lng }}
              zoom={15}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
                scrollwheel: false,
              }}
            >
              <MarkerF
                position={{ lat: location.lat, lng: location.lng }}
                title={location.formatted_address}
              />
            </GoogleMap>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
