// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { getFeatureProducts } from "@/lib/http/api";
// import { useQuery } from "@tanstack/react-query";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";

// interface AttributeId {
//   _id: string;
//   name: string;
// }

// interface Attribute {
//   attributeId: AttributeId;
//   value: string;
// }

// interface Variant {
//   quantity: number;
//   sku: string;
//   mrp: number;
//   rate: number;
//   discount: number;
//   attributes: Attribute[];
// }

// interface CategoryData {
//   _id: string;
//   name: string;
// }

// interface UserData {
//   _id: string;
//   name: string;
// }

// interface Brand {
//   _id: string;
//   name: string;
// }

// interface ProductData {
//   _id: string;
//   name: string;
//   description: string;
//   categoryId: CategoryData;
//   subCategoryId: CategoryData;
//   createdBy: UserData;
//   brandId: Brand;
//   status: string;
//   isApproved: boolean;
//   isActive: boolean;
//   isFeatured: boolean;
//   featureImg: string;
//   images: string[];
//   variants: Variant[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// export default function ProductGrid() {
//   const [products, setProducts] = useState<ProductData[]>([]);
//   const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
//     null
//   );
//   const [isModalOpen, setIsModalOpen] = useState(false);

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

//   const getProductPrice = (product: ProductData) => {
//     const firstVariant = product.variants[0];
//     return firstVariant?.rate || 0;
//   };

//   const getProductMRP = (product: ProductData) => {
//     const firstVariant = product.variants[0];
//     return firstVariant?.mrp || 0;
//   };

//   const getDiscountPercentage = (product: ProductData) => {
//     const mrp = getProductMRP(product);
//     const rate = getProductPrice(product);
//     if (mrp === 0) return 0;
//     return Math.round(((mrp - rate) / mrp) * 100);
//   };

//   const getStatusBadge = (product: ProductData) => {
//     if (!product.isActive) return "Sold Out";
//     if (!product.isFeatured) return "End Deal";
//     return null;
//   };

//   return (
//     <section
//       id="product"
//       className="py-10 sm:py-28 px-4 md:px-6 lg:px-8 bg-gray-50"
//     >
//       <div className="container mx-auto max-w-7xl">
//         <div className="flex justify-between items-center mb-12">
//           <h2 className="text-[#8B020F] text-3xl md:text-4xl lg:text-5xl font-medium">
//             Best Selling
//           </h2>
//           {/* <Badge variant="outline" className="text-base py-1 px-4">
//             {products.length} Products
//           </Badge> */}
//         </div>

//         {isLoading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="animate-pulse">
//                 <div className="aspect-[3/4] bg-gray-200 rounded-lg"></div>
//                 <div className="mt-4 space-y-2">
//                   <div className="h-4 bg-gray-200 rounded w-1/3"></div>
//                   <div className="h-4 bg-gray-200 rounded w-2/3"></div>
//                   <div className="h-4 bg-gray-200 rounded w-1/4"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
//             {products.map((product) => (
//               <div
//                 key={product._id}
//                 className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
//                 onClick={() => {
//                   setSelectedProduct(product);
//                   setIsModalOpen(true);
//                 }}
//               >
//                 <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-xl">
//                   <Image
//                     src={product.featureImg || "/placeholder.svg"}
//                     alt={product.name}
//                     fill
//                     className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
//                   />
//                   {getStatusBadge(product) && (
//                     <Badge
//                       variant="soft"
//                       color="destructive"
//                       className="absolute top-2 left-2"
//                     >
//                       {getStatusBadge(product)}
//                     </Badge>
//                   )}
//                   {getDiscountPercentage(product) > 0 && (
//                     <Badge className="absolute top-2 right-2 bg-green-600">
//                       {getDiscountPercentage(product)}% OFF
//                     </Badge>
//                   )}
//                 </div>
//                 <div className="p-4 space-y-2">
//                   <h3 className="text-sm text-gray-500 font-medium">
//                     {product.brandId.name}
//                   </h3>
//                   <p className="text-base font-semibold line-clamp-2">
//                     {product.name}
//                   </p>
//                   <div className="flex items-baseline gap-2">
//                     <p className="text-lg font-bold text-[#8B020F]">
//                       ₹  {getProductPrice(product).toFixed(2)}
//                     </p>
//                     {getProductMRP(product) > getProductPrice(product) && (
//                       <p className="text-sm text-gray-500 line-through">
//                         ₹  {getProductMRP(product).toFixed(2)}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//           <DialogContent className="max-w-3xl">
//             {selectedProduct && (
//               <>
//                 <DialogHeader>
//                   <DialogTitle className="text-2xl font-semibold">
//                     {selectedProduct.name}
//                   </DialogTitle>
//                   {/* <DialogDescription>
//                     By {selectedProduct.brandId.name}
//                   </DialogDescription> */}
//                 </DialogHeader>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
//                   <div className="relative aspect-square rounded-lg overflow-hidden">
//                     <Image
//                       src={selectedProduct.featureImg || "/placeholder.svg"}
//                       alt={selectedProduct.name}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <div className="space-y-4">
//                     <div className="space-y-2">
//                       <p className="text-sm text-gray-500">Description</p>
//                       <p className="text-sm">{selectedProduct.description}</p>
//                     </div>
//                     <div className="space-y-2">
//                       <p className="text-sm text-gray-500">Category</p>
//                       <div className="flex gap-2">
//                         <Badge variant="outline">
//                           {selectedProduct.categoryId.name}
//                         </Badge>
//                         <Badge variant="outline">
//                           {selectedProduct.subCategoryId.name}
//                         </Badge>
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <p className="text-sm text-gray-500">Price</p>
//                       <div className="flex items-baseline gap-2">
//                         <p className="text-2xl font-bold text-[#8B020F]">
//                           ₹  {getProductPrice(selectedProduct).toFixed(2)}
//                         </p>
//                         {getProductMRP(selectedProduct) >
//                           getProductPrice(selectedProduct) && (
//                           <p className="text-lg text-gray-500 line-through">
//                             ₹  {getProductMRP(selectedProduct).toFixed(2)}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}
//           </DialogContent>
//         </Dialog>
//       </div>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import { Heart, X, ShoppingCart } from "lucide-react";
import { Key, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFeatureProducts } from "@/lib/http/api";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface AttributeId {
  _id: string;
  name: string;
}

interface Attribute {
  attributeId: AttributeId;
  value: string;
}

interface Variant {
  quantity: number;
  sku: string;
  mrp: number;
  rate: number;
  discount: number;
  attributes: Attribute[];
}

interface CategoryData {
  _id: string;
  name: string;
}

interface UserData {
  _id: string;
  name: string;
}

interface Brand {
  _id: string;
  name: string;
}

interface ProductData {
  _id: string;
  name: string;
  description: string;
  categoryId: CategoryData;
  subCategoryId: CategoryData;
  createdBy: UserData;
  brandId: Brand;
  status: string;
  isApproved: boolean;
  isActive: boolean;
  isFeatured: boolean;
  featureImg: string;
  images: string[];
  variants: Variant[];
  createdAt: Date;
  updatedAt: Date;
}

export default function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    null
  );
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["getFeatureProducts"],
    queryFn: async () => (await getFeatureProducts()).data,
  });

  const handleProductClick = (product: ProductData) => {
    setSelectedProduct(product);
    setSelectedVariant(product.variants[0]);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setQuantity(1);
  };

  const getStatusBadge = (product: ProductData) => {
    if (!product.isActive) return "Sold Out";
    if (!product.isFeatured) return "End Deal";
    return null;
  };

  return (
    <section className="py-10 sm:py-28 px-4 md:px-6 lg:px-8" id="product">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-rose-900 text-4xl md:text-5xl font-bold mb-12">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data?.map((product: ProductData) => (
            <div
              key={product._id}
              onClick={() => handleProductClick(product)}
              className="group relative cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50 shadow-lg">
                <Image
                  src={product.featureImg || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {getStatusBadge(product) && (
                  <div className="absolute top-3 left-3 bg-rose-800 text-white px-3 py-1 text-xs font-medium rounded-full">
                    {getStatusBadge(product)}
                  </div>
                )}

                <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                  <Heart className="w-5 h-5 text-rose-900" />
                </button>
              </div>

              <div className="mt-4 space-y-1 px-2">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  {product.brandId.name}
                </h3>
                <p className="text-lg font-semibold text-gray-900 line-clamp-1">
                  {product.name}
                </p>
                {/* <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-rose-900">
                    ₹  {product.variants[0].rate.toFixed(2)}
                  </span>
                  {product.variants[0].discount > 0 && (
                    <span className="text-sm line-through text-gray-400">
                      ₹  {product.variants[0].mrp.toFixed(2)}
                    </span>
                  )}
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {/* Product Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div className="space-y-4">
                  <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden">
                    <Image
                      src={selectedProduct.featureImg}
                      alt={selectedProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {selectedProduct.images.map(
                      (
                        img: string | StaticImport,
                        i: Key | null | undefined
                      ) => (
                        <div
                          key={i}
                          className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden"
                        >
                          <Image
                            src={img}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      by {selectedProduct.brandId.name}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold text-rose-900">
                        ₹  {selectedVariant?.rate.toFixed(2)}
                      </span>
                      {selectedVariant && selectedVariant.discount > 0 && (
                        <span className="text-sm line-through text-gray-400">
                          ₹  {selectedVariant.mrp.toFixed(2)}
                        </span>
                      )}
                    </div> */}

                    <div className="space-y-2">
                      {/* <h3 className="font-medium">Select Variant</h3> */}
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.variants.map((variant: any) => (
                          <button
                            key={variant.sku}
                            onClick={() => setSelectedVariant(variant)}
                            className={`px-4 py-2 rounded-full border ${
                              variant === selectedVariant
                                ? "border-rose-900 bg-rose-50 text-rose-900"
                                : "border-gray-200 hover:border-rose-200"
                            }`}
                          >
                            {variant.attributes
                              .map((attr: any) => attr.value)
                              .join(" / ")}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* <div className="space-y-2">
                      <h3 className="font-medium">Quantity</h3>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="w-12 text-center">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 bg-rose-900 text-white py-3 rounded-lg hover:bg-rose-800 transition-colors">
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button> */}

                    <p className="text-gray-600 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
