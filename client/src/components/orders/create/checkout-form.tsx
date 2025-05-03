"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { ProductData, UserData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/lib/http/api";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, MapPinIcon, PhoneIcon, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";

interface CartItem extends ProductData {
  quantity: number;
  selectedAttributes: { attributeId: string; name: string; value: string }[];
}

interface CheckoutFormProps {
  cart: CartItem[];
  selectedUser: UserData | null;
  selectedDeliveryPerson: UserData | null;
  isRequestingDeliveryPerson: boolean;
}

interface LocationState {
  formatted_address: string;
  lat: number;
  lng: number;
}

const initialState: LocationState = {
  formatted_address: "Mumbai, Maharashtra, India",
  lat: 19.0759837,
  lng: 72.8776559,
};

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  cart,
  selectedUser,
  selectedDeliveryPerson,
  isRequestingDeliveryPerson,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "Online">();
  const [isPaid, setIsPaid] = useState(false);
  const router = useRouter();
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });
  const [formState, setFormState] = useState<any>(initialState);

  const total = cart.reduce((sum, item) => {
    const variant = item.variants[0]; // Using first variant as default
    return sum + variant.rate * item.quantity;
  }, 0);

  const handleSaveAddress = () => {
    if (selectedUser) {
      const updatedAddresses = [...selectedUser.address];
      if (selectedAddressIndex < updatedAddresses.length) {
        updatedAddresses[selectedAddressIndex] = {
          ...updatedAddresses[selectedAddressIndex],
          ...formState,
        };
      } else {
        updatedAddresses.push(formState);
        setSelectedAddressIndex(updatedAddresses.length - 1);
      }
      //@ts-ignore
      selectedUser.address = updatedAddresses;
      setIsEditingAddress(false);
    }
  };

  useEffect(() => {
    if (selectedUser && selectedUser.address.length > 0) {
      if (
        !isEditingAddress ||
        selectedAddressIndex < selectedUser.address.length
      ) {
        setFormState({
          formatted_address:
            selectedUser.address[selectedAddressIndex].formatted_address,
          lat: selectedUser.address[selectedAddressIndex].lat,
          lng: selectedUser.address[selectedAddressIndex].lng,
        });
      }
    }
  }, [selectedUser, selectedAddressIndex, isEditingAddress]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["createOrder"],
    mutationFn: async (data: any) => {
      return await createOrder(data);
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      router.push("/dashboard/order");
    },
    onError(error, variables, context) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.errors[0].msg);
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    if (place.geometry && place.geometry.location) {
      setFormState((prev: any) => ({
        ...prev,
        formatted_address: place.formatted_address || "",
        lat: place!.geometry!.location!.lat(),
        lng: place!.geometry!.location!.lng(),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const details = cart.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
      price: item.variants[0].rate, // Using first variant's rate
      total: item.variants[0].rate * item.quantity,
      attributes: item.selectedAttributes,
    }));

    mutate({
      paymentMethod: isPaid ? paymentMethod : null,
      totalAmount: total,
      details,
      userId: selectedUser?._id,
      deliveryPersonId: selectedDeliveryPerson?._id,
      isPaid,
      address: formState,
      fromDashboard: true,
      isRequestingDeliveryPerson,
    });
  };

  if (!isLoaded) return <div>Loading...</div>;

  console.log("selectedUser", selectedUser);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle className="text-2xl font-bold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {selectedUser && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Customer</h3>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={selectedUser.avatar}
                      alt={`${selectedUser.firstName}'s avatar`}
                    />
                    <AvatarFallback>
                      {selectedUser.firstName[0]}
                      {selectedUser.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedUser.email}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <PhoneIcon className="mr-2 h-4 w-4" />
                    {selectedUser.mobileNo}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex flex-col w-full">
                      <div className="flex items-center justify-between mb-2">
                        <MapPinIcon className="mr-2 h-4 w-4" />
                        {isEditingAddress ? (
                          <Button
                            variant="ghost"
                            type="button"
                            size="sm"
                            onClick={handleSaveAddress}
                          >
                            Save
                          </Button>
                        ) : (
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              type="button"
                              size="sm"
                              onClick={() => setIsEditingAddress(true)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              type="button"
                              size="sm"
                              onClick={() => {
                                setIsEditingAddress(true);
                                setFormState(initialState);
                                setSelectedAddressIndex(
                                  selectedUser?.address.length || 0
                                );
                              }}
                            >
                              Add New
                            </Button>
                          </div>
                        )}
                      </div>

                      {isEditingAddress ? (
                        <div className="grid grid-cols-1 gap-y-4">
                          <div>
                            <Label htmlFor="location">Search Location</Label>
                            <Autocomplete
                              onLoad={(autocomplete) => {
                                autocomplete.addListener(
                                  "place_changed",
                                  () => {
                                    const place = autocomplete.getPlace();
                                    handlePlaceSelect(place);
                                  }
                                );
                              }}
                            >
                              <Input
                                id="location"
                                placeholder="Search to update location"
                              />
                            </Autocomplete>
                          </div>
                          <div>
                            <Label htmlFor="formatted-address">
                              Current Address
                            </Label>
                            <Input
                              id="formatted-address"
                              value={formState.formatted_address}
                              readOnly
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2 w-full">
                          <Select
                            value={selectedAddressIndex.toString()}
                            onValueChange={(value) => {
                              const index = Number.parseInt(value);
                              setSelectedAddressIndex(index);
                              setFormState({
                                formatted_address:
                                  selectedUser.address[index].formatted_address,
                                lat: selectedUser.address[index].lat,
                                lng: selectedUser.address[index].lng,
                              });
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select address" />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedUser.address.map((addr, index) => (
                                <SelectItem
                                  key={index}
                                  value={index.toString()}
                                >
                                  {addr.formatted_address}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Joined:{" "}
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            )}
            {selectedDeliveryPerson && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Delivery Person</h3>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={selectedDeliveryPerson.avatar}
                      alt={`${selectedDeliveryPerson.firstName}'s avatar`}
                    />
                    <AvatarFallback>
                      {selectedDeliveryPerson.firstName[0]}
                      {selectedDeliveryPerson.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg">
                      {selectedDeliveryPerson.firstName}{" "}
                      {selectedDeliveryPerson.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedDeliveryPerson.email}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <PhoneIcon className="mr-2 h-4 w-4" />
                    {selectedDeliveryPerson.mobileNo}
                  </div>
                </div>
              </div>
            )}
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-4">Order Items</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Attributes</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">MRP</TableHead>
                  <TableHead className="text-right">Discount</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.map((item) => {
                  const variant = item.variants[0]; // Using first variant as default
                  return (
                    <TableRow key={item._id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        {item.selectedAttributes
                          .map((attr) => `${attr.name}: ${attr.value}`)
                          .join(", ")}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        ₹  {variant.rate}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-muted-foreground line-through">
                          ₹  {variant.mrp}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {variant.discount}%
                      </TableCell>
                      <TableCell className="text-right">
                        ₹  {(variant.rate * item.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell colSpan={6} className="font-semibold">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ₹  {total.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <Separator />
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Details</h3>
            <div className="flex items-center space-x-2">
              <Switch
                id="isPaid"
                checked={isPaid}
                onCheckedChange={setIsPaid}
              />
              <Label htmlFor="isPaid">Mark as Paid</Label>
            </div>
            {isPaid && (
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  value={paymentMethod}
                  onValueChange={(value: "COD" | "Online") =>
                    setPaymentMethod(value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="COD">Cash on Delivery</SelectItem>
                    <SelectItem value="Online">Online Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="bg-muted">
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? "Processing..." : "Place Order"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
