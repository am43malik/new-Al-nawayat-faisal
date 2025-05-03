"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { UserData } from "@/types";
import DeleteDelivery from "./delete-delivery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { changeDeliveryStatus } from "@/lib/http/api";
import { Badge } from "../ui/badge";

interface Props {
  data: UserData[];
}

const DeliveryTable = ({ data }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["changeDeliveryStatus"],
    mutationFn: async (id: string) => {
      return await changeDeliveryStatus(id);
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      return queryClient.invalidateQueries({
        queryKey: ["getdeliveryPersons"],
      });
    },
    onError(error, variables, context) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.errors[0].msg);
      } else {
        toast.error("Something went wrong!");
      }
    },
  });
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Added By</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Active</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: UserData) => (
          <TableRow key={item._id}>
            <TableCell className=" font-medium  text-card-foreground/80">
              <div className="flex gap-3 items-center">
                <Avatar className="rounded-full">
                  <AvatarImage src={item.avatar} />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <span className=" text-sm   text-card-foreground">
                  {item.firstName + " " + item.lastName}
                </span>
              </div>
            </TableCell>

            <TableCell>{item.email}</TableCell>
            <TableCell>
              {item.addedBy?.firstName + " " + item.addedBy?.lastName}
            </TableCell>
            <TableCell>{new Date(item.createdAt).toDateString()}</TableCell>
            <TableCell>
              <Switch
                checked={item.status === "active"}
                disabled={isPending}
                onCheckedChange={() => mutate(item._id)}
                aria-label={`Toggle status for ${item.firstName}`}
              />
            </TableCell>
            <TableCell>
              <Badge
                variant="soft"
                color={item.FCMToken ? "success" : "destructive"}
              >
                {item.FCMToken ? "Online" : "Offline"}
              </Badge>
            </TableCell>
            <TableCell className="flex">
              <div className="flex gap-3">
                <Button
                  onClick={() =>
                    router.push(`/dashboard/delivery/update?id=${item._id}`)
                  }
                  size="icon"
                  variant="outline"
                  color="secondary"
                  className=" h-7 w-7"
                >
                  <Icon icon="heroicons:pencil" className=" h-4 w-4  " />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className=" h-7 w-7"
                  color="secondary"
                  onClick={() =>
                    router.push(`/dashboard/delivery/view?id=${item._id}`)
                  }
                >
                  <Icon icon="heroicons:eye" className="h-4 w-4" />
                </Button>
                <DeleteDelivery
                  id={item._id}
                  name={item.firstName + " " + item.lastName}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DeliveryTable;
