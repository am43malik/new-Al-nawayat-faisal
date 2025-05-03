// "use client";
// import React from "react";
// import { z } from "zod";
// import { v4 as uuidv4 } from "uuid";
// import {
//   Coins,
//   CreditCard,
//   LoaderCircle,
//   Plus,
//   ShoppingCart,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import AddAdress from "./components/addAddress";
// import { Separator } from "@/components/ui/separator";
// import { useAppSelector } from "@/redux/store";
// import { useAuth } from "@/hooks/use-auth";
// import { useMutation } from "@tanstack/react-query";
// import { createOrderUser } from "@/lib/http/api";
// import toast from "react-hot-toast";
// import { AxiosError } from "axios";
// import { useRouter } from "next/navigation";
// import logo from "@/public/logo.png";
// import { HeaderLanding } from "@/components/landing-page/header-landing";
// import {Footer} from "@/components/landing-page/footer";

// const addressSchema = z.object({
//   formatted_address: z.string(),
//   lat: z.number(),
//   lng: z.number(),
// });

// const formSchema = z.object({
//   address: addressSchema,
//   paymentMode: z.enum(["online", "cash"], {
//     required_error: "You need to select a payment mode type.",
//   }),
// });

// const Page = () => {
//   const customerForm = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//   });

//   const { UserData } = useAuth();
//   const idempotencyKeyRef = React.useRef("");
//   const router = useRouter();

//   const { items, total } = useAppSelector((state) => state.cart);

//   const selectedAddress = customerForm.getValues("address");

//   const { mutate, isPending } = useMutation({
//     mutationKey: ["createOrder"],
//     mutationFn: async (data: any) => {
//       const idempotencyKey = idempotencyKeyRef.current
//         ? idempotencyKeyRef.current
//         : (idempotencyKeyRef.current = uuidv4() + UserData?._id);
//       return await createOrderUser(data, idempotencyKey);
//     },
//     retry: 3,
//     onSuccess: (data) => {
//       // if (data.data.paymentOnline) {
//       //   const options = {
//       //     key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
//       //     amount: data.data.data.amount,
//       //     currency: "INR",
//       //     name: "Meatara",
//       //     description: "",
//       //     order_id: data.data.data.id,
//       //     callback_url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order/payment-success`,
//       //     prefill: {
//       //       name: UserData!.firstName + UserData!.lastName,
//       //       email: "",
//       //       contact: UserData!.mobileNo,
//       //     },
//       //     theme: {
//       //       color: "#B02528",
//       //     },
//       //   };

//       //   //@ts-ignore
//       //   const rzp = new Razorpay(options);
//       //   rzp.open();
//       // } else {
//       //   router.push(
//       //     `/payment?reference=${data.data.refId}&orderId=${data.data.orderId}&success=true`
//       //   );
//       // }
//       router.push(
//         `/payment?reference=${data.data.refId}&orderId=${data.data.orderId}&success=true`
//       );
//     },
//     onError(error, variables, context) {
//       if (error instanceof AxiosError) {
//         toast.error(error.response?.data.errors[0].msg);
//       } else {
//         toast.error("Something went wrong!");
//       }
//     },
//   });

//   const handlePlaceOrder = (data: z.infer<typeof formSchema>) => {
//     mutate({
//       paymentMethod: customerForm.getValues("paymentMode"),
//       paymentIntent: "",
//       totalAmount: total,
//       address: {
//         formatted_address: selectedAddress.formatted_address,
//         lat: selectedAddress.lat,
//         lng: selectedAddress.lng,
//       },
//       deliveryCharges: 0,
//       discount: 0,
//       taxes: 0,
//       details: items.map((item) => ({
//         productId: item.productId,
//         quantity: item.quantity,
//         price: item.price,
//         total: item.total,
//         attributes: item.attributes,
//       })),
//     });
//   };

//   const handleCouponValidation = (e: React.MouseEvent) => {
//     e.preventDefault();

//     // mutate();
//   };

//   return (
//     <>
//       <HeaderLanding logo={logo} />
//       <div className="min-h-screen bg-gray-50">
//         <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
//           <Form {...customerForm}>
//             <form onSubmit={customerForm.handleSubmit(handlePlaceOrder)}>
//               <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
//                 <Card className="lg:col-span-7 border-none">
//                   <CardHeader>
//                     <CardTitle>Customer details</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid gap-6">
//                       <div className="grid gap-3">
//                         <Label htmlFor="fname">Full Name</Label>
//                         <Input
//                           id="fname"
//                           type="text"
//                           className="w-full"
//                           disabled
//                           defaultValue={
//                             UserData?.firstName + " " + UserData?.lastName
//                           }
//                         />
//                       </div>
//                       <div className="grid gap-3">
//                         <Label htmlFor="mobileNo">Mobile No</Label>
//                         <Input
//                           id="mobileNo"
//                           type="text"
//                           className="w-full"
//                           disabled
//                           defaultValue={UserData?.mobileNo}
//                         />
//                       </div>
//                       <div className="grid gap-3">
//                         <div>
//                           <div className="flex items-center justify-between">
//                             <Label htmlFor="name">Address</Label>
//                             <AddAdress />
//                           </div>

//                           <FormField
//                             name="address"
//                             control={customerForm.control}
//                             render={({ field }) => {
//                               return (
//                                 <FormItem>
//                                   <FormControl>
//                                     <RadioGroup
//                                       onValueChange={(val) =>
//                                         field.onChange(JSON.parse(val))
//                                       }
//                                       className="grid grid-cols-2 gap-6 mt-2"
//                                     >
//                                       {UserData?.address.map((address) => {
//                                         return (
//                                           <Card
//                                             className="p-6"
//                                             key={address.formatted_address}
//                                           >
//                                             <div className="flex items-center space-x-2">
//                                               <FormControl>
//                                                 <RadioGroupItem
//                                                   value={JSON.stringify(
//                                                     address
//                                                   )}
//                                                   id={address.formatted_address}
//                                                 />
//                                               </FormControl>
//                                               <Label
//                                                 htmlFor={
//                                                   address.formatted_address
//                                                 }
//                                                 className="leading-normal"
//                                               >
//                                                 {address.formatted_address}
//                                               </Label>
//                                             </div>
//                                           </Card>
//                                         );
//                                       })}
//                                     </RadioGroup>
//                                   </FormControl>
//                                   <FormMessage />
//                                 </FormItem>
//                               );
//                             }}
//                           />
//                         </div>
//                       </div>
//                       <div className="grid gap-3">
//                         <Label>Payment Mode</Label>
//                         <FormField
//                           name="paymentMode"
//                           control={customerForm.control}
//                           render={({ field }) => {
//                             return (
//                               <FormItem>
//                                 <FormControl>
//                                   <RadioGroup
//                                     onValueChange={field.onChange}
//                                     className="flex gap-6"
//                                   >
//                                     <div className="w-36">
//                                       <FormControl>
//                                         <RadioGroupItem
//                                           value={"online"}
//                                           id={"online"}
//                                           className="peer sr-only"
//                                           aria-label={"online"}
//                                         />
//                                       </FormControl>
//                                       <Label
//                                         htmlFor={"online"}
//                                         className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
//                                       >
//                                         <CreditCard size={"20"} />
//                                         <span className="ml-2">Online</span>
//                                       </Label>
//                                     </div>
//                                     <div className="w-36">
//                                       <FormControl>
//                                         <RadioGroupItem
//                                           value={"cash"}
//                                           id={"cash"}
//                                           className="peer sr-only"
//                                           aria-label={"cash"}
//                                         />
//                                       </FormControl>
//                                       <Label
//                                         htmlFor={"cash"}
//                                         className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
//                                       >
//                                         <Coins size={"20"} />
//                                         <span className="ml-2 text-md">
//                                           Cash
//                                         </span>
//                                       </Label>
//                                     </div>
//                                   </RadioGroup>
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             );
//                           }}
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//                 <div className="mt-8 lg:col-span-5 lg:mt-0">
//                   <Card>
//                     <CardContent className="p-6">
//                       <h2 className="text-lg font-medium text-gray-900">
//                         Order Summary
//                       </h2>
//                       <div className="mt-6 space-y-4">
//                         <div className="flex items-center justify-between">
//                           <p className="text-sm text-gray-600">Subtotal</p>
//                           <p className="text-sm font-medium text-gray-900">
//                             ₹  {total}
//                           </p>
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <p className="text-sm text-gray-600">Taxes</p>
//                           <p className="text-sm font-medium text-gray-900">
//                             ₹  0
//                           </p>
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <p className="text-sm text-gray-600">
//                             Delivery charges
//                           </p>
//                           <p className="text-sm font-medium text-gray-900">
//                             ₹  0
//                           </p>
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <p className="text-sm text-gray-600">Discount</p>
//                           <p className="text-sm font-medium text-gray-900">
//                             ₹  0
//                           </p>
//                         </div>
//                         <Separator />
//                         <div className="flex items-center justify-between">
//                           <p className="text-base font-medium text-gray-900">
//                             Total
//                           </p>
//                           <p className="text-xl font-semibold text-gray-900">
//                             ₹  {total}
//                           </p>
//                         </div>
//                         {/* {discountError && <div className="text-red-500">{discountError}</div>} */}
//                         <div className="flex items-center gap-4">
//                           <Input
//                             id="coupon"
//                             name="code"
//                             type="text"
//                             className="w-full"
//                             placeholder="Coupon code"
//                             // ref={couponCodeRef}
//                           />
//                           {/* todo: add loading */}
//                           <Button
//                             onClick={handleCouponValidation}
//                             variant={"outline"}
//                           >
//                             Apply
//                           </Button>
//                         </div>
//                       </div>
//                       <div className="mt-6 space-y-3">
//                         <Button className="w-full bg-[#BD844C] hover:bg-[#9e6f3f] text-white border-[#BD844C] hover:border-[#BD844C]">
//                           {isPending ? (
//                             <span className="flex items-center gap-2">
//                               <LoaderCircle className="animate-spin" />
//                               <span>Please wait...</span>
//                             </span>
//                           ) : (
//                             <>
//                               <ShoppingCart className="mr-2 h-4 w-4" />
//                               Place Order
//                             </>
//                           )}
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </div>
//             </form>
//           </Form>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Page;


"use client";
import React, { useState, useRef } from "react";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import {
  Coins,
  CreditCard,
  LoaderCircle,
  ShoppingCart,
  Home,
  User,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Phone,
  Package,
  Truck,
  MapPin,
  CreditCardIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import AddAdress from "./components/addAddress";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/redux/store";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { createOrderUser } from "@/lib/http/api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import logo from "@/public/logo.png";
import { HeaderLanding } from "@/components/landing-page/header-landing";
import { Footer } from "@/components/landing-page/footer";
import { Textarea } from "@/components/ui/textarea";

const addressSchema = z.object({
  formatted_address: z.string(),
  lat: z.number(),
  lng: z.number(),
});

const formSchema = z.object({
  address: addressSchema,
  paymentMode: z.enum(["online", "cash"], {
    required_error: "You need to select a payment mode type.",
  }),
  deliveryInstructions: z.string().optional(),
});

const Page = () => {
  const [currentStep, setCurrentStep] = useState("customer");
  const [couponCode, setCouponCode] = useState("");
  const couponInputRef = useRef(null);
  
  const customerForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deliveryInstructions: "",
    }
  });

  const { UserData } = useAuth();
  const idempotencyKeyRef = React.useRef("");
  const router = useRouter();

  const { items, total } = useAppSelector((state) => state.cart);

  const selectedAddress = customerForm.getValues("address");

  const { mutate, isPending } = useMutation({
    mutationKey: ["createOrder"],
    mutationFn: async (data) => {
      const idempotencyKey = idempotencyKeyRef.current
        ? idempotencyKeyRef.current
        : (idempotencyKeyRef.current = uuidv4() + UserData?._id);
      return await createOrderUser(data, idempotencyKey);
    },
    retry: 3,
    onSuccess: (data) => {
      router.push(
        `/payment?reference=${data.data.refId}&orderId=${data.data.orderId}&success=true`
      );
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.errors[0].msg);
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  const handlePlaceOrder = (data) => {
    mutate({
      paymentMethod: customerForm.getValues("paymentMode"),
      paymentIntent: "",
      totalAmount: total,
      address: {
        formatted_address: selectedAddress.formatted_address,
        lat: selectedAddress.lat,
        lng: selectedAddress.lng,
      },
      deliveryInstructions: data.deliveryInstructions,
      deliveryCharges: 0,
      discount: 0,
      taxes: 0,
      details: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
        attributes: item.attributes,
      })),
    });
  };

  const handleCouponValidation = (e) => {
    e.preventDefault();
    
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }
    
    // Placeholder for coupon validation
    toast.success("Coupon applied successfully!");
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const deliveryFee = 0; // Placeholder, you can calculate based on business logic
  const taxes = 0; // Placeholder
  const discount = 0; // Placeholder

  const checkoutSteps = [
    { id: "customer", label: "Customer Details", icon: <User className="h-4 w-4" /> },
    { id: "address", label: "Address", icon: <Home className="h-4 w-4" /> },
    { id: "payment", label: "Payment", icon: <CreditCard className="h-4 w-4" /> },
    { id: "confirmation", label: "Confirmation", icon: <CheckCircle2 className="h-4 w-4" /> },
  ];

  return (
    <>
      <HeaderLanding logo={logo} />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">Checkout</h1>
          
          {/* Progress Tracker */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-between max-w-3xl mx-auto">
              {checkoutSteps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full
                      ${currentStep === step.id ? "bg-blue-600 text-white" : 
                        index < checkoutSteps.findIndex(s => s.id === currentStep) ? 
                        "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}>
                      {step.icon}
                    </div>
                    <div className={`ml-3 text-sm font-medium
                      ${currentStep === step.id ? "text-blue-600" : 
                        index < checkoutSteps.findIndex(s => s.id === currentStep) ? 
                        "text-green-500" : "text-gray-500"}`}>
                      {step.label}
                    </div>
                  </div>
                  {index < checkoutSteps.length - 1 && (
                    <div className="hidden md:block h-px w-16 bg-gray-200"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <Form {...customerForm}>
            <form onSubmit={customerForm.handleSubmit(handlePlaceOrder)}>
              <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                <div className="lg:col-span-7">
                  {/* Customer Details Step */}
                  {currentStep === "customer" && (
                    <Card className="shadow-sm border-none mb-6">
                      <CardHeader className="bg-blue-50 border-b border-blue-100">
                        <CardTitle className="flex items-center text-blue-800">
                          <User className="mr-2 h-5 w-5" />
                          Customer Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <Label htmlFor="fname" className="text-gray-700">Full Name</Label>
                            <Input
                              id="fname"
                              type="text"
                              className="w-full border-gray-300"
                              disabled
                              defaultValue={
                                UserData?.firstName + " " + UserData?.lastName
                              }
                            />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="mobileNo" className="text-gray-700">Mobile Number</Label>
                            <Input
                              id="mobileNo"
                              type="text"
                              className="w-full border-gray-300"
                              disabled
                              defaultValue={UserData?.mobileNo}
                            />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              className="w-full border-gray-300"
                              placeholder="your@email.com"
                            />
                          </div>
                          <Button 
                            type="button"
                            onClick={() => goToStep("address")} 
                            className="bg-blue-600 hover:bg-blue-700 text-white mt-4"
                          >
                            Continue to Address
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Address Step */}
                  {currentStep === "address" && (
                    <Card className="shadow-sm border-none mb-6">
                      <CardHeader className="bg-blue-50 border-b border-blue-100">
                        <CardTitle className="flex items-center text-blue-800">
                          <MapPin className="mr-2 h-5 w-5" />
                          Delivery Address
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <div className="flex items-center justify-between">
                              <Label className="text-gray-700">Select Address</Label>
                              <AddAdress />
                            </div>

                            <FormField
                              name="address"
                              control={customerForm.control}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={(val) =>
                                        field.onChange(JSON.parse(val))
                                      }
                                      className="grid gap-4 mt-2"
                                    >
                                      {UserData?.address.map((address) => (
                                        <Card
                                          className="p-4 border hover:border-blue-300 transition-all cursor-pointer"
                                          key={address.formatted_address}
                                        >
                                          <div className="flex items-center space-x-3">
                                            <FormControl>
                                              <RadioGroupItem
                                                value={JSON.stringify(address)}
                                                id={address.formatted_address}
                                              />
                                            </FormControl>
                                            <div className="flex-1">
                                              <Label
                                                htmlFor={address.formatted_address}
                                                className="font-medium text-gray-800 block mb-1"
                                              >
                                                Delivery Address
                                              </Label>
                                              <p className="text-gray-600 text-sm">
                                                {address.formatted_address}
                                              </p>
                                            </div>
                                          </div>
                                        </Card>
                                      ))}
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid gap-3">
                            <Label htmlFor="deliveryInstructions" className="text-gray-700">
                              Delivery Instructions (Optional)
                            </Label>
                            <Textarea
                              id="deliveryInstructions"
                              placeholder="Add any special instructions for delivery"
                              className="resize-none"
                              {...customerForm.register("deliveryInstructions")}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <Button 
                              type="button"
                              variant="outline" 
                              onClick={() => goToStep("customer")}
                              className="border-gray-300"
                            >
                              <ChevronLeft className="mr-2 h-4 w-4" />
                              Back
                            </Button>
                            <Button 
                              type="button"
                              onClick={() => goToStep("payment")} 
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              Continue to Payment
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Payment Step */}
                  {currentStep === "payment" && (
                    <Card className="shadow-sm border-none mb-6">
                      <CardHeader className="bg-blue-50 border-b border-blue-100">
                        <CardTitle className="flex items-center text-blue-800">
                          <CreditCard className="mr-2 h-5 w-5" />
                          Payment Method
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid gap-6">
                          <FormField
                            name="paymentMode"
                            control={customerForm.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    className="grid gap-4"
                                  >
                                    <Card className="p-4 border hover:border-blue-300 transition-all cursor-pointer">
                                      <div className="flex items-center space-x-3">
                                        <FormControl>
                                          <RadioGroupItem
                                            value="online"
                                            id="online"
                                          />
                                        </FormControl>
                                        <div className="flex items-center flex-1">
                                          <CreditCard className="h-5 w-5 text-blue-600 mr-3" />
                                          <div>
                                            <Label
                                              htmlFor="online"
                                              className="font-medium text-gray-800 block"
                                            >
                                              Online Payment
                                            </Label>
                                            <p className="text-gray-600 text-sm">
                                              Pay securely via credit/debit card or banking apps
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </Card>
                                    
                                    <Card className="p-4 border hover:border-blue-300 transition-all cursor-pointer">
                                      <div className="flex items-center space-x-3">
                                        <FormControl>
                                          <RadioGroupItem
                                            value="cash"
                                            id="cash"
                                          />
                                        </FormControl>
                                        <div className="flex items-center flex-1">
                                          <Coins className="h-5 w-5 text-amber-600 mr-3" />
                                          <div>
                                            <Label
                                              htmlFor="cash"
                                              className="font-medium text-gray-800 block"
                                            >
                                              Cash on Delivery
                                            </Label>
                                            <p className="text-gray-600 text-sm">
                                              Pay with cash when your order is delivered
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </Card>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex items-center justify-between mt-4">
                            <Button 
                              type="button"
                              variant="outline" 
                              onClick={() => goToStep("address")}
                              className="border-gray-300"
                            >
                              <ChevronLeft className="mr-2 h-4 w-4" />
                              Back
                            </Button>
                            <Button 
                              type="submit"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              disabled={isPending}
                            >
                              {isPending ? (
                                <span className="flex items-center gap-2">
                                  <LoaderCircle className="animate-spin" />
                                  <span>Processing...</span>
                                </span>
                              ) : (
                                <>
                                  <ShoppingCart className="mr-2 h-4 w-4" />
                                  Place Order
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-5 mt-8 lg:mt-0">
                  <Card className="shadow-sm border-none sticky top-6">
                    <CardHeader className="bg-blue-50 border-b border-blue-100">
                      <CardTitle className="flex items-center text-blue-800">
                        <Package className="mr-2 h-5 w-5" />
                        Order Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      {items.length > 0 && (
                        <div className="mb-6">
                          <div className="max-h-64 overflow-y-auto pr-2">
                            {items.map((item, index) => (
                              <div key={index} className="flex items-center justify-between py-3 border-b">
                                <div className="flex items-center">
                                  <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                                    <Package className="h-6 w-6 text-gray-500" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-800">
                                      {item.name || `Item #${index + 1}`}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      Qty: {item.quantity}
                                    </p>
                                  </div>
                                </div>
                                <p className="font-medium text-gray-800">
                                  ₹  {item.total || (item.price * item.quantity)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-gray-600">Subtotal</p>
                          <p className="font-medium text-gray-800">₹  {total}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-600">Delivery Fee</p>
                          <p className="font-medium text-gray-800">
                            {deliveryFee > 0 ? `₹  ${deliveryFee}` : "Free"}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-600">Taxes</p>
                          <p className="font-medium text-gray-800">₹  {taxes}</p>
                        </div>
                        {discount > 0 && (
                          <div className="flex items-center justify-between">
                            <p className="text-gray-600">Discount</p>
                            <p className="font-medium text-green-600">-₹  {discount}</p>
                          </div>
                        )}
                        <div className="flex items-center gap-4 mt-4">
                          <Input
                            id="coupon"
                            type="text"
                            className="w-full"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            ref={couponInputRef}
                          />
                          <Button
                            onClick={handleCouponValidation}
                            variant="outline"
                            className="whitespace-nowrap"
                          >
                            Apply
                          </Button>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-semibold text-gray-900">Total</p>
                          <p className="text-xl font-bold text-blue-600">
                            ₹  {total + deliveryFee + taxes - discount}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                          <Truck className="h-4 w-4" />
                          <span>Estimated delivery time: 30-45 minutes</span>
                        </div>
                        
                        <div className="bg-blue-50 rounded-md p-4 text-sm text-blue-800">
                          <p className="flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-blue-600" />
                            Safe & secure payments
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;