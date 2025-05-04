// "use client";

// import type React from "react";
// import Footer from "@/components/landing-page/footer";
// import { HeaderLanding } from "@/components/landing-page/header-landing";
// import { getProductsWithPadination } from "@/lib/http/api";
// import type { ProductData } from "@/types";
// import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
// import logo from "@/public/logo.png";
// import { Skeleton } from "@/components/ui/skeleton";
// import { ChevronLeft, ChevronRight, Search, Star } from "lucide-react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";
// import { useSearchParams, useRouter } from "next/navigation";

// // Define the pagination response type
// interface PaginationResponse {
//   products: ProductData[];
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
// }

// const ProductsClient = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Get pagination params from URL or use defaults
//   const currentPage = Number(searchParams.get("page") || "1");
//   const itemsPerPage = Number(searchParams.get("limit") || "12");

//   const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState<string>("featured");
//   const [priceRange, setPriceRange] = useState<string[]>([]);
//   const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
//   const [showActiveOnly, setShowActiveOnly] = useState(true);
//   const [totalItems, setTotalItems] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);

//   // Fetch products with pagination
//   const { data, isLoading, isFetching } = useQuery<PaginationResponse>({
//     queryKey: ["getProductsWithPadination", currentPage, itemsPerPage],
//     queryFn: async () => {
//       const response = await getProductsWithPadination().then(
//         (res) => res.data
//       );
//       return response;
//     },
//   });

//   // Update URL when page changes
//   const setPage = (page: number) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("page", page.toString());
//     router.push(`/products?${params.toString()}`);
//   };

//   // Update URL when limit changes
//   const setLimit = (limit: number) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("limit", limit.toString());
//     params.set("page", "1"); // Reset to first page when changing limit
//     router.push(`/products?${params.toString()}`);
//   };

//   useEffect(() => {
//     if (data) {
//       setFilteredProducts(data.products);
//       setTotalItems(data.total);
//       setTotalPages(data.totalPages);
//     }
//   }, [data]);

//   // Extract unique brands and categories for filters
//   const brands = [
//     //@ts-ignore
//     ...new Set(filteredProducts.map((product) => product.brandId?._id)),
//   ].filter(Boolean);
//   const categories = [
//     //@ts-ignore
//     ...new Set(filteredProducts.map((product) => product.categoryId?._id)),
//   ].filter(Boolean);

//   // Get minimum price from variants
//   const getMinPrice = (product: ProductData) => {
//     if (!product.variants || product.variants.length === 0) return 0;
//     return Math.min(...product.variants.map((variant) => variant.rate));
//   };

//   // Get maximum price from variants
//   const getMaxPrice = (product: ProductData) => {
//     if (!product.variants || product.variants.length === 0) return 0;
//     return Math.max(...product.variants.map((variant) => variant.rate));
//   };

//   // Get discount percentage
//   const getDiscountPercentage = (product: ProductData) => {
//     if (!product.variants || product.variants.length === 0) return 0;
//     const variant = product.variants[0];
//     return variant.discount;
//   };

//   useEffect(() => {
//     if (data?.products && data.products.length > 0) {
//       let result = [...data.products];

//       // Apply client-side filtering
//       // Note: For better performance, these filters should ideally be moved to the server API

//       // Filter by active status
//       if (showActiveOnly) {
//         result = result.filter((product) => product.isActive);
//       }

//       // Filter by featured status
//       if (showFeaturedOnly) {
//         result = result.filter((product) => product.isFeatured);
//       }

//       // Apply search filter
//       if (searchQuery) {
//         result = result.filter(
//           (product) =>
//             product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             product.description
//               ?.toLowerCase()
//               .includes(searchQuery.toLowerCase()) ||
//             product.brandId?.name
//               ?.toLowerCase()
//               .includes(searchQuery.toLowerCase())
//         );
//       }

//       // Apply price range filter
//       if (priceRange.length > 0) {
//         result = result.filter((product) => {
//           const minPrice = getMinPrice(product);
//           if (priceRange.includes("under-50") && minPrice < 50) return true;
//           if (
//             priceRange.includes("50-100") &&
//             minPrice >= 50 &&
//             minPrice <= 100
//           )
//             return true;
//           if (
//             priceRange.includes("100-200") &&
//             minPrice > 100 &&
//             minPrice <= 200
//           )
//             return true;
//           if (priceRange.includes("over-200") && minPrice > 200) return true;
//           return false;
//         });
//       }

//       // Apply brand filter
//       if (selectedBrands.length > 0) {
//         result = result.filter((product) =>
//           selectedBrands.includes(product.brandId?._id)
//         );
//       }

//       // Apply category filter
//       if (selectedCategories.length > 0) {
//         result = result.filter((product) =>
//           selectedCategories.includes(product.categoryId?._id)
//         );
//       }

//       // Apply sorting
//       if (sortBy === "price-asc") {
//         result.sort((a, b) => getMinPrice(a) - getMinPrice(b));
//       } else if (sortBy === "price-desc") {
//         result.sort((a, b) => getMinPrice(b) - getMinPrice(a));
//       } else if (sortBy === "newest") {
//         result.sort(
//           (a, b) =>
//             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//         );
//       } else if (sortBy === "discount") {
//         result.sort(
//           (a, b) => getDiscountPercentage(b) - getDiscountPercentage(a)
//         );
//       } else if (sortBy === "featured") {
//         result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
//       }

//       setFilteredProducts(result);
//     }
//   }, [
//     data,
//     searchQuery,
//     sortBy,
//     priceRange,
//     selectedBrands,
//     selectedCategories,
//     showFeaturedOnly,
//     showActiveOnly,
//   ]);

//   const handlePriceRangeChange = (value: string) => {
//     setPriceRange((prev) =>
//       prev.includes(value)
//         ? prev.filter((item) => item !== value)
//         : [...prev, value]
//     );
//   };

//   const handleBrandChange = (value: string) => {
//     setSelectedBrands((prev) =>
//       prev.includes(value)
//         ? prev.filter((item) => item !== value)
//         : [...prev, value]
//     );
//   };

//   const handleCategoryChange = (value: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(value)
//         ? prev.filter((item) => item !== value)
//         : [...prev, value]
//     );
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//   };

//   const resetFilters = () => {
//     setSearchQuery("");
//     setPriceRange([]);
//     setSelectedBrands([]);
//     setSelectedCategories([]);
//     setSortBy("featured");
//     setShowFeaturedOnly(false);
//     setShowActiveOnly(true);
//   };

//   // Generate pagination array
//   const generatePaginationArray = () => {
//     const delta = 2; // Number of pages to show before and after current page
//     const range = [];

//     for (
//       let i = Math.max(2, currentPage - delta);
//       i <= Math.min(totalPages - 1, currentPage + delta);
//       i++
//     ) {
//       range.push(i);
//     }

//     // Add first page
//     if (currentPage - delta > 2) {
//       range.unshift("...");
//     }
//     if (totalPages > 1) {
//       range.unshift(1);
//     }

//     // Add last page
//     if (currentPage + delta < totalPages - 1) {
//       range.push("...");
//     }
//     if (totalPages > 1 && !range.includes(totalPages)) {
//       range.push(totalPages);
//     }

//     return range;
//   };

//   // Custom ProductCard component to handle the specific data structure
//   const CustomProductCard = ({ product }: { product: ProductData }) => {
//     const minPrice = getMinPrice(product);
//     const maxPrice = getMaxPrice(product);
//     const hasMultiplePrices =
//       minPrice !== maxPrice && product.variants.length > 1;
//     const discount = product.variants[0]?.discount || 0;
//     const mrp = product.variants[0]?.mrp || 0;

//     return (
//       <div className="group bg-white rounded-lg border border-gray-200 overflow-hidden transition-all hover:shadow-md">
//         <Link href={`/product/${product._id}`} className="block relative">
//           <div className="relative h-64 overflow-hidden">
//             {product.featureImg ? (
//               <Image
//                 src={product.featureImg || "/placeholder.svg"}
//                 alt={product.name}
//                 fill
//                 className="object-cover group-hover:scale-105 transition-transform duration-300"
//               />
//             ) : (
//               <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                 <span className="text-gray-400">No image</span>
//               </div>
//             )}

//             {product.isFeatured && (
//               <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600">
//                 Featured
//               </Badge>
//             )}

//             {discount > 0 && (
//               <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
//                 {discount}% OFF
//               </Badge>
//             )}
//           </div>
//         </Link>

//         <div className="p-4">
//           <div className="flex items-center justify-between mb-1">
//             <span className="text-sm text-gray-500 capitalize">
//               {product.brandId?.name || "Brand"}
//             </span>
//             {product.variants[0]?.quantity < 10 &&
//               product.variants[0]?.quantity > 0 && (
//                 <span className="text-xs text-orange-600">
//                   Only {product.variants[0].quantity} left
//                 </span>
//               )}
//           </div>

//           <Link href={`/product/${product._id}`}>
//             <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 hover:text-primary transition-colors">
//               {product.name}
//             </h3>
//           </Link>

//           <div className="flex items-baseline gap-2 mb-1">
//             <span className="font-semibold text-gray-900">
//               ₹  {minPrice.toFixed(2)}
//               {hasMultiplePrices && ` - ${maxPrice.toFixed(2)}`}
//             </span>

//             {discount > 0 && (
//               <span className="text-sm text-gray-500 line-through">
//                 ₹  {mrp.toFixed(2)}
//               </span>
//             )}
//           </div>

//           <div className="flex items-center gap-1 mt-2">
//             <div className="flex">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <Star
//                   key={star}
//                   className="h-3.5 w-3.5"
//                   fill={star <= 4 ? "currentColor" : "none"}
//                   stroke={star <= 4 ? "none" : "currentColor"}
//                 />
//               ))}
//             </div>
//             <span className="text-xs text-gray-500">(24)</span>
//           </div>

//           {product.variants.length > 1 && (
//             <div className="mt-2">
//               <span className="text-xs text-gray-500">
//                 {product.variants.length} variants available
//               </span>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <HeaderLanding logo={logo} />

//       <div className="container mx-auto px-4 py-8 flex-grow">
//         {/* Breadcrumb */}
//         <div className="flex items-center text-sm text-gray-500 mb-6">
//           <Link href="/" className="hover:text-gray-700">
//             Home
//           </Link>
//           <ChevronRight className="h-4 w-4 mx-2" />
//           <span className="font-medium text-gray-900">All Products</span>
//         </div>

//         {/* Page Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
//           <p className="text-gray-600 mt-2">
//             Browse our complete collection of products
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar Filters */}
//           <div className="w-full lg:w-64 shrink-0">
//             <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 sticky top-4">
//               <h3 className="font-medium text-lg mb-4">Filters</h3>

//               <form onSubmit={handleSearch} className="mb-6">
//                 <div className="relative">
//                   <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
//                   <Input
//                     type="search"
//                     placeholder="Search products..."
//                     className="pl-9"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                 </div>
//               </form>

//               <Accordion
//                 type="multiple"
//                 defaultValue={["price", "status", "brands", "categories"]}
//               >
//                 <AccordionItem value="status">
//                   <AccordionTrigger>Product Status</AccordionTrigger>
//                   <AccordionContent>
//                     <div className="space-y-2">
//                       <div className="flex items-center space-x-2">
//                         <Checkbox
//                           id="active-only"
//                           checked={showActiveOnly}
//                           onCheckedChange={() =>
//                             setShowActiveOnly(!showActiveOnly)
//                           }
//                         />
//                         <label htmlFor="active-only" className="text-sm">
//                           Active Products Only
//                         </label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <Checkbox
//                           id="featured-only"
//                           checked={showFeaturedOnly}
//                           onCheckedChange={() =>
//                             setShowFeaturedOnly(!showFeaturedOnly)
//                           }
//                         />
//                         <label htmlFor="featured-only" className="text-sm">
//                           Featured Products Only
//                         </label>
//                       </div>
//                     </div>
//                   </AccordionContent>
//                 </AccordionItem>

//                 <AccordionItem value="price">
//                   <AccordionTrigger>Price Range</AccordionTrigger>
//                   <AccordionContent>
//                     <div className="space-y-2">
//                       <div className="flex items-center space-x-2">
//                         <Checkbox
//                           id="under-50"
//                           checked={priceRange.includes("under-50")}
//                           onCheckedChange={() =>
//                             handlePriceRangeChange("under-50")
//                           }
//                         />
//                         <label htmlFor="under-50" className="text-sm">
//                           Under ₹  50
//                         </label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <Checkbox
//                           id="50-100"
//                           checked={priceRange.includes("50-100")}
//                           onCheckedChange={() =>
//                             handlePriceRangeChange("50-100")
//                           }
//                         />
//                         <label htmlFor="50-100" className="text-sm">
//                           ₹  50 - ₹  100
//                         </label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <Checkbox
//                           id="100-200"
//                           checked={priceRange.includes("100-200")}
//                           onCheckedChange={() =>
//                             handlePriceRangeChange("100-200")
//                           }
//                         />
//                         <label htmlFor="100-200" className="text-sm">
//                           ₹  100 - ₹  200
//                         </label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <Checkbox
//                           id="over-200"
//                           checked={priceRange.includes("over-200")}
//                           onCheckedChange={() =>
//                             handlePriceRangeChange("over-200")
//                           }
//                         />
//                         <label htmlFor="over-200" className="text-sm">
//                           Over ₹  200
//                         </label>
//                       </div>
//                     </div>
//                   </AccordionContent>
//                 </AccordionItem>

//                 <AccordionItem value="brands">
//                   <AccordionTrigger>Brands</AccordionTrigger>
//                   <AccordionContent>
//                     <div className="space-y-2 max-h-40 overflow-y-auto">
//                       {brands.map((brandId) => {
//                         const brand = filteredProducts.find(
//                           (p) => p.brandId?._id === brandId
//                         )?.brandId;
//                         return (
//                           <div
//                             key={brandId}
//                             className="flex items-center space-x-2"
//                           >
//                             <Checkbox
//                               id={`brand-${brandId}`}
//                               checked={selectedBrands.includes(brandId)}
//                               onCheckedChange={() => handleBrandChange(brandId)}
//                             />
//                             <label
//                               htmlFor={`brand-${brandId}`}
//                               className="text-sm"
//                             >
//                               {brand?.name || brandId}
//                             </label>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </AccordionContent>
//                 </AccordionItem>

//                 <AccordionItem value="categories">
//                   <AccordionTrigger>Categories</AccordionTrigger>
//                   <AccordionContent>
//                     <div className="space-y-2 max-h-40 overflow-y-auto">
//                       {categories.map((categoryId) => {
//                         const category = filteredProducts.find(
//                           (p) => p.categoryId?._id === categoryId
//                         )?.categoryId;
//                         return (
//                           <div
//                             key={categoryId}
//                             className="flex items-center space-x-2"
//                           >
//                             <Checkbox
//                               id={`category-${categoryId}`}
//                               checked={selectedCategories.includes(categoryId)}
//                               onCheckedChange={() =>
//                                 handleCategoryChange(categoryId)
//                               }
//                             />
//                             <label
//                               htmlFor={`category-${categoryId}`}
//                               className="text-sm"
//                             >
//                               {category?.name || categoryId}
//                             </label>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </AccordionContent>
//                 </AccordionItem>
//               </Accordion>

//               <div className="mt-6">
//                 <Button
//                   variant="outline"
//                   className="w-full"
//                   onClick={resetFilters}
//                 >
//                   Clear All Filters
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="flex-1">
//             {/* Sort Controls and Items Per Page */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//               <div className="flex items-center gap-2">
//                 <p className="text-sm text-gray-500">
//                   Showing{" "}
//                   <span className="font-medium">{filteredProducts.length}</span>{" "}
//                   of <span className="font-medium">{totalItems}</span> products
//                 </p>
//               </div>

//               <div className="flex flex-wrap items-center gap-4">
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm text-gray-500">Items per page:</span>
//                   <Select
//                     value={itemsPerPage.toString()}
//                     onValueChange={(value) => setLimit(Number.parseInt(value))}
//                   >
//                     <SelectTrigger className="w-[80px]">
//                       <SelectValue placeholder="12" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="12">12</SelectItem>
//                       <SelectItem value="24">24</SelectItem>
//                       <SelectItem value="36">36</SelectItem>
//                       <SelectItem value="48">48</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <span className="text-sm text-gray-500">Sort by:</span>
//                   <Select value={sortBy} onValueChange={setSortBy}>
//                     <SelectTrigger className="w-[180px]">
//                       <SelectValue placeholder="Sort by" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="featured">Featured</SelectItem>
//                       <SelectItem value="newest">Newest</SelectItem>
//                       <SelectItem value="price-asc">
//                         Price: Low to High
//                       </SelectItem>
//                       <SelectItem value="price-desc">
//                         Price: High to Low
//                       </SelectItem>
//                       <SelectItem value="discount">Highest Discount</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>

//             {/* Products Grid */}
//             {isLoading || isFetching ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {Array.from({ length: itemsPerPage }).map((_, index) => (
//                   <div key={index} className="flex flex-col">
//                     <Skeleton className="h-64 w-full rounded-lg mb-3" />
//                     <Skeleton className="h-5 w-3/4 mb-2" />
//                     <Skeleton className="h-4 w-1/2" />
//                   </div>
//                 ))}
//               </div>
//             ) : filteredProducts.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {filteredProducts.map((product) => (
//                   <CustomProductCard key={product._id} product={product} />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-16 bg-white rounded-lg border border-gray-100">
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                   No products found
//                 </h3>
//                 <p className="text-gray-500 mb-6">
//                   Try adjusting your search or filter criteria
//                 </p>
//                 <Button onClick={resetFilters}>Clear filters</Button>
//               </div>
//             )}

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex flex-col sm:flex-row justify-between items-center mt-12 gap-4">
//                 <div className="text-sm text-gray-500">
//                   Page {currentPage} of {totalPages}
//                 </div>

//                 <nav className="flex items-center gap-1">
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={() => setPage(Math.max(1, currentPage - 1))}
//                     disabled={currentPage === 1 || isLoading || isFetching}
//                   >
//                     <ChevronLeft className="h-4 w-4" />
//                   </Button>

//                   {generatePaginationArray().map((page, index) =>
//                     page === "..." ? (
//                       <span key={`ellipsis-${index}`} className="px-2">
//                         ...
//                       </span>
//                     ) : (
//                       <Button
//                         key={`page-${page}`}
//                         variant={currentPage === page ? "soft" : "outline"}
//                         size="sm"
//                         onClick={() =>
//                           typeof page === "number" && setPage(page)
//                         }
//                         disabled={isLoading || isFetching}
//                         className={
//                           currentPage === page
//                             ? "bg-primary text-primary-foreground"
//                             : ""
//                         }
//                       >
//                         {page}
//                       </Button>
//                     )
//                   )}

//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={() =>
//                       setPage(Math.min(totalPages, currentPage + 1))
//                     }
//                     disabled={
//                       currentPage === totalPages || isLoading || isFetching
//                     }
//                   >
//                     <ChevronRight className="h-4 w-4" />
//                   </Button>
//                 </nav>

//                 <div className="text-sm text-gray-500 sm:block hidden">
//                   Showing{" "}
//                   {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} -{" "}
//                   {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
//                   {totalItems} products
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default ProductsClient;


"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Search, Star, Home, SlidersHorizontal } from "lucide-react"

import { getProductsWithPadination } from "@/lib/http/api"
import type { ProductData } from "@/types"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import { HeaderLanding } from "@/components/landing-page/header-landing"
import { Footer } from "@/components/landing-page/footer"
import logo from "@/public/logo.png"

// Define the pagination response type
interface PaginationResponse {
  products: ProductData[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export default function ProductsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get pagination params from URL or use defaults
  const currentPage = Number(searchParams.get("page") || "1")
  const itemsPerPage = Number(searchParams.get("limit") || "12")

  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<string>("featured")
  const [priceRange, setPriceRange] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [showActiveOnly, setShowActiveOnly] = useState(true)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  // Fetch products with pagination
  const { data, isLoading, isFetching } = useQuery<PaginationResponse>({
    queryKey: ["getProductsWithPadination", currentPage, itemsPerPage],
    queryFn: async () => {
      const response = await getProductsWithPadination().then((res) => res.data)
      return response
    },
  })

  // Update URL when page changes
  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    router.push(`/products?${params.toString()}`)
  }

  // Update URL when limit changes
  const setLimit = (limit: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("limit", limit.toString())
    params.set("page", "1") // Reset to first page when changing limit
    router.push(`/products?${params.toString()}`)
  }

  useEffect(() => {
    if (data) {
      setFilteredProducts(data.products)
      setTotalItems(data.total)
      setTotalPages(data.totalPages)
    }
  }, [data])

  // Extract unique brands and categories for filters
  const brands = [
    //@ts-ignore
    ...new Set(filteredProducts.map((product) => product.brandId?._id)),
  ].filter(Boolean)
  const categories = [
    //@ts-ignore
    ...new Set(filteredProducts.map((product) => product.categoryId?._id)),
  ].filter(Boolean)

  // Get minimum price from variants
  const getMinPrice = (product: ProductData) => {
    if (!product.variants || product.variants.length === 0) return 0
    return Math.min(...product.variants.map((variant) => variant.rate))
  }

  // Get maximum price from variants
  const getMaxPrice = (product: ProductData) => {
    if (!product.variants || product.variants.length === 0) return 0
    return Math.max(...product.variants.map((variant) => variant.rate))
  }

  // Get discount percentage
  const getDiscountPercentage = (product: ProductData) => {
    if (!product.variants || product.variants.length === 0) return 0
    const variant = product.variants[0]
    return variant.discount
  }

  useEffect(() => {
    if (data?.products && data.products.length > 0) {
      let result = [...data.products]

      // Apply client-side filtering
      // Note: For better performance, these filters should ideally be moved to the server API

      // Filter by active status
      if (showActiveOnly) {
        result = result.filter((product) => product.isActive)
      }

      // Filter by featured status
      if (showFeaturedOnly) {
        result = result.filter((product) => product.isFeatured)
      }

      // Apply search filter
      if (searchQuery) {
        result = result.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brandId?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      }

      // Apply price range filter
      if (priceRange.length > 0) {
        result = result.filter((product) => {
          const minPrice = getMinPrice(product)
          if (priceRange.includes("under-50") && minPrice < 50) return true
          if (priceRange.includes("50-100") && minPrice >= 50 && minPrice <= 100) return true
          if (priceRange.includes("100-200") && minPrice > 100 && minPrice <= 200) return true
          if (priceRange.includes("over-200") && minPrice > 200) return true
          return false
        })
      }

      // Apply brand filter
      if (selectedBrands.length > 0) {
        result = result.filter((product) => selectedBrands.includes(product.brandId?._id))
      }

      // Apply category filter
      if (selectedCategories.length > 0) {
        result = result.filter((product) => selectedCategories.includes(product.categoryId?._id))
      }

      // Apply sorting
      if (sortBy === "price-asc") {
        result.sort((a, b) => getMinPrice(a) - getMinPrice(b))
      } else if (sortBy === "price-desc") {
        result.sort((a, b) => getMinPrice(b) - getMinPrice(a))
      } else if (sortBy === "newest") {
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      } else if (sortBy === "discount") {
        result.sort((a, b) => getDiscountPercentage(b) - getDiscountPercentage(a))
      } else if (sortBy === "featured") {
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
      }

      setFilteredProducts(result)
    }
  }, [data, searchQuery, sortBy, priceRange, selectedBrands, selectedCategories, showFeaturedOnly, showActiveOnly])

  const handlePriceRangeChange = (value: string) => {
    setPriceRange((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const handleBrandChange = (value: string) => {
    setSelectedBrands((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategories((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const resetFilters = () => {
    setSearchQuery("")
    setPriceRange([])
    setSelectedBrands([])
    setSelectedCategories([])
    setSortBy("featured")
    setShowFeaturedOnly(false)
    setShowActiveOnly(true)
  }

  // Generate pagination array
  const generatePaginationArray = () => {
    const delta = 2 // Number of pages to show before and after current page
    const range = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    // Add first page
    if (currentPage - delta > 2) {
      range.unshift("...")
    }
    if (totalPages > 1) {
      range.unshift(1)
    }

    // Add last page
    if (currentPage + delta < totalPages - 1) {
      range.push("...")
    }
    if (totalPages > 1 && !range.includes(totalPages)) {
      range.push(totalPages)
    }

    return range
  }

  // Custom ProductCard component to handle the specific data structure
  const CustomProductCard = ({ product }: { product: ProductData }) => {
    const minPrice = getMinPrice(product)
    const maxPrice = getMaxPrice(product)
    const hasMultiplePrices = minPrice !== maxPrice && product.variants.length > 1
    const discount = product.variants[0]?.discount || 0
    const mrp = product.variants[0]?.mrp || 0

    return (
      <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
        <Link href={`/products/${product._id}`} className="block relative">
          <div className="relative h-64 overflow-hidden bg-gray-100">
            {product.featureImg ? (
              <Image
                src={product.featureImg || "/placeholder.svg?height=400&width=400"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}

            {product.isFeatured && (
              <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600">Featured</Badge>
            )}

            {discount > 0 && (
              <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">{discount}% OFF</Badge>
            )}
          </div>
        </Link>

        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500 capitalize">{product.brandId?.name || "Brand"}</span>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-3 w-3 text-yellow-400" fill={star <= 4 ? "currentColor" : "none"} />
              ))}
            </div>
          </div>

          <Link href={`/products/${product._id}`}>
            <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 hover:text-green-600 transition-colors">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-bold text-gray-900">
              ₹  {minPrice.toFixed(2)}
              {hasMultiplePrices && ` - ${maxPrice.toFixed(2)}`}
            </span>

            {discount > 0 && <span className="text-sm text-gray-500 line-through">₹  {mrp.toFixed(2)}</span>}
          </div>

          {product.variants[0]?.quantity < 10 && product.variants[0]?.quantity > 0 && (
            <div className="mt-1">
              <span className="text-xs text-orange-600">Only {product.variants[0].quantity} left</span>
            </div>
          )}

          {product.variants.length > 1 && (
            <div className="mt-1">
              <span className="text-xs text-gray-500">{product.variants.length} variants available</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Filter sidebar component
  const FilterSidebar = () => (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
      <h3 className="font-medium text-lg mb-4">Filters</h3>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      <Accordion type="multiple" defaultValue={["price", "status", "brands", "categories"]} className="space-y-2">
        <AccordionItem value="status" className="border-b pb-2">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="text-base font-medium">Product Status</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="active-only"
                  checked={showActiveOnly}
                  onCheckedChange={() => setShowActiveOnly(!showActiveOnly)}
                />
                <label htmlFor="active-only" className="text-sm">
                  Active Products Only
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured-only"
                  checked={showFeaturedOnly}
                  onCheckedChange={() => setShowFeaturedOnly(!showFeaturedOnly)}
                />
                <label htmlFor="featured-only" className="text-sm">
                  Featured Products Only
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price" className="border-b pb-2">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="text-base font-medium">Price Range</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="under-50"
                  checked={priceRange.includes("under-50")}
                  onCheckedChange={() => handlePriceRangeChange("under-50")}
                />
                <label htmlFor="under-50" className="text-sm">
                  Under ₹  50
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="50-100"
                  checked={priceRange.includes("50-100")}
                  onCheckedChange={() => handlePriceRangeChange("50-100")}
                />
                <label htmlFor="50-100" className="text-sm">
                  ₹  50 - ₹  100
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="100-200"
                  checked={priceRange.includes("100-200")}
                  onCheckedChange={() => handlePriceRangeChange("100-200")}
                />
                <label htmlFor="100-200" className="text-sm">
                  ₹  100 - ₹  200
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="over-200"
                  checked={priceRange.includes("over-200")}
                  onCheckedChange={() => handlePriceRangeChange("over-200")}
                />
                <label htmlFor="over-200" className="text-sm">
                  Over ₹  200
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands" className="border-b pb-2">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="text-base font-medium">Brands</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-40 overflow-y-auto pt-1">
              {brands.map((brandId) => {
                const brand = filteredProducts.find((p) => p.brandId?._id === brandId)?.brandId
                return (
                  <div key={brandId} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brandId}`}
                      checked={selectedBrands.includes(brandId)}
                      onCheckedChange={() => handleBrandChange(brandId)}
                    />
                    <label htmlFor={`brand-${brandId}`} className="text-sm">
                      {brand?.name || brandId}
                    </label>
                  </div>
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="categories" className="border-b pb-2">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="text-base font-medium">Categories</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-40 overflow-y-auto pt-1">
              {categories.map((categoryId) => {
                const category = filteredProducts.find((p) => p.categoryId?._id === categoryId)?.categoryId
                return (
                  <div key={categoryId} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${categoryId}`}
                      checked={selectedCategories.includes(categoryId)}
                      onCheckedChange={() => handleCategoryChange(categoryId)}
                    />
                    <label htmlFor={`category-${categoryId}`} className="text-sm">
                      {category?.name || categoryId}
                    </label>
                  </div>
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6">
        <Button variant="outline" className="w-full" onClick={resetFilters}>
          Clear All Filters
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <HeaderLanding  />

      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-900 transition-colors flex items-center gap-1">
            <Home className="h-3.5 w-3.5" />
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 font-medium">All Products</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <p className="text-gray-600 mt-2">Browse our complete collection of products</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="w-full lg:w-64 shrink-0 hidden lg:block">
            <FilterSidebar />
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters & Sorting
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Controls and Items Per Page */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium">{filteredProducts.length}</span> of{" "}
                  <span className="font-medium">{totalItems}</span> products
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Items per page:</span>
                  <Select value={itemsPerPage.toString()} onValueChange={(value) => setLimit(Number.parseInt(value))}>
                    <SelectTrigger className="w-[80px] h-9">
                      <SelectValue placeholder="12" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12</SelectItem>
                      <SelectItem value="24">24</SelectItem>
                      <SelectItem value="36">36</SelectItem>
                      <SelectItem value="48">48</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] h-9">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="discount">Highest Discount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {isLoading || isFetching ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: itemsPerPage }).map((_, index) => (
                  <div key={index} className="flex flex-col">
                    <Skeleton className="h-64 w-full rounded-lg mb-3" />
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <CustomProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg border border-gray-100 shadow-sm">
                <div className="rounded-full bg-gray-100 p-5 mx-auto w-fit mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
  Try adjusting your search or filter criteria to find what you&apos;re looking for
</p>


                <Button onClick={resetFilters} className="bg-green-600 hover:bg-green-700 text-white">
                  Clear filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center mt-12 gap-4 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <div className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </div>

                <nav className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1 || isLoading || isFetching}
                    className="h-9 w-9"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {generatePaginationArray().map((page, index) =>
                    page === "..." ? (
                      <span key={`ellipsis-${index}`} className="px-2">
                        ...
                      </span>
                    ) : (
                      <Button
                        key={`page-${page}`}
                        variant={currentPage === page ? "soft" : "outline"}
                        size="sm"
                        onClick={() => typeof page === "number" && setPage(page)}
                        disabled={isLoading || isFetching}
                        className={currentPage === page ? "bg-green-600 hover:bg-green-700 text-white" : "h-9 w-9"}
                      >
                        {page}
                      </Button>
                    ),
                  )}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages || isLoading || isFetching}
                    className="h-9 w-9"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </nav>

                <div className="text-sm text-gray-500 sm:block hidden">
                  Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} -{" "}
                  {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} products
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
