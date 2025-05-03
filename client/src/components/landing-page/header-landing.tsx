// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   ShoppingCart,
//   Search,
//   User,
//   Menu,
//   X,
//   ChevronDown,
//   MapPin,
//   Heart,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { useAppSelector } from "@/redux/store";
// import { CategoryData } from "@/types";
// import { useQuery } from "@tanstack/react-query";
// import { getCategories } from "@/lib/http/api";
// import UserProfile from "./user-profile";
// import { useAuth } from "@/hooks/use-auth";
// import SearchBar from "./search-landing";

// interface HeaderProps {
//   logo: any;
// }

// export function HeaderLanding({ logo }: HeaderProps) {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [showMobileSearch, setShowMobileSearch] = useState(false);
//   const [categories, setCategories] = useState<CategoryData[]>([]);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const items = useAppSelector((state) => state.cart.items);

//   const wishlistItems = useAppSelector((state) => state.cart.wishlist);

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

//   const { isUser } = useAuth();

//   return (
//     <header
//       className={`sticky top-0 z-50 w-full transition-all duration-300 ${
//         isScrolled ? "bg-white shadow-md py-2" : "bg-white py-3"
//       }`}
//     >
//       <div className="container px-4">
//         {/* Mobile Search Bar (conditionally rendered) */}
//         {showMobileSearch && (
//           <div className="md:hidden py-2 mb-2 animate-in fade-in slide-in-from-top duration-300">
//             <div className="relative">
//               <Input
//                 type="search"
//                 placeholder="What are you looking for..."
//                 className="w-full rounded-full pr-8 border-emerald-500 focus:ring-emerald-500"
//                 autoFocus
//               />
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="absolute right-0 top-0 text-emerald-500"
//                 onClick={() => setShowMobileSearch(false)}
//               >
//                 <X className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         )}

//         {/* Main Header Row */}
//         <div className="flex items-center justify-between">
//           {/* Left Section: Logo & Mobile Menu */}
//           <div className="flex items-center gap-2">
//             {/* Mobile Menu */}
//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button variant="ghost" size="icon" className="md:hidden">
//                   <Menu className="h-6 w-6" />
//                   <span className="sr-only">Menu</span>
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="left" className="w-[300px] sm:w-[350px]">
//                 <div className="flex flex-col h-full">
//                   <div className="py-6 border-b">
//                     <Link href="/" className="inline-block mb-6">
//                       <Image
//                         src={logo || "/placeholder.svg"}
//                         alt="logo"
//                         width={100}
//                         height={100}
//                         className="w-20"
//                       />
//                     </Link>
//                     <div className="relative mb-4">
//                       <Input
//                         type="search"
//                         placeholder="Search products..."
//                         className="w-full rounded-full pr-8"
//                       />
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="absolute right-0 top-0 text-muted-foreground"
//                       >
//                         <Search className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>

//                   <nav className="flex flex-col py-4 flex-1 overflow-y-auto">
//                     {categories.length > 0 &&
//                       categories.map((item) => (
//                         <Link key={item._id} href={`/category/${item._id}`}>
//                           <Button
//                             variant="ghost"
//                             className="justify-start mb-1"
//                           >
//                             {item.name}
//                           </Button>
//                         </Link>
//                       ))}

//                     <div className="mt-auto pt-4 border-t">
//                       <div className="flex items-center gap-2 mb-4">
//                         <MapPin className="h-4 w-4 text-emerald-500" />
//                         <span className="text-sm">
//                           Delivery:{" "}
//                           <span className="text-emerald-500 font-medium">
//                             Address
//                           </span>
//                         </span>
//                       </div>
//                       <div className="flex gap-2">
//                         <Button
//                           variant="outline"
//                           className="flex-1 justify-start gap-2"
//                         >
//                           <User className="h-4 w-4" />
//                           Sign In
//                         </Button>
//                         <Button
//                           variant="outline"
//                           className="flex-1 justify-start gap-2"
//                         >
//                           <Heart className="h-4 w-4" />
//                           Wishlist
//                         </Button>
//                       </div>
//                     </div>
//                   </nav>
//                 </div>
//               </SheetContent>
//             </Sheet>

//             {/* Logo */}
//             <Link href="/" className="inline-block">
//               <Image
//                 src={logo || "/placeholder.svg"}
//                 alt="logo"
//                 width={100}
//                 height={100}
//                 className="w-20"
//               />
//             </Link>
//           </div>

//           {/* Center Section: Desktop Navigation */}
//           <nav className="hidden lg:flex items-center space-x-6">
//             {categories.length > 0 &&
//               categories.map((item) => (
//                 <Link
//                   key={item._id}
//                   href={`/category/${item._id}`}
//                   className="text-black hover:text-[#BD844C]"
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//           </nav>

//           {/* Right Section: Search, Cart, User */}
//           <div className="flex items-center gap-1 md:gap-3">
//             {/* Desktop Search */}
//             <div className="hidden md:block relative">
//               <SearchBar />
//             </div>

//             {/* Delivery Address (Desktop) */}
//             <div className="hidden md:flex items-center gap-1 border-l border-r px-3 text-black">
//               <MapPin className="h-4 w-4" />
//               <span className="text-xs">Location:</span>
//               <span className="flex items-center gap-1 h-8 p-0 px-1">
//                 <span className="text-xs font-medium">Address</span>
//                 <ChevronDown className="h-3 w-3" />
//               </span>
//             </div>

//             {/* User */}
//             {isUser ? (
//               <UserProfile />
//             ) : (
//               <Link
//                 href="/login"
//                 className="hidden md:flex text-black hover:text-[#BD844C]"
//               >
//                 <User className="h-5 w-5" />
//                 <span className="sr-only">Account</span>
//               </Link>
//             )}

//             <Link
//               href="/wishlist"
//               className="relative text-black hover:text-[#BD844C]"
//             >
//               <Heart className="h-5 w-5" />
//               <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full p-0 bg-[#BD844C] text-[10px]">
//                 {wishlistItems.length}
//               </Badge>
//               <span className="sr-only">Wishlist</span>
//             </Link>

//             {/* Cart */}
//             <Link
//               href="/cart"
//               className="relative text-black hover:text-[#BD844C]"
//             >
//               <ShoppingCart className="h-5 w-5" />
//               <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full p-0 bg-[#BD844C] text-[10px]">
//                 {items.length}
//               </Badge>
//               <span className="sr-only">Cart</span>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { ShoppingCart, Search, User, Menu, X, MapPin, Heart, Bell } from "lucide-react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { useAppSelector } from "@/redux/store";
// import { CategoryData } from "@/types";
// import { useQuery } from "@tanstack/react-query";
// import { getCategories } from "@/lib/http/api";
// import UserProfile from "./user-profile";
// import { useAuth } from "@/hooks/use-auth";
// import SearchBar from "./search-landing";


// export function HeaderLanding() {
//     const [isScrolled, setIsScrolled] = useState(false);
//   const [showMobileSearch, setShowMobileSearch] = useState(false);
//   const [categories, setCategories] = useState<CategoryData[]>([]);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const items = useAppSelector((state) => state.cart.items);

//   const wishlistItems = useAppSelector((state) => state.cart.wishlist);

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

//   const { isUser } = useAuth();
//   return (
//     <header
//       className={`sticky top-0 z-50 w-full transition-all duration-300 ${
//         isScrolled ? "bg-white shadow-md py-2" : "bg-white py-3"
//       }`}
//     >
//       <div className="container px-4 mx-auto">
//         {/* Mobile Search Bar */}
//         <AnimatePresence>
//           {showMobileSearch && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.2 }}
//               className="md:hidden py-2 mb-2"
//             >
//               <div className="relative">
//                 <Input
//                   type="search"
//                   placeholder="Search for groceries, essentials..."
//                   className="w-full rounded-full pr-10 border-green-500 focus-visible:ring-green-500"
//                   autoFocus
//                 />
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="absolute right-0 top-0 text-green-500"
//                   onClick={() => setShowMobileSearch(false)}
//                 >
//                   <X className="h-4 w-4" />
//                 </Button>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <div className="flex items-center justify-between">
//           {/* Left: Mobile Menu + Logo */}
//           <div className="flex items-center gap-3">
//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button variant="ghost" size="icon" className="md:hidden">
//                   <Menu className="h-6 w-6" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="left" className="w-[300px] sm:w-[350px]">
//                 <div className="flex flex-col h-full">
//                   <div className="py-6 border-b">
//                     <Link href="/" className="inline-block mb-6">
//                       <div className="flex items-center gap-2">
//                         <div className="bg-green-600 text-white p-2 rounded-md">
//                           🛒
//                         </div>
//                         <span className="font-bold text-lg">QuickMart</span>
//                       </div>
//                     </Link>
//                     <div className="relative mb-4">
//                       <Input
//                         type="search"
//                         placeholder="Search groceries..."
//                         className="w-full rounded-full pr-10 border-green-200 focus-visible:ring-green-500"
//                       />
//                       <Button variant="ghost" size="icon" className="absolute right-0 top-0 text-muted-foreground">
//                         <Search className="h-4 w-4" />
//                       </Button>


//                     </div>
//                   </div>

//                   <nav className="flex flex-col py-4 flex-1 overflow-y-auto">
//                   {categories.length > 0 &&
//                       categories.map((item) => (
//                         <Link key={item._id} href={`/category/${item._id}`}>
//                           <Button
//                             variant="ghost"
//                             className="justify-start mb-1"
//                           >
//                             {item.name}
//                           </Button>
//                         </Link>
//                       ))}

//                     <div className="mt-auto pt-4 border-t">
//                       <div className="flex items-center gap-2 mb-4">
//                         <MapPin className="h-4 w-4 text-green-500" />
//                         <span className="text-sm">
//                           Delivery: <span className="text-green-500 font-medium">Select Location</span>
//                         </span>
//                       </div>
//                       <div className="flex gap-2">
//                         <Button variant="outline" className="flex-1 justify-start gap-2">
//                           <User className="h-4 w-4" />
//                           Sign In
//                         </Button>
//                         <Button variant="outline" className="flex-1 justify-start gap-2">
//                           <Heart className="h-4 w-4" />
//                           Wishlist
//                         </Button>
//                       </div>
//                     </div>
//                   </nav>
//                 </div>
//               </SheetContent>
//             </Sheet>

//             {/* Logo */}
//             <Link href="/" className="inline-block">
//               <div className="flex items-center gap-2">
//                 <div className="bg-green-600 text-white p-2 rounded-md">🛒</div>
//                 <span className="font-bold text-lg hidden sm:inline-block">QuickMart</span>
//               </div>
//             </Link>
//           </div>

//           {/* Center: Nav links (desktop) */}
//           <nav className="hidden lg:flex items-center space-x-8">
//             {["Home", "Categories", "Deals", "New Arrivals", "Popular"].map((item) => (
//               <Link
//                 key={item}
//                 href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`}
//                 className="text-gray-700 hover:text-green-600 text-sm font-medium"
//               >
//                 {item}
//               </Link>
//             ))}
//           </nav>

//           {/* Right: Icons */}
//           <div className="flex items-center gap-1 md:gap-3">
//             {/* Mobile search toggle */}
//             <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowMobileSearch(true)}>
//               <Search className="h-5 w-5" />
//             </Button>

//             {/* Desktop Search */}
//             <div className="hidden md:block relative">
//               {/* <Input
//                 type="search"
//                 placeholder="Search for groceries..."
//                 className="w-[200px] lg:w-[300px] rounded-full pl-9 border-green-200 focus-visible:ring-green-500"
//               />
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                */}
//                 <SearchBar />
//             </div>

//             {/* Notifications */}
//             <Button variant="ghost" size="icon" className="hidden md:flex relative">
//               <Bell className="h-5 w-5" />
//               <Badge className="absolute -right-1 -top-1 bg-green-500 text-white text-[10px] h-4 w-4 p-0 rounded-full flex items-center justify-center">
//                 2
//               </Badge>
//             </Button>

//             {/* User Dropdown */}
//             {/* <div className="hidden md:block relative">
//               <Button variant="ghost" size="icon" onClick={() => setShowDropdown(!showDropdown)}>
//                 <User className="h-5 w-5" />
//               </Button>
//               <AnimatePresence>
//                 {showDropdown && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 10 }}
//                     transition={{ duration: 0.2 }}
//                     className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
//                   >
//                     <div className="py-1">
//                       <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                         My Account
//                       </Link>
//                       <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                         Orders
//                       </Link>
//                       <Link href="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                         Wishlist
//                       </Link>
//                       <div className="border-t my-1"></div>
//                       <Link href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                         Sign out
//                       </Link>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div> */}

//             {/* Wishlist */}
//             <Link href="/wishlist" className="hidden md:flex relative text-black hover:text-green-600">
//               <Heart className="h-5 w-5" />
//               <Badge className="absolute -right-1 -top-1 bg-green-500 text-white text-[10px] h-4 w-4 p-0 rounded-full flex items-center justify-center">
//                 5
//               </Badge>
//             </Link>

//             {/* Cart */}
//             <Link
//               href="/cart"
//               className="relative text-black hover:text-[#BD844C]"
//             >
//               <ShoppingCart className="h-5 w-5" />
//               <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full p-0 bg-[#BD844C] text-[10px]">
//                 {items.length}
//               </Badge>
//               <span className="sr-only">Cart</span>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }




// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { ShoppingCart, Search, User, Menu, X, MapPin, Heart, Bell } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { useAppSelector } from "@/redux/store";
// import { CategoryData } from "@/types";
// import { useQuery } from "@tanstack/react-query";
// import { getCategories } from "@/lib/http/api";
// import UserProfile from "./user-profile";
// import { useAuth } from "@/hooks/use-auth";
// import SearchBar from "./search-landing";

// interface HeaderProps {
//     logo: any;
// }

// export function HeaderLanding({ logo }: HeaderProps) {
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [showMobileSearch, setShowMobileSearch] = useState(false);
//     const [categories, setCategories] = useState<CategoryData[]>([]);

//     // Handle scroll effect
//     useEffect(() => {
//         const handleScroll = () => {
//             setIsScrolled(window.scrollY > 10);
//         };
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     const items = useAppSelector((state) => state.cart.items);
//     const wishlistItems = useAppSelector((state) => state.cart.wishlist);

//     const { data: subData, isLoading: subLoading } = useQuery({
//         queryKey: ["getCategories"],
//         queryFn: async () => {
//             return await getCategories().then((res) => res.data);
//         },
//     });

//     useEffect(() => {
//         if (subData) {
//             setCategories(subData.data);
//         }
//     }, [subData]);

//     const { isUser } = useAuth();

//     return (
//         <header
//             className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-white py-3"
//                 }`}
//         >
//             <div className="container px-4 mx-auto">
//                 {/* Mobile Search Bar */}
//                 <AnimatePresence>
//                     {showMobileSearch && (
//                         <motion.div
//                             initial={{ opacity: 0, y: -20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -20 }}
//                             transition={{ duration: 0.2 }}
//                             className="md:hidden py-2 mb-2"
//                         >
//                             <div className="relative">
//                                 <Input
//                                     type="search"
//                                     placeholder="What are you looking for..."
//                                     className="w-full rounded-full pr-10 border-emerald-500 focus-visible:ring-emerald-500"
//                                     autoFocus
//                                 />
//                                 <Button
//                                     variant="ghost"
//                                     size="icon"
//                                     className="absolute right-0 top-0 text-emerald-500"
//                                     onClick={() => setShowMobileSearch(false)}
//                                 >
//                                     <X className="h-4 w-4" />
//                                 </Button>
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                 <div className="flex items-center justify-between">
//                     {/* Left: Mobile Menu + Logo */}
//                     <div className="flex items-center gap-3">
//                         <Sheet>
//                             <SheetTrigger asChild>
//                                 <Button variant="ghost" size="icon" className="md:hidden">
//                                     <Menu className="h-6 w-6" />
//                                 </Button>
//                             </SheetTrigger>
//                             <SheetContent side="left" className="w-[300px] sm:w-[350px]">
//                                 <div className="flex flex-col h-full">
//                                     <div className="py-6 border-b">
//                                         <Link href="/" className="inline-block mb-6">                       <div className="flex items-center gap-2">                         <div className="bg-green-600 text-white p-2 rounded-md">
//                                             🛒
//                                         </div>
//                                             <span className="font-bold text-lg">QuickMart</span>                       </div>
//                                         </Link>
//                                         <div className="relative mb-4">
//                                             <Input
//                                                 type="search"
//                                                 placeholder="Search products..."
//                                                 className="w-full rounded-full pr-10 border-emerald-200 focus-visible:ring-emerald-500"
//                                             />
//                                             <Button variant="ghost" size="icon" className="absolute right-0 top-0 text-muted-foreground">
//                                                 <Search className="h-4 w-4" />
//                                             </Button>
//                                         </div>
//                                     </div>

//                                     <nav className="flex flex-col py-4 flex-1 overflow-y-auto">
//                                         {categories.length > 0 &&
//                                             categories.map((item) => (
//                                                 <Link key={item._id} href={`/category/${item._id}`}>
//                                                     <Button
//                                                         variant="ghost"
//                                                         className="justify-start mb-1"
//                                                     >
//                                                         {item.name}
//                                                     </Button>
//                                                 </Link>
//                                             ))}

//                                         <div className="mt-auto pt-4 border-t">
//                                             <div className="flex items-center gap-2 mb-4">
//                                                 <MapPin className="h-4 w-4 text-emerald-500" />
//                                                 <span className="text-sm">
//                                                     Delivery: <span className="text-emerald-500 font-medium">Address</span>
//                                                 </span>
//                                             </div>
//                                             <div className="flex gap-2">
//                                                 <Button variant="outline" className="flex-1 justify-start gap-2">
//                                                     <User className="h-4 w-4" />
//                                                     Sign In
//                                                 </Button>
//                                                 <Button variant="outline" className="flex-1 justify-start gap-2">
//                                                     <Heart className="h-4 w-4" />
//                                                     Wishlist
//                                                 </Button>
//                                             </div>
//                                         </div>
//                                     </nav>
//                                 </div>
//                             </SheetContent>
//                         </Sheet>

//                         {/* Logo */}
//                         <Link href="/" className="inline-block mb-6">                       <div className="flex items-center gap-2">                         <div className="bg-green-600 text-white p-2 rounded-md">
//                             🛒
//                         </div>
//                             <span className="font-bold text-lg">QuickMart</span>                       </div>
//                         </Link>
//                     </div>

//                     {/* Center: Nav links (desktop) */}
//                     <nav className="hidden lg:flex items-center space-x-6">
//                         {categories.length > 0 &&
//                             categories.map((item) => (
//                                 <Link
//                                     key={item._id}
//                                     href={`/category/${item._id}`}
//                                     className="text-gray-700 hover:text-emerald-600 text-sm font-medium"
//                                 >
//                                     {item.name}
//                                 </Link>
//                             ))}
//                     </nav>

//                     {/* Right: Icons */}
//                     <div className="flex items-center gap-1 md:gap-3">
//                         {/* Mobile search toggle */}
//                         <Button
//                             variant="ghost"
//                             size="icon"
//                             className="md:hidden"
//                             onClick={() => setShowMobileSearch(true)}
//                         >
//                             <Search className="h-5 w-5" />
//                         </Button>

//                         {/* Desktop Search */}
//                         <div className="hidden md:block relative">
//                             <SearchBar />
//                         </div>

//                         {/* Delivery Address (Desktop) */}
//                         <div className="hidden md:flex items-center gap-1 border-l border-r px-3 text-black">
//                             <MapPin className="h-4 w-4" />
//                             <span className="text-xs">Location:</span>
//                             <span className="flex items-center gap-1 h-8 p-0 px-1">
//                                 <span className="text-xs font-medium">Address</span>
//                             </span>
//                         </div>

//                         {/* User */}
//                         {isUser ? (
//                             <UserProfile />
//                         ) : (
//                             <Link
//                                 href="/login"
//                                 className="hidden md:flex text-black hover:text-emerald-600"
//                             >
//                                 <User className="h-5 w-5" />
//                                 <span className="sr-only">Account</span>
//                             </Link>
//                         )}

//                         {/* Wishlist */}
//                         <Link
//                             href="/wishlist"
//                             className="relative text-black hover:text-emerald-600"
//                         >
//                             <Heart className="h-5 w-5" />
//                             <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full p-0 bg-emerald-500 text-[10px] text-white">
//                                 {wishlistItems.length}
//                             </Badge>
//                             <span className="sr-only">Wishlist</span>
//                         </Link>

//                         {/* Cart */}
//                         <Link
//                             href="/cart"
//                             className="relative text-black hover:text-emerald-600"
//                         >
//                             <ShoppingCart className="h-5 w-5" />
//                             <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full p-0 bg-emerald-500 text-[10px] text-white">
//                                 {items.length}
//                             </Badge>
//                             <span className="sr-only">Cart</span>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </header>
//     );
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Search, User, Menu, X, MapPin, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAppSelector } from "@/redux/store";
import { CategoryData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/http/api";
import UserProfile from "./user-profile";
import { useAuth } from "@/hooks/use-auth";
import SearchBar from "./search-landing";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface HeaderProps {
  logo: any;
}

type Address = {
  formattedAddress: string;
  area: string;
  city: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
};

export function HeaderLanding({ logo }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [address, setAddress] = useState<Address | null>(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check for saved address in localStorage on initial load
  useEffect(() => {
    const savedAddress = localStorage.getItem("userAddress");
    if (savedAddress) {
      setAddress(JSON.parse(savedAddress));
      setLocationLoading(false);
    } else {
      requestLocationAccess();
    }
  }, []);

  const requestLocationAccess = () => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            // In a real app, you would call your reverse geocoding API here
            // For demo purposes, we'll use a mock response
            const mockAddress = await reverseGeocode(latitude, longitude);
            setAddress(mockAddress);
            localStorage.setItem("userAddress", JSON.stringify(mockAddress));
            setLocationError(null);
          } catch (error) {
            setLocationError("Could not fetch address details");
          } finally {
            setLocationLoading(false);
          }
        },
        (error) => {
          setLocationLoading(false);
          if (error.code === error.PERMISSION_DENIED) {
            setLocationError("Location access denied");
            setShowLocationDialog(true);
          } else {
            setLocationError("Could not get your location");
            setShowLocationDialog(true);
          }
        },
        { timeout: 10000 }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser");
      setLocationLoading(false);
      setShowLocationDialog(true);
    }
  };

  // Mock reverse geocoding function - replace with actual API call
  const reverseGeocode = async (lat: number, lng: number): Promise<Address> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would call an API like:
    // const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_API_KEY`);
    // const data = await response.json();
    
    // Mock response
    return {
      formattedAddress: "123 Main St, Downtown",
      area: "Downtown",
      city: "Metropolis",
      coordinates: { lat, lng }
    };
  };

  const handleManualLocation = () => {
    // In a real app, this would open a map picker or address form
    // For demo, we'll set a mock address
    const mockAddress = {
      formattedAddress: "456 Secondary Ave, Uptown",
      area: "Uptown",
      city: "Metropolis"
    };
    setAddress(mockAddress);
    localStorage.setItem("userAddress", JSON.stringify(mockAddress));
    setShowLocationDialog(false);
    setLocationError(null);
  };

  const items = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.cart.wishlist);

  const { data: subData, isLoading: subLoading } = useQuery({
    queryKey: ["getCategories"],
    queryFn: async () => {
      return await getCategories().then((res) => res.data);
    },
  });

  useEffect(() => {
    if (subData) {
      setCategories(subData.data);
    }
  }, [subData]);

  const { isUser } = useAuth();

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white py-3"
      }`}
    >
      {/* Location bar - always visible */}
      <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-2 text-sm">
        <div className="container mx-auto flex items-center justify-between">
          {locationLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
              <span>Detecting your location...</span>
            </div>
          ) : address ? (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-600" />
              <span>Delivering to <span className="font-medium">{address.area}</span></span>
              <Button 
                variant="link" 
                className="h-auto p-0 text-emerald-600"
                onClick={() => setShowLocationDialog(true)}
              >
                Change
              </Button>
            </div>
          ) : (
            <Button 
              variant="link" 
              className="h-auto p-0 text-emerald-600 flex items-center gap-1"
              onClick={() => setShowLocationDialog(true)}
            >
              <MapPin className="h-4 w-4" />
              <span>Add your current location</span>
            </Button>
          )}
        </div>
      </div>

      <div className="container px-4 mx-auto">
        {/* Mobile Search Bar */}
        <AnimatePresence>
          {showMobileSearch && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden py-2 mb-2"
            >
              <div className="relative">
                <Input
                  type="search"
                  placeholder="What are you looking for..."
                  className="w-full rounded-full pr-10 border-emerald-500 focus-visible:ring-emerald-500"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 text-emerald-500"
                  onClick={() => setShowMobileSearch(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between">
          {/* Left: Mobile Menu + Logo */}
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="py-6 border-b">
                    <Link href="/" className="inline-block mb-6">
                      <div className="flex items-center gap-2">
                        <div className="bg-green-600 text-white p-2 rounded-md">
                          🛒
                        </div>
                        <span className="font-bold text-lg">QuickMart</span>
                      </div>
                    </Link>
                    <div className="relative mb-4">
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="w-full rounded-full pr-10 border-emerald-200 focus-visible:ring-emerald-500"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 text-muted-foreground"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <nav className="flex flex-col py-4 flex-1 overflow-y-auto">
                    {categories.length > 0 &&
                      categories.map((item) => (
                        <Link key={item._id} href={`/category/${item._id}`}>
                          <Button variant="ghost" className="justify-start mb-1">
                            {item.name}
                          </Button>
                        </Link>
                      ))}

                    <div className="mt-auto pt-4 border-t">
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm">
                          Delivery:{" "}
                          <span className="text-emerald-500 font-medium">
                            {address ? address.area : "Not set"}
                          </span>
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 justify-start gap-2"
                        >
                          <User className="h-4 w-4" />
                          Sign In
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 justify-start gap-2"
                        >
                          <Heart className="h-4 w-4" />
                          Wishlist
                        </Button>
                      </div>
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center gap-2">
                <div className="bg-green-600 text-white p-2 rounded-md">
                  🛒
                </div>
                <span className="font-bold text-lg">QuickMart</span>
              </div>
            </Link>
          </div>

          {/* Center: Nav links (desktop) */}
          <nav className="hidden lg:flex items-center space-x-6">
            {categories.length > 0 &&
              categories.map((item) => (
                <Link
                  key={item._id}
                  href={`/category/${item._id}`}
                  className="text-gray-700 hover:text-emerald-600 text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
          </nav>

          {/* Right: Icons */}
          <div className="flex items-center gap-1 md:gap-3">
            {/* Mobile search toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setShowMobileSearch(true)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Desktop Search */}
            <div className="hidden md:block relative">
              <SearchBar />
            </div>

            {/* User */}
            {isUser ? (
              <UserProfile />
            ) : (
              <Link
                href="/login"
                className="hidden md:flex text-black hover:text-emerald-600"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link>
            )}

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative text-black hover:text-emerald-600"
            >
              <Heart className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full p-0 bg-emerald-500 text-[10px] text-white">
                {wishlistItems.length}
              </Badge>
              <span className="sr-only">Wishlist</span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative text-black hover:text-emerald-600"
            >
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full p-0 bg-emerald-500 text-[10px] text-white">
                {items.length}
              </Badge>
              <span className="sr-only">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Location Dialog */}
      <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-emerald-600" />
              {address ? "Change Delivery Location" : "Set Delivery Location"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {locationError && (
              <div className="text-red-500 text-sm">{locationError}</div>
            )}
            
            <div className="space-y-2">
              <Button 
                className="w-full" 
                onClick={requestLocationAccess}
              >
                Use Current Location
              </Button>
              <p className="text-sm text-muted-foreground text-center">or</p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleManualLocation}
              >
                Enter Address Manually
              </Button>
            </div>
            
            {address && (
              <div className="mt-4 p-3 border rounded-lg">
                <h4 className="font-medium mb-1">Current Address</h4>
                <p className="text-sm">{address.formattedAddress}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}