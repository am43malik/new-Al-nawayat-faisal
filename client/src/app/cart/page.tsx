// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import {
//   ShoppingBag,
//   Trash2,
//   Plus,
//   Minus,
//   ShoppingCart,
//   LogIn,
//   ArrowLeft,
//   Tag,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { useAppDispatch, useAppSelector } from "@/redux/store";
// import { clearCart, removeFromCart, updateQuantity } from "@/redux/slice";
// import { useState } from "react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { useAuth } from "@/hooks/use-auth";
// import { HeaderLanding } from "@/components/landing-page/header-landing";
// // import {Footer} from "@/components/landing-page/footer";
// import logo from "@/public/logo.png";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";
// import { useRouter } from "next/navigation";
// import { Footer } from "@/components/landing-page/footer";

// export default function Page() {
//   const dispatch = useAppDispatch();
//   const { items, total } = useAppSelector((state) => state.cart);
//   const [showLoginAlert, setShowLoginAlert] = useState(false);

//   const { isUser } = useAuth();
//   const router = useRouter();

//   const handleUpdateQuantity = (id: string, quantity: number) => {
//     if (quantity < 1) return;
//     dispatch(updateQuantity({ id, quantity }));
//   };

//   const handleRemoveItem = (id: string) => {
//     dispatch(removeFromCart(id));
//   };

//   const handleOrderClick = () => {
//     if (isUser) {
//       router.push("/checkout");
//     } else {
//       setShowLoginAlert(true);
//     }
//   };

//   const calculateDiscount = (mrp: number, rate: number) => {
//     if (mrp > 0 && rate > 0) {
//       const discountPercentage = ((mrp - rate) / mrp) * 100;
//       return Math.round(discountPercentage * 100) / 100; // Round to 2 decimal places
//     }
//     return 0;
//   };

//   if (items.length === 0) {
//     return (
//       <>
//         <HeaderLanding logo={logo} />
//         <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
//           <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
//           <h2 className="text-2xl font-semibold text-gray-900 mb-2">
//             Your cart is empty
//           </h2>
//           <p className="text-gray-600 mb-8">
//             Add some products to your cart to continue shopping!
//           </p>
//           <Link href="/">
//             <Button className="bg-[#BD844C] hover:bg-[#9e6f3f]">
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Continue Shopping
//             </Button>
//           </Link>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <HeaderLanding logo={logo} />

//       <div className="min-h-screen bg-gray-50">
//         <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
//           <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-8">
//             Shopping Cart
//           </h1>

//           <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
//             <div className="lg:col-span-7">
//               <div className="space-y-4">
//                 {items.map((item) => (
//                   <Card key={item.id} className="overflow-hidden">
//                     <CardContent className="p-4">
//                       <div className="flex items-start space-x-4">
//                         <div className="relative h-24 w-24 rounded-lg overflow-hidden sm:h-32 sm:w-32">
//                           <Image
//                             src={item.image || "/placeholder.svg"}
//                             alt={item.name}
//                             fill
//                             className="object-cover"
//                           />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <h3 className="text-lg font-medium text-gray-900">
//                             {item.name}
//                           </h3>
//                           <p className="mt-1 text-sm text-gray-500">
//                             {item.size}
//                           </p>
//                           <div className="flex items-baseline gap-2">
//                             <span className="text-lg font-medium text-gray-900">
//                               ₹  {(item.price ?? 0).toFixed(2)}
//                             </span>
//                             {item.price && (
//                               <span className="text-sm text-gray-500 line-through">
//                                 ₹  {(item.originalPrice ?? 0).toFixed(2)}
//                               </span>
//                             )}
//                           </div>
//                           <Badge className="bg-red-500 text-white px-3 py-1">
//                             {calculateDiscount(item.price, item.originalPrice)}%
//                             OFF
//                           </Badge>
//                         </div>
//                         <div className="flex flex-col items-end space-y-2">
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => handleRemoveItem(item.id)}
//                           >
//                             <Trash2 className="h-5 w-5 text-red-500" />
//                           </Button>
//                           <div className="flex items-center border rounded-lg">
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-8 w-8"
//                               onClick={() =>
//                                 handleUpdateQuantity(item.id, item.quantity - 1)
//                               }
//                             >
//                               <Minus className="h-4 w-4" />
//                             </Button>
//                             <span className="w-8 text-center">
//                               {item.quantity}
//                             </span>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-8 w-8"
//                               onClick={() =>
//                                 handleUpdateQuantity(item.id, item.quantity + 1)
//                               }
//                             >
//                               <Plus className="h-4 w-4" />
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-8 lg:col-span-5 lg:mt-0">
//               <Card>
//                 <CardContent className="p-6">
//                   <h2 className="text-lg font-medium text-gray-900">
//                     Order Summary
//                   </h2>
//                   <div className="mt-6 space-y-4">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm text-gray-600">Subtotal</p>
//                       <p className="text-sm font-medium text-gray-900">
//                         ₹  {total}
//                       </p>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm text-gray-600">Taxes</p>
//                       <p className="text-sm font-medium text-gray-900">₹  0</p>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm text-gray-600">Delivery charges</p>
//                       <p className="text-sm font-medium text-gray-900">₹  0</p>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm text-gray-600">Discount</p>
//                       <p className="text-sm font-medium text-gray-900">₹  0</p>
//                     </div>
//                     <Separator />
//                     <div className="flex items-center justify-between">
//                       <p className="text-base font-medium text-gray-900">
//                         Total
//                       </p>
//                       <p className="text-xl font-semibold text-gray-900">
//                         ₹  {total}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="mt-6 space-y-3">
//                     <Button
//                       onClick={handleOrderClick}
//                       className="w-full bg-[#BD844C] hover:bg-[#9e6f3f]"
//                     >
//                       <ShoppingCart className="mr-2 h-4 w-4" />
//                       Continue to Checkout
//                     </Button>
//                     <Button
//                       variant="outline"
//                       className={cn(
//                         "w-full bg-black border-black text-white hover:bg-black hover:border-black"
//                       )}
//                       onClick={() => dispatch(clearCart())}
//                     >
//                       Clear Cart
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>

//       <AlertDialog open={showLoginAlert} onOpenChange={setShowLoginAlert}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Login Required</AlertDialogTitle>
//             <AlertDialogDescription>
//               Please log in to complete your order. We need your account details
//               to ensure proper delivery of your items.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel className="bg-black hover:bg-black text-white border-black hover:border-black">
//               Cancel
//             </AlertDialogCancel>
//             <AlertDialogAction
//               className="bg-[#BD844C] hover:bg-[#9e6f3f]"
//               asChild
//             >
//               <Link href="/login">
//                 <Button className="bg-[#BD844C] hover:bg-[#9e6f3f]">
//                   <LogIn className="mr-2 h-4 w-4" />
//                   Log In
//                 </Button>
//               </Link>
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>

//       <Footer />
//     </>
//   );
// }



"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  LogIn,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { clearCart, removeFromCart, updateQuantity } from "@/redux/slice";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/use-auth";
import { HeaderLanding } from "@/components/landing-page/header-landing";
import logo from "@/public/logo.png";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/landing-page/footer";

export default function Page() {
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state) => state.cart);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const { isUser } = useAuth();
  const router = useRouter();

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleOrderClick = () => {
    if (isUser) {
      router.push("/checkout");
    } else {
      setShowLoginAlert(true);
    }
  };

  const calculateDiscount = (mrp: number, rate: number) => {
    if (mrp > 0 && rate > 0) {
      const discountPercentage = ((mrp - rate) / mrp) * 100;
      return Math.round(discountPercentage * 100) / 100;
    }
    return 0;
  };

  if (items.length === 0) {
    return (
      <>
        <HeaderLanding logo={logo} />
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
          <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Add some products to your cart to continue shopping!
          </p>
          <Link href="/">
            <Button className="bg-green-600 hover:bg-green-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <HeaderLanding logo={logo} />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            className="mb-4 flex items-center gap-1 text-gray-600 hover:text-green-600"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Cart</h1>

          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="relative h-24 w-24 rounded-lg overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="text-lg font-medium text-gray-900">
                              {item.name}
                            </h3>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.size}
                          </p>
                          
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-baseline gap-2">
                              <span className="text-lg font-medium text-gray-900">
                                ₹  {(item.price ?? 0).toFixed(2)}
                              </span>
                              {item.price && (
                                <span className="text-sm text-gray-500 line-through">
                                  ₹  {(item.originalPrice ?? 0).toFixed(2)}
                                </span>
                              )}
                              <Badge className="bg-green-500 text-white">
                                {calculateDiscount(item.price, item.originalPrice)}% OFF
                              </Badge>
                            </div>

                            <div className="flex items-center border rounded-lg">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  handleUpdateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  handleUpdateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Order Summary
                  </h2>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Subtotal</p>
                      <p className="text-sm font-medium text-gray-900">
                        ₹  {total.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Shipping</p>
                      <p className="text-sm font-medium text-gray-900">Free</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Tax</p>
                      <p className="text-sm font-medium text-gray-900">₹  0.00</p>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex items-center justify-between">
                      <p className="text-base font-medium text-gray-900">
                        Total
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        ₹  {total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <Button
                      onClick={handleOrderClick}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Proceed to Checkout
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-gray-300 hover:bg-gray-50"
                      onClick={() => dispatch(clearCart())}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={showLoginAlert} onOpenChange={setShowLoginAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Login Required</AlertDialogTitle>
            <AlertDialogDescription>
              Please log in to complete your order. We need your account details
              to ensure proper delivery of your items.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 hover:bg-gray-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/login">
                <Button className="bg-green-600 hover:bg-green-700">
                  <LogIn className="mr-2 h-4 w-4" />
                  Log In
                </Button>
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </>
  );
}