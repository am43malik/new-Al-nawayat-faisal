// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   Heart,
//   ShoppingCart,
//   Minus,
//   Plus,
//   ChevronRight,
//   Star,
//   Share2,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { cn } from "@/lib/utils";
// import type { ProductData } from "@/types";
// import { addToCart } from "@/redux/slice";
// import toast from "react-hot-toast";
// import { useAppDispatch } from "@/redux/store";
// import { useQuery } from "@tanstack/react-query";
// import { getProductById } from "@/lib/http/api";
// import { useParams, useSearchParams } from "next/navigation";
// import logo from "@/public/logo.png";
// import { HeaderLanding } from "@/components/landing-page/header-landing";
// import { Footer } from "@/components/landing-page/footer";
// // import Footer from "@/components/landing-page/footer";

// export default function ProductDetailsPage() {
//   const [product, setProduct] = useState<ProductData | null>(null);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(product?.featureImg);

//   const params = useParams();
//   const id = params.slug as string;

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["getProductById", id],
//     queryFn: async () => {
//       return await getProductById(id!).then((res) => res.data);
//     },
//   });

//   useEffect(() => {
//     if (data) {
//       setProduct(data);
//       setSelectedImage(data.featureImg);
//     }
//   }, [data]);

//   // Extract unique sizes and colors from variants
//   const sizes = Array.from(
//     new Set(
//       product?.variants
//         .map(
//           (variant) =>
//             variant.attributes.find((attr) => attr.attributeId.name === "Size")
//               ?.value
//         )
//         .filter(Boolean)
//     )
//   );

//   const colors = Array.from(
//     new Set(
//       product?.variants
//         .map(
//           (variant) =>
//             variant.attributes.find((attr) => attr.attributeId.name === "Color")
//               ?.value
//         )
//         .filter(Boolean)
//     )
//   );

//   const [selectedSize, setSelectedSize] = useState(sizes[0]);
//   const [selectedColor, setSelectedColor] = useState(colors[0]);

//   // Find the selected variant based on size and color
//   const selectedVariant =
//     product?.variants.find(
//       (variant) =>
//         variant.attributes.find((attr) => attr.attributeId.name === "Size")
//           ?.value === selectedSize &&
//         variant.attributes.find((attr) => attr.attributeId.name === "Color")
//           ?.value === selectedColor
//     ) || product?.variants[0];

//   const discountPercentage = selectedVariant?.discount;

//   const toggleWishlist = () => {
//     setIsWishlisted(!isWishlisted);
//   };

//   const handleSizeChange = (size: string) => {
//     setSelectedSize(size);
//   };

//   const handleColorChange = (color: string) => {
//     setSelectedColor(color);
//   };

//   const incrementQuantity = () => {
//     setQuantity((prev) =>
//       Math.min(prev + 1, selectedVariant ? selectedVariant.quantity : 0)
//     );
//   };

//   const decrementQuantity = () => {
//     setQuantity((prev) => Math.max(prev - 1, 1));
//   };

//   const dispatch = useAppDispatch();

//   const handleAddToCart = () => {
//     // Create a modified product with the selected variant as the first variant
//     const productToAdd: any = {
//       ...product!,
//       quantity: quantity, // Pass the quantity to the addToCart action
//       variants: [
//         {
//           ...selectedVariant,
//           attributes: [
//             ...selectedVariant!.attributes.map((attr) => ({
//               ...attr,
//               // Ensure Size and Color are set to the selected values
//               value:
//                 attr.attributeId.name === "Size"
//                   ? selectedSize
//                   : attr.attributeId.name === "Color"
//                   ? selectedColor
//                   : attr.value,
//             })),
//           ],
//         },
//         ...product!.variants.filter((v) => v !== selectedVariant),
//       ],
//     };

//     dispatch(addToCart(productToAdd));
//     toast.success(`${quantity} Product(s) Added to Cart`);
//   };

//   if (!product)
//     return (
//       <>
//         <HeaderLanding logo={logo} />
//         <div className="py-40 text-center">Product not found</div>
//         <Footer />
//       </>
//     );

//   return (
//     <>
//       <HeaderLanding logo={logo} />
//       <div className="bg-white">
//         <div className="container mx-auto px-4 py-8">
//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Product Images */}
//             <div className="w-full lg:w-3/5">
//               <div className="flex flex-col-reverse md:flex-row gap-4">
//                 {/* Thumbnails */}
//                 <div className="flex md:flex-col gap-3 mt-4 md:mt-0">
//                   <button
//                     onClick={() => setSelectedImage(product.featureImg)}
//                     className={`border rounded-lg overflow-hidden w-16 h-16 ${
//                       selectedImage === product.featureImg
//                         ? "border-[#BD844C]"
//                         : "border-gray-200"
//                     }`}
//                   >
//                     <Image
//                       src={product.featureImg || "/placeholder.svg"}
//                       alt={product.name}
//                       width={64}
//                       height={64}
//                       className="w-full h-full object-cover"
//                     />
//                   </button>
//                   {product.images.map((img, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setSelectedImage(img)}
//                       className={`border rounded-lg overflow-hidden w-16 h-16 ${
//                         selectedImage === img
//                           ? "border-[#BD844C]"
//                           : "border-gray-200"
//                       }`}
//                     >
//                       <Image
//                         src={img || "/placeholder.svg"}
//                         alt={`${product.name} ${index + 1}`}
//                         width={64}
//                         height={64}
//                         className="w-full h-full object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>

//                 <div className="relative flex-1 rounded-xl overflow-hidden border border-gray-200">
//                   {discountPercentage && discountPercentage > 0 && (
//                     <Badge className="absolute left-4 top-4 z-10 bg-red-500 text-white">
//                       {discountPercentage}% OFF
//                     </Badge>
//                   )}
//                   <Image
//                     src={selectedImage || "/placeholder.svg"}
//                     alt={product.name}
//                     width={600}
//                     height={600}
//                     className="w-full h-auto object-cover aspect-square"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Product Details */}
//             <div className="w-full lg:w-2/5">
//               <div className="flex flex-col gap-4">
//                 {/* Breadcrumbs */}
//                 <nav className="flex text-sm text-gray-500 mb-2">
//                   <Link href="/" className="hover:text-[#BD844C]">
//                     Home
//                   </Link>
//                   <ChevronRight className="h-4 w-4 mx-1" />
//                   <Link href="/categories" className="hover:text-[#BD844C]">
//                     {product.categoryId.name}
//                   </Link>
//                   <ChevronRight className="h-4 w-4 mx-1" />
//                   <Link href={`#`} className="hover:text-[#BD844C]">
//                     {product.subCategoryId.name}
//                   </Link>
//                 </nav>

//                 {/* Product Title */}
//                 <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
//                   {product.name}
//                 </h1>

//                 {/* Brand */}
//                 <div className="flex items-center gap-2">
//                   <span className="text-gray-500">Brand:</span>
//                   <Link
//                     href={`/brands/${product.brandId._id}`}
//                     className="text-[#BD844C] hover:underline"
//                   >
//                     {product.brandId.name}
//                   </Link>
//                 </div>

//                 {/* Ratings */}
//                 <div className="flex items-center gap-2">
//                   <div className="flex">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <Star
//                         key={star}
//                         className={`h-5 w-5 ${
//                           star <= 4
//                             ? "fill-yellow-400 text-yellow-400"
//                             : "text-gray-300"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                   {/* <span className="text-sm text-gray-500">(120 reviews)</span> */}
//                 </div>

//                 {/* Price */}
//                 <div className="flex items-center gap-3 mt-2">
//                   <span className="text-2xl font-bold text-gray-900">
//                     ₹  {selectedVariant?.rate}
//                   </span>
//                   {selectedVariant &&
//                     selectedVariant.mrp > selectedVariant.rate && (
//                       <span className="text-lg text-gray-500 line-through">
//                         ₹  {selectedVariant?.mrp}
//                       </span>
//                     )}
//                   {discountPercentage && discountPercentage > 0 && (
//                     <span className="text-sm font-medium text-green-600">
//                       Save ₹  {selectedVariant?.mrp - selectedVariant?.rate}
//                     </span>
//                   )}
//                 </div>

//                 {/* Description */}
//                 <p className="text-gray-600 mt-2">{product.description}</p>

//                 {/* Variant Selection */}
//                 <div className="mt-6 space-y-6">
//                   {/* Size Selection */}
//                   {sizes.length > 0 && (
//                     <div>
//                       <h3 className="text-sm font-medium text-gray-900 mb-3">
//                         Size
//                       </h3>
//                       <div className="flex flex-wrap gap-2">
//                         {sizes.map((size) => (
//                           <button
//                             key={size}
//                             onClick={() => handleSizeChange(String(size))}
//                             className={`px-4 py-2 border rounded-md text-sm font-medium ${
//                               selectedSize === size
//                                 ? "border-[#BD844C] bg-[#BD844C]/10 text-[#BD844C]"
//                                 : "border-gray-200 text-gray-700 hover:border-gray-300"
//                             }`}
//                           >
//                             {size}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Color Selection */}
//                   {colors.length > 0 && (
//                     <div>
//                       <h3 className="text-sm font-medium text-gray-900 mb-3">
//                         Color
//                       </h3>
//                       <div className="flex flex-wrap gap-2">
//                         {colors.map((color) => (
//                           <button
//                             key={color}
//                             onClick={() => handleColorChange(String(color))}
//                             className={`px-4 py-2 border rounded-md text-sm font-medium ${
//                               selectedColor === color
//                                 ? "border-[#BD844C] bg-[#BD844C]/10 text-[#BD844C]"
//                                 : "border-gray-200 text-gray-700 hover:border-gray-300"
//                             }`}
//                           >
//                             {color}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Actions */}
//                 <div className="flex flex-col gap-4 mt-6">
//                   <div className="flex items-center gap-4">
//                     {/* Quantity Selector */}
//                     <div className="flex items-center border border-gray-300 rounded-md">
//                       <button
//                         onClick={decrementQuantity}
//                         className="px-3 py-2 text-gray-600 hover:bg-gray-100"
//                         disabled={quantity <= 1}
//                       >
//                         <Minus className="h-4 w-4" />
//                       </button>
//                       <span className="px-4 py-2 text-gray-900 font-medium">
//                         {quantity}
//                       </span>
//                       <button
//                         onClick={incrementQuantity}
//                         className="px-3 py-2 text-gray-600 hover:bg-gray-100"
//                         // disabled={quantity >= selectedVariant ? selectedVariant.quantity :  }
//                       >
//                         <Plus className="h-4 w-4" />
//                       </button>
//                     </div>

//                     <span className="text-sm text-gray-500">
//                       {selectedVariant?.quantity} items available
//                     </span>
//                   </div>

//                   {/* Add to Cart and Wishlist */}
//                   <div className="flex gap-3">
//                     <Button
//                       className={cn(
//                         "hover:bg-black bg-[#BD844C] text-white flex-1 gap-2"
//                       )}
//                       onClick={handleAddToCart}
//                     >
//                       <ShoppingCart className="h-5 w-5" />
//                       Add to Cart
//                     </Button>

//                     <Button
//                       variant="outline"
//                       size="icon"
//                       onClick={toggleWishlist}
//                     >
//                       <Heart
//                         className={`h-5 w-5 ${
//                           isWishlisted ? "fill-red-500 text-red-500" : ""
//                         }`}
//                       />
//                       <span className="sr-only">Add to wishlist</span>
//                     </Button>

//                     <Button variant="outline" size="icon">
//                       <Share2 className="h-5 w-5" />
//                       <span className="sr-only">Share</span>
//                     </Button>
//                   </div>
//                 </div>

//                 {/* SKU */}
//                 <div className="mt-6 text-sm text-gray-500">
//                   SKU: {selectedVariant?.sku}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Product Details Tabs */}
//           {/* <div className="mt-16">
//             <Tabs defaultValue="description" className="w-full">
//               <TabsList className="grid w-full grid-cols-3 max-w-md">
//                 <TabsTrigger value="description">Description</TabsTrigger>
//                 <TabsTrigger value="specifications">Specifications</TabsTrigger>
//                 <TabsTrigger value="reviews">Reviews</TabsTrigger>
//               </TabsList>
//               <TabsContent value="description" className="mt-6">
//                 <div className="prose max-w-none">
//                   <p>{product.description}</p>
//                   <p>
//                     This premium oversized t-shirt combines style and comfort
//                     with its high-quality cotton blend fabric. The relaxed fit
//                     provides a trendy, contemporary look while maintaining
//                     exceptional comfort for all-day wear.
//                   </p>
//                   <p>
//                     The stylish graphic print adds a unique touch to this
//                     versatile piece, making it perfect for casual outings,
//                     social gatherings, or simply lounging at home. The durable
//                     construction ensures this t-shirt will remain a staple in
//                     your wardrobe for seasons to come.
//                   </p>
//                 </div>
//               </TabsContent>
//               <TabsContent value="specifications" className="mt-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="border rounded-lg overflow-hidden">
//                     <div className="bg-gray-50 px-4 py-3 font-medium">
//                       Material & Care
//                     </div>
//                     <div className="p-4 space-y-2">
//                       <p className="flex justify-between">
//                         <span className="text-gray-500">Material</span>
//                         <span>60% Cotton, 40% Polyester</span>
//                       </p>
//                       <p className="flex justify-between">
//                         <span className="text-gray-500">Care Instructions</span>
//                         <span>Machine wash cold</span>
//                       </p>
//                     </div>
//                   </div>
//                   <div className="border rounded-lg overflow-hidden">
//                     <div className="bg-gray-50 px-4 py-3 font-medium">
//                       Product Details
//                     </div>
//                     <div className="p-4 space-y-2">
//                       <p className="flex justify-between">
//                         <span className="text-gray-500">Style</span>
//                         <span>Oversized</span>
//                       </p>
//                       <p className="flex justify-between">
//                         <span className="text-gray-500">Neck Type</span>
//                         <span>Round Neck</span>
//                       </p>
//                       <p className="flex justify-between">
//                         <span className="text-gray-500">Sleeve Length</span>
//                         <span>Short Sleeve</span>
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </TabsContent>
//               <TabsContent value="reviews" className="mt-6">
//                 <div className="space-y-6">
//                   <div className="flex items-center gap-4">
//                     <div className="flex">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star
//                           key={star}
//                           className={`h-5 w-5 ${
//                             star <= 4
//                               ? "fill-yellow-400 text-yellow-400"
//                               : "text-gray-300"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-lg font-medium">4.0 out of 5</span>
//                     <span className="text-gray-500">Based on 120 reviews</span>
//                   </div>

//                   <div className="border-t pt-6">
//                     <h3 className="font-medium text-lg mb-4">
//                       Customer Reviews
//                     </h3>
//                     <div className="space-y-6">
                
//                       <div className="border-b pb-6">
//                         <div className="flex items-center gap-2 mb-2">
//                           <div className="flex">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                               <Star
//                                 key={star}
//                                 className={`h-4 w-4 ${
//                                   star <= 5
//                                     ? "fill-yellow-400 text-yellow-400"
//                                     : "text-gray-300"
//                                 }`}
//                               />
//                             ))}
//                           </div>
//                           <span className="font-medium">Great quality!</span>
//                         </div>
//                         <p className="text-gray-600 mb-2">
//                           The t-shirt is exactly as described. The material is
//                           soft and comfortable, and the fit is perfect.
//                           I&apos;ll definitely be ordering more colors!
//                         </p>
//                         <div className="flex items-center gap-2 text-sm text-gray-500">
//                           <span>John D.</span>
//                           <span>•</span>
//                           <span>Verified Purchase</span>
//                           <span>•</span>
//                           <span>2 weeks ago</span>
//                         </div>
//                       </div>

                    
//                       <div className="border-b pb-6">
//                         <div className="flex items-center gap-2 mb-2">
//                           <div className="flex">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                               <Star
//                                 key={star}
//                                 className={`h-4 w-4 ${
//                                   star <= 4
//                                     ? "fill-yellow-400 text-yellow-400"
//                                     : "text-gray-300"
//                                 }`}
//                               />
//                             ))}
//                           </div>
//                           <span className="font-medium">
//                             Good value for money
//                           </span>
//                         </div>
//                         <p className="text-gray-600 mb-2">
//                           I was pleasantly surprised by the quality considering
//                           the price. The color is exactly as shown in the
//                           pictures, and the size fits as expected. Would
//                           recommend!
//                         </p>
//                         <div className="flex items-center gap-2 text-sm text-gray-500">
//                           <span>₹ ah M.</span>
//                           <span>•</span>
//                           <span>Verified Purchase</span>
//                           <span>•</span>
//                           <span>1 month ago</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </div> */}

//           {/* Related Products Section */}
//           {/* <div className="mt-16">
//             <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {[1, 2, 3, 4].map((item) => (
//                 <div key={item} className="border rounded-lg overflow-hidden">
//                   <div className="aspect-square bg-gray-100"></div>
//                   <div className="p-4">
//                     <h3 className="font-medium">Related Product {item}</h3>
//                     <p className="text-sm text-gray-500 mt-1">
//                       Product description
//                     </p>
//                     <div className="mt-2 font-bold">₹  999</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div> */}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  ChevronRight,
  Star,
  Share2,
  ArrowLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { ProductData } from "@/types";
import { addToCart } from "@/redux/slice";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/lib/http/api";
import { useParams, useRouter } from "next/navigation";
import logo from "@/public/logo.png";
import { HeaderLanding } from "@/components/landing-page/header-landing";
import { Footer } from "@/components/landing-page/footer";

export default function ProductDetailsPage() {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.featureImg);
  const router = useRouter();

  const params = useParams();
  const id = params.slug as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ["getProductById", id],
    queryFn: async () => {
      return await getProductById(id!).then((res) => res.data);
    },
  });

  useEffect(() => {
    if (data) {
      setProduct(data);
      setSelectedImage(data.featureImg);
    }
  }, [data]);

  // Extract unique sizes and colors from variants
  const sizes = Array.from(
    new Set(
      product?.variants
        .map(
          (variant) =>
            variant.attributes.find((attr) => attr.attributeId.name === "Size")
              ?.value
        )
        .filter(Boolean)
    )
  );

  const colors = Array.from(
    new Set(
      product?.variants
        .map(
          (variant) =>
            variant.attributes.find((attr) => attr.attributeId.name === "Color")
              ?.value
        )
        .filter(Boolean)
    )
  );

  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  // Find the selected variant based on size and color
  const selectedVariant =
    product?.variants.find(
      (variant) =>
        variant.attributes.find((attr) => attr.attributeId.name === "Size")
          ?.value === selectedSize &&
        variant.attributes.find((attr) => attr.attributeId.name === "Color")
          ?.value === selectedColor
    ) || product?.variants[0];

  const discountPercentage = selectedVariant?.discount;

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const incrementQuantity = () => {
    setQuantity((prev) =>
      Math.min(prev + 1, selectedVariant ? selectedVariant.quantity : 0)
    );
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    const productToAdd: any = {
      ...product!,
      quantity: quantity,
      variants: [
        {
          ...selectedVariant,
          attributes: [
            ...selectedVariant!.attributes.map((attr) => ({
              ...attr,
              value:
                attr.attributeId.name === "Size"
                  ? selectedSize
                  : attr.attributeId.name === "Color"
                  ? selectedColor
                  : attr.value,
            })),
          ],
        },
        ...product!.variants.filter((v) => v !== selectedVariant),
      ],
    };

    dispatch(addToCart(productToAdd));
    toast.success(`${quantity} Product(s) Added to Cart`);
  };

  if (!product)
    return (
      <>
        <HeaderLanding logo={logo} />
        <div className="py-40 text-center">Product not found</div>
        <Footer />
      </>
    );

  return (
    <>
      <HeaderLanding logo={logo} />
      <div className="bg-white">
        <div className="container mx-auto px-4 py-6">
          {/* Back button */}
          <Button 
            variant="ghost" 
            className="mb-4 flex items-center gap-1 text-gray-600 hover:text-green-600"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Images */}
            <div className="w-full lg:w-1/2">
              <div className="flex flex-col-reverse md:flex-row gap-4">
                {/* Thumbnails */}
                <div className="flex md:flex-col gap-3 mt-4 md:mt-0">
                  <button
                    onClick={() => setSelectedImage(product.featureImg)}
                    className={`border rounded-lg overflow-hidden w-16 h-16 ${
                      selectedImage === product.featureImg
                        ? "border-green-500"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={product.featureImg || "/placeholder.svg"}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </button>
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`border rounded-lg overflow-hidden w-16 h-16 ${
                        selectedImage === img
                          ? "border-green-500"
                          : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`${product.name} ${index + 1}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Main Image */}
                <div className="relative flex-1 rounded-xl overflow-hidden border border-gray-200">
                  {discountPercentage && discountPercentage > 0 && (
                    <Badge className="absolute left-4 top-4 z-10 bg-green-500 text-white">
                      {discountPercentage}% OFF
                    </Badge>
                  )}
                  <Image
                    src={selectedImage || "/placeholder.svg"}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover aspect-square"
                  />
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-1/2">
              <div className="flex flex-col gap-4">
                {/* Breadcrumbs */}
                <nav className="flex items-center text-sm text-gray-500 mb-2">
                  <Link href="/" className="hover:text-green-600">
                    Home
                  </Link>
                  <ChevronRight className="h-4 w-4 mx-1" />
                  <Link href="/categories" className="hover:text-green-600">
                    {product.categoryId.name}
                  </Link>
                  <ChevronRight className="h-4 w-4 mx-1" />
                  <span className="text-gray-400">{product.subCategoryId.name}</span>
                </nav>

                {/* Product Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>

                {/* Brand */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Brand:</span>
                  <Link
                    href={`/brands/${product.brandId._id}`}
                    className="text-green-600 hover:underline"
                  >
                    {product.brandId.name}
                  </Link>
                </div>

                {/* Ratings */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= 4
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(120 reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ₹  {selectedVariant?.rate}
                  </span>
                  {selectedVariant &&
                    selectedVariant.mrp > selectedVariant.rate && (
                      <span className="text-lg text-gray-500 line-through">
                        ₹  {selectedVariant?.mrp}
                      </span>
                    )}
                  {discountPercentage && discountPercentage > 0 && (
                    <span className="text-sm font-medium text-green-600">
                      Save ₹  {selectedVariant?.mrp - selectedVariant?.rate}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 mt-2">{product.description}</p>

                {/* Variant Selection */}
                <div className="mt-6 space-y-6">
                  {/* Size Selection */}
                  {sizes.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        Size
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => handleSizeChange(String(size))}
                            className={`px-4 py-2 border rounded-md text-sm font-medium ${
                              selectedSize === size
                                ? "border-green-500 bg-green-500/10 text-green-600"
                                : "border-gray-200 text-gray-700 hover:border-gray-300"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Color Selection */}
                  {colors.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        Color
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => handleColorChange(String(color))}
                            className={`px-4 py-2 border rounded-md text-sm font-medium ${
                              selectedColor === color
                                ? "border-green-500 bg-green-500/10 text-green-600"
                                : "border-gray-200 text-gray-700 hover:border-gray-300"
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-4 mt-6">
                  <div className="flex items-center gap-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={decrementQuantity}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 text-gray-900 font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={incrementQuantity}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <span className="text-sm text-gray-500">
                      {selectedVariant?.quantity} items available
                    </span>
                  </div>

                  {/* Add to Cart and Wishlist */}
                  <div className="flex gap-3">
                    <Button
                      className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Add to Cart
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleWishlist}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isWishlisted ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                    </Button>

                    <Button variant="outline" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* SKU */}
                <div className="mt-6 text-sm text-gray-500">
                  SKU: {selectedVariant?.sku}
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <div className="prose max-w-none">
                  <p>{product.description}</p>
                </div>
              </TabsContent>
              <TabsContent value="specifications" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 font-medium">
                      Product Details
                    </div>
                    <div className="p-4 space-y-2">
                      {product.variants[0].attributes.map((attr, index) => (
                        <p key={index} className="flex justify-between">
                          <span className="text-gray-500">{attr.attributeId.name}</span>
                          <span>{attr.value}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= 4
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-medium">4.0 out of 5</span>
                    <span className="text-gray-500">Based on 120 reviews</span>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-medium text-lg mb-4">
                      Customer Reviews
                    </h3>
                    <div className="space-y-6">
                      <div className="border-b pb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= 5
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-medium">Great quality!</span>
                        </div>
                        <p className="text-gray-600 mb-2">
                          The product is exactly as described. The material is
                          soft and comfortable, and the fit is perfect.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>John D.</span>
                          <span>•</span>
                          <span>Verified Purchase</span>
                          <span>•</span>
                          <span>2 weeks ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}