"use client";

import DeliveryTable from "@/components/delivery/delivery-table";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getdeliveryPersons } from "@/lib/http/api";
import { UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const breadcrumbItems = [{ title: "Delivery", link: "/dashboard/delivery" }];

export default function Page() {
  const [getData, setData] = useState<UserData[]>([]);

  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["getdeliveryPersons"],
    queryFn: async () => {
      return await getdeliveryPersons().then((res) => res.data);
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
        <Button onClick={() => router.push("/dashboard/delivery/new")}>
          <Plus className="w-4 h-4 text-primary-foreground mr-1" />
          Add Delivery
        </Button>
      </div>
      <Card title="Delivery">
        <DeliveryTable data={getData} />
      </Card>
    </>
  );
}
