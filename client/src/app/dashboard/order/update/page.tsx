"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getOrderById, updateOrder } from "@/lib/http/api";
import { Order, Details, ProductData, UserData } from "@/types";
import BreadCrumb from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Loader2, MapPin } from "lucide-react";
import toast from "react-hot-toast";

export default function UpdateOrder() {
  const breadcrumbItems = [
    { title: "Orders", link: "/dashboard/order" },
    { title: "Update Order", link: "/dashboard/order/update" },
  ];

  const [order, setOrder] = useState<Order | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isRequestingDeliveryPerson, setIsRequestingDeliveryPerson] =
    useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState({
    formatted_address: "",
    lat: 0,
    lng: 0,
  });

  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["getOrderById", id],
    queryFn: async () => {
      return await getOrderById(id!).then((res) => res.data);
    },
  });

  useEffect(() => {
    if (data) {
      setOrder(data);
      setIsPaid(data.isPaid);
      setIsActive(data.isActive);
      setIsRequestingDeliveryPerson(data.isRequestingDeliveryPerson);
      setPaymentMethod(data.paymentMethod || "");
      setStatus(data.status);
      setAddress(data.address);
    }
  }, [data]);

  const updateMutation = useMutation({
    mutationFn: (dataOrder: Partial<Order>) => updateOrder(dataOrder, id!),
    onSuccess: () => {
      toast.success("Order updated successfully");
      router.push("/dashboard/order");
    },
    onError: (error) => {
      toast.error("Failed to update order");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;

    const updatedOrder: Partial<Order> = {
      isPaid,
      isActive,
      isRequestingDeliveryPerson,
      paymentMethod,
      status,
      address,
    };

    updateMutation.mutate(updatedOrder);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading order</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <ScrollArea className="h-full">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex-1 space-y-4 py-5">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Update Order #{order.refId}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="status">Order Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <div className="flex gap-2">
                    <Input
                      id="address"
                      value={address.formatted_address}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          formatted_address: e.target.value,
                        })
                      }
                      placeholder="Enter delivery address"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        // Handle map location picker
                      }}
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isPaid"
                      checked={isPaid}
                      onCheckedChange={setIsPaid}
                    />
                    <Label htmlFor="isPaid">Mark as Paid</Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={isActive}
                      onCheckedChange={setIsActive}
                    />
                    <Label htmlFor="isActive">Active Order</Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isRequestingDeliveryPerson"
                      checked={isRequestingDeliveryPerson}
                      onCheckedChange={setIsRequestingDeliveryPerson}
                    />
                    <Label htmlFor="isRequestingDeliveryPerson">
                      Requesting Delivery
                    </Label>
                  </div>
                </div>
              </div>

              {isPaid && (
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <SelectTrigger id="paymentMethod">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="COD">Cash on Delivery</SelectItem>
                      <SelectItem value="Online">Online Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label>Order Items</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Attributes</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.details.map((item: Details, index: number) => {
                      const product = item.productId as ProductData;
                      return (
                        <TableRow key={`${product._id}-${index}`}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>
                            {item.attributes
                              .map((attr) => `${attr.name}: ${attr.value}`)
                              .join(", ")}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            ₹  {item.price}
                          </TableCell>
                          <TableCell className="text-right">
                            ₹  {item.total.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Order By</Label>
                    <div className="text-sm text-muted-foreground">
                      {order.orderBy?.firstName +
                        " " +
                        order.orderBy?.lastName || "N/A"}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Delivery Person</Label>
                    <div className="text-sm text-muted-foreground">
                      {order.deliveryPersonId?.firstName +
                        " " +
                        order.deliveryPersonId?.lastName || "Not assigned"}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Assigned To</Label>
                    <div className="text-sm text-muted-foreground">
                      {order.assignedTo?.firstName +
                        " " +
                        order.assignedTo?.lastName || "Not assigned"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total Amount</span>
                <span>₹  {order.totalAmount.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Order"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </ScrollArea>
  );
}
