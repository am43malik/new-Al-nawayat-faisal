// "use client";
// import logo from "@/public/logo.png";
// import { HeaderLanding } from "@/components/landing-page/header-landing";
// import {Footer} from "@/components/landing-page/footer";
// import { useEffect, useState } from "react";
// import type { CategoryData, ProductData } from "@/types";
// import { useQuery } from "@tanstack/react-query";
// import { getCategoryById, getProductsByCategory } from "@/lib/http/api";
// import { useParams } from "next/navigation";
// import { Skeleton } from "@/components/ui/skeleton";
// import { ChevronRight, Star } from "lucide-react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import Image from "next/image";
// import { Badge } from "@/components/ui/badge";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Checkbox } from "@/components/ui/checkbox";

// export default function CategoryPage() {
//   const [products, setProducts] = useState<ProductData[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
//   const [category, setCategory] = useState<CategoryData | null>(null);
//   const [sortBy, setSortBy] = useState<string>("featured");
//   const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
//   const [priceRange, setPriceRange] = useState<string[]>([]);
//   const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
//   const [showActiveOnly, setShowActiveOnly] = useState(true);

//   const params = useParams();
//   const id = params.slug as string;

//   const { data: subData, isLoading: categoryLoading } = useQuery({
//     queryKey: ["getCategoryById", id],
//     queryFn: async () => {
//       return await getCategoryById(id!).then((res) => res.data);
//     },
//   });

//   useEffect(() => {
//     if (subData) {
//       setCategory(subData.data);
//     }
//   }, [subData]);

//   const { data, isLoading: productsLoading } = useQuery({
//     queryKey: ["getProductsByCategory", id],
//     queryFn: async () => {
//       return await getProductsByCategory(id).then((res) => res.data);
//     },
//   });

//   // Extract unique brands for filters
//   const brands = [
//     //@ts-ignore
//     ...new Set(products.map((product) => product.brandId?._id)),
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
//     if (data) {
//       setProducts(data);
//       setFilteredProducts(data);
//     }
//   }, [data]);

//   useEffect(() => {
//     if (products.length > 0) {
//       let result = [...products];

//       // Filter by active status
//       if (showActiveOnly) {
//         result = result.filter((product) => product.isActive);
//       }

//       // Filter by featured status
//       if (showFeaturedOnly) {
//         result = result.filter((product) => product.isFeatured);
//       }

//       // Apply brand filter
//       if (selectedBrands.length > 0) {
//         result = result.filter((product) =>
//           selectedBrands.includes(product.brandId?._id)
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
//     products,
//     sortBy,
//     selectedBrands,
//     priceRange,
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

//   const resetFilters = () => {
//     setPriceRange([]);
//     setSelectedBrands([]);
//     setSortBy("featured");
//     setShowFeaturedOnly(false);
//     setShowActiveOnly(true);
//   };

//   const isLoading = categoryLoading || productsLoading;

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
//         <Link href={`/products/${product._id}`} className="block relative">
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
//               {hasMultiplePrices && ` - $${maxPrice.toFixed(2)}`}
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
//           <Link href="/category" className="hover:text-gray-700">
//             Categories
//           </Link>
//           <ChevronRight className="h-4 w-4 mx-2" />
//           <span className="font-medium text-gray-900">
//             {category?.name || "Loading..."}
//           </span>
//         </div>

//         {/* Category Header */}
//         <div className="mb-8">
//           {isLoading ? (
//             <Skeleton className="h-10 w-64 mb-2" />
//           ) : (
//             <h1 className="text-3xl font-bold text-gray-900">
//               {category?.name}
//             </h1>
//           )}
//           {isLoading ? (
//             <Skeleton className="h-6 w-full max-w-md" />
//           ) : (
//             <p className="text-gray-600 mt-2">
//               {category?.description ||
//                 `Browse our collection of ${category?.name} products`}
//             </p>
//           )}
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar Filters */}
//           <div className="w-full lg:w-64 shrink-0">
//             <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 sticky top-4">
//               <h3 className="font-medium text-lg mb-4">Filters</h3>

//               <Accordion
//                 type="multiple"
//                 defaultValue={["status", "price", "brands"]}
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
//                         const brand = products.find(
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
//             {/* Sort Controls */}
//             <div className="flex justify-between items-center mb-6">
//               <p className="text-sm text-gray-500">
//                 Showing{" "}
//                 <span className="font-medium">{filteredProducts.length}</span>{" "}
//                 products
//               </p>

//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-gray-500">Sort by:</span>
//                 <Select value={sortBy} onValueChange={setSortBy}>
//                   <SelectTrigger className="w-[180px]">
//                     <SelectValue placeholder="Sort by" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="featured">Featured</SelectItem>
//                     <SelectItem value="newest">Newest</SelectItem>
//                     <SelectItem value="price-asc">
//                       Price: Low to High
//                     </SelectItem>
//                     <SelectItem value="price-desc">
//                       Price: High to Low
//                     </SelectItem>
//                     <SelectItem value="discount">Highest Discount</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {/* Products Grid */}
//             {isLoading ? (
//               <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
//                 {Array.from({ length: 8 }).map((_, index) => (
//                   <div key={index} className="flex flex-col">
//                     <Skeleton className="h-64 w-full rounded-lg mb-3" />
//                     <Skeleton className="h-5 w-3/4 mb-2" />
//                     <Skeleton className="h-4 w-1/2" />
//                   </div>
//                 ))}
//               </div>
//             ) : filteredProducts.length > 0 ? (
//               <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
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
//                   Try adjusting your filter criteria
//                 </p>
//                 <Button onClick={resetFilters}>Clear filters</Button>
//               </div>
//             )}

//             {/* Pagination */}
//             {/* {filteredProducts.length > 0 && (
//               <div className="flex justify-center mt-12">
//                 <nav className="flex items-center gap-1">
//                   <Button variant="outline" size="icon" disabled>
//                     <ChevronRight className="h-4 w-4 rotate-180" />
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="bg-primary text-primary-foreground"
//                   >
//                     1
//                   </Button>
//                   <Button variant="outline" size="sm">
//                     2
//                   </Button>
//                   <Button variant="outline" size="sm">
//                     3
//                   </Button>
//                   <Button variant="outline" size="icon">
//                     <ChevronRight className="h-4 w-4" />
//                   </Button>
//                 </nav>
//               </div>
//             )} */}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }



"use client";
import logo from "@/public/logo.png";
import { HeaderLanding } from "@/components/landing-page/header-landing";
import { Footer } from "@/components/landing-page/footer";
import { useEffect, useState } from "react";
import type { CategoryData, ProductData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getCategoryById, getProductsByCategory } from "@/lib/http/api";
import { useParams } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Star, Filter, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export default function CategoryPage() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
  const [category, setCategory] = useState<CategoryData | null>(null);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [showActiveOnly, setShowActiveOnly] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const params = useParams();
  const id = params.slug as string;

  const { data: subData, isLoading: categoryLoading } = useQuery({
    queryKey: ["getCategoryById", id],
    queryFn: async () => {
      return await getCategoryById(id!).then((res) => res.data);
    },
  });

  useEffect(() => {
    if (subData) {
      setCategory(subData.data);
    }
  }, [subData]);

  const { data, isLoading: productsLoading } = useQuery({
    queryKey: ["getProductsByCategory", id],
    queryFn: async () => {
      return await getProductsByCategory(id).then((res) => res.data);
    },
  });

  // Extract unique brands for filters
  const brands = [
    //@ts-ignore
    ...new Set(products.map((product) => product.brandId?._id)),
  ].filter(Boolean);

  // Get minimum price from variants
  const getMinPrice = (product: ProductData) => {
    if (!product.variants || product.variants.length === 0) return 0;
    return Math.min(...product.variants.map((variant) => variant.rate));
  };

  // Get maximum price from variants
  const getMaxPrice = (product: ProductData) => {
    if (!product.variants || product.variants.length === 0) return 0;
    return Math.max(...product.variants.map((variant) => variant.rate));
  };

  // Get discount percentage
  const getDiscountPercentage = (product: ProductData) => {
    if (!product.variants || product.variants.length === 0) return 0;
    const variant = product.variants[0];
    return variant.discount;
  };

  useEffect(() => {
    if (data) {
      setProducts(data);
      setFilteredProducts(data);
    }
  }, [data]);

  useEffect(() => {
    if (products.length > 0) {
      let result = [...products];

      // Filter by active status
      if (showActiveOnly) {
        result = result.filter((product) => product.isActive);
      }

      // Filter by featured status
      if (showFeaturedOnly) {
        result = result.filter((product) => product.isFeatured);
      }

      // Apply brand filter
      if (selectedBrands.length > 0) {
        result = result.filter((product) =>
          selectedBrands.includes(product.brandId?._id)
        );
      }

      // Apply price range filter
      if (priceRange.length > 0) {
        result = result.filter((product) => {
          const minPrice = getMinPrice(product);
          if (priceRange.includes("under-50") && minPrice < 50) return true;
          if (
            priceRange.includes("50-100") &&
            minPrice >= 50 &&
            minPrice <= 100
          )
            return true;
          if (
            priceRange.includes("100-200") &&
            minPrice > 100 &&
            minPrice <= 200
          )
            return true;
          if (priceRange.includes("over-200") && minPrice > 200) return true;
          return false;
        });
      }

      // Apply sorting
      if (sortBy === "price-asc") {
        result.sort((a, b) => getMinPrice(a) - getMinPrice(b));
      } else if (sortBy === "price-desc") {
        result.sort((a, b) => getMinPrice(b) - getMinPrice(a));
      } else if (sortBy === "newest") {
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sortBy === "discount") {
        result.sort(
          (a, b) => getDiscountPercentage(b) - getDiscountPercentage(a)
        );
      } else if (sortBy === "featured") {
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      }

      setFilteredProducts(result);
    }
  }, [
    products,
    sortBy,
    selectedBrands,
    priceRange,
    showFeaturedOnly,
    showActiveOnly,
  ]);

  const handlePriceRangeChange = (value: string) => {
    setPriceRange((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleBrandChange = (value: string) => {
    setSelectedBrands((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const resetFilters = () => {
    setPriceRange([]);
    setSelectedBrands([]);
    setSortBy("featured");
    setShowFeaturedOnly(false);
    setShowActiveOnly(true);
  };

  const isLoading = categoryLoading || productsLoading;

  // Custom ProductCard component to handle the specific data structure
  const CustomProductCard = ({ product }: { product: ProductData }) => {
    const minPrice = getMinPrice(product);
    const maxPrice = getMaxPrice(product);
    const hasMultiplePrices =
      minPrice !== maxPrice && product.variants.length > 1;
    const discount = product.variants[0]?.discount || 0;
    const mrp = product.variants[0]?.mrp || 0;

    return (
      <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden transition-all hover:shadow-lg hover:border-primary/20">
        <Link href={`/products/${product._id}`} className="block relative">
          <div className="relative aspect-square overflow-hidden">
            {product.featureImg ? (
              <Image
                src={product.featureImg || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}

            <div className="absolute top-2 left-2 flex flex-col gap-2">
              {product.isFeatured && (
                <Badge className="bg-yellow-500 hover:bg-yellow-600 text-xs">
                  Featured
                </Badge>
              )}

              {discount > 0 && (
                <Badge className="bg-red-500 hover:bg-red-600 text-xs">
                  {discount}% OFF
                </Badge>
              )}
            </div>
          </div>
        </Link>

        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              {product.brandId?.name || "Brand"}
            </span>
            {product.variants[0]?.quantity < 10 &&
              product.variants[0]?.quantity > 0 && (
                <span className="text-xs text-orange-600 font-medium">
                  Only {product.variants[0].quantity} left
                </span>
              )}
          </div>

          <Link href={`/product/${product._id}`}>
            <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors text-sm md:text-base">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-bold text-gray-900">
              ₹  {minPrice.toFixed(2)}
              {hasMultiplePrices && ` - ${maxPrice.toFixed(2)}`}
            </span>

            {discount > 0 && (
              <span className="text-xs text-gray-500 line-through">
                ₹  {mrp.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-3 w-3 text-yellow-400"
                    fill={star <= 4 ? "currentColor" : "none"}
                    stroke={star <= 4 ? "none" : "currentColor"}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">(24)</span>
            </div>

            {product.variants.length > 1 && (
              <span className="text-xs text-primary font-medium">
                {product.variants.length} options
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <HeaderLanding  />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-gray-100 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-gray-600">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
              <Link href="/category" className="hover:text-primary transition-colors">
                Categories
              </Link>
              <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
              <span className="font-medium text-primary">
                {category?.name || "Loading..."}
              </span>
            </div>
          </div>
        </div>

        {/* Category Header */}
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            {isLoading ? (
              <>
                <Skeleton className="h-10 w-64 mx-auto mb-4" />
                <Skeleton className="h-6 w-full max-w-md mx-auto" />
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {category?.name}
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {category?.description ||
                    `Discover our premium collection of ${category?.name}`}
                </p>
              </>
            )}
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">
              {filteredProducts.length} products
            </p>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filters Panel */}
            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-50 bg-black/50 lg:hidden">
                <div className="absolute inset-0 flex">
                  <div className="relative w-full max-w-xs bg-white h-full overflow-y-auto">
                    <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                      <h3 className="font-medium text-lg">Filters</h3>
                      <button
                        onClick={() => setMobileFiltersOpen(false)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="p-4">
                      <Accordion
                        type="multiple"
                        defaultValue={["status", "price", "brands"]}
                      >
                        <AccordionItem value="status">
                          <AccordionTrigger>Product Status</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id="active-only"
                                  checked={showActiveOnly}
                                  onCheckedChange={() =>
                                    setShowActiveOnly(!showActiveOnly)
                                  }
                                />
                                <label
                                  htmlFor="active-only"
                                  className="text-sm"
                                >
                                  Active Products Only
                                </label>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id="featured-only"
                                  checked={showFeaturedOnly}
                                  onCheckedChange={() =>
                                    setShowFeaturedOnly(!showFeaturedOnly)
                                  }
                                />
                                <label
                                  htmlFor="featured-only"
                                  className="text-sm"
                                >
                                  Featured Products Only
                                </label>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="price">
                          <AccordionTrigger>Price Range</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id="under-50"
                                  checked={priceRange.includes("under-50")}
                                  onCheckedChange={() =>
                                    handlePriceRangeChange("under-50")
                                  }
                                />
                                <label htmlFor="under-50" className="text-sm">
                                  Under ₹  50
                                </label>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id="50-100"
                                  checked={priceRange.includes("50-100")}
                                  onCheckedChange={() =>
                                    handlePriceRangeChange("50-100")
                                  }
                                />
                                <label htmlFor="50-100" className="text-sm">
                                  ₹  50 - ₹  100
                                </label>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id="100-200"
                                  checked={priceRange.includes("100-200")}
                                  onCheckedChange={() =>
                                    handlePriceRangeChange("100-200")
                                  }
                                />
                                <label htmlFor="100-200" className="text-sm">
                                  ₹  100 - ₹  200
                                </label>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id="over-200"
                                  checked={priceRange.includes("over-200")}
                                  onCheckedChange={() =>
                                    handlePriceRangeChange("over-200")
                                  }
                                />
                                <label htmlFor="over-200" className="text-sm">
                                  Over ₹  200
                                </label>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="brands">
                          <AccordionTrigger>Brands</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3 max-h-60 overflow-y-auto">
                              {brands.map((brandId) => {
                                const brand = products.find(
                                  (p) => p.brandId?._id === brandId
                                )?.brandId;
                                return (
                                  <div
                                    key={brandId}
                                    className="flex items-center space-x-3"
                                  >
                                    <Checkbox
                                      id={`brand-${brandId}`}
                                      checked={selectedBrands.includes(brandId)}
                                      onCheckedChange={() =>
                                        handleBrandChange(brandId)
                                      }
                                    />
                                    <label
                                      htmlFor={`brand-${brandId}`}
                                      className="text-sm"
                                    >
                                      {brand?.name || brandId}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={resetFilters}
                        >
                          Reset
                        </Button>
                        <Button
                          className="w-full"
                          onClick={() => setMobileFiltersOpen(false)}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Desktop Sidebar Filters */}
            <div className="hidden lg:block w-72 shrink-0">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-medium text-lg">Filters</h3>
                  <button
                    onClick={resetFilters}
                    className="text-sm text-primary hover:underline"
                  >
                    Clear all
                  </button>
                </div>

                <Accordion
                  type="multiple"
                  defaultValue={["status", "price", "brands"]}
                  className="space-y-4"
                >
                  <AccordionItem value="status" className="border-b-0">
                    <AccordionTrigger className="py-2 hover:no-underline">
                      <span className="font-medium text-gray-900">
                        Product Status
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pt-1">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id="active-only"
                            checked={showActiveOnly}
                            onCheckedChange={() =>
                              setShowActiveOnly(!showActiveOnly)
                            }
                          />
                          <label htmlFor="active-only" className="text-sm">
                            Active Products Only
                          </label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id="featured-only"
                            checked={showFeaturedOnly}
                            onCheckedChange={() =>
                              setShowFeaturedOnly(!showFeaturedOnly)
                            }
                          />
                          <label htmlFor="featured-only" className="text-sm">
                            Featured Products Only
                          </label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="price" className="border-b-0">
                    <AccordionTrigger className="py-2 hover:no-underline">
                      <span className="font-medium text-gray-900">
                        Price Range
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pt-1">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id="under-50"
                            checked={priceRange.includes("under-50")}
                            onCheckedChange={() =>
                              handlePriceRangeChange("under-50")
                            }
                          />
                          <label htmlFor="under-50" className="text-sm">
                            Under ₹  50
                          </label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id="50-100"
                            checked={priceRange.includes("50-100")}
                            onCheckedChange={() =>
                              handlePriceRangeChange("50-100")
                            }
                          />
                          <label htmlFor="50-100" className="text-sm">
                            ₹  50 - ₹  100
                          </label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id="100-200"
                            checked={priceRange.includes("100-200")}
                            onCheckedChange={() =>
                              handlePriceRangeChange("100-200")
                            }
                          />
                          <label htmlFor="100-200" className="text-sm">
                            ₹  100 - ₹  200
                          </label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id="over-200"
                            checked={priceRange.includes("over-200")}
                            onCheckedChange={() =>
                              handlePriceRangeChange("over-200")
                            }
                          />
                          <label htmlFor="over-200" className="text-sm">
                            Over ₹  200
                          </label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="brands" className="border-b-0">
                    <AccordionTrigger className="py-2 hover:no-underline">
                      <span className="font-medium text-gray-900">Brands</span>
                    </AccordionTrigger>
                    <AccordionContent className="pt-1">
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {brands.map((brandId) => {
                          const brand = products.find(
                            (p) => p.brandId?._id === brandId
                          )?.brandId;
                          return (
                            <div
                              key={brandId}
                              className="flex items-center space-x-3"
                            >
                              <Checkbox
                                id={`brand-${brandId}`}
                                checked={selectedBrands.includes(brandId)}
                                onCheckedChange={() =>
                                  handleBrandChange(brandId)
                                }
                              />
                              <label
                                htmlFor={`brand-${brandId}`}
                                className="text-sm"
                              >
                                {brand?.name || brandId}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Sort Controls */}
              <div className="hidden lg:flex justify-between items-center mb-6 bg-white p-4 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-medium text-gray-900">
                    {filteredProducts.length}
                  </span>{" "}
                  products
                </p>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-asc">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-desc">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="discount">Highest Discount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedBrands.length > 0 ||
                priceRange.length > 0 ||
                showFeaturedOnly) && (
                <div className="mb-6 bg-white p-4 rounded-lg border border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {selectedBrands.map((brandId) => {
                      const brand = products.find(
                        (p) => p.brandId?._id === brandId
                      )?.brandId;
                      return (
                        <Badge
                          key={brandId}
                          variant="outline"
                          className="flex items-center gap-1 py-1"
                        >
                          {brand?.name || brandId}
                          <button
                            onClick={() => handleBrandChange(brandId)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      );
                    })}
                    {priceRange.includes("under-50") && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 py-1"
                      >
                        Under ₹  50
                        <button
                          onClick={() => handlePriceRangeChange("under-50")}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {priceRange.includes("50-100") && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 py-1"
                      >
                        ₹  50-100
                        <button
                          onClick={() => handlePriceRangeChange("50-100")}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {priceRange.includes("100-200") && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 py-1"
                      >
                        ₹  100-200
                        <button
                          onClick={() => handlePriceRangeChange("100-200")}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {priceRange.includes("over-200") && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 py-1"
                      >
                        Over ₹  200
                        <button
                          onClick={() => handlePriceRangeChange("over-200")}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {showFeaturedOnly && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 py-1"
                      >
                        Featured Only
                        <button
                          onClick={() => setShowFeaturedOnly(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    <button
                      onClick={resetFilters}
                      className="text-sm text-primary hover:underline ml-auto"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              )}

              {/* Products Grid */}
              {isLoading ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="flex flex-col">
                      <Skeleton className="aspect-square w-full rounded-xl mb-3" />
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <CustomProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                  <div className="mx-auto max-w-md">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      No products found
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your filters or search for something else
                    </p>
                    <Button onClick={resetFilters}>Reset filters</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}