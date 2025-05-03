"use client";

import BrandTable from "@/components/brand/brand-table";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getBrands } from "@/lib/http/api";
import { Brand } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const breadcrumbItems = [{ title: "Brands", link: "/dashboard/brand" }];

export default function Page() {
  const [getData, setData] = useState<Brand[]>([]);
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["getBrands"],
    queryFn: async () => {
      return await getBrands().then((res) => res.data);
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
        <Button onClick={() => router.push(`/dashboard/brand/new`)}>
          <Plus className="w-4 h-4 text-primary-foreground mr-1" />
          Add Brand
        </Button>
      </div>
      <Card title="brand">
        <BrandTable data={getData} />
      </Card>
    </>
  );
}
