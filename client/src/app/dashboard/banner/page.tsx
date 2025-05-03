"use client";

import BannerTable from "@/components/banner/banner-table";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getSliders } from "@/lib/http/api";
import { ILanding } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const breadcrumbItems = [{ title: "Banners", link: "/dashboard/banner" }];

export default function Page() {
  const [getData, setData] = useState<ILanding[]>([]);
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["getSliders"],
    queryFn: async () => {
      return await getSliders({ type: "banner" }).then((res) => res.data);
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
        <Button onClick={() => router.push(`/dashboard/banner/new`)}>
          <Plus className="w-4 h-4 text-primary-foreground mr-1" />
          Add Banner
        </Button>
      </div>
      <Card title="Banner">
        <BannerTable data={getData} />
      </Card>
    </>
  );
}
