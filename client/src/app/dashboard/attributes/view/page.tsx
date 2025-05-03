"use client";

import BreadCrumb from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { getAttributeById } from "@/lib/http/api";
import { IAttribute } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { CalendarDays, Tag, User } from "lucide-react";

export default function Page() {
  const router = useRouter();
  const breadcrumbItems = [
    { title: "Attributes", link: "/dashboard/attributes" },
    { title: "Attribute Details", link: "/dashboard/attributes/view" },
  ];

  const [getData, setData] = useState<IAttribute | null>(null);

  const params = useSearchParams();
  const id = params.get("id");

  const { data, isLoading } = useQuery({
    queryKey: ["getAttributeById", id],
    queryFn: async () => {
      return await getAttributeById(id!).then((res) => res.data);
    },
  });

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  if (isLoading) {
    return <AttributeDetailsSkeleton />;
  }

  if (!getData) {
    return <div>Attribute not found</div>;
  }

  return (
    <ScrollArea className="h-full">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex-1 space-y-4 py-5">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Tag className="h-6 w-6" />
                {getData.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Values</h3>
                  <div className="flex flex-wrap gap-2">
                    {getData.values.map((value, index) => (
                      <Badge key={index} variant="outline">
                        {value}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-semibold">Created By:</span>
                    <span>
                      {getData.createdBy.firstName} {getData.createdBy.lastName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <span className="font-semibold">Created At:</span>
                    <span>
                      {new Date(getData.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}

function AttributeDetailsSkeleton() {
  return (
    <div className="space-y-6 p-5">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-8 w-[200px]" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-[100px]" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-[60px]" />
              <Skeleton className="h-6 w-[60px]" />
              <Skeleton className="h-6 w-[60px]" />
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-6 w-[80px]" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
