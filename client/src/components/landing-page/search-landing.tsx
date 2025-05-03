// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import { Search, Loader2, X } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { searchProductsLanding } from "@/lib/http/api";
// import { ProductData } from "@/types";
// import { useDebounce } from "@/hooks/use-debounce";

// const SearchBar = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const debouncedSearchTerm = useDebounce(searchTerm, 500);
//   const searchRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();

//   const { data, isLoading, isFetching } = useQuery({
//     queryKey: ["searchProductsLanding", debouncedSearchTerm],
//     queryFn: async () => {
//       if (!debouncedSearchTerm || debouncedSearchTerm.length < 2)
//         return { products: [] };
//       return await searchProductsLanding(debouncedSearchTerm).then(
//         (res) => res.data
//       );
//     },
//     enabled: debouncedSearchTerm.length >= 2,
//   });

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const products = data?.products || [];
//   const isSearching = isLoading || isFetching;

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         searchRef.current &&
//         !searchRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Open dropdown when there are results
//   useEffect(() => {
//     if (debouncedSearchTerm.length >= 2) {
//       setIsOpen(true);
//     }
//   }, [debouncedSearchTerm, products]);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
//       setIsOpen(false);
//     }
//   };

//   const clearSearch = () => {
//     setSearchTerm("");
//     setIsOpen(false);
//   };

//   return (
//     <div
//       className="hidden md:flex flex-1 max-w-md mx-6 relative"
//       ref={searchRef}
//     >
//       <form onSubmit={handleSearch} className="w-full">
//         <div className="relative w-full">
//           <Input
//             type="text"
//             placeholder="Search for product"
//             className="w-full pl-10 pr-10 py-2 rounded-full border-gray-300 focus:border-black focus:ring-black"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onFocus={() => searchTerm.length >= 2 && setIsOpen(true)}
//           />
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />

//           {searchTerm && (
//             <Button
//               type="button"
//               variant="ghost"
//               size="icon"
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
//               onClick={clearSearch}
//             >
//               <X className="h-4 w-4" />
//               <span className="sr-only">Clear search</span>
//             </Button>
//           )}
//         </div>
//       </form>

//       {/* Search Results Dropdown */}
//       {isOpen && (
//         <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[70vh] overflow-y-auto z-50">
//           <div className="p-2">
//             {isSearching ? (
//               <div className="flex items-center justify-center py-8">
//                 <Loader2 className="h-6 w-6 animate-spin text-green-500" />
//                 <span className="ml-2 text-sm text-gray-500">Searching...</span>
//               </div>
//             ) : products.length > 0 ? (
//               <>
//                 <div className="text-xs font-medium text-gray-500 px-2 py-1">
//                   {products.length}{" "}
//                   {products.length === 1 ? "result" : "results"} found
//                 </div>
//                 <div className="space-y-1 mt-1">
//                   {products.map((product: ProductData) => (
//                     <Link
//                       key={product._id}
//                       href={`/products/${product._id}`}
//                       className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       <div className="h-12 w-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
//                         {product.featureImg ? (
//                           <Image
//                             src={product.featureImg || "/placeholder.svg"}
//                             alt={product.name}
//                             width={48}
//                             height={48}
//                             className="h-full w-full object-cover"
//                           />
//                         ) : (
//                           <div className="h-full w-full flex items-center justify-center bg-gray-200">
//                             <span className="text-xs text-gray-500">
//                               No img
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                       <div className="ml-3 flex-1 min-w-0">
//                         <p className="text-sm font-medium text-gray-900 truncate">
//                           {product.name}
//                         </p>
//                         <p className="text-xs text-gray-500 truncate">
//                           {product.categoryId?.name || "Uncategorized"}
//                         </p>
//                       </div>
//                       {/* <div className="ml-2 flex-shrink-0">
//                         <p className="text-sm font-medium text-green-600">
//                           ₹  {(product.p\ ?? 0).toFixed(2)}
//                         </p>
//                         {product.discount > 0 && (
//                           <p className="text-xs text-gray-500 line-through">
//                             ₹  {(product.mrp ?? 0).toFixed(2)}
//                           </p>
//                         )}
//                       </div> */}
//                     </Link>
//                   ))}
//                 </div>
//                 {/* <div className="mt-2 pt-2 border-t border-gray-100">
//                   <Button
//                     variant="ghost"
//                     className="w-full text-green-600 text-sm hover:text-green-700 hover:bg-green-50"
//                     onClick={handleSearch}
//                   >
//                     View all results
//                   </Button>
//                 </div> */}
//               </>
//             ) : debouncedSearchTerm.length >= 2 ? (
//               <div className="py-8 text-center">
//                 <p className="text-sm text-gray-500">
//                   No products found for &quot;{debouncedSearchTerm}&quot;
//                 </p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   Try a different search term
//                 </p>
//               </div>
//             ) : (
//               <div className="py-8 text-center">
//                 <p className="text-sm text-gray-500">
//                   Type at least 2 characters to search
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;


"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { Search, Loader2, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { searchProductsLanding } from "@/lib/http/api"
import type { ProductData } from "@/types"
import { useDebounce } from "@/hooks/use-debounce"

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["searchProductsLanding", debouncedSearchTerm],
    queryFn: async () => {
      if (!debouncedSearchTerm || debouncedSearchTerm.length < 2) return { products: [] }
      return await searchProductsLanding(debouncedSearchTerm).then((res) => res.data)
    },
    enabled: debouncedSearchTerm.length >= 2,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const products = data?.products || []
  const isSearching = isLoading || isFetching

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Open dropdown when there are results
  useEffect(() => {
    if (debouncedSearchTerm.length >= 2) {
      setIsOpen(true)
    }
  }, [debouncedSearchTerm, products])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
      setIsOpen(false)
    }
  }

  const clearSearch = () => {
    setSearchTerm("")
    setIsOpen(false)
  }

  return (
    <div className="hidden md:flex flex-1 max-w-md mx-6 relative" ref={searchRef}>
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative w-full group">
          <Input
            type="text"
            placeholder="Search for product"
            className="w-full pl-12 pr-10 py-2.5 rounded-full border-gray-200 bg-gray-50 focus:bg-white transition-all duration-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 shadow-sm hover:shadow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm.length >= 2 && setIsOpen(true)}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-green-500 transition-colors duration-200">
            <Search className="h-5 w-5" />
          </div>

          {searchTerm && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors duration-200"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 max-h-[70vh] overflow-y-auto z-50 transition-all duration-200 animate-in fade-in-50 slide-in-from-top-5">
          <div className="p-3">
            {isSearching ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-6 w-6 animate-spin text-green-500" />
                <span className="ml-3 text-sm font-medium text-gray-600">Searching...</span>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="text-xs font-medium text-gray-500 px-2 py-1.5 bg-gray-50 rounded-lg mb-2">
                  {products.length} {products.length === 1 ? "result" : "results"} found
                </div>
                <div className="space-y-2 mt-2">
                  {products.map((product: ProductData) => (
                    <Link
                      key={product._id}
                      href={`/products/${product._id}`}
                      className="flex items-center p-2.5 hover:bg-green-50 rounded-lg transition-colors group"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="h-14 w-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 shadow-sm">
                        {product.featureImg ? (
                          <Image
                            src={product.featureImg || "/placeholder.svg"}
                            alt={product.name}
                            width={56}
                            height={56}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-gray-200">
                            <span className="text-xs text-gray-500">No img</span>
                          </div>
                        )}
                      </div>
                      <div className="ml-3.5 flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate group-hover:text-green-600 transition-colors">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-0.5 flex items-center">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-300 mr-1.5"></span>
                          {product.categoryId?.name || "Uncategorized"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    className="w-full text-green-600 text-sm font-medium hover:text-green-700 hover:bg-green-50 rounded-lg py-2"
                    onClick={handleSearch}
                  >
                    View all results
                  </Button>
                </div>
              </>
            ) : debouncedSearchTerm.length >= 2 ? (
              <div className="py-10 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  No products found for &quot;{debouncedSearchTerm}&quot;
                </p>
                <p className="text-xs text-gray-500 mt-1.5">Try a different search term or browse categories</p>
              </div>
            ) : (
              <div className="py-10 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-700">Type at least 2 characters to search</p>
                <p className="text-xs text-gray-500 mt-1.5">Search for products by name or category</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
