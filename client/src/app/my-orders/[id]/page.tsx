// // "use client";

// // import { useState, useEffect } from "react";
// // import { useParams, useRouter } from "next/navigation";
// // import Image from "next/image";
// // import {
// //   ArrowLeft,
// //   Package,
// //   Truck,
// //   CheckCircle,
// //   Clock,
// //   MapPin,
// //   CreditCard,
// //   ShoppingBag,
// //   AlertCircle,
// //   Download,
// //   Phone,
// //   User,
// // } from "lucide-react";

// // import { Badge } from "@/components/ui/badge";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Separator } from "@/components/ui/separator";
// // import { Skeleton } from "@/components/ui/skeleton";
// // import {
// //   Tooltip,
// //   TooltipContent,
// //   TooltipProvider,
// //   TooltipTrigger,
// // } from "@/components/ui/tooltip";
// // import { useQuery } from "@tanstack/react-query";
// // import { getOrderById } from "@/lib/http/api";
// // import { HeaderLanding } from "@/components/landing-page/header-landing";
// // import {Footer} from "@/components/landing-page/footer";
// // import logo from "@/public/logo.png";
// // import { Order } from "@/types";

// // export default function OrderDetailsPage() {
// //   const params = useParams();
// //   const router = useRouter();
// //   const orderId = params.id as string;
// //   const [order, setOrder] = useState<Order | null>(null);

// //   const { data, isLoading } = useQuery({
// //     queryKey: ["getOrder", orderId],
// //     queryFn: async () => {
// //       return await getOrderById(orderId).then((res) => res.data);
// //     },
// //     enabled: !!orderId,
// //   });

// //   useEffect(() => {
// //     if (data) {
// //       setOrder(data);
// //     }
// //   }, [data]);

// //   const getStatusColor = (status: string) => {
// //     switch (status.toLowerCase()) {
// //       case "out_for_delivery":
// //       case "dispatch":
// //         return "bg-purple-50 text-purple-700 border-purple-200";
// //       case "delivered":
// //         return "bg-green-50 text-green-700 border-green-200";
// //       case "cancelled":
// //         return "bg-red-50 text-red-700 border-red-200";
// //       case "processing":
// //         return "bg-blue-50 text-blue-700 border-blue-200";
// //       case "pending":
// //         return "bg-yellow-50 text-yellow-700 border-yellow-200";
// //       default:
// //         return "";
// //     }
// //   };

// //   const getStatusIcon = (status: string) => {
// //     switch (status.toLowerCase()) {
// //       case "delivered":
// //         return <CheckCircle className="h-5 w-5 text-green-500" />;
// //       case "out_for_delivery":
// //         return <Truck className="h-5 w-5 text-purple-500" />;
// //       case "dispatch":
// //         return <Package className="h-5 w-5 text-blue-500" />;
// //       case "cancelled":
// //         return <AlertCircle className="h-5 w-5 text-red-500" />;
// //       case "processing":
// //         return <Package className="h-5 w-5 text-blue-500" />;
// //       case "pending":
// //         return <Clock className="h-5 w-5 text-yellow-500" />;
// //       default:
// //         return <Clock className="h-5 w-5 text-gray-500" />;
// //     }
// //   };

// //   const formatDate = (dateString: Date) => {
// //     const date = new Date(dateString);
// //     return new Intl.DateTimeFormat("en-US", {
// //       day: "numeric",
// //       month: "short",
// //       year: "numeric",
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     }).format(date);
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 py-8">
// //         <HeaderLanding logo={logo} />
// //         <div className="max-w-3xl mx-auto px-4 sm:px-6">
// //           <div className="space-y-6">
// //             <Skeleton className="h-8 w-64" />
// //             <Skeleton className="h-64 w-full" />
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <Skeleton className="h-48 w-full" />
// //               <Skeleton className="h-48 w-full" />
// //             </div>
// //           </div>
// //         </div>
// //         <Footer />
// //       </div>
// //     );
// //   }

// //   if (!order) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <HeaderLanding logo={logo} />
// //         <Card className="max-w-md w-full">
// //           <CardHeader>
// //             <CardTitle>Order Not Found</CardTitle>
// //             <CardDescription>
// //               We couldn&apos;t find the order you&apos;re looking for.
// //             </CardDescription>
// //           </CardHeader>
// //           <CardFooter>
// //             <Button
// //               onClick={() => router.push("/my-orders")}
// //               className="w-full"
// //             >
// //               <ArrowLeft className="mr-2 h-4 w-4" />
// //               Back to Orders
// //             </Button>
// //           </CardFooter>
// //         </Card>
// //         <Footer />
// //       </div>
// //     );
// //   }

// //   const breadcrumbItems = [
// //     { title: "Home", link: "/" },
// //     { title: "Orders", link: "/orders" },
// //     { title: order.refId, link: `/orders/${order._id}` },
// //   ];

// //   return (
// //     <>
// //       <HeaderLanding logo={logo} />
// //       <div className="min-h-screen bg-gray-50">
// //         <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
// //           {/* Breadcrumbs */}
// //           <nav className="flex mb-6 text-sm text-muted-foreground">
// //             {breadcrumbItems.map((item, index) => (
// //               <div key={index} className="flex items-center">
// //                 {index > 0 && <span className="mx-2">/</span>}
// //                 {index === breadcrumbItems.length - 1 ? (
// //                   <span className="text-foreground">{item.title}</span>
// //                 ) : (
// //                   <a
// //                     href={item.link}
// //                     className="hover:text-foreground transition-colors"
// //                   >
// //                     {item.title}
// //                   </a>
// //                 )}
// //               </div>
// //             ))}
// //           </nav>

// //           {/* Order Header */}
// //           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
// //             <div>
// //               <div className="flex items-center gap-2">
// //                 <h1 className="text-2xl font-bold tracking-tight">
// //                   Order #{order.refId}
// //                 </h1>
// //                 <Badge
// //                   variant="outline"
// //                   className={`ml-2 ${getStatusColor(order.status)}`}
// //                 >
// //                   {order.status.replace(/_/g, " ")}
// //                 </Badge>
// //               </div>
// //               <p className="text-muted-foreground mt-1">
// //                 Placed on {formatDate(order.createdAt)}
// //               </p>
// //             </div>
// //             <div className="flex gap-3">
// //               <Button
// //                 variant="outline"
// //                 size="sm"
// //                 onClick={() => router.push("/my-orders")}
// //                 className="bg-[#BD844C] hover:bg-[#9e6f3f] text-white border-[#BD844C] hover:border-[#BD844C]"
// //               >
// //                 <ArrowLeft className="mr-2 h-4 w-4 " />
// //                 Back to Orders
// //               </Button>
// //               {/* <TooltipProvider>
// //                 <Tooltip>
// //                   <TooltipTrigger asChild>
// //                     <Button variant="outline" size="sm">
// //                       <Download className="mr-2 h-4 w-4" />
// //                       Invoice
// //                     </Button>
// //                   </TooltipTrigger>
// //                   <TooltipContent>
// //                     <p>Download invoice (Coming soon)</p>
// //                   </TooltipContent>
// //                 </Tooltip>
// //               </TooltipProvider> */}
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //             {/* Order Status */}
// //             <Card className="lg:col-span-3">
// //               <CardHeader className="pb-3">
// //                 <CardTitle className="text-lg">Order Status</CardTitle>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="relative">
// //                   <div className="flex justify-between mb-2">
// //                     <div className="flex items-center gap-2">
// //                       {getStatusIcon(order.status)}
// //                       <span className="font-medium">
// //                         {order.status.replace(/_/g, " ")}
// //                       </span>
// //                     </div>
// //                     <span className="text-sm text-muted-foreground">
// //                       {formatDate(order.updatedAt)}
// //                     </span>
// //                   </div>
// //                   <div className="mt-6 border-l-2 border-dashed border-muted pl-6 space-y-6">
// //                     <div className="relative">
// //                       <div className="absolute -left-[29px] bg-background p-1 rounded-full border-2 border-primary">
// //                         <CheckCircle className="h-4 w-4 text-primary" />
// //                       </div>
// //                       <div>
// //                         <p className="font-medium">Order Placed</p>
// //                         <p className="text-sm text-muted-foreground">
// //                           {formatDate(order.createdAt)}
// //                         </p>
// //                       </div>
// //                     </div>

// //                     {order.status.toLowerCase() !== "cancelled" && (
// //                       <>
// //                         <div className="relative">
// //                           <div
// //                             className={`absolute -left-[29px] bg-background p-1 rounded-full border-2 ${
// //                               [
// //                                 "processing",
// //                                 "dispatch",
// //                                 "out_for_delivery",
// //                                 "delivered",
// //                               ].includes(order.status.toLowerCase())
// //                                 ? "border-primary"
// //                                 : "border-muted"
// //                             }`}
// //                           >
// //                             <Package
// //                               className={`h-4 w-4 ${
// //                                 [
// //                                   "processing",
// //                                   "dispatch",
// //                                   "out_for_delivery",
// //                                   "delivered",
// //                                 ].includes(order.status.toLowerCase())
// //                                   ? "text-primary"
// //                                   : "text-muted-foreground"
// //                               }`}
// //                             />
// //                           </div>
// //                           <div>
// //                             <p className="font-medium">Processing</p>
// //                             <p className="text-sm text-muted-foreground">
// //                               {[
// //                                 "processing",
// //                                 "dispatch",
// //                                 "out_for_delivery",
// //                                 "delivered",
// //                               ].includes(order.status.toLowerCase())
// //                                 ? formatDate(
// //                                     new Date(
// //                                       new Date(order.createdAt).getTime() +
// //                                         24 * 60 * 60 * 1000
// //                                     )
// //                                   )
// //                                 : "Pending"}
// //                             </p>
// //                           </div>
// //                         </div>

// //                         <div className="relative">
// //                           <div
// //                             className={`absolute -left-[29px] bg-background p-1 rounded-full border-2 ${
// //                               [
// //                                 "dispatch",
// //                                 "out_for_delivery",
// //                                 "delivered",
// //                               ].includes(order.status.toLowerCase())
// //                                 ? "border-primary"
// //                                 : "border-muted"
// //                             }`}
// //                           >
// //                             <Truck
// //                               className={`h-4 w-4 ${
// //                                 [
// //                                   "dispatch",
// //                                   "out_for_delivery",
// //                                   "delivered",
// //                                 ].includes(order.status.toLowerCase())
// //                                   ? "text-primary"
// //                                   : "text-muted-foreground"
// //                               }`}
// //                             />
// //                           </div>
// //                           <div>
// //                             <p className="font-medium">Shipped</p>
// //                             <p className="text-sm text-muted-foreground">
// //                               {[
// //                                 "dispatch",
// //                                 "out_for_delivery",
// //                                 "delivered",
// //                               ].includes(order.status.toLowerCase())
// //                                 ? formatDate(
// //                                     new Date(
// //                                       new Date(order.createdAt).getTime() +
// //                                         48 * 60 * 60 * 1000
// //                                     )
// //                                   )
// //                                 : "Pending"}
// //                             </p>
// //                           </div>
// //                         </div>

// //                         <div className="relative">
// //                           <div
// //                             className={`absolute -left-[29px] bg-background p-1 rounded-full border-2 ${
// //                               order.status.toLowerCase() === "delivered"
// //                                 ? "border-primary"
// //                                 : "border-muted"
// //                             }`}
// //                           >
// //                             <CheckCircle
// //                               className={`h-4 w-4 ${
// //                                 order.status.toLowerCase() === "delivered"
// //                                   ? "text-primary"
// //                                   : "text-muted-foreground"
// //                               }`}
// //                             />
// //                           </div>
// //                           <div>
// //                             <p className="font-medium">Delivered</p>
// //                             <p className="text-sm text-muted-foreground">
// //                               {order.status.toLowerCase() === "delivered"
// //                                 ? formatDate(order.updatedAt)
// //                                 : "Pending"}
// //                             </p>
// //                           </div>
// //                         </div>
// //                       </>
// //                     )}

// //                     {order.status.toLowerCase() === "cancelled" && (
// //                       <div className="relative">
// //                         <div className="absolute -left-[29px] bg-background p-1 rounded-full border-2 border-red-200">
// //                           <AlertCircle className="h-4 w-4 text-red-500" />
// //                         </div>
// //                         <div>
// //                           <p className="font-medium">Order Cancelled</p>
// //                           <p className="text-sm text-muted-foreground">
// //                             {formatDate(order.updatedAt)}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* Order Items */}
// //             <Card className="lg:col-span-2">
// //               <CardHeader className="pb-3">
// //                 <CardTitle className="text-lg">Order Items</CardTitle>
// //                 <CardDescription>
// //                   {order.details.length}{" "}
// //                   {order.details.length === 1 ? "item" : "items"} in your order
// //                 </CardDescription>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="space-y-4">
// //                   {order.details.map((item, index) => (
// //                     <div key={index} className="flex gap-4">
// //                       <div className="h-20 w-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
// //                         {item.productId.featureImg ? (
// //                           <Image
// //                             src={
// //                               item.productId.featureImg || "/placeholder.svg"
// //                             }
// //                             alt={item.productId.name}
// //                             width={80}
// //                             height={80}
// //                             className="h-full w-full object-cover"
// //                           />
// //                         ) : (
// //                           <div className="h-full w-full flex items-center justify-center bg-muted">
// //                             <ShoppingBag className="h-8 w-8 text-muted-foreground" />
// //                           </div>
// //                         )}
// //                       </div>
// //                       <div className="flex-1">
// //                         <div className="flex justify-between">
// //                           <h4 className="font-medium">{item.productId.name}</h4>
// //                           <p className="font-medium">
// //                             ₹  {item.price.toFixed(2)}
// //                           </p>
// //                         </div>
// //                         <div className="text-sm text-muted-foreground mt-1">
// //                           <p>Quantity: {item.quantity}</p>
// //                           {item.attributes.map((attr, attrIndex) => (
// //                             <p key={attrIndex}>
// //                               {attr.name}: {attr.value}
// //                             </p>
// //                           ))}
// //                           {item.productId.variants[0]?.mrp > item.price && (
// //                             <p className="text-green-600">
// //                               Saved: ₹ {" "}
// //                               {(
// //                                 item.productId.variants[0].mrp - item.price
// //                               ).toFixed(2)}
// //                             </p>
// //                           )}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* Order Summary */}
// //             <Card>
// //               <CardHeader className="pb-3">
// //                 <CardTitle className="text-lg">Order Summary</CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-4">
// //                 <div className="flex justify-between text-sm">
// //                   <span className="text-muted-foreground">Subtotal</span>
// //                   <span>₹  {order.totalAmount.toFixed(2)}</span>
// //                 </div>
// //                 <div className="flex justify-between text-sm">
// //                   <span className="text-muted-foreground">
// //                     Delivery Charges
// //                   </span>
// //                   <span>₹  0.00</span>
// //                 </div>
// //                 <div className="flex justify-between text-sm">
// //                   <span className="text-muted-foreground">Taxes</span>
// //                   <span>Included</span>
// //                 </div>
// //                 {order.details.some(
// //                   (item) => item.productId.variants[0]?.mrp > item.price
// //                 ) && (
// //                   <div className="flex justify-between text-sm">
// //                     <span className="text-muted-foreground">Discount</span>
// //                     <span className="text-green-600">
// //                       -₹ {" "}
// //                       {order.details
// //                         .reduce((acc, item) => {
// //                           const discount = item.productId.variants[0]?.mrp
// //                             ? (item.productId.variants[0].mrp - item.price) *
// //                               item.quantity
// //                             : 0;
// //                           return acc + discount;
// //                         }, 0)
// //                         .toFixed(2)}
// //                     </span>
// //                   </div>
// //                 )}
// //                 <Separator />
// //                 <div className="flex justify-between font-medium">
// //                   <span>Total</span>
// //                   <span>₹  {order.totalAmount.toFixed(2)}</span>
// //                 </div>
// //                 <div className="pt-2">
// //                   <div className="flex items-center gap-2 text-sm">
// //                     <CreditCard className="h-4 w-4 text-muted-foreground" />
// //                     <span className="text-muted-foreground">
// //                       Payment Method:
// //                     </span>
// //                     <span className="font-medium">{order.paymentMethod}</span>
// //                   </div>
// //                   <div className="flex items-center gap-2 text-sm mt-1">
// //                     <Badge
// //                       color={order.isPaid ? "success" : "default"}
// //                       variant="soft"
// //                       className="h-5 text-xs"
// //                     >
// //                       {order.isPaid ? "Paid" : "Unpaid"}
// //                     </Badge>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* Shipping Information */}
// //             <Card className="lg:col-span-3">
// //               <CardHeader className="pb-3">
// //                 <CardTitle className="text-lg">Shipping Information</CardTitle>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   <div>
// //                     <h4 className="font-medium mb-2 flex items-center gap-2">
// //                       <MapPin className="h-4 w-4" />
// //                       Delivery Address
// //                     </h4>
// //                     <p className="text-sm text-muted-foreground">
// //                       {order.address.formatted_address}
// //                     </p>
// //                   </div>

// //                   <div>
// //                     <h4 className="font-medium mb-2 flex items-center gap-2">
// //                       <User className="h-4 w-4" />
// //                       Customer Details
// //                     </h4>
// //                     <div className="text-sm text-muted-foreground">
// //                       <p>
// //                         {order.userId?.firstName && order.userId?.lastName
// //                           ? `${order.userId.firstName} ${order.userId.lastName}`
// //                           : "Customer"}
// //                       </p>
// //                       {order.userId?.email && <p>{order.userId.email}</p>}
// //                       {order.userId?.mobileNo && (
// //                         <p className="flex items-center gap-1 mt-1">
// //                           <Phone className="h-3 w-3" />
// //                           {order.userId.mobileNo}
// //                         </p>
// //                       )}
// //                     </div>
// //                   </div>

// //                   {order.deliveryPersonId && (
// //                     <div>
// //                       <h4 className="font-medium mb-2 flex items-center gap-2">
// //                         <Truck className="h-4 w-4" />
// //                         Delivery Person
// //                       </h4>
// //                       <div className="text-sm text-muted-foreground">
// //                         <p>
// //                           {order.deliveryPersonId?.firstName &&
// //                           order.deliveryPersonId?.lastName
// //                             ? `${order.deliveryPersonId.firstName} ${order.deliveryPersonId.lastName}`
// //                             : "Not assigned yet"}
// //                         </p>
// //                         {order.deliveryPersonId?.mobileNo && (
// //                           <p className="flex items-center gap-1 mt-1">
// //                             <Phone className="h-3 w-3" />
// //                             {order.deliveryPersonId.mobileNo}
// //                           </p>
// //                         )}
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* Help Section */}
// //             {/* <Card className="lg:col-span-3">
// //             <CardHeader className="pb-3">
// //               <CardTitle className="text-lg">Need Help?</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                 <Button variant="outline" className="justify-start">
// //                   <Package className="mr-2 h-4 w-4" />
// //                   Track Package
// //                 </Button>
// //                 <Button variant="outline" className="justify-start">
// //                   <ArrowLeft className="mr-2 h-4 w-4" />
// //                   Return Item
// //                 </Button>
// //                 <Button variant="outline" className="justify-start">
// //                   <Phone className="mr-2 h-4 w-4" />
// //                   Contact Support
// //                 </Button>
// //               </div>
// //             </CardContent>
// //             <CardFooter className="bg-muted/50 border-t">
// //               <p className="text-sm text-muted-foreground">
// //                 For any issues with your order, please contact our customer
// //                 support team at support@example.com or call us at
// //                 +1-800-123-4567
// //               </p>
// //             </CardFooter>
// //           </Card> */}
// //           </div>
// //         </div>
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // }



// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import {
//   ArrowLeft,
//   Package,
//   Truck,
//   CheckCircle,
//   Clock,
//   MapPin,
//   CreditCard,
//   ShoppingBag,
//   AlertCircle,
//   ChevronRight,
//   User,
//   Phone,
// } from "lucide-react";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useQuery } from "@tanstack/react-query";
// import { getOrderById } from "@/lib/http/api";
// import { HeaderLanding } from "@/components/landing-page/header-landing";
// import { Footer } from "@/components/landing-page/footer";
// import { Order } from "@/types";

// export default function OrderDetailsPage() {
//   const params = useParams();
//   const router = useRouter();
//   const orderId = params.id as string;
//   const [order, setOrder] = useState<Order | null>(null);

//   const { data, isLoading } = useQuery({
//     queryKey: ["getOrder", orderId],
//     queryFn: async () => {
//       return await getOrderById(orderId).then((res) => res.data);
//     },
//     enabled: !!orderId,
//   });

//   useEffect(() => {
//     if (data) {
//       setOrder(data);
//     }
//   }, [data]);

//   const statusVariantMap = {
//     out_for_delivery: "secondary",
//     dispatch: "secondary",
//     delivered: "success",
//     cancelled: "destructive",
//     processing: "secondary",
//     pending: "warning",
//   };

//   const statusIconMap = {
//     delivered: <CheckCircle className="h-5 w-5 text-green-500" />,
//     out_for_delivery: <Truck className="h-5 w-5 text-purple-500" />,
//     dispatch: <Package className="h-5 w-5 text-blue-500" />,
//     cancelled: <AlertCircle className="h-5 w-5 text-red-500" />,
//     processing: <Package className="h-5 w-5 text-blue-500" />,
//     pending: <Clock className="h-5 w-5 text-yellow-500" />,
//   };

//   const formatDate = (dateString: Date) => {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat("en-US", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     }).format(date);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex flex-col min-h-screen">
//         <HeaderLanding />
//         <main className="flex-1 bg-gray-50/50 py-8">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="space-y-6">
//               <Skeleton className="h-8 w-64" />
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 <Skeleton className="h-64 lg:col-span-2" />
//                 <Skeleton className="h-64" />
//                 <Skeleton className="h-64 lg:col-span-3" />
//               </div>
//             </div>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="flex flex-col min-h-screen">
//         <HeaderLanding />
//         <main className="flex-1 bg-gray-50/50 flex items-center justify-center">
//           <Card className="max-w-md w-full">
//             <CardHeader>
//               <CardTitle>Order Not Found</CardTitle>
//               <CardDescription>
//                 We couldn't find the order you're looking for.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Button
//                 onClick={() => router.push("/my-orders")}
//                 className="w-full"
//               >
//                 <ArrowLeft className="mr-2 h-4 w-4" />
//                 Back to Orders
//               </Button>
//             </CardContent>
//           </Card>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       <HeaderLanding />
      
//       <main className="flex-1 bg-gray-50/50">
//         <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//           {/* Breadcrumbs */}
//           <nav className="flex items-center text-sm text-muted-foreground mb-6">
//             <button 
//               onClick={() => router.push("/")}
//               className="hover:text-foreground transition-colors"
//             >
//               Home
//             </button>
//             <ChevronRight className="h-4 w-4 mx-2" />
//             <button 
//               onClick={() => router.push("/my-orders")}
//               className="hover:text-foreground transition-colors"
//             >
//               Orders
//             </button>
//             <ChevronRight className="h-4 w-4 mx-2" />
//             <span className="text-foreground">#{order.refId}</span>
//           </nav>

//           {/* Order Header */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//             <div>
//               <h1 className="text-2xl font-bold">Order Details</h1>
//               <div className="flex items-center gap-3 mt-2">
//                 <p className="text-muted-foreground">
//                   #{order.refId} • {formatDate(order.createdAt)}
//                 </p>
//                 <Badge
//                   variant={statusVariantMap[order.status.toLowerCase()] || "outline"}
//                   className="capitalize"
//                 >
//                   {order.status.replace(/_/g, " ")}
//                 </Badge>
//               </div>
//             </div>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => router.push("/my-orders")}
//               className="gap-2"
//             >
//               <ArrowLeft className="h-4 w-4" />
//               Back to Orders
//             </Button>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Order Timeline */}
//             <Card className="lg:col-span-3">
//               <CardHeader>
//                 <CardTitle className="text-lg">Order Status</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="relative">
//                   <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
//                     <div className="flex items-center gap-3">
//                       {statusIconMap[order.status.toLowerCase()] || <Clock className="h-5 w-5 text-gray-500" />}
//                       <span className="font-medium">
//                         {order.status.replace(/_/g, " ")}
//                       </span>
//                     </div>
//                     <span className="text-sm text-muted-foreground">
//                       Last updated: {formatDate(order.updatedAt)}
//                     </span>
//                   </div>

//                   <div className="mt-6 border-l-2 border-dashed border-gray-200 pl-6 space-y-6">
//                     <div className="relative">
//                       <div className="absolute -left-[29px] bg-background p-1 rounded-full border-2 border-primary">
//                         <CheckCircle className="h-4 w-4 text-primary" />
//                       </div>
//                       <div>
//                         <p className="font-medium">Order Placed</p>
//                         <p className="text-sm text-muted-foreground">
//                           {formatDate(order.createdAt)}
//                         </p>
//                       </div>
//                     </div>

//                     {order.status.toLowerCase() !== "cancelled" && (
//                       <>
//                         <div className="relative">
//                           <div
//                             className={`absolute -left-[29px] bg-background p-1 rounded-full border-2 ${
//                               ["processing", "dispatch", "out_for_delivery", "delivered"].includes(order.status.toLowerCase())
//                                 ? "border-primary"
//                                 : "border-gray-200"
//                             }`}
//                           >
//                             <Package
//                               className={`h-4 w-4 ${
//                                 ["processing", "dispatch", "out_for_delivery", "delivered"].includes(order.status.toLowerCase())
//                                   ? "text-primary"
//                                   : "text-gray-400"
//                               }`}
//                             />
//                           </div>
//                           <div>
//                             <p className="font-medium">Processing</p>
//                             <p className="text-sm text-muted-foreground">
//                               {["processing", "dispatch", "out_for_delivery", "delivered"].includes(order.status.toLowerCase())
//                                 ? formatDate(new Date(new Date(order.createdAt).getTime() + 24 * 60 * 60 * 1000))
//                                 : "Pending"}
//                             </p>
//                           </div>
//                         </div>

//                         <div className="relative">
//                           <div
//                             className={`absolute -left-[29px] bg-background p-1 rounded-full border-2 ${
//                               ["dispatch", "out_for_delivery", "delivered"].includes(order.status.toLowerCase())
//                                 ? "border-primary"
//                                 : "border-gray-200"
//                             }`}
//                           >
//                             <Truck
//                               className={`h-4 w-4 ${
//                                 ["dispatch", "out_for_delivery", "delivered"].includes(order.status.toLowerCase())
//                                   ? "text-primary"
//                                   : "text-gray-400"
//                               }`}
//                             />
//                           </div>
//                           <div>
//                             <p className="font-medium">Shipped</p>
//                             <p className="text-sm text-muted-foreground">
//                               {["dispatch", "out_for_delivery", "delivered"].includes(order.status.toLowerCase())
//                                 ? formatDate(new Date(new Date(order.createdAt).getTime() + 48 * 60 * 60 * 1000))
//                                 : "Pending"}
//                             </p>
//                           </div>
//                         </div>

//                         <div className="relative">
//                           <div
//                             className={`absolute -left-[29px] bg-background p-1 rounded-full border-2 ${
//                               order.status.toLowerCase() === "delivered"
//                                 ? "border-primary"
//                                 : "border-gray-200"
//                             }`}
//                           >
//                             <CheckCircle
//                               className={`h-4 w-4 ${
//                                 order.status.toLowerCase() === "delivered"
//                                   ? "text-primary"
//                                   : "text-gray-400"
//                               }`}
//                             />
//                           </div>
//                           <div>
//                             <p className="font-medium">Delivered</p>
//                             <p className="text-sm text-muted-foreground">
//                               {order.status.toLowerCase() === "delivered"
//                                 ? formatDate(order.updatedAt)
//                                 : "Pending"}
//                             </p>
//                           </div>
//                         </div>
//                       </>
//                     )}

//                     {order.status.toLowerCase() === "cancelled" && (
//                       <div className="relative">
//                         <div className="absolute -left-[29px] bg-background p-1 rounded-full border-2 border-red-200">
//                           <AlertCircle className="h-4 w-4 text-red-500" />
//                         </div>
//                         <div>
//                           <p className="font-medium">Order Cancelled</p>
//                           <p className="text-sm text-muted-foreground">
//                             {formatDate(order.updatedAt)}
//                           </p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Order Items */}
//             <Card className="lg:col-span-2">
//               <CardHeader>
//                 <CardTitle className="text-lg">Items</CardTitle>
//                 <CardDescription>
//                   {order.details.length} {order.details.length === 1 ? "item" : "items"} in your order
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {order.details.map((item, index) => (
//                     <div key={index} className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
//                       <div className="h-20 w-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
//                         {item.productId.featureImg ? (
//                           <Image
//                             src={item.productId.featureImg || "/placeholder.svg"}
//                             alt={item.productId.name}
//                             width={80}
//                             height={80}
//                             className="h-full w-full object-cover"
//                           />
//                         ) : (
//                           <div className="h-full w-full flex items-center justify-center bg-gray-100">
//                             <ShoppingBag className="h-6 w-6 text-gray-400" />
//                           </div>
//                         )}
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex justify-between">
//                           <h4 className="font-medium">{item.productId.name}</h4>
//                           <p className="font-medium">
//                             ₹  {item.price.toFixed(2)}
//                           </p>
//                         </div>
//                         <div className="text-sm text-muted-foreground mt-1">
//                           <p>Quantity: {item.quantity}</p>
//                           {item.attributes.map((attr, attrIndex) => (
//                             <p key={attrIndex}>
//                               {attr.name}: {attr.value}
//                             </p>
//                           ))}
//                           {item.productId.variants[0]?.mrp > item.price && (
//                             <p className="text-green-600">
//                               Saved: ₹  {(item.productId.variants[0].mrp - item.price).toFixed(2)}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Order Summary */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Summary</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Subtotal</span>
//                   <span>₹  {order.totalAmount.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Delivery</span>
//                   <span>₹  0.00</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Taxes</span>
//                   <span>Included</span>
//                 </div>
//                 {order.details.some(
//                   (item) => item.productId.variants[0]?.mrp > item.price
//                 ) && (
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Discount</span>
//                     <span className="text-green-600">
//                       -₹ {" "}
//                       {order.details
//                         .reduce((acc, item) => {
//                           const discount = item.productId.variants[0]?.mrp
//                             ? (item.productId.variants[0].mrp - item.price) * item.quantity
//                             : 0;
//                           return acc + discount;
//                         }, 0)
//                         .toFixed(2)}
//                     </span>
//                   </div>
//                 )}
//                 <Separator />
//                 <div className="flex justify-between font-medium">
//                   <span>Total</span>
//                   <span>₹  {order.totalAmount.toFixed(2)}</span>
//                 </div>
//                 <div className="pt-4">
//                   <div className="flex items-center gap-2 text-sm">
//                     <CreditCard className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-muted-foreground">
//                       Payment Method:
//                     </span>
//                     <span className="font-medium capitalize">{order.paymentMethod}</span>
//                   </div>
//                   <div className="mt-2">
//                     <Badge
//                       variant={order.isPaid ? "success" : "default"}
//                       className="h-5"
//                     >
//                       {order.isPaid ? "Paid" : "Unpaid"}
//                     </Badge>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Shipping Information */}
//             <Card className="lg:col-span-3">
//               <CardHeader>
//                 <CardTitle className="text-lg">Shipping Information</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   <div className="space-y-2">
//                     <h4 className="font-medium flex items-center gap-2">
//                       <MapPin className="h-4 w-4" />
//                       Delivery Address
//                     </h4>
//                     <address className="text-sm text-muted-foreground not-italic">
//                       {order.address.formatted_address}
//                     </address>
//                   </div>

//                   <div className="space-y-2">
//                     <h4 className="font-medium flex items-center gap-2">
//                       <User className="h-4 w-4" />
//                       Customer Details
//                     </h4>
//                     <div className="text-sm text-muted-foreground">
//                       <p>
//                         {order.userId?.firstName && order.userId?.lastName
//                           ? `${order.userId.firstName} ${order.userId.lastName}`
//                           : "Customer"}
//                       </p>
//                       {order.userId?.email && <p>{order.userId.email}</p>}
//                       {order.userId?.mobileNo && (
//                         <p className="flex items-center gap-1 mt-1">
//                           <Phone className="h-3 w-3" />
//                           {order.userId.mobileNo}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {order.deliveryPersonId && (
//                     <div className="space-y-2">
//                       <h4 className="font-medium flex items-center gap-2">
//                         <Truck className="h-4 w-4" />
//                         Delivery Person
//                       </h4>
//                       <div className="text-sm text-muted-foreground">
//                         <p>
//                           {order.deliveryPersonId?.firstName &&
//                           order.deliveryPersonId?.lastName
//                             ? `${order.deliveryPersonId.firstName} ${order.deliveryPersonId.lastName}`
//                             : "Not assigned yet"}
//                         </p>
//                         {order.deliveryPersonId?.mobileNo && (
//                           <p className="flex items-center gap-1 mt-1">
//                             <Phone className="h-3 w-3" />
//                             {order.deliveryPersonId.mobileNo}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </main>
      
//       <Footer />
//     </div>
//   );
// }



"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  CreditCard,
  ShoppingBag,
  AlertCircle,
  ChevronRight,
  User,
  Phone,
  Home,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { getOrderById } from "@/lib/http/api"
import { HeaderLanding } from "@/components/landing-page/header-landing"
import { Footer } from "@/components/landing-page/footer"
import type { Order } from "@/types"

export default function OrderDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string
  const [order, setOrder] = useState<Order | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ["getOrder", orderId],
    queryFn: async () => {
      return await getOrderById(orderId).then((res) => res.data)
    },
    enabled: !!orderId,
  })

  useEffect(() => {
    if (data) {
      setOrder(data)
    }
  }, [data])

  const statusVariantMap = {
    out_for_delivery: "secondary",
    dispatch: "secondary",
    delivered: "success",
    cancelled: "destructive",
    processing: "secondary",
    pending: "warning",
  }

  const statusIconMap = {
    delivered: <CheckCircle className="h-5 w-5 text-green-500" />,
    out_for_delivery: <Truck className="h-5 w-5 text-purple-500" />,
    dispatch: <Package className="h-5 w-5 text-blue-500" />,
    cancelled: <AlertCircle className="h-5 w-5 text-red-500" />,
    processing: <Package className="h-5 w-5 text-blue-500" />,
    pending: <Clock className="h-5 w-5 text-yellow-500" />,
  }

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <HeaderLanding />
        <main className="flex-1 py-10">
          <div className="container mx-auto px-4">
            <div className="space-y-8">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-10 w-64" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Skeleton className="h-64 lg:col-span-3" />
                <Skeleton className="h-64 lg:col-span-2" />
                <Skeleton className="h-64" />
                <Skeleton className="h-64 lg:col-span-3" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <HeaderLanding />
        <main className="flex-1 flex items-center justify-center py-10">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Order Not Found</CardTitle>
              <CardDescription>
                We couldn't find the order you're looking for. It may have been removed or the ID is incorrect.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => router.push("/my-orders")}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Orders
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <HeaderLanding />

      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm text-gray-500 mb-6">
            <button
              onClick={() => router.push("/")}
              className="hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              <Home className="h-3.5 w-3.5" />
              Home
            </button>
            <ChevronRight className="h-4 w-4 mx-2" />
            <button onClick={() => router.push("/my-orders")} className="hover:text-gray-900 transition-colors">
              Orders
            </button>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium">#{order.refId}</span>
          </nav>

          {/* Order Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
              <div className="flex items-center gap-3 mt-2">
                <p className="text-gray-500">
                  #{order.refId} • {formatDate(order.createdAt)}
                </p>
                <Badge variant={statusVariantMap[order.status.toLowerCase()] || "outline"} className="capitalize">
                  {order.status.replace(/_/g, " ")}
                </Badge>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push("/my-orders")}
              className="gap-2 self-start md:self-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Orders
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Timeline */}
            <Card className="lg:col-span-3 border shadow-sm overflow-hidden">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-xl">Order Status</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative">
                  <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-3">
                      {statusIconMap[order.status.toLowerCase()] || <Clock className="h-5 w-5 text-gray-500" />}
                      <span className="font-medium text-gray-900">{order.status.replace(/_/g, " ")}</span>
                    </div>
                    <span className="text-sm text-gray-500">Last updated: {formatDate(order.updatedAt)}</span>
                  </div>

                  <div className="mt-8 border-l-2 border-dashed border-gray-200 pl-8 space-y-8">
                    <div className="relative">
                      <div className="absolute -left-[33px] bg-white p-1.5 rounded-full border-2 border-green-500">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Order Placed</p>
                        <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                      </div>
                    </div>

                    {order.status.toLowerCase() !== "cancelled" && (
                      <>
                        <div className="relative">
                          <div
                            className={`absolute -left-[33px] bg-white p-1.5 rounded-full border-2 ${
                              ["processing", "dispatch", "out_for_delivery", "delivered"].includes(
                                order.status.toLowerCase(),
                              )
                                ? "border-green-500"
                                : "border-gray-200"
                            }`}
                          >
                            <Package
                              className={`h-4 w-4 ${
                                ["processing", "dispatch", "out_for_delivery", "delivered"].includes(
                                  order.status.toLowerCase(),
                                )
                                  ? "text-green-500"
                                  : "text-gray-400"
                              }`}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Processing</p>
                            <p className="text-sm text-gray-500">
                              {["processing", "dispatch", "out_for_delivery", "delivered"].includes(
                                order.status.toLowerCase(),
                              )
                                ? formatDate(new Date(new Date(order.createdAt).getTime() + 24 * 60 * 60 * 1000))
                                : "Pending"}
                            </p>
                          </div>
                        </div>

                        <div className="relative">
                          <div
                            className={`absolute -left-[33px] bg-white p-1.5 rounded-full border-2 ${
                              ["dispatch", "out_for_delivery", "delivered"].includes(order.status.toLowerCase())
                                ? "border-green-500"
                                : "border-gray-200"
                            }`}
                          >
                            <Truck
                              className={`h-4 w-4 ${
                                ["dispatch", "out_for_delivery", "delivered"].includes(order.status.toLowerCase())
                                  ? "text-green-500"
                                  : "text-gray-400"
                              }`}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Shipped</p>
                            <p className="text-sm text-gray-500">
                              {["dispatch", "out_for_delivery", "delivered"].includes(order.status.toLowerCase())
                                ? formatDate(new Date(new Date(order.createdAt).getTime() + 48 * 60 * 60 * 1000))
                                : "Pending"}
                            </p>
                          </div>
                        </div>

                        <div className="relative">
                          <div
                            className={`absolute -left-[33px] bg-white p-1.5 rounded-full border-2 ${
                              order.status.toLowerCase() === "delivered" ? "border-green-500" : "border-gray-200"
                            }`}
                          >
                            <CheckCircle
                              className={`h-4 w-4 ${
                                order.status.toLowerCase() === "delivered" ? "text-green-500" : "text-gray-400"
                              }`}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Delivered</p>
                            <p className="text-sm text-gray-500">
                              {order.status.toLowerCase() === "delivered" ? formatDate(order.updatedAt) : "Pending"}
                            </p>
                          </div>
                        </div>
                      </>
                    )}

                    {order.status.toLowerCase() === "cancelled" && (
                      <div className="relative">
                        <div className="absolute -left-[33px] bg-white p-1.5 rounded-full border-2 border-red-200">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Order Cancelled</p>
                          <p className="text-sm text-gray-500">{formatDate(order.updatedAt)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="lg:col-span-2 border shadow-sm overflow-hidden">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-xl">Items</CardTitle>
                <CardDescription>
                  {order.details.length} {order.details.length === 1 ? "item" : "items"} in your order
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {order.details.map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 hover:bg-gray-50 transition-colors">
                      <div className="h-20 w-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        {item.productId.featureImg ? (
                          <Image
                            src={item.productId.featureImg || "/placeholder.svg?height=80&width=80"}
                            alt={item.productId.name}
                            width={80}
                            height={80}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-gray-100">
                            <ShoppingBag className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">{item.productId.name}</h4>
                          <p className="font-medium text-gray-900">₹  {item.price.toFixed(2)}</p>
                        </div>
                        <div className="text-sm text-gray-500 mt-1 space-y-1">
                          <p>Quantity: {item.quantity}</p>
                          {item.attributes.map((attr, attrIndex) => (
                            <p key={attrIndex}>
                              {attr.name}: {attr.value}
                            </p>
                          ))}
                          {item.productId.variants[0]?.mrp > item.price && (
                            <p className="text-green-600 font-medium">
                              Saved: ₹  {(item.productId.variants[0].mrp - item.price).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="border shadow-sm overflow-hidden">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-xl">Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium">₹  {order.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Delivery</span>
                    <span className="font-medium">₹  0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Taxes</span>
                    <span className="font-medium">Included</span>
                  </div>
                  {order.details.some((item) => item.productId.variants[0]?.mrp > item.price) && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Discount</span>
                      <span className="font-medium text-green-600">
                        -₹ {" "}
                        {order.details
                          .reduce((acc, item) => {
                            const discount = item.productId.variants[0]?.mrp
                              ? (item.productId.variants[0].mrp - item.price) * item.quantity
                              : 0
                            return acc + discount
                          }, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>₹  {order.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="pt-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <CreditCard className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-500">Payment Method:</span>
                      <span className="font-medium capitalize">{order.paymentMethod}</span>
                    </div>
                    <div>
                      <Badge
                        variant={order.isPaid ? "success" : "outline"}
                        className="bg-green-100 text-green-800 hover:bg-green-200"
                      >
                        {order.isPaid ? "Paid" : "Unpaid"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card className="lg:col-span-3 border shadow-sm overflow-hidden">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-xl">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      Delivery Address
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <address className="text-gray-600 not-italic">{order.address.formatted_address}</address>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      Customer Details
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="text-gray-600">
                        <p className="font-medium">
                          {order.userId?.firstName && order.userId?.lastName
                            ? `${order.userId.firstName} ${order.userId.lastName}`
                            : "Customer"}
                        </p>
                        {order.userId?.email && <p className="mt-1">{order.userId.email}</p>}
                        {order.userId?.mobileNo && (
                          <p className="flex items-center gap-1 mt-1">
                            <Phone className="h-3 w-3" />
                            {order.userId.mobileNo}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {order.deliveryPersonId && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 flex items-center gap-2">
                        <Truck className="h-4 w-4 text-gray-500" />
                        Delivery Person
                      </h4>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="text-gray-600">
                          <p className="font-medium">
                            {order.deliveryPersonId?.firstName && order.deliveryPersonId?.lastName
                              ? `${order.deliveryPersonId.firstName} ${order.deliveryPersonId.lastName}`
                              : "Not assigned yet"}
                          </p>
                          {order.deliveryPersonId?.mobileNo && (
                            <p className="flex items-center gap-1 mt-1">
                              <Phone className="h-3 w-3" />
                              {order.deliveryPersonId.mobileNo}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
