"use client";

import BreadCrumb from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/lib/http/api";
import type { UserData } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";

export default function Page() {
  const breadcrumbItems = [
    { title: "Users", link: "/dashboard/user" },
    {
      title: "User Details",
      link: "/dashboard/user/view",
    },
  ];

  const [getUserData, setUserData] = useState<UserData | null>(null);
  const params = useSearchParams();
  const id = params.get("id");

  const { data } = useQuery({
    queryKey: ["getUserById", id],
    queryFn: async () => {
      return await getUserById(id!).then((res) => res.data);
    },
  });

  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  if (!getUserData) return <div>Loading...</div>;

  return (
    <ScrollArea className="h-full">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex-1 space-y-4 py-5">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={getUserData.avatar}
                    alt={`${getUserData.firstName} ${getUserData.lastName}`}
                  />
                  <AvatarFallback>
                    {getUserData.firstName[0]}
                    {getUserData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">
                    {getUserData.firstName} {getUserData.lastName}
                  </CardTitle>
                  <CardDescription>
                    <Badge variant="outline" className="ml-auto">
                      {getUserData.role}
                    </Badge>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 opacity-70" />
                    <span>{getUserData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 opacity-70" />
                    <span>{getUserData.mobileNo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 opacity-70" />
                    <span>
                      {getUserData.address && getUserData.address.length > 0
                        ? `${getUserData.address.length} address${
                            getUserData.address.length > 1 ? "es" : ""
                          } registered`
                        : "No addresses found"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 opacity-70" />
                    <span>
                      Joined{" "}
                      {new Date(getUserData.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-1 gap-2 text-sm">
                  <div className="grid grid-cols-2">
                    <dt className="font-medium">User ID:</dt>
                    <dd>{getUserData._id}</dd>
                  </div>
                  <div className="grid grid-cols-2">
                    <dt className="font-medium">Verification Status:</dt>
                    <dd>
                      {getUserData.isVerified ? "Verified" : "Unverified"}
                    </dd>
                  </div>
                  <div className="grid grid-cols-2">
                    <dt className="font-medium">Status:</dt>
                    <dd>
                      {getUserData.isActive ? (
                        <Badge
                          variant="soft"
                          color="default"
                          className="ml-auto"
                        >
                          Active
                        </Badge>
                      ) : (
                        <Badge
                          variant="soft"
                          color="secondary"
                          className="ml-auto"
                        >
                          Inactive
                        </Badge>
                      )}
                    </dd>
                  </div>
                  <div className="grid grid-cols-2">
                    <dt className="font-medium">Added By:</dt>
                    <dd>
                      {getUserData.addedBy
                        ? `${getUserData.addedBy.firstName} ${getUserData.addedBy.lastName}`
                        : "Self-registered"}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Addresses</CardTitle>
              </CardHeader>
              <CardContent>
                {getUserData.address && getUserData.address.length > 0 ? (
                  <div className="space-y-4">
                    {getUserData.address.map((address, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between p-4 border rounded-md"
                      >
                        <div className="space-y-1">
                          <p className="font-medium">Address {index + 1}</p>
                          <p className="text-sm text-gray-500">
                            {address.formatted_address}
                          </p>
                          <p className="text-xs text-gray-400">
                            Lat: {address.lat}, Lng: {address.lng}
                          </p>
                        </div>
                        {address.isDefault && (
                          <Badge variant="outline">Default</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No addresses found</p>
                )}
              </CardContent>
            </Card>
          </div>
        </Suspense>
      </div>
    </ScrollArea>
  );
}
