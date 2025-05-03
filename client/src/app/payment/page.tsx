// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import {
//   ArrowLeft,
//   CheckCircle2,
//   CircleX,
//   LayoutDashboard,
//   Store,
// } from "lucide-react";
// import Link from "next/link";
// import React from "react";
// import CartCleaner from "../checkout/components/cartCleaner";

// const Payment = ({
//   searchParams,
// }: {
//   searchParams: { success: string; reference: string; orderId: string };
// }) => {
//   const isOrderSuccess = searchParams.success === "true";

//   return (
//     <>
//       {isOrderSuccess && <CartCleaner />}
//       <div className="flex flex-col items-center gap-4 w-full mt-32">
//         {isOrderSuccess ? (
//           <>
//             <CheckCircle2 size={80} className="text-green-500" />
//             <h1 className="text-2xl font-bold mt-2 text-center">
//               Order placed successfully.
//             </h1>
//             <p className="text-base font-semibold -mt-2">
//               Thank you for your order.
//             </p>
//           </>
//         ) : (
//           <>
//             <CircleX size={80} className="text-red-500" />
//             <h1 className="text-2xl font-bold mt-2 text-center">
//               Payment has been failed.
//             </h1>
//             <p className="text-base font-semibold -mt-2">Please try again.</p>
//           </>
//         )}

//         {isOrderSuccess && (
//           <Card className="mt-6">
//             <CardHeader className="p-4">
//               <CardTitle className="flex items-start text-lg justify-between gap-12">
//                 <div className="flex item-center gap-3">
//                   <Store size={35} className="text-primary" />
//                   <span>Your order information</span>
//                 </div>
//                 <Badge
//                   className="text-base px-4"
//                   variant={"soft"}
//                   color="secondary"
//                 >
//                   Confirmed
//                 </Badge>
//               </CardTitle>
//             </CardHeader>
//             <Separator />
//             <CardContent className="pt-6">
//               <div className="flex items-center gap-2">
//                 <LayoutDashboard size={20} />
//                 <h2 className="text-base font-medium">Order reference: </h2>
//                 <Link
//                   href={`/my-orders/${searchParams.orderId}`}
//                   className="underline"
//                 >
//                   {searchParams.reference}
//                 </Link>
//               </div>

//               <div className="flex items-center gap-2 mt-2">
//                 <LayoutDashboard size={20} />
//                 <h2 className="text-base font-medium">Payment status: </h2>
//                 <span>Paid</span>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {isOrderSuccess ? (
//           <Button
//             asChild
//             className="mt-6 bg-[#BD844C] hover:bg-[#9e6f3f] text-white border-[#BD844C] hover:border-[#BD844C]"
//           >
//             <Link
//               href={`/my-orders/${searchParams.orderId}`}
//               className="flex items-center gap-2"
//             >
//               <ArrowLeft size={20} className="text-white" />
//               <span>Go to order status page</span>
//             </Link>
//           </Button>
//         ) : (
//           <Button
//             asChild
//             className="mt-6 bg-[#BD844C] hover:bg-[#9e6f3f] text-white border-[#BD844C] hover:border-[#BD844C]"
//           >
//             <Link href={`/checkout`} className="flex items-center gap-2">
//               <ArrowLeft size={20} className="text-white" />
//               <span>Go to checkout</span>
//             </Link>
//           </Button>
//         )}
//       </div>
//     </>
//   );
// };

// export default Payment;


import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CheckCircle2, CircleX, LayoutDashboard, Store, Clock, ShoppingBag } from "lucide-react"
import Link from "next/link"
import CartCleaner from "../checkout/components/cartCleaner"

const Payment = ({
  searchParams,
}: {
  searchParams: { success: string; reference: string; orderId: string }
}) => {
  const isOrderSuccess = searchParams.success === "true"

  return (
    <>
      {isOrderSuccess && <CartCleaner />}
      <div className="flex flex-col items-center justify-center min-h-[80vh] max-w-md mx-auto px-4 py-8">
        <div className="w-full bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col items-center text-center mb-6">
            {isOrderSuccess ? (
              <div className="relative">
                <div className="absolute inset-0 bg-green-100 rounded-full scale-150 opacity-20 animate-pulse"></div>
                <CheckCircle2 size={80} className="text-green-500 relative z-10" />
              </div>
            ) : (
              <div className="relative">
                <div className="absolute inset-0 bg-red-100 rounded-full scale-150 opacity-20 animate-pulse"></div>
                <CircleX size={80} className="text-red-500 relative z-10" />
              </div>
            )}

            <h1 className="text-2xl font-bold mt-6 text-gray-800">
              {isOrderSuccess ? "Order Confirmed!" : "Payment Failed"}
            </h1>

            <p className="text-gray-600 mt-2">
              {isOrderSuccess
                ? "Thank you for your purchase. Your order has been received."
                : "We couldn't process your payment. Please try again."}
            </p>
          </div>

          {isOrderSuccess && (
            <Card className="border border-gray-100 shadow-sm mb-6 overflow-hidden">
              <CardHeader className="bg-gray-50 p-4">
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <ShoppingBag size={20} className="text-primary" />
                    </div>
                    <span className="text-gray-800">Order Details</span>
                  </div>
                  <Badge className="text-sm px-3 py-1 font-medium" variant="outline">
                    Confirmed
                  </Badge>
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-700">
                    <LayoutDashboard size={18} className="text-gray-500" />
                    <span className="text-sm font-medium">Reference:</span>
                  </div>
                  <Link
                    href={`/my-orders/${searchParams.orderId}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {searchParams.reference}
                  </Link>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock size={18} className="text-gray-500" />
                    <span className="text-sm font-medium">Status:</span>
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Paid</span>
                </div>
              </CardContent>
            </Card>
          )}

          {isOrderSuccess ? (
            <div className="space-y-3">
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white">
                <Link href={`/my-orders/${searchParams.orderId}`} className="flex items-center justify-center gap-2">
                  <ShoppingBag size={18} />
                  <span>View Order Details</span>
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full border-gray-200">
                <Link href="/" className="flex items-center justify-center gap-2">
                  <ArrowLeft size={18} />
                  <span>Continue Shopping</span>
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white">
                <Link href="/checkout" className="flex items-center justify-center gap-2">
                  <ArrowLeft size={18} />
                  <span>Return to Checkout</span>
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full border-gray-200">
                <Link href="/" className="flex items-center justify-center gap-2">
                  <Store size={18} />
                  <span>Continue Shopping</span>
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Payment
