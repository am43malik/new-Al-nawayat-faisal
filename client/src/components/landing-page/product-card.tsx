// "use client";

// import type React from "react";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Heart, ShoppingCart, Minus, Plus } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { cn } from "@/lib/utils";
// import toast from "react-hot-toast";
// import { addToCart, addToWishlist, removeFromWishlist } from "@/redux/slice";
// import { useAppDispatch, useAppSelector } from "@/redux/store";
// import { ProductData } from "@/types";

// interface ProductCardProps {
//   productProps: ProductData;
// }

// export function ProductCard({ productProps }: ProductCardProps) {
//   const dispatch = useAppDispatch();
//   const wishlistItems = useAppSelector((state) => state.cart.wishlist);
//   const isWishlisted = wishlistItems.some(
//     (item) => item.productId === productProps._id
//   );

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedVariant, setSelectedVariant] = useState(
//     productProps.variants[0]
//   );

//   // Extract size and color from attributes
//   const getSizeFromVariant = (variant: ProductData["variants"][0]) => {
//     return (
//       variant.attributes.find((attr) => attr.attributeId.name === "Size")
//         ?.value || ""
//     );
//   };

//   const getColorFromVariant = (variant: ProductData["variants"][0]) => {
//     return (
//       variant.attributes.find((attr) => attr.attributeId.name === "Color")
//         ?.value || ""
//     );
//   };

//   const [selectedSize, setSelectedSize] = useState(
//     getSizeFromVariant(productProps.variants[0])
//   );
//   const [selectedColor, setSelectedColor] = useState(
//     getColorFromVariant(productProps.variants[0])
//   );

//   const sizes = Array.from(
//     new Set(
//       productProps.variants
//         .map((variant) => getSizeFromVariant(variant))
//         .filter(Boolean)
//     )
//   );

//   const colors = Array.from(
//     new Set(
//       productProps.variants
//         .map((variant) => getColorFromVariant(variant))
//         .filter(Boolean)
//     )
//   );

//   const toggleWishlistItem = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (isWishlisted) {
//       dispatch(removeFromWishlist(productProps._id));
//       toast.success("Removed from wishlist");
//     } else {
//       dispatch(addToWishlist(productProps));
//       toast.success("Added to wishlist");
//     }
//   };

//   const openVariantModal = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsModalOpen(true);
//   };

//   const incrementQuantity = () => {
//     setQuantity((prev) => prev + 1);
//   };

//   const decrementQuantity = () => {
//     if (quantity > 1) {
//       setQuantity((prev) => prev - 1);
//     }
//   };

//   const handleSizeChange = (size: string) => {
//     setSelectedSize(size);
//     // Find matching variant
//     const variant = productProps.variants.find(
//       (v) =>
//         getSizeFromVariant(v) === size &&
//         getColorFromVariant(v) === selectedColor
//     );
//     if (variant) {
//       setSelectedVariant(variant);
//     }
//   };

//   const handleColorChange = (color: string) => {
//     setSelectedColor(color);
//     // Find matching variant
//     const variant = productProps.variants.find(
//       (v) =>
//         getSizeFromVariant(v) === selectedSize &&
//         getColorFromVariant(v) === color
//     );
//     if (variant) {
//       setSelectedVariant(variant);
//     }
//   };

//   const discountPercentage = selectedVariant.discount;

//   // Create a modified product with the selected variant for the cart
//   const handleAddToCart = () => {
//     // Create a modified product with the selected variant as the first variant
//     const productToAdd: any = {
//       ...productProps,
//       quantity: quantity, // Pass the quantity to the addToCart action
//       variants: [
//         {
//           ...selectedVariant,
//           attributes: [
//             ...selectedVariant.attributes.map((attr) => ({
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
//         ...productProps.variants.filter((v) => v !== selectedVariant),
//       ],
//     };

//     dispatch(addToCart(productToAdd));
//     toast.success(`${quantity} Product(s) Added to Cart`);
//     setIsModalOpen(false);
//     setQuantity(1); // Reset quantity after adding to cart
//   };

//   return (
//     <>
//       <Card className="group relative overflow-hidden rounded-xl border bg-white shadow-lg transition-all hover:shadow-xl">
//         {discountPercentage > 0 && (
//           <Badge className="absolute left-3 top-3 z-10 bg-red-500 text-white">
//             {discountPercentage}% OFF
//           </Badge>
//         )}
//         <button
//           className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 shadow transition hover:bg-gray-100"
//           onClick={toggleWishlistItem}
//         >
//           <Heart
//             className={`h-5 w-5 ${
//               isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
//             }`}
//           />
//           <span className="sr-only">Add to wishlist</span>
//         </button>
//         <Link
//           href={`/products/${productProps._id}`}
//           className="block aspect-square overflow-hidden"
//         >
//           <Image
//             src={productProps.featureImg || "/placeholder.svg"}
//             alt={productProps.name}
//             width={400}
//             height={400}
//             className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
//           />
//         </Link>
//         <CardContent className="p-4 flex flex-col">
//           <h3 className="font-semibold text-base line-clamp-2">
//             <Link
//               href={`/products/${productProps._id}`}
//               className="hover:underline"
//             >
//               {productProps.name}
//             </Link>
//           </h3>
//           <div className="mt-2 flex items-center justify-between">
//             <div className="flex flex-col">
//               <div className="flex items-center gap-2">
//                 <span className="text-lg font-bold text-gray-900">
//                   ₹  {selectedVariant.rate}
//                 </span>
//                 {selectedVariant.mrp > selectedVariant.rate && (
//                   <span className="text-sm text-gray-500 line-through">
//                     ₹  {selectedVariant.mrp}
//                   </span>
//                 )}
//               </div>
//               <span className="text-xs text-gray-500">
//                 {selectedSize && selectedColor
//                   ? `${selectedSize}, ${selectedColor}`
//                   : ""}
//               </span>
//             </div>
//             <Button
//               size="sm"
//               className={cn("rounded-lg px-3 hover:bg-black bg-[#BD844C]")}
//               onClick={openVariantModal}
//             >
//               <ShoppingCart className="h-5 w-5 mr-1" /> Add
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Variant Selection Modal */}
//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Select Variant</DialogTitle>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="flex items-center gap-4">
//               <Image
//                 src={productProps.featureImg || "/placeholder.svg"}
//                 alt={productProps.name}
//                 width={80}
//                 height={80}
//                 className="rounded-md object-cover"
//               />
//               <div>
//                 <h3 className="font-medium">{productProps.name}</h3>
//                 <div className="flex items-center gap-2 mt-1">
//                   <span className="font-bold">₹  {selectedVariant.rate}</span>
//                   {selectedVariant.mrp > selectedVariant.rate && (
//                     <span className="text-sm text-gray-500 line-through">
//                       ₹  {selectedVariant.mrp}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               {/* Size Selection */}
//               {sizes.length > 0 && (
//                 <div>
//                   <Label htmlFor="size" className="text-sm font-medium">
//                     Size
//                   </Label>
//                   <RadioGroup
//                     id="size"
//                     value={selectedSize}
//                     onValueChange={handleSizeChange}
//                     className="flex flex-wrap gap-2 mt-2"
//                   >
//                     {sizes.map((size) => (
//                       <div key={size} className="flex items-center">
//                         <RadioGroupItem
//                           value={size}
//                           id={`size-${size}`}
//                           className="peer sr-only"
//                         />
//                         <Label
//                           htmlFor={`size-${size}`}
//                           className="px-3 py-1.5 border rounded-md text-sm font-medium cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
//                         >
//                           {size}
//                         </Label>
//                       </div>
//                     ))}
//                   </RadioGroup>
//                 </div>
//               )}

//               {/* Color Selection */}
//               {colors.length > 0 && (
//                 <div>
//                   <Label htmlFor="color" className="text-sm font-medium">
//                     Color
//                   </Label>
//                   <RadioGroup
//                     id="color"
//                     value={selectedColor}
//                     onValueChange={handleColorChange}
//                     className="flex flex-wrap gap-2 mt-2"
//                   >
//                     {colors.map((color) => (
//                       <div key={color} className="flex items-center">
//                         <RadioGroupItem
//                           value={color}
//                           id={`color-${color}`}
//                           className="peer sr-only"
//                         />
//                         <Label
//                           htmlFor={`color-${color}`}
//                           className="px-3 py-1.5 border rounded-md text-sm font-medium cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
//                         >
//                           {color}
//                         </Label>
//                       </div>
//                     ))}
//                   </RadioGroup>
//                 </div>
//               )}

//               {/* Quantity */}
//               <div>
//                 <Label htmlFor="quantity" className="text-sm font-medium">
//                   Quantity
//                 </Label>
//                 <div className="flex items-center border border-gray-300 rounded-md w-fit mt-2">
//                   <button
//                     onClick={decrementQuantity}
//                     type="button"
//                     className="px-3 py-2 text-gray-600 hover:bg-gray-100"
//                   >
//                     <Minus className="h-4 w-4" />
//                   </button>
//                   <span className="px-4 py-2 text-gray-900 font-medium">
//                     {quantity}
//                   </span>
//                   <button
//                     onClick={incrementQuantity}
//                     type="button"
//                     className="px-3 py-2 text-gray-600 hover:bg-gray-100"
//                   >
//                     <Plus className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-end">
//             <Button
//               onClick={handleAddToCart}
//               className={cn("gap-2 hover:bg-black bg-[#BD844C]")}
//             >
//               <ShoppingCart className="h-5 w-5" />
//               Add to Cart
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }



"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Minus, Plus, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast"
import { addToCart, addToWishlist, removeFromWishlist } from "@/redux/slice"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import type { ProductData } from "@/types"

interface ProductCardProps {
  productProps: ProductData
}

export function ProductCard({ productProps }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const wishlistItems = useAppSelector((state) => state.cart.wishlist)
  const isWishlisted = wishlistItems.some((item) => item.productId === productProps._id)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(productProps.variants[0])

  // Extract size and color from attributes
  const getSizeFromVariant = (variant: ProductData["variants"][0]) => {
    return variant.attributes.find((attr) => attr.attributeId.name === "Size")?.value || ""
  }

  const getColorFromVariant = (variant: ProductData["variants"][0]) => {
    return variant.attributes.find((attr) => attr.attributeId.name === "Color")?.value || ""
  }

  const [selectedSize, setSelectedSize] = useState(getSizeFromVariant(productProps.variants[0]))
  const [selectedColor, setSelectedColor] = useState(getColorFromVariant(productProps.variants[0]))

  const sizes = Array.from(new Set(productProps.variants.map((variant) => getSizeFromVariant(variant)).filter(Boolean)))

  const colors = Array.from(
    new Set(productProps.variants.map((variant) => getColorFromVariant(variant)).filter(Boolean)),
  )

  const toggleWishlistItem = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isWishlisted) {
      dispatch(removeFromWishlist(productProps._id))
      toast.success("Removed from wishlist")
    } else {
      dispatch(addToWishlist(productProps))
      toast.success("Added to wishlist")
    }
  }

  const openVariantModal = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsModalOpen(true)
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleSizeChange = (size: string) => {
    setSelectedSize(size)
    // Find matching variant
    const variant = productProps.variants.find(
      (v) => getSizeFromVariant(v) === size && getColorFromVariant(v) === selectedColor,
    )
    if (variant) {
      setSelectedVariant(variant)
    }
  }

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    // Find matching variant
    const variant = productProps.variants.find(
      (v) => getSizeFromVariant(v) === selectedSize && getColorFromVariant(v) === color,
    )
    if (variant) {
      setSelectedVariant(variant)
    }
  }

  const discountPercentage = selectedVariant.discount

  // Create a modified product with the selected variant for the cart
  const handleAddToCart = () => {
    // Create a modified product with the selected variant as the first variant
    const productToAdd: any = {
      ...productProps,
      quantity: quantity, // Pass the quantity to the addToCart action
      variants: [
        {
          ...selectedVariant,
          attributes: [
            ...selectedVariant.attributes.map((attr) => ({
              ...attr,
              // Ensure Size and Color are set to the selected values
              value:
                attr.attributeId.name === "Size"
                  ? selectedSize
                  : attr.attributeId.name === "Color"
                    ? selectedColor
                    : attr.value,
            })),
          ],
        },
        ...productProps.variants.filter((v) => v !== selectedVariant),
      ],
    }

    dispatch(addToCart(productToAdd))
    toast.success(`${quantity} Product(s) Added to Cart`)
    setIsModalOpen(false)
    setQuantity(1) // Reset quantity after adding to cart
  }

  return (
    <>
      <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
        {discountPercentage > 0 && (
          <Badge className="absolute left-3 top-3 z-10 bg-red-500 text-white">{discountPercentage}% OFF</Badge>
        )}
        <button
          className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 shadow-md transition-transform hover:scale-110"
          onClick={toggleWishlistItem}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
        </button>
        <Link href={`/products/${productProps._id}`} className="block aspect-square overflow-hidden">
          <div className="relative h-64 w-full overflow-hidden bg-gray-100">
            <Image
              src={productProps.featureImg || "/placeholder.svg?height=400&width=400"}
              alt={productProps.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </Link>
        <div className="p-4">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-gray-500 capitalize">{productProps.brandId?.name || "Brand"}</span>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-3 w-3 text-yellow-400" fill={star <= 4 ? "currentColor" : "none"} />
              ))}
            </div>
          </div>

          <h3 className="mb-1 line-clamp-2 font-medium text-gray-900">
            <Link href={`/products/${productProps._id}`} className="hover:text-green-600 transition-colors">
              {productProps.name}
            </Link>
          </h3>

          <div className="mb-3 flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">₹  {selectedVariant.rate}</span>
            {selectedVariant.mrp > selectedVariant.rate && (
              <span className="text-sm text-gray-500 line-through">₹  {selectedVariant.mrp}</span>
            )}
          </div>

          {(selectedSize || selectedColor) && (
            <div className="mb-3 text-xs text-gray-500">
              {selectedSize && selectedColor ? `${selectedSize}, ${selectedColor}` : selectedSize || selectedColor}
            </div>
          )}

          <Button
            size="sm"
            className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white"
            onClick={openVariantModal}
          >
            <ShoppingCart className="h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>

      {/* Variant Selection Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Options</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 overflow-hidden rounded-md bg-gray-100">
                <Image
                  src={productProps.featureImg || "/placeholder.svg?height=80&width=80"}
                  alt={productProps.name}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{productProps.name}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-bold text-gray-900">₹  {selectedVariant.rate}</span>
                  {selectedVariant.mrp > selectedVariant.rate && (
                    <span className="text-sm text-gray-500 line-through">₹  {selectedVariant.mrp}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Size Selection */}
              {sizes.length > 0 && (
                <div>
                  <Label htmlFor="size" className="mb-2 block text-sm font-medium">
                    Size
                  </Label>
                  <RadioGroup
                    id="size"
                    value={selectedSize}
                    onValueChange={handleSizeChange}
                    className="flex flex-wrap gap-2"
                  >
                    {sizes.map((size) => (
                      <div key={size} className="flex items-center">
                        <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                        <Label
                          htmlFor={`size-${size}`}
                          className="cursor-pointer rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium transition-colors peer-data-[state=checked]:border-green-600 peer-data-[state=checked]:bg-green-50 peer-data-[state=checked]:text-green-600"
                        >
                          {size}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Color Selection */}
              {colors.length > 0 && (
                <div>
                  <Label htmlFor="color" className="mb-2 block text-sm font-medium">
                    Color
                  </Label>
                  <RadioGroup
                    id="color"
                    value={selectedColor}
                    onValueChange={handleColorChange}
                    className="flex flex-wrap gap-2"
                  >
                    {colors.map((color) => (
                      <div key={color} className="flex items-center">
                        <RadioGroupItem value={color} id={`color-${color}`} className="peer sr-only" />
                        <Label
                          htmlFor={`color-${color}`}
                          className="cursor-pointer rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium transition-colors peer-data-[state=checked]:border-green-600 peer-data-[state=checked]:bg-green-50 peer-data-[state=checked]:text-green-600"
                        >
                          {color}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Quantity */}
              <div>
                <Label htmlFor="quantity" className="mb-2 block text-sm font-medium">
                  Quantity
                </Label>
                <div className="flex w-fit items-center overflow-hidden rounded-md border border-gray-200">
                  <button
                    onClick={decrementQuantity}
                    type="button"
                    className="flex h-10 w-10 items-center justify-center border-r border-gray-200 text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="flex h-10 w-12 items-center justify-center text-center font-medium">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    type="button"
                    className="flex h-10 w-10 items-center justify-center border-l border-gray-200 text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleAddToCart} className="gap-2 bg-green-600 hover:bg-green-700 text-white">
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
