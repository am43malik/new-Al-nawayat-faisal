"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ShoppingCart, Heart, Plus, Minus, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useQuery } from "@tanstack/react-query"
import { getFeatureProducts } from "@/lib/http/api"
import { QuickViewModal } from "./quick-view-modal"

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
  tag?: string
  isNew?: boolean
  isBestSeller?: boolean
  isOrganic?: boolean
}

interface FeaturedProductsProps {
  initialProducts?: Product[]
}

export function FeaturedProducts({ initialProducts = [] }: FeaturedProductsProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  // If you're using React Query as in your example, you can uncomment this:
  
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
  

  const incrementQuantity = (productId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))
  }

  const decrementQuantity = (productId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) - 1, 0),
    }))
  }

  const ProductCard = ({ product }: { product: Product }) => (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md"
      onMouseEnter={() => setHoveredProduct(product.id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      {/* Product badges */}
      <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
        {product.discount && <Badge className="bg-orange-500 hover:bg-orange-600">{product.discount}% OFF</Badge>}
        {product.isNew && <Badge className="bg-blue-500 hover:bg-blue-600">NEW</Badge>}
        {product.isBestSeller && <Badge className="bg-yellow-500 hover:bg-yellow-600">BEST SELLER</Badge>}
        {product.isOrganic && <Badge className="bg-green-500 hover:bg-green-600">ORGANIC</Badge>}
      </div>

      {/* Wishlist button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-white/80 text-gray-500 hover:bg-white hover:text-red-500 shadow-sm"
      >
        <Heart className="h-4 w-4" />
        <span className="sr-only">Add to wishlist</span>
      </Button>

      {/* Product image */}
      <div className="aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={200}
          height={200}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Product details */}
      <div className="p-4">
        <div className="flex items-center gap-1 mb-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.ratingCount})</span>
        </div>

        <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem] group-hover:text-green-600 transition-colors">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold text-lg">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
          )}
        </div>

        <div className="mt-3">
          {quantities[product.id] ? (
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-green-200 text-green-600 hover:bg-green-50"
                onClick={() => decrementQuantity(product.id)}
              >
                <Minus className="h-3 w-3" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <span className="font-medium">{quantities[product.id]}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-green-200 text-green-600 hover:bg-green-50"
                onClick={() => incrementQuantity(product.id)}
              >
                <Plus className="h-3 w-3" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>
          ) : (
            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-xs h-9 rounded-full"
              onClick={() => incrementQuantity(product.id)}
            >
              <ShoppingCart className="mr-1 h-3 w-3" />
              Add to Cart
            </Button>
          )}
        </div>
      </div>

      {/* Quick view overlay on hover */}
      {/* <div
        className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
          hoveredProduct === product.id ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Button className="bg-white text-green-600 hover:bg-white/90 rounded-full">Quick View</Button>
      </div> */}

{/* <div
  className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
    hoveredProduct === product.id ? "opacity-100" : "opacity-0 pointer-events-none"
  }`}
>
  <QuickViewModal product={product}>
    <Button 
      className="bg-white text-green-600 hover:bg-white/90 rounded-full"
      onClick={(e) => {
        e.stopPropagation(); // Prevent parent click events
        setHoveredProduct(null); // Close hover effect
      }}
    >
      Quick View
    </Button>
  </QuickViewModal>
</div> */}
    </motion.div>
  )

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Featured Products
          </h2>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 h-10 p-1 bg-green-50 rounded-full mb-6">
            <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-white">
              All
            </TabsTrigger>
            <TabsTrigger value="deals" className="rounded-full data-[state=active]:bg-white">
              Deals
            </TabsTrigger>
            <TabsTrigger value="popular" className="rounded-full data-[state=active]:bg-white">
              Popular
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {products.length > 0 &&
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="deals" className="mt-0">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {products.length > 0 &&
                products
                  .filter((p) => p.discount && p.discount > 0)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="mt-0">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {products.length > 0 &&
                products
                  .sort((a, b) => b.rating - a.rating)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}