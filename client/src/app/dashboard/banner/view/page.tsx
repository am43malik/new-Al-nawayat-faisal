"use client";

import BreadCrumb from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { getSlidersById } from "@/lib/http/api";
import { ILanding } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { CalendarDays, User } from "lucide-react";
import Image from "next/image";

export default function Page() {
  const breadcrumbItems = [
    { title: "Banners", link: "/dashboard/banner" },
    { title: "Banner Details", link: "/dashboard/banners/view" },
  ];

  const [getBrand, setBrand] = useState<ILanding | null>(null);

  const params = useSearchParams();
  const id = params.get("id");

  const { data, isLoading } = useQuery({
    queryKey: ["getSlidersById", id],
    queryFn: async () => {
      return await getSlidersById(id!).then((res) => res.data);
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
    return <div>Slider not found</div>;
  }

  return (
    <ScrollArea className="h-full">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex-1 space-y-4 p-5">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="space-y-6">
            {/* Status Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Banner Information</CardTitle>
                  <Badge
                    color={
                      getBrand.status == "active" ? "default" : "secondary"
                    }
                    variant="soft"
                  >
                    {getBrand.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <User className="h-4 w-4 opacity-70" />
                  <span className="text-sm text-muted-foreground">
                    Created by{" "}
                    {getBrand.createdBy.firstName +
                      " " +
                      getBrand.createdBy.lastName}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <CalendarDays className="h-4 w-4 opacity-70" />
                  <span className="text-sm text-muted-foreground">
                    Created on{" "}
                    {new Date(getBrand.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Images Card */}
            <Card>
              <CardHeader>
                <CardTitle>Banner Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getBrand.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-video overflow-hidden rounded-lg border bg-muted"
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Slider image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Metadata Card */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(getBrand.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">ID</p>
                    <p className="text-sm text-muted-foreground">
                      {getBrand._id}
                    </p>
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
