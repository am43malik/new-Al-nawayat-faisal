"use client";

import SliderTable from "@/components/slider/slider-table";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getSliders } from "@/lib/http/api";
import { ILanding } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const breadcrumbItems = [{ title: "Sliders", link: "/dashboard/slider" }];

export default function Page() {
  const [getData, setData] = useState<ILanding[]>([]);
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["getSliders"],
    queryFn: async () => {
      return await getSliders({ type: "slider" }).then((res) => res.data);
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
        <Button onClick={() => router.push(`/dashboard/slider/new`)}>
          <Plus className="w-4 h-4 text-primary-foreground mr-1" />
          Add Slider
        </Button>
      </div>
      <Card title="Slider">
        <SliderTable data={getData} />
      </Card>
    </>
  );
}
