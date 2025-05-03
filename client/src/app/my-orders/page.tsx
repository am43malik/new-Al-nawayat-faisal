// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import {
//   Package2,
//   Search,
//   Filter,
//   ArrowUpDown,
//   EyeIcon,
//   RefreshCw,
//   ShoppingBag,
// } from "lucide-react";

// import { getAllOrders } from "@/lib/http/api";
// import { Order } from "@/types";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import logo from "@/public/logo.png";
// import { HeaderLanding } from "@/components/landing-page/header-landing";
// import {Footer} from "@/components/landing-page/footer";

// export default function OrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const router = useRouter();

//   const { data, isLoading, refetch } = useQuery({
//     queryKey: ["getOrders"],
//     queryFn: async () => {
//       return await getAllOrders().then((res) => res.data);
//     },
//   });

//   useEffect(() => {
//     if (data) {
//       setOrders(data);
//       setFilteredOrders(data);
//     }
//   }, [data]);

//   useEffect(() => {
//     if (orders.length) {
//       let result = [...orders];

//       // Apply search filter
//       if (searchQuery) {
//         result = result.filter(
//           (order) =>
//             order.refId.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             order.status.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//       }

//       // Apply status filter
//       if (statusFilter !== "all") {
//         result = result.filter(
//           (order) => order.status.toLowerCase() === statusFilter.toLowerCase()
//         );
//       }

//       setFilteredOrders(result);
//     }
//   }, [searchQuery, statusFilter, orders]);

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "out_for_delivery":
//       case "dispatch":
//       case "in_transit":
//         return "secondary";
//       case "delivered":
//         return "success";
//       case "cancelled":
//         return "destructive";
//       case "request_for_delivery":
//         return "destructive";
//       case "returned":
//         return "warning";
//       case "refunded":
//         return "warning";
//       default:
//         return "default";
//     }
//   };

//   const formatDate = (dateString: Date) => {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat("en-US", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     }).format(date);
//   };

//   return (
//     <>
//       <HeaderLanding logo={logo} />
//       <div className="min-h-screen bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//           <div className="flex flex-col gap-6">
//             {/* Page Header */}
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//               <div>
//                 <h1 className="text-2xl font-bold tracking-tight">My Orders</h1>
//                 <p className="text-muted-foreground mt-1">
//                   View and manage all your orders in one place
//                 </p>
//               </div>
//               <Button
//                 onClick={() => refetch()}
//                 variant="outline"
//                 className="w-full md:w-auto"
//               >
//                 <RefreshCw className="mr-2 h-4 w-4" />
//                 Refresh
//               </Button>
//             </div>

//             {/* Filters */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   type="search"
//                   placeholder="Search by order ID or status..."
//                   className="pl-8 w-full"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//               <Select value={statusFilter} onValueChange={setStatusFilter}>
//                 <SelectTrigger className="w-full sm:w-[180px]">
//                   <SelectValue placeholder="Filter by status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Statuses</SelectItem>
//                   <SelectItem value="delivered">Delivered</SelectItem>
//                   <SelectItem value="in_transit">In Transit</SelectItem>
//                   <SelectItem value="dispatch">Dispatched</SelectItem>
//                   <SelectItem value="out_for_delivery">
//                     Out for Delivery
//                   </SelectItem>
//                   <SelectItem value="cancelled">Cancelled</SelectItem>
//                   <SelectItem value="returned">Returned</SelectItem>
//                   <SelectItem value="refunded">Refunded</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Orders Table */}
//             <Card>
//               <CardHeader className="pb-0">
//                 <CardTitle>Order History</CardTitle>
//                 <CardDescription>
//                   You have placed {orders.length} orders in total
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 {isLoading ? (
//                   <div className="space-y-2">
//                     {[...Array(5)].map((_, i) => (
//                       <Skeleton key={i} className="h-12 w-full" />
//                     ))}
//                   </div>
//                 ) : filteredOrders.length > 0 ? (
//                   <div className="rounded-md border overflow-hidden">
//                     <Table>
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead className="font-semibold">
//                             <div className="flex items-center">
//                               Order ID
//                               <ArrowUpDown className="ml-1 h-3 w-3" />
//                             </div>
//                           </TableHead>
//                           <TableHead>Status</TableHead>
//                           <TableHead className="hidden md:table-cell">
//                             Total Amount
//                           </TableHead>
//                           <TableHead className="hidden md:table-cell">
//                             Payment
//                           </TableHead>
//                           <TableHead className="hidden lg:table-cell">
//                             Date
//                           </TableHead>
//                           <TableHead className="text-right">Actions</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {filteredOrders.map((order: Order) => (
//                           <TableRow
//                             key={order._id}
//                             className="hover:bg-muted/50"
//                           >
//                             <TableCell className="font-medium">
//                               {order.refId}
//                             </TableCell>
//                             <TableCell>
//                               <Badge
//                                 variant="outline"
//                                 className={`
//                                   px-2 py-0.5 
//                                   ${
//                                     order.status.toLowerCase() === "delivered"
//                                       ? "bg-green-50 text-green-700 border-green-200"
//                                       : ""
//                                   }
//                                   ${
//                                     order.status.toLowerCase() === "cancelled"
//                                       ? "bg-red-50 text-red-700 border-red-200"
//                                       : ""
//                                   }
//                                   ${
//                                     order.status.toLowerCase() ===
//                                       "in_transit" ||
//                                     order.status.toLowerCase() === "dispatch"
//                                       ? "bg-blue-50 text-blue-700 border-blue-200"
//                                       : ""
//                                   }
//                                   ${
//                                     order.status.toLowerCase() ===
//                                     "out_for_delivery"
//                                       ? "bg-purple-50 text-purple-700 border-purple-200"
//                                       : ""
//                                   }
//                                   ${
//                                     order.status.toLowerCase() === "returned" ||
//                                     order.status.toLowerCase() === "refunded"
//                                       ? "bg-amber-50 text-amber-700 border-amber-200"
//                                       : ""
//                                   }
//                                 `}
//                               >
//                                 {order.status.replace(/_/g, " ")}
//                               </Badge>
//                             </TableCell>
//                             <TableCell className="hidden md:table-cell">
//                               ₹  {(order.totalAmount ?? 0).toFixed(2)}
//                             </TableCell>
//                             <TableCell className="hidden md:table-cell">
//                               <div className="flex flex-col">
//                                 <span className="text-xs text-muted-foreground">
//                                   {order.paymentMethod}
//                                 </span>
//                                 <Badge variant="outline" className="mt-1 w-fit">
//                                   Paid: {order.isPaid}
//                                 </Badge>
//                               </div>
//                             </TableCell>
//                             <TableCell className="hidden lg:table-cell">
//                               {formatDate(order.createdAt)}
//                             </TableCell>
//                             <TableCell className="text-right">
//                               <Button
//                                 onClick={() =>
//                                   router.push(`/my-orders/${order._id}`)
//                                 }
//                                 size="sm"
//                                 variant="outline"
//                                 className="h-8"
//                               >
//                                 <EyeIcon className="h-3.5 w-3.5 mr-1" />
//                                 Details
//                               </Button>
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center justify-center py-12 text-center">
//                     <div className="rounded-full bg-muted p-3 mb-3">
//                       <ShoppingBag className="h-6 w-6 text-muted-foreground" />
//                     </div>
//                     <h3 className="font-medium text-lg">No orders found</h3>
//                     <p className="text-muted-foreground mt-1 mb-4 max-w-md">
//                       {searchQuery || statusFilter !== "all"
//                         ? "Try adjusting your search or filter to find what you're looking for."
//                         : "You haven't placed any orders yet. Start shopping to see your orders here."}
//                     </p>
//                     <Button onClick={() => router.push("/")}>
//                       Continue Shopping
//                     </Button>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import {
//   Search,
//   Filter,
//   ArrowUpDown,
//   Eye,
//   RefreshCw,
//   ShoppingBag,
//   ChevronRight,
// } from "lucide-react";

// import { getAllOrders } from "@/lib/http/api";
// import { Order } from "@/types";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { HeaderLanding } from "@/components/landing-page/header-landing";
// import { Footer } from "@/components/landing-page/footer";

// export default function OrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const router = useRouter();

//   const { data, isLoading, refetch } = useQuery({
//     queryKey: ["getOrders"],
//     queryFn: async () => {
//       return await getAllOrders().then((res) => res.data);
//     },
//   });

//   useEffect(() => {
//     if (data) {
//       setOrders(data);
//       setFilteredOrders(data);
//     }
//   }, [data]);

//   useEffect(() => {
//     if (orders.length) {
//       let result = [...orders];

//       // Apply search filter
//       if (searchQuery) {
//         result = result.filter(
//           (order) =>
//             order.refId.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             order.status.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//       }

//       // Apply status filter
//       if (statusFilter !== "all") {
//         result = result.filter(
//           (order) => order.status.toLowerCase() === statusFilter.toLowerCase()
//         );
//       }

//       setFilteredOrders(result);
//     }
//   }, [searchQuery, statusFilter, orders]);

//   const formatDate = (dateString: Date) => {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat("en-US", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     }).format(date);
//   };

//   const statusVariantMap = {
//     delivered: "success",
//     cancelled: "destructive",
//     in_transit: "secondary",
//     dispatch: "secondary",
//     out_for_delivery: "secondary",
//     returned: "warning",
//     refunded: "warning",
//     request_for_delivery: "destructive",
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <HeaderLanding />
      
//       <main className="flex-1 bg-gray-50/50">
//         <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//           <div className="flex flex-col gap-6">
//             {/* Page Header */}
//             <div className="flex flex-col gap-2">
//               <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                 <span>Home</span>
//                 <ChevronRight className="h-4 w-4" />
//                 <span className="text-foreground font-medium">My Orders</span>
//               </div>
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                 <div>
//                   <h1 className="text-2xl font-bold">My Orders</h1>
//                   <p className="text-muted-foreground">
//                     View and manage all your orders
//                   </p>
//                 </div>
//                 <Button
//                   onClick={() => refetch()}
//                   variant="outline"
//                   size="sm"
//                   className="gap-2"
//                 >
//                   <RefreshCw className="h-4 w-4" />
//                   Refresh
//                 </Button>
//               </div>
//             </div>

//             {/* Filters */}
//             <div className="flex flex-col sm:flex-row gap-3">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   type="search"
//                   placeholder="Search orders..."
//                   className="pl-9 w-full"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//               <Select value={statusFilter} onValueChange={setStatusFilter}>
//                 <SelectTrigger className="w-full sm:w-[180px]">
//                   <div className="flex items-center gap-2">
//                     <Filter className="h-4 w-4 text-muted-foreground" />
//                     <SelectValue placeholder="Filter status" />
//                   </div>
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Statuses</SelectItem>
//                   <SelectItem value="delivered">Delivered</SelectItem>
//                   <SelectItem value="in_transit">In Transit</SelectItem>
//                   <SelectItem value="dispatch">Dispatched</SelectItem>
//                   <SelectItem value="out_for_delivery">
//                     Out for Delivery
//                   </SelectItem>
//                   <SelectItem value="cancelled">Cancelled</SelectItem>
//                   <SelectItem value="returned">Returned</SelectItem>
//                   <SelectItem value="refunded">Refunded</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Orders Table */}
//             <Card className="border-0 shadow-sm">
//               <CardHeader className="pb-2">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                   <div>
//                     <CardTitle className="text-lg">Order History</CardTitle>
//                     <CardDescription>
//                       {orders.length} {orders.length === 1 ? "order" : "orders"} placed
//                     </CardDescription>
//                   </div>
//                   {filteredOrders.length > 0 && (
//                     <div className="text-sm text-muted-foreground">
//                       Showing {filteredOrders.length} of {orders.length}
//                     </div>
//                   )}
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 {isLoading ? (
//                   <div className="space-y-4">
//                     {[...Array(5)].map((_, i) => (
//                       <Skeleton key={i} className="h-16 w-full rounded-lg" />
//                     ))}
//                   </div>
//                 ) : filteredOrders.length > 0 ? (
//                   <div className="rounded-lg border">
//                     <Table>
//                       <TableHeader className="bg-gray-50">
//                         <TableRow>
//                           <TableHead className="w-[180px]">Order ID</TableHead>
//                           <TableHead>Status</TableHead>
//                           <TableHead className="text-right">Amount</TableHead>
//                           <TableHead className="hidden md:table-cell">Payment</TableHead>
//                           <TableHead className="hidden lg:table-cell">Date</TableHead>
//                           <TableHead className="text-right">Actions</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {filteredOrders.map((order) => (
//                           <TableRow key={order._id} className="hover:bg-gray-50/50">
//                             <TableCell className="font-medium">
//                               <div className="flex flex-col">
//                                 <span>{order.refId}</span>
//                                 <span className="text-xs text-muted-foreground md:hidden">
//                                   {formatDate(order.createdAt)}
//                                 </span>
//                               </div>
//                             </TableCell>
//                             <TableCell>
//                               <Badge
//                                 variant={statusVariantMap[order.status.toLowerCase()] || "outline"}
//                                 className="capitalize"
//                               >
//                                 {order.status.replace(/_/g, " ")}
//                               </Badge>
//                             </TableCell>
//                             <TableCell className="text-right">
//                               ₹  {(order.totalAmount ?? 0).toFixed(2)}
//                             </TableCell>
//                             <TableCell className="hidden md:table-cell">
//                               <div className="flex flex-col">
//                                 <span className="capitalize">{order.paymentMethod}</span>
//                                 <span className="text-xs text-muted-foreground">
//                                   {order.isPaid ? "Paid" : "Unpaid"}
//                                 </span>
//                               </div>
//                             </TableCell>
//                             <TableCell className="hidden lg:table-cell">
//                               {formatDate(order.createdAt)}
//                             </TableCell>
//                             <TableCell className="text-right">
//                               <Button
//                                 onClick={() => router.push(`/my-orders/${order._id}`)}
//                                 size="sm"
//                                 variant="ghost"
//                                 className="h-8 gap-1"
//                               >
//                                 <Eye className="h-3.5 w-3.5" />
//                                 <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//                                   Details
//                                 </span>
//                               </Button>
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center justify-center py-12 text-center">
//                     <div className="rounded-full bg-gray-100 p-4 mb-4">
//                       <ShoppingBag className="h-6 w-6 text-gray-400" />
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-1">
//                       No orders found
//                     </h3>
//                     <p className="text-sm text-gray-500 max-w-md mb-6">
//                       {searchQuery || statusFilter !== "all"
//                         ? "No orders match your search criteria. Try adjusting your filters."
//                         : "You haven't placed any orders yet."}
//                     </p>
//                     <Button onClick={() => router.push("/")}>
//                       Continue Shopping
//                     </Button>
//                   </div>
//                 )}
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

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { Search, Filter, Eye, RefreshCw, ShoppingBag, ChevronRight, Calendar, Clock } from "lucide-react"

import { getAllOrders } from "@/lib/http/api"
import type { Order } from "@/types"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { HeaderLanding } from "@/components/landing-page/header-landing"
import { Footer } from "@/components/landing-page/footer"

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const router = useRouter()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getOrders"],
    queryFn: async () => {
      return await getAllOrders().then((res) => res.data)
    },
  })

  useEffect(() => {
    if (data) {
      setOrders(data)
      setFilteredOrders(data)
    }
  }, [data])

  useEffect(() => {
    if (orders.length) {
      let result = [...orders]

      // Apply search filter
      if (searchQuery) {
        result = result.filter(
          (order) =>
            order.refId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.status.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      }

      // Apply status filter
      if (statusFilter !== "all") {
        result = result.filter((order) => order.status.toLowerCase() === statusFilter.toLowerCase())
      }

      setFilteredOrders(result)
    }
  }, [searchQuery, statusFilter, orders])

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date)
  }

  const statusVariantMap = {
    delivered: "success",
    cancelled: "destructive",
    in_transit: "secondary",
    dispatch: "secondary",
    out_for_delivery: "secondary",
    returned: "warning",
    refunded: "warning",
    request_for_delivery: "destructive",
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <HeaderLanding />

      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8">
            {/* Page Header */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <button onClick={() => router.push("/")} className="hover:text-gray-900 transition-colors">
                  Home
                </button>
                <ChevronRight className="h-4 w-4" />
                <span className="font-medium text-gray-900">My Orders</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                  <p className="text-gray-600 mt-1">Track and manage your order history</p>
                </div>
                <Button onClick={() => refetch()} variant="outline" size="sm" className="gap-2 self-start md:self-auto">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search by order ID or status..."
                  className="pl-9 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <SelectValue placeholder="Filter status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="in_transit">In Transit</SelectItem>
                  <SelectItem value="dispatch">Dispatched</SelectItem>
                  <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="returned">Returned</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Orders Table */}
            <Card className="border shadow-sm overflow-hidden">
              <CardHeader className="pb-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl">Order History</CardTitle>
                    <CardDescription>
                      {orders.length} {orders.length === 1 ? "order" : "orders"} placed
                    </CardDescription>
                  </div>
                  {filteredOrders.length > 0 && filteredOrders.length !== orders.length && (
                    <div className="text-sm text-gray-500">
                      Showing {filteredOrders.length} of {orders.length}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full rounded-lg" />
                    ))}
                  </div>
                ) : filteredOrders.length > 0 ? (
                  <div className="rounded-lg border overflow-hidden">
                    <Table>
                      <TableHeader className="bg-gray-50">
                        <TableRow>
                          <TableHead className="w-[180px]">Order ID</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead className="hidden md:table-cell">Payment</TableHead>
                          <TableHead className="hidden lg:table-cell">Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.map((order) => (
                          <TableRow key={order._id} className="hover:bg-gray-50/50">
                            <TableCell className="font-medium">
                              <div className="flex flex-col">
                                <span>#{order.refId}</span>
                                <span className="text-xs text-gray-500 md:hidden flex items-center gap-1 mt-1">
                                  <Calendar className="h-3 w-3" />
                                  {formatDate(order.createdAt)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={statusVariantMap[order.status.toLowerCase()] || "outline"}
                                className="capitalize"
                              >
                                {order.status.replace(/_/g, " ")}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              ₹  {(order.totalAmount ?? 0).toFixed(2)}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="flex flex-col">
                                <span className="capitalize">{order.paymentMethod}</span>
                                <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                  <div
                                    className={`h-2 w-2 rounded-full ${order.isPaid ? "bg-green-500" : "bg-amber-500"}`}
                                  ></div>
                                  {order.isPaid ? "Paid" : "Unpaid"}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {formatDate(order.createdAt)}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                onClick={() => router.push(`/my-orders/${order._id}`)}
                                size="sm"
                                variant="outline"
                                className="h-9 gap-1 border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800"
                              >
                                <Eye className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">View Details</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="rounded-full bg-gray-100 p-5 mb-4">
                      <ShoppingBag className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No orders found</h3>
                    <p className="text-gray-500 max-w-md mb-8">
                      {searchQuery || statusFilter !== "all"
                        ? "No orders match your search criteria. Try adjusting your filters."
                        : "You haven't placed any orders yet. Start shopping to see your orders here."}
                    </p>
                    <Button onClick={() => router.push("/")} className="bg-green-600 hover:bg-green-700 text-white">
                      Browse Products
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
