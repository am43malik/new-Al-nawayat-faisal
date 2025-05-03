"use client";

import LocationTable from "@/components/location/location-table";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import VendorTable from "@/components/vendor/vendor-table";
import { getLocations } from "@/lib/http/api";
import { ILocation } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const breadcrumbItems = [{ title: "Location", link: "/dashboard/location" }];

export default function Page() {
  const router = useRouter();
  const [getData, setData] = useState<ILocation[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["getLocations"],
    queryFn: async () => {
      return await getLocations().then((res) => res.data);
    },
  });

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  return (
    <>
      <div className="flex items-center justify-between py-5">
        <BreadCrumb items={breadcrumbItems} />
        <Button onClick={() => router.push("/dashboard/location/new")}>
          <Plus className="w-4 h-4 text-primary-foreground mr-1" />
          Add Location
        </Button>
      </div>
      <Card title="Vendor">
        <LocationTable data={getData} />
      </Card>
    </>
  );
}
