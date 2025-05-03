// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { ArrowRight } from "lucide-react";
// import { CategoryCard } from "@/components/landing-page/category-card";
// // import { MobileAppPromo } from "@/components/landing-page/mobile-app-promo";
// import { ProductCard } from "@/components/landing-page/product-card";
// import { PromotionBanner } from "@/components/landing-page/promotion-banner";
// import { HeroSection } from "@/components/landing-page/hero-carousel";
// import logo from "@/public/logo.png";
// // import { HeaderLanding } from "@/components/landing-page/header-landing";
// // import Footer from "@/components/landing-page/footer";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import ScrollToTop from "@/components/landing-page/scroll-top";
// import { useEffect, useState } from "react";
// import { CategoryData, ProductData } from "@/types";
// import { useQuery } from "@tanstack/react-query";
// import { getCategories, getFeatureProducts } from "@/lib/http/api";
// import { Footer } from "@/components/landing-page/footer";
// import { AppPromo } from "@/components/landing-page/mobile-app-promo";
// import { HeaderLanding } from "@/components/landing-page/header-landing";
// // import { HeaderLanding } from "@/components/landing-page/header-landing";
// // import { HeaderLanding } from "@/components/landing-page/header-landing";

// export default function Home() {
//   const [products, setProducts] = useState<ProductData[]>([]);
//   const [categories, setCategories] = useState<CategoryData[]>([]);

//   const { data, isLoading } = useQuery({
//     queryKey: ["getFeatureProducts"],
//     queryFn: async () => {
//       return await getFeatureProducts().then((res) => res.data);
//     },
//   });

//   useEffect(() => {
//     if (data) {
//       setProducts(data);
//     }
//   }, [data]);

//   const { data: subData, isLoading: subLoading } = useQuery({
//     queryKey: ["getCategories"],
//     queryFn: async () => {
//       return await getCategories().then((res) => res.data);
//     },
//   });

//   useEffect(() => {
//     if (subData) {
//       setCategories(subData.data);
//     }
//   }, [subData]);

//   return (
//     <div className="flex min-h-screen flex-col bg-white">
//       <ScrollToTop />

//       <HeaderLanding logo={logo}/>

//       <HeroSection />

//       <main className="flex-1">
//         {/* products  */}
//         <section className="py-8 md:py-12">
//           <div className="container px-4 md:px-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold tracking-tight">
//                 Best sellers near you
//               </h2>
//               <Link
//                 href="/products"
//                 className="flex items-center text-sm font-medium text-primary"
//               >
//                 View all
//                 <ArrowRight className="ml-1 h-4 w-4" />
//               </Link>
//             </div>
//             <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
//               {products.length > 0 &&
//                 products.map((product) => (
//                   <ProductCard key={product._id} productProps={product} />
//                 ))}
//             </div>
//           </div>
//         </section>

//         {/* Category */}
//         <section className="py-8 md:py-12 bg-muted/30">
//           <div className="container px-4 md:px-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold tracking-tight">
//                 Shop by Category
//               </h2>
//               <Link
//                 href="/category"
//                 className="flex items-center text-sm font-medium text-primary"
//               >
//                 View all
//                 <ArrowRight className="ml-1 h-4 w-4" />
//               </Link>
//             </div>
//             <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
//               {categories.length > 0 &&
//                 categories
//                   .slice(0, 6)
//                   .map((item) => (
//                     <CategoryCard
//                       key={item._id}
//                       title={item.name}
//                       image={item.image}
//                       href={`/category/${item._id}`}
//                     />
//                   ))}
//             </div>
//           </div>
//         </section>

//         {/* PromotionBanner */}
//         <section className="py-8 md:py-12">
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-6 md:grid-cols-2">
//               <PromotionBanner
//                 title="Today's Best Deal"
//                 description="Up to 50% off on selected items"
//                 image="https://img.freepik.com/free-vector/fashion-concept-youtube-thumbnail_23-2148600119.jpg?t=st=1743009243~exp=1743012843~hmac=a71ce0bf300aef7512b2a1bb545a42a12810e746f28c577874dd790d965350be&w=1380"
//                 href="/products"
//                 discount="50% OFF"
//               />
//               <PromotionBanner
//                 title="New Arrivals"
//                 description="Check out our latest products"
//                 image="https://img.freepik.com/free-vector/flat-design-fashion-stylist-webinar_23-2150007858.jpg?t=st=1743009286~exp=1743012886~hmac=f9ab875430ecf727c1118face5b19b5b6ff4eec44beb7a14a836075ee07c9217&w=1060"
//                 href="/products"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Popular Products */}
//         <section className="py-8 md:py-12">
//           <div className="container px-4 md:px-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold tracking-tight">
//                 Popular Products
//               </h2>
//               <Link
//                 href="/products"
//                 className="flex items-center text-sm font-medium text-primary"
//               >
//                 View all
//                 <ArrowRight className="ml-1 h-4 w-4" />
//               </Link>
//             </div>
//             <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
//               {products.map((product) => (
//                 <ProductCard key={product._id} productProps={product} />
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Curated Collections */}
//         <section className="py-8 md:py-12">
//           <div className="container px-4 md:px-6">
//             <h2 className="text-2xl font-bold tracking-tight mb-6">
//               Curated Collections
//             </h2>
//             <div className="grid gap-6 md:grid-cols-3">
//               <div className="group relative overflow-hidden rounded-lg">
//                 <Image
//                   src="https://img.freepik.com/free-vector/flat-design-fashion-stylist-webinar_23-2150007858.jpg?t=st=1743009286~exp=1743012886~hmac=f9ab875430ecf727c1118face5b19b5b6ff4eec44beb7a14a836075ee07c9217&w=1060"
//                   alt="Summer Essentials"
//                   width={400}
//                   height={300}
//                   className="h-[300px] w-full object-cover transition-transform group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
//                   {/* <h3 className="text-xl font-bold text-white mb-2">
//                     Summer Essentials
//                   </h3>
//                   <p className="text-white/80 mb-4">
//                     Beat the heat with our coolest products
//                   </p> */}

//                   <Button
//                     className={cn(
//                       "hover:bg-black bg-[#BD844C] text-white w-fit"
//                     )}
//                     asChild
//                     size="sm"
//                     variant="ghost"
//                   >
//                     <Link href="/products">Shop Now</Link>
//                   </Button>
//                 </div>
//               </div>
//               <div className="group relative overflow-hidden rounded-lg">
//                 <Image
//                   src="https://img.freepik.com/free-vector/fashion-concept-youtube-thumbnail_23-2148600119.jpg?t=st=1743009243~exp=1743012843~hmac=a71ce0bf300aef7512b2a1bb545a42a12810e746f28c577874dd790d965350be&w=1380"
//                   alt="Tech Gadgets"
//                   width={400}
//                   height={300}
//                   className="h-[300px] w-full object-cover transition-transform group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
//                   {/* <h3 className="text-xl font-bold text-white mb-2">
//                     Tech Gadgets
//                   </h3>
//                   <p className="text-white/80 mb-4">
//                     Discover the latest innovations
//                   </p> */}
//                   <Button
//                     className={cn(
//                       "hover:bg-black bg-[#BD844C] text-white w-fit"
//                     )}
//                     asChild
//                     size="sm"
//                     variant="ghost"
//                   >
//                     <Link href="/products">Shop Now</Link>
//                   </Button>
//                 </div>
//               </div>
//               <div className="group relative overflow-hidden rounded-lg">
//                 <Image
//                   src="https://img.freepik.com/free-vector/flat-design-fashion-stylist-webinar_23-2150007858.jpg?t=st=1743009286~exp=1743012886~hmac=f9ab875430ecf727c1118face5b19b5b6ff4eec44beb7a14a836075ee07c9217&w=1060"
//                   alt="Home Decor"
//                   width={400}
//                   height={300}
//                   className="h-[300px] w-full object-cover transition-transform group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
//                   {/* <h3 className="text-xl font-bold text-white mb-2">
//                     Home Decor
//                   </h3>
//                   <p className="text-white/80 mb-4">
//                     Transform your living space
//                   </p> */}
//                   <Button
//                     className={cn(
//                       "hover:bg-black bg-[#BD844C] text-white w-fit"
//                     )}
//                     asChild
//                     size="sm"
//                     variant="ghost"
//                   >
//                     <Link href="/products">Shop Now</Link>
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <AppPromo />
//       </main>

//       <Footer />
//     </div>
//   );
// }


// "use client";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Link from "next/link";
// import Image from "next/image";
// import { ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { useEffect, useState } from "react";
// import { CategoryData, ProductData } from "@/types";
// import { useQuery } from "@tanstack/react-query";
// import { getCategories, getFeatureProducts } from "@/lib/http/api";
// import { ProductCard } from "@/components/landing-page/product-card";
// import { PromotionBanner } from "@/components/landing-page/promotion-banner";
// import logo from "@/public/logo.png";
// import { HeaderLanding } from "@/components/landing-page/header-landing";
// import { HeroSection } from "@/components/landing-page/hero-carousel";
// import { Footer } from "@/components/landing-page/footer";
// import { AppPromo } from "@/components/landing-page/mobile-app-promo";
// import { LocationPicker } from "@/components/landing-page/location-picker";
// import { DeliveryBanner } from "@/components/landing-page/delivery-banner";
// import { Testimonials } from "@/components/landing-page/testimonials";
// import { TrustSection } from "@/components/landing-page/trust-section";
// import { InstagramFeed } from "@/components/landing-page/instagram-feed";
// import { FloatingCart } from "@/components/landing-page/floating-cart";
// import { RecentlyViewed } from "@/components/recently-viewed";
// import { MobileNavigation } from "@/components/mobile-navigation";
// import { CategoryShowcase } from "@/components/category-showcase";
// import { FeaturedProducts } from "@/components/landing-page/featuredProducts";


// export default function Home() {
//   const [products, setProducts] = useState<ProductData[]>([]);
//   const [categories, setCategories] = useState<CategoryData[]>([]);

//   const { data, isLoading } = useQuery({
//     queryKey: ["getFeatureProducts"],
//     queryFn: async () => {
//       return await getFeatureProducts().then((res) => res.data);
//     },
//   });

//   useEffect(() => {
//     if (data) {
//       setProducts(data);
//     }
//   }, [data]);

//   const { data: subData, isLoading: subLoading } = useQuery({
//     queryKey: ["getCategories"],
//     queryFn: async () => {
//       return await getCategories().then((res) => res.data);
//     },
//   });

//   useEffect(() => {
//     if (subData) {
//       setCategories(subData.data);
//     }
//   }, [subData]);

//   return (
//     <div className="flex min-h-screen flex-col bg-white">
//       <HeaderLanding logo={logo} />

//       <LocationPicker />

//       <main className="flex-1">
//         <HeroSection />

//         <DeliveryBanner />

//         {/* Category Showcase */}
//          <CategoryShowcase />
//         {/* <section className="py-16">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col md:flex-row items-center justify-between mb-10">
//               <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
//                 Shop by Category
//               </h2>
//               <Link
//                 href="/category"
//                 className="flex items-center text-sm font-medium text-primary"
//               >
//                 View all
//                 <ArrowRight className="ml-1 h-4 w-4" />
//               </Link>
//             </div>
//             <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
//               {categories.length > 0 &&
//                 categories
//                   .slice(0, 6)
//                   .map((item) => (
//                     <Link
//                       key={item._id}
//                       href={`/category/${item._id}`}
//                       className="group relative overflow-hidden rounded-lg"
//                     >
//                       <Image
//                         src={item.image}
//                         alt={item.name}
//                         width={400}
//                         height={300}
//                         className="h-[200px] w-full object-cover transition-transform group-hover:scale-105"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
//                         <h3 className="text-lg font-bold text-white">
//                           {item.name}
//                         </h3>
//                       </div>
//                     </Link>
//                   ))}
//             </div>
//           </div>
//         </section> */}

//         {/* Featured Products */}
//         <section className="py-16">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col md:flex-row items-center justify-between mb-10">
//               <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
//                 Featured Products
//               </h2>
//             </div>

//             <Tabs defaultValue="all" className="w-full">
//               <TabsList className="grid grid-cols-3 h-10 p-1 bg-green-50 rounded-full mb-6">
//                 <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-white">
//                   All
//                 </TabsTrigger>
//                 <TabsTrigger value="deals" className="rounded-full data-[state=active]:bg-white">
//                   Deals
//                 </TabsTrigger>
//                 <TabsTrigger value="popular" className="rounded-full data-[state=active]:bg-white">
//                   Popular
//                 </TabsTrigger>
//               </TabsList>

//               <TabsContent value="all" className="mt-0">
//                 <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
//                   {products.length > 0 &&
//                     products.map((product) => (
//                       <ProductCard key={product._id} productProps={product} />
//                     ))}
//                 </div>
//               </TabsContent>

//               <TabsContent value="deals" className="mt-0">
//                 <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
//                   {products.length > 0 &&
//                     products
//                       // .filter((p) => p.discount > 0)
//                       .map((product) => (
//                         <ProductCard key={product._id} productProps={product} />
//                       ))}
//                 </div>
//               </TabsContent>

//               <TabsContent value="popular" className="mt-0">
//                 <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
//                   {products.length > 0 &&
//                     products
//                       // .sort((a, b) => b.rating - a.rating)
//                       .map((product) => (
//                         <ProductCard key={product._id} productProps={product} />
//                       ))}
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </section>
//     {/* <FeaturedProducts initialProducts={products} /> */}
//         {/* Promotion Banners */}
//         {/* <section className="py-8 md:py-12">
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-6 md:grid-cols-2">
//               <PromotionBanner
//                 title="Today's Best Deal"
//                 description="Up to 50% off on selected items"
//                 image="https://img.freepik.com/free-vector/fashion-concept-youtube-thumbnail_23-2148600119.jpg?t=st=1743009243~exp=1743012843~hmac=a71ce0bf300aef7512b2a1bb545a42a12810e746f28c577874dd790d965350be&w=1380"
//                 href="/products"
//                 discount="50% OFF"
//               />
//               <PromotionBanner
//                 title="New Arrivals"
//                 description="Check out our latest products"
//                 image="https://img.freepik.com/free-vector/flat-design-fashion-stylist-webinar_23-2150007858.jpg?t=st=1743009286~exp=1743012886~hmac=f9ab875430ecf727c1118face5b19b5b6ff4eec44beb7a14a836075ee07c9217&w=1060"
//                 href="/products"
//               />
//             </div>
//           </div>
//         </section> */}

//         {/* Daily Essentials */}
//         <section className="py-16 bg-gradient-to-b from-white to-green-50">
//           <div className="container px-4 md:px-6">
//             <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-10 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
//               Daily Essentials
//             </h2>
//             <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
//               {products.length > 0 &&
//                 products
//                   // .filter((p) => p.category?.name === "Essentials")
//                   .map((product) => (
//                     <ProductCard key={product._id} productProps={product} />
//                   ))}
//             </div>
//           </div>
//         </section>

//         <Testimonials />

//         <RecentlyViewed />

//         <TrustSection />

//         <InstagramFeed />

//         <AppPromo />
//       </main>

//       <Footer />

//       <MobileNavigation />

//       <FloatingCart />
//     </div>
//   );
// } 



"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronRight, ShoppingBag, Star } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getCategories, getFeatureProducts } from "@/lib/http/api"
import type { CategoryData, ProductData } from "@/types"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

import { HeaderLanding } from "@/components/landing-page/header-landing"
import { Footer } from "@/components/landing-page/footer"
import { ProductCard } from "@/components/landing-page/product-card"
import { HeroSection } from "@/components/landing-page/hero-carousel"
import { AppPromo } from "@/components/landing-page/mobile-app-promo"
import logo from "@/public/logo.png"
import { FloatingCart } from "@/components/landing-page/floating-cart"

export default function Home() {
  const [products, setProducts] = useState<ProductData[]>([])
  const [categories, setCategories] = useState<CategoryData[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ["getFeatureProducts"],
    queryFn: async () => {
      return await getFeatureProducts().then((res) => res.data)
    },
  })

  useEffect(() => {
    if (data) {
      setProducts(data)
    }
  }, [data])

  const { data: subData, isLoading: subLoading } = useQuery({
    queryKey: ["getCategories"],
    queryFn: async () => {
      return await getCategories().then((res) => res.data)
    },
  })

  useEffect(() => {
    if (subData) {
      setCategories(subData.data)
    }
  }, [subData])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <HeaderLanding logo={logo} />

      {/* Location Picker */}
      <div className="bg-green-50 py-2">
        <div className="container mx-auto px-4 flex items-center justify-center md:justify-start gap-2 text-sm">
          <span className="text-green-700 font-medium">Delivering to:</span>
          <button className="flex items-center gap-1 text-green-900 hover:text-green-700 transition-colors underline underline-offset-2">
            Mhasla, Mhasla Raigad
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Delivery Banner */}
        <section className="bg-gradient-to-r from-green-50 to-green-100 py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4 justify-center">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  <ShoppingBag className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Free Shipping</h3>
                  <p className="text-sm text-gray-600">On orders over ₹  200</p>
                </div>
              </div>
              <div className="flex items-center gap-4 justify-center">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Secure Payment</h3>
                  <p className="text-sm text-gray-600">100% secure transactions</p>
                </div>
              </div>
              <div className="flex items-center gap-4 justify-center">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Express Delivery</h3>
                  <p className="text-sm text-gray-600">Get it within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Showcase */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                Shop by Category
              </h2>
              <Link
                href="/category"
                className="flex items-center text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
              >
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {categories.length > 0 &&
                categories.slice(0, 6).map((item) => (
                  <Link
                    key={item._id}
                    href={`/category/${item._id}`}
                    className="group relative overflow-hidden rounded-lg shadow-sm border border-gray-100"
                  >
                    <div className="h-[180px] overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={400}
                        height={300}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
                      <h3 className="text-lg font-bold text-white">{item.name}</h3>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                Featured Products
              </h2>
              <Link
                href="/products"
                className="flex items-center text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
              >
                View all products
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-3 h-12 p-1 bg-green-50 rounded-full mb-8 w-full max-w-md mx-auto">
                <TabsTrigger
                  value="all"
                  className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  All Products
                </TabsTrigger>
                <TabsTrigger
                  value="deals"
                  className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Best Deals
                </TabsTrigger>
                <TabsTrigger
                  value="popular"
                  className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Popular
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {products.length > 0 &&
                    products.map((product) => <ProductCard key={product._id} productProps={product} />)}
                </div>
              </TabsContent>

              <TabsContent value="deals" className="mt-0">
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {products.length > 0 &&
                    products
                      .filter((p) => p.variants[0]?.discount > 0)
                      .map((product) => <ProductCard key={product._id} productProps={product} />)}
                </div>
              </TabsContent>

              <TabsContent value="popular" className="mt-0">
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {products.length > 0 &&
                    products
                      .filter((p) => p.isFeatured)
                      .map((product) => <ProductCard key={product._id} productProps={product} />)}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Daily Essentials */}
        <section className="py-16 bg-gradient-to-b from-white to-green-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-10 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Daily Essentials
            </h2>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {products.length > 0 &&
                products.slice(0, 5).map((product) => <ProductCard key={product._id} productProps={product} />)}
            </div>
            <div className="flex justify-center mt-10">
              <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8" asChild>
                <Link href="/products">View All Essentials</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-10 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">
                    "The products arrived faster than expected and the quality was excellent. I'm very satisfied with my
                    purchase and will definitely shop here again!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 font-medium">{String.fromCharCode(64 + i)}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Customer {i}</h4>
                      <p className="text-sm text-gray-500">Verified Buyer</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="font-medium">Quality Guaranteed</h3>
                <p className="text-sm text-gray-600 mt-1">All products are quality checked</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                </div>
                <h3 className="font-medium">Fast Delivery</h3>
                <p className="text-sm text-gray-600 mt-1">Same-day delivery available</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
                <h3 className="font-medium">Customer Satisfaction</h3>
                <p className="text-sm text-gray-600 mt-1">Rated 4.9/5 by our customers</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <h3 className="font-medium">Easy Returns</h3>
                <p className="text-sm text-gray-600 mt-1">30-day hassle-free returns</p>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Feed */}
        {/* <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Follow Us on Instagram
            </h2>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
              Tag us in your posts to be featured on our page and get a chance to win exclusive discounts
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <a key={i} href="#" className="block group relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={`/placeholder.svg?height=400&width=400`}
                    alt={`Instagram post ${i}`}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section> */}

        {/* Mobile App Promo */}
        <AppPromo />
      </main>

      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6 z-50">
      {<FloatingCart/>}
        {/* <Link href="/cart">
          <Button className="h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg flex items-center justify-center relative">
            <ShoppingBag className="h-6 w-6 text-white" />
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">3</Badge>
          </Button>
        </Link> */}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 py-2 px-4">
        <div className="grid grid-cols-5 gap-1">
          <Link href="/" className="flex flex-col items-center text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link href="/category" className="flex flex-col items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            <span className="text-xs mt-1">Categories</span>
          </Link>
          {<FloatingCart/>}
          {/* <Link href="/cart" className="flex flex-col items-center text-gray-500">
            <div className="relative">
              <ShoppingBag className="h-6 w-6" />
              <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                3
              </Badge>
            </div>
            <span className="text-xs mt-1">Cart</span>
          </Link> */}
          <Link href="/my-orders" className="flex flex-col items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span className="text-xs mt-1">Orders</span>
          </Link>
          <Link href="/account" className="flex flex-col items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className="text-xs mt-1">Account</span>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
