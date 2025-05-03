"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

// const recentlyViewed = [
//   {
//     id: "1",
//     name: "Premium Organic Apples",
//     price: 120,
//     image: "/images/apple.png",
//     category: "Fruits",
//   },
//   {
//     id: "7",
//     name: "Cold-Pressed Orange Juice",
//     price: 110,
//     image: "/images/juice.png",
//     category: "Beverages",
//   },
//   {
//     id: "3",
//     name: "Farm Fresh Milk",
//     price: 60,
//     image: "/images/milk.png",
//     category: "Dairy",
//   },
//   {
//     id: "9",
//     name: "Belgian Chocolate Cookies",
//     price: 65,
//     image: "/images/cookies.png",
//     category: "Snacks",
//   },
//   {
//     id: "5",
//     name: "Free Range Eggs",
//     price: 90,
//     image: "/images/eggs.png",
//     category: "Dairy",
//   },
//   {
//     id: "10",
//     name: "Vine-Ripened Tomatoes",
//     price: 40,
//     image: "/images/tomatoes.png",
//     category: "Vegetables",
//   },
// ]

const recentlyViewed = [
  {
    id: "1",
    name: "Premium Organic Apples",
    price: 120,
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXBwbGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Fruits",
  },
  {
    id: "7",
    name: "Cold-Pressed Orange Juice",
    price: 110,
    image: "https://images.unsplash.com/photo-1612230629561-384fbc0294d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8b3JhbmdlJTIwanVpY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=80",
    category: "Beverages",
  },
  {
    id: "3",
    name: "Farm Fresh Milk",
    price: 60,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWlsa3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=80",
    category: "Dairy",
  },
  {
    id: "9",
    name: "Belgian Chocolate Cookies",
    price: 65,
    image: "https://images.unsplash.com/photo-1581281863883-2469417a1668?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlJTIwY29va2llc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=80",
    category: "Snacks",
  },
  {
    id: "5",
    name: "Free Range Eggs",
    price: 90,
    image: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZSUyMHJhbmdlJTIwZWdnc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=80",
    category: "Dairy",
  },
  {
    id: "10",
    name: "Vine-Ripened Tomatoes",
    price: 40,
    image: "https://images.unsplash.com/photo-1592841200221-a6891ff0e8d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dG9tYXRvZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=80",
    category: "Vegetables",
  },
]

export function RecentlyViewed() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Recently Viewed
            </h2>
            <p className="text-gray-500 mt-2">Continue shopping from where you left off.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 border-green-200 text-green-600 hover:bg-green-50"
              onClick={scrollLeft}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Scroll left</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 border-green-200 text-green-600 hover:bg-green-50"
              onClick={scrollRight}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Scroll right</span>
            </Button>
          </div>
        </div>

        <div ref={scrollContainerRef} className="flex space-x-6 pb-4 overflow-x-auto scrollbar-hide snap-x">
          {recentlyViewed.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="snap-start"
            >
              <Link
                href={`/product/${product.id}`}
                className="block min-w-[200px] rounded-xl overflow-hidden bg-white border shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="relative p-4 bg-gray-50 flex items-center justify-center h-40">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={150}
                    height={150}
                    className="object-contain max-h-32 transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button size="sm" className="bg-white text-green-600 hover:bg-white/90 rounded-full">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                  <h3 className="font-medium text-sm line-clamp-2 group-hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="mt-2">
                    <span className="font-semibold">₹{product.price}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
