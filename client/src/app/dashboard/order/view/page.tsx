"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getOrderById,
  requestDeliveryPerson,
  assignDeliveryPerson,
  getdeliveryPersons,
} from "@/lib/http/api";
import type { Order, UserData } from "@/types";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CreditCard,
  Package,
  Calendar,
  User,
  Truck,
  CheckCircle,
  XCircle,
  MapPin,
  Phone,
  UserPlus,
} from "lucide-react";
import BreadCrumb from "@/components/ui/breadcrumb";
import { ProductCard } from "@/components/orders/product-card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useAuth } from "@/hooks/use-auth";

export default function Page() {
  const breadcrumbItems = [
    { title: "Orders", link: "/dashboard/order" },
    { title: "Order Details", link: "/dashboard/order/view" },
  ];

  const [order, setOrder] = useState<Order | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  const params = useSearchParams();
  const id = params.get("id");
  const queryClient = useQueryClient();
  const { isVendor } = useAuth();

  const { data: deliveryPersons, isLoading: loadingDeliveryPersons } = useQuery(
    {
      queryKey: ["getdeliveryPersons"],
      queryFn: async () => {
        return await getdeliveryPersons().then((res) => res.data);
      },
    }
  );

  const { data, isLoading } = useQuery({
    queryKey: ["getOrderById", id],
    queryFn: async () => {
      return await getOrderById(id!).then((res) => res.data);
    },
  });

  const { mutate: requestDelivery, isPending: isRequestingDelivery } =
    useMutation({
      mutationFn: async (orderId: string) => {
        return await requestDeliveryPerson({ orderId });
      },
      onSuccess: () => {
        toast.success("Delivery person requested successfully");
        return queryClient.invalidateQueries({ queryKey: ["getOrderById"] });
      },
      onError(error, variables, context) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.errors[0].msg);
        } else {
          toast.error("Something went wrong!");
        }
      },
    });

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
        return queryClient.invalidateQueries({ queryKey: ["getOrderById"] });
      },
      onError(error, variables, context) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.errors[0].msg);
        } else {
          toast.error("Something went wrong!");
        }
      },
    });

  useEffect(() => {
    if (data) {
      setOrder(data);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (!order) return <div>Order not found</div>;

  const handleAssign = () => {
    if (!selectedPerson || !id) return;
    assignDelivery({ orderId: id, deliveryPersonId: selectedPerson });
  };

  return (
    <ScrollArea className="h-full">
      <BreadCrumb items={breadcrumbItems} />

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

      <div className="flex-1 space-y-4 py-5">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="container mx-auto space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Order Details</h1>
              <div className="flex gap-4 mt-4">
                {isVendor && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => requestDelivery(id!)}
                    disabled={
                      isRequestingDelivery || order?.deliveryPersonId
                        ? true
                        : false
                    }
                  >
                    {isRequestingDelivery ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <User className="mr-2 h-4 w-4" />
                    )}
                    Request Delivery Person
                  </Button>
                )}
                <Button
                  variant="soft"
                  color="default"
                  size="sm"
                  onClick={() => setIsOpen(true)}
                  disabled={order?.deliveryPersonId ? true : false}
                >
                  {isAssigningDelivery ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <UserPlus className="mr-2 h-4 w-4" />
                  )}
                  Assign Delivery Person
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Order #{order.refId}</span>
                    <Badge
                      variant={
                        order.status === "completed" ? "soft" : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span>
                        Ordered on {format(new Date(order.createdAt), "PPP")}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <span>Payment Method: {order.paymentMethod}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {order.isPaid ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span>{order.isPaid ? "Paid" : "Unpaid"}</span>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <h3 className="font-semibold mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {order.details.map((item, index) => (
                      <ProductCard
                        key={index}
                        product={item.productId}
                        quantity={item.quantity}
                        total={item.total}
                      />
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>Total Amount</span>
                    <span>₹  {order.totalAmount.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar>
                        <AvatarImage src={order.userId.avatar} />
                        <AvatarFallback>
                          {order.userId.firstName}
                          {order.userId.lastName}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">
                          {order.userId.firstName} {order.userId.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Customer ID: {order.userId._id}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{order.userId.mobileNo}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                        <span className="text-sm">
                          {order.address.formatted_address ||
                            "No address provided"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Person</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-1 font-semibold">
                      Request for Delivery:{" "}
                      <Badge variant="outline" color="info">
                        {order.isRequestingDeliveryPerson ? "Yes" : "No"}
                      </Badge>
                    </div>
                    {order.deliveryPersonId ? (
                      <div>
                        <div className="flex items-center space-x-4 mb-4">
                          <Avatar>
                            <AvatarImage src={order.deliveryPersonId.avatar} />
                            <AvatarFallback>
                              {order.deliveryPersonId.firstName}
                              {order.deliveryPersonId.lastName}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">
                              {order.deliveryPersonId.firstName}{" "}
                              {order.deliveryPersonId.lastName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Delivery Person ID: {order.deliveryPersonId._id}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {order.deliveryPersonId.mobileNo}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No delivery person assigned yet.
                      </p>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Ordered By</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={order.orderBy.avatar} />
                        <AvatarFallback>
                          {order.orderBy.firstName}
                          {order.orderBy.lastName}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">
                          {order.orderBy.firstName} {order.orderBy.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          User ID: {order.orderBy._id}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Truck className="h-5 w-5 text-muted-foreground" />
                      <span>{order.status}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Package className="h-5 w-5 text-muted-foreground" />
                      <span>{order.isActive ? "Active" : "Inactive"}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </ScrollArea>
  );
}
