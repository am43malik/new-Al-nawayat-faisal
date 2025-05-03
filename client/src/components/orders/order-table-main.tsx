"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import type { Order, UserData } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  assignDeliveryPerson,
  changeOrderStatus,
  getdeliveryPersons,
} from "@/lib/http/api";
import { AxiosError } from "axios";
import { ChevronDown, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";

interface Props {
  data: Order[];
}

const OrdersTableMain = ({ data }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationKey: ["changeOrderStatus"],
    mutationFn: async (data: any) => {
      return await changeOrderStatus(data);
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      return queryClient.invalidateQueries({ queryKey: ["getOrders"] });
    },
    onError(error, variables, context) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.errors[0].msg);
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  const { data: deliveryPersons, isLoading: loadingDeliveryPersons } = useQuery(
    {
      queryKey: ["getdeliveryPersons"],
      queryFn: async () => {
        return await getdeliveryPersons().then((res) => res.data);
      },
    }
  );

  const { mutate: assignDelivery, isPending: isAssigningDelivery } =
    useMutation({
      mutationFn: async ({
        orderId,
        deliveryPersonId,
      }: {
        orderId: string;
        deliveryPersonId: string;
      }) => {
        return await assignDeliveryPerson({ orderId, deliveryPersonId });
      },
      onSuccess: () => {
        toast.success("Delivery person assigned successfully");
        setIsOpen(false);
        setSelectedPerson(null);
        return queryClient.invalidateQueries({ queryKey: ["getOrders"] });
      },
      onError(error, variables, context) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.errors[0].msg);
        } else {
          toast.error("Something went wrong!");
        }
      },
    });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "out_for_delivery":
      case "dispatch":
      case "in_transit":
        return "secondary";
      case "delivered":
        return "success";
      case "cancelled":
        return "destructive";
      case "request_for_delivery":
        return "destructive";
      case "returned":
        return "warning";
      case "refunded":
        return "warning";
      default:
        return "default";
    }
  };

  const handleAssign = () => {
    if (!selectedPerson || !selectedOrderId) return;
    assignDelivery({
      orderId: selectedOrderId,
      deliveryPersonId: selectedPerson,
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select Delivery Person</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[400px] pr-4">
            <div className="grid gap-4">
              {loadingDeliveryPersons ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                deliveryPersons?.map((person: UserData) => (
                  <div
                    key={person._id}
                    className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedPerson === person._id
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedPerson(person._id)}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={person.avatar} />
                        <AvatarFallback>
                          {person.firstName}
                          {person.lastName}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {person.firstName} {person.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {person.mobileNo}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAssign}
              disabled={!selectedPerson || isAssigningDelivery}
            >
              {isAssigningDelivery ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Assign
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Order ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Assign Delivery</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: Order) => (
            <TableRow key={item._id}>
              <TableCell>{item.refId}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 p-0 px-2"
                      disabled={isPending}
                    >
                      <Badge
                        className="flex items-center justify-center"
                        color={getStatusColor(item.status)}
                        variant="soft"
                      >
                        {item.status}{" "}
                        <ChevronDown className="ml-0.5" size={15} />
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        mutate({
                          orderId: item._id,
                          status: "dispatch",
                        })
                      }
                      disabled={item.status === "dispatch"}
                    >
                      <Icon icon="heroicons:truck" className="mr-2 h-4 w-4" />
                      Dispatch
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        mutate({
                          orderId: item._id,
                          status: "in_transit",
                        })
                      }
                      disabled={item.status === "in_transit"}
                    >
                      <Icon
                        icon="heroicons:arrow-path"
                        className="mr-2 h-4 w-4"
                      />
                      In Transit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        mutate({
                          orderId: item._id,
                          status: "out_for_delivery",
                        })
                      }
                      disabled={item.status === "out_for_delivery"}
                    >
                      <Icon icon="heroicons:truck" className="mr-2 h-4 w-4" />
                      Out for Delivery
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        mutate({
                          orderId: item._id,
                          status: "delivered",
                        })
                      }
                      disabled={item.status === "delivered"}
                    >
                      <Icon
                        icon="heroicons:check-circle"
                        className="mr-2 h-4 w-4"
                      />
                      Delivered
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem
                    onClick={() =>
                      mutate({
                        orderId: item._id,
                        status: "completed",
                      })
                    }
                    disabled={item.status === "completed"}
                  >
                    <Icon
                      icon="heroicons:check-badge"
                      className="mr-2 h-4 w-4"
                    />
                    Completed
                  </DropdownMenuItem> */}
                    <DropdownMenuItem
                      onClick={() =>
                        mutate({
                          orderId: item._id,
                          status: "cancelled",
                        })
                      }
                      disabled={item.status === "cancelled"}
                    >
                      <Icon
                        icon="heroicons:x-circle"
                        className="mr-2 h-4 w-4"
                      />
                      Cancelled
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        mutate({
                          orderId: item._id,
                          status: "returned",
                        })
                      }
                      disabled={item.status === "returned"}
                    >
                      <Icon
                        icon="heroicons:arrow-uturn-left"
                        className="mr-2 h-4 w-4"
                      />
                      Returned
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        mutate({
                          orderId: item._id,
                          status: "refunded",
                        })
                      }
                      disabled={item.status === "refunded"}
                    >
                      <Icon
                        icon="heroicons:banknotes"
                        className="mr-2 h-4 w-4"
                      />
                      Refunded
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>₹  {item.totalAmount.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant={item.isPaid ? "soft" : "outline"}>
                  {item.isPaid ? "Paid" : "Unpaid"}
                </Badge>
              </TableCell>
              <TableCell>
                {item.userId.firstName + " " + item.userId.lastName}
              </TableCell>
              <TableCell>{new Date(item.createdAt).toDateString()}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    setIsOpen(true);
                    setSelectedOrderId(item._id);
                  }}
                  variant="soft"
                  color="info"
                  size="sm"
                  disabled={item.deliveryPersonId ? true : false}
                >
                  Assign
                </Button>
              </TableCell>
              <TableCell className="flex">
                <div className="flex gap-3">
                  <Button
                    onClick={() =>
                      router.push(`/dashboard/order/update?id=${item._id}`)
                    }
                    size="icon"
                    variant="outline"
                    color="secondary"
                    className="h-7 w-7"
                  >
                    <Icon icon="heroicons:pencil" className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    color="secondary"
                    onClick={() =>
                      router.push(`/dashboard/order/view?id=${item._id}`)
                    }
                  >
                    <Icon icon="heroicons:eye" className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default OrdersTableMain;
