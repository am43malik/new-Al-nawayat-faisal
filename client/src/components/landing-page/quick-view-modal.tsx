// "use client"

// import type React from "react"

// import { useState } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react"
// import type { Product } from "@/lib/products"
// // import { useCart } from "@/context/cart-context"
// // import { useWishlist } from "@/context/wishlist-context"
// import { Badge } from "@/components/ui/badge"

// interface QuickViewModalProps {
//   product: Product
//   children: React.ReactNode
// }

// export function QuickViewModal({ product, children }: QuickViewModalProps) {
//   const [quantity, setQuantity] = useState(1)
//   const [open, setOpen] = useState(false)
//   const { addItem, isInCart } = useCart()
//   const { isInWishlist, toggleWishlist } = useWishlist()

//   const incrementQuantity = () => {
//     if (product.stock > quantity) {
//       setQuantity(quantity + 1)
//     }
//   }

//   const decrementQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1)
//     }
//   }

//   const handleAddToCart = () => {
//     addItem({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       image: product.image,
//       quantity: quantity,
//       maxQuantity: product.stock,
//       estimatedDelivery: product.deliveryEstimate,
//       isAvailable: product.isAvailable,
//     })
//     setOpen(false)
//   }

//   const handleToggleWishlist = () => {
//     toggleWishlist({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       image: product.image,
//       category: product.category,
//     })
//   }

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>{children}</DialogTrigger>
//       <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
//         <div className="grid md:grid-cols-2 gap-0">
//           {/* Product Image */}
//           <div className="relative bg-gray-50 p-6 flex items-center justify-center">
//             <Image
//               src={product.image || "/placeholder.svg"}
//               alt={product.name}
//               width={300}
//               height={300}
//               className="object-contain max-h-[300px]"
//             />

//             {/* Product badges */}
//             <div className="absolute left-4 top-4 z-10 flex flex-col gap-1">
//               {product.discount && <Badge className="bg-orange-500 hover:bg-orange-600">{product.discount}% OFF</Badge>}
//               {product.isNew && <Badge className="bg-blue-500 hover:bg-blue-600">NEW</Badge>}
//               {product.isBestSeller && <Badge className="bg-yellow-500 hover:bg-yellow-600">BEST SELLER</Badge>}
//               {product.isOrganic && <Badge className="bg-green-500 hover:bg-green-600">ORGANIC</Badge>}
//               {!product.isAvailable && <Badge className="bg-red-500 hover:bg-red-600">OUT OF STOCK</Badge>}
//             </div>
//           </div>

//           {/* Product Details */}
//           <div className="p-6">
//             <DialogHeader>
//               <DialogTitle className="text-xl font-semibold">{product.name}</DialogTitle>
//             </DialogHeader>

//             <div className="mt-2 flex items-center gap-2">
//               <div className="flex items-center">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`h-4 w-4 ${
//                       i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-sm text-gray-500">({product.ratingCount} reviews)</span>
//             </div>

//             <div className="mt-4 flex items-center gap-2">
//               <span className="text-2xl font-bold">₹{product.price}</span>
//               {product.originalPrice && (
//                 <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
//               )}
//               {product.discount && <span className="text-sm text-green-600 font-medium">{product.discount}% off</span>}
//             </div>

//             <div className="mt-4">
//               <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
//             </div>

//             <div className="mt-4 flex items-center gap-2">
//               <span className="text-sm font-medium">Delivery:</span>
//               <span className="text-sm text-green-600">{product.deliveryEstimate}</span>
//             </div>

//             <div className="mt-4 flex items-center gap-2">
//               <span className="text-sm font-medium">Availability:</span>
//               {product.isAvailable ? (
//                 <span className="text-sm text-green-600">In Stock ({product.stock} available)</span>
//               ) : (
//                 <span className="text-sm text-red-600">Out of Stock</span>
//               )}
//             </div>

//             {product.isAvailable && (
//               <div className="mt-6">
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center">
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8 rounded-l-md rounded-r-none"
//                       onClick={decrementQuantity}
//                       disabled={quantity <= 1}
//                     >
//                       <Minus className="h-3 w-3" />
//                     </Button>
//                     <div className="h-8 w-12 flex items-center justify-center border-y">{quantity}</div>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8 rounded-r-md rounded-l-none"
//                       onClick={incrementQuantity}
//                       disabled={quantity >= product.stock}
//                     >
//                       <Plus className="h-3 w-3" />
//                     </Button>
//                   </div>

//                   <span className="text-sm text-gray-500">
//                     {product.weight} {product.unit}
//                   </span>
//                 </div>

//                 <div className="mt-6 grid grid-cols-2 gap-4">
//                   <Button className="w-full bg-green-500 hover:bg-green-600" onClick={handleAddToCart}>
//                     <ShoppingCart className="mr-2 h-4 w-4" />
//                     Add to Cart
//                   </Button>

//                   <Button variant="outline" className="w-full" onClick={handleToggleWishlist}>
//                     <Heart className={`mr-2 h-4 w-4 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
//                     {isInWishlist(product.id) ? "In Wishlist" : "Add to Wishlist"}
//                   </Button>
//                 </div>
//               </div>
//             )}

//             <div className="mt-6">
//               <Link
//                 href={`/product/${product.id}`}
//                 className="text-green-600 hover:text-green-700 text-sm font-medium"
//                 onClick={() => setOpen(false)}
//               >
//                 View Full Details
//               </Link>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }



"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAppDispatch } from "@/redux/store"
import { addToCart } from "@/redux/slice" // Make sure this action exists in your slice

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  discount?: number
  rating: number
  ratingCount: number
  category: string
  stock: number
  deliveryEstimate: string
  isAvailable: boolean
  isNew?: boolean
  isBestSeller?: boolean
  isOrganic?: boolean
  description?: string
  weight?: string
  unit?: string
}

interface QuickViewModalProps {
  product: Product
  children: React.ReactNode
}

export function QuickViewModal({ product, children }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()

  const incrementQuantity = () => {
    if (product.stock > quantity) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity: quantity,
      maxQuantity: product.stock,
      estimatedDelivery: product.deliveryEstimate,
      isAvailable: product.isAvailable
    }))
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="relative bg-gray-50 p-6 flex items-center justify-center">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={300}
              className="object-contain max-h-[300px]"
            />

            {/* Product badges */}
            <div className="absolute left-4 top-4 z-10 flex flex-col gap-1">
              {product.discount && <Badge className="bg-orange-500 hover:bg-orange-600">{product.discount}% OFF</Badge>}
              {product.isNew && <Badge className="bg-blue-500 hover:bg-blue-600">NEW</Badge>}
              {product.isBestSeller && <Badge className="bg-yellow-500 hover:bg-yellow-600">BEST SELLER</Badge>}
              {product.isOrganic && <Badge className="bg-green-500 hover:bg-green-600">ORGANIC</Badge>}
              {!product.isAvailable && <Badge className="bg-red-500 hover:bg-red-600">OUT OF STOCK</Badge>}
            </div>
          </div>

          {/* Product Details */}
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">{product.name}</DialogTitle>
            </DialogHeader>

            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.ratingCount} reviews)</span>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-2xl font-bold">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
              {product.discount && <span className="text-sm text-green-600 font-medium">{product.discount}% off</span>}
            </div>

            {product.description && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
              </div>
            )}

            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm font-medium">Delivery:</span>
              <span className="text-sm text-green-600">{product.deliveryEstimate}</span>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm font-medium">Availability:</span>
              {product.isAvailable ? (
                <span className="text-sm text-green-600">In Stock ({product.stock} available)</span>
              ) : (
                <span className="text-sm text-red-600">Out of Stock</span>
              )}
            </div>

            {product.isAvailable && (
              <div className="mt-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-l-md rounded-r-none"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <div className="h-8 w-12 flex items-center justify-center border-y">{quantity}</div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-r-md rounded-l-none"
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  {product.weight && product.unit && (
                    <span className="text-sm text-gray-500">
                      {product.weight} {product.unit}
                    </span>
                  )}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700" 
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-6">
              <Link
                href={`/product/${product.id}`}
                className="text-green-600 hover:text-green-700 text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}