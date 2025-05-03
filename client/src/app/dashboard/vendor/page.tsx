"use client";

import BreadCrumb from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import VendorTable from "@/components/vendor/vendor-table";
import { getVendors } from "@/lib/http/api";
import { UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const breadcrumbItems = [{ title: "Vendors", link: "/dashboard/vendor" }];

export default function Page() {
  const [getData, setData] = useState<UserData[]>([]);
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["vendors"],
    queryFn: async () => {
      return await getVendors().then((res) => res.data);
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
        <Button onClick={() => router.push("/dashboard/vendor/new")}>
          <Plus className="w-4 h-4 text-primary-foreground mr-1" />
          Add Vendor
        </Button>
      </div>
      <Card title="Vendor">
        <VendorTable data={getData} />
      </Card>
    </>
  );
}
