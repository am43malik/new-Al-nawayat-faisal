"use client";

import AttributeTable from "@/components/attribute/attribute-table";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAttributes } from "@/lib/http/api";
import { IAttribute } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const breadcrumbItems = [
  { title: "Attributes", link: "/dashboard/attributes" },
];

export default function Page() {
  const [getData, setData] = useState<IAttribute[]>([]);
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["getAttributes"],
    queryFn: async () => {
      return await getAttributes().then((res) => res.data);
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
        <Button onClick={() => router.push(`/dashboard/attributes/new`)}>
          <Plus className="w-4 h-4 text-primary-foreground mr-1" />
          Add Attribute
        </Button>
      </div>
      <Card title="Attributes">
        <AttributeTable data={getData} />
      </Card>
    </>
  );
}
