"use client";

import { Badge } from "@/components/ui/badge";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { getBrandById } from "@/lib/http/api";
import { Brand } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { CalendarIcon, ClockIcon, TagIcon, UserCircle } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Page() {
  const breadcrumbItems = [
    { title: "Brands", link: "/dashboard/brand" },
    { title: "Brand Details", link: "/dashboard/brand/view" },
  ];

  const [getBrand, setBrand] = useState<Brand | null>(null);

  const params = useSearchParams();
  const id = params.get("id");

  const { data, isLoading } = useQuery({
    queryKey: ["getBrandById", id],
    queryFn: async () => {
      return await getBrandById(id!).then((res) => res.data);
    },
  });

  useEffect(() => {
    if (data) {
      setBrand(data);
    }
  }, [data]);

  if (isLoading) {
    return <CategoryDetailsSkeleton />;
  }

  if (!getBrand) {
    return <div>Brand not found</div>;
  }

  return (
    <ScrollArea className="h-full">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex-1 space-y-4 p-5">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold">
                    {getBrand.name}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  {getBrand.image ? (
                    <div className="relative h-48 w-full overflow-hidden rounded-lg">
                      <Image
                        src={getBrand.image}
                        alt={getBrand.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-all duration-300 hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="flex h-48 w-full items-center justify-center rounded-lg bg-gray-100">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span className="font-medium">Created by:</span>
                    <span className="ml-2">{`${getBrand.createdBy?.firstName} ${getBrand.createdBy?.lastName}`}</span>
                  </div>
                  <div className="flex items-center">
                    <TagIcon className="mr-2 h-4 w-4" />
                    <span className="font-medium">Status:</span>
                    <span className="ml-2">
                      <Badge
                        variant={
                          getBrand.status === "active" ? "soft" : "outline"
                        }
                        className="text-sm"
                      >
                        {getBrand.status}
                      </Badge>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span className="font-medium">Created:</span>
                    <span className="ml-2">
                      {new Date(getBrand.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="mr-2 h-4 w-4" />
                    <span className="font-medium">Last updated:</span>
                    <span className="ml-2">
                      {new Date(getBrand.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Suspense>
      </div>
    </ScrollArea>
  );
}

function CategoryDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-6 w-[80px]" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-4" />
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </CardContent>
      </Card>

      <Skeleton className="h-10 w-full" />

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[150px]" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div>
              <Skeleton className="h-4 w-[100px] mb-2" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Skeleton className="h-10 w-[120px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>
    </div>
  );
}
