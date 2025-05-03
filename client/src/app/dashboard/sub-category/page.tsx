"use client";

import React, { useEffect, useState } from "react";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSubCategoriesAdmin } from "@/lib/http/api";
import { SubCategory } from "@/types";
import { useRouter } from "next/navigation";
import SubCategoryTable from "@/components/sub-category/sub-category-table";

const Page = () => {
  const [categories, setCategories] = useState<SubCategory[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["getSubCategoriesAdmin"],
    queryFn: async () => {
      return await getSubCategoriesAdmin().then((res) => res.data);
    },
  });

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  const breadcrumbItems = [
    { title: "Sub-Category", link: "/dashboard/sub-category" },
  ];

  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between py-5">
        <BreadCrumb items={breadcrumbItems} />
        <Button onClick={() => router.push(`/dashboard/sub-category/new`)}>
          <Plus className="w-4 h-4 text-primary-foreground mr-1" />
          Add Sub-Category
        </Button>
      </div>
      <Card title="Row Editing Dialog">
        <SubCategoryTable data={categories} />
      </Card>
    </div>
  );
};

export default Page;
