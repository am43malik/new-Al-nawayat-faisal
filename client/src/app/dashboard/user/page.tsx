"use client";

import BreadCrumb from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UserTable from "@/components/user/user-table";
import { getUsers } from "@/lib/http/api";
import { UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const breadcrumbItems = [{ title: "Users", link: "/dashboard/user" }];

export default function Page() {
  const [getData, setData] = useState<UserData[]>([]);

  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["getUsers"],
    queryFn: async () => {
      return await getUsers().then((res) => res.data);
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
        <Button onClick={() => router.push("/dashboard/user/new")}>
          <Plus className="w-4 h-4 text-primary-foreground mr-1" />
          Add User
        </Button>
      </div>
      <Card title="Users">
        <UserTable data={getData} />
      </Card>
    </>
  );
}
