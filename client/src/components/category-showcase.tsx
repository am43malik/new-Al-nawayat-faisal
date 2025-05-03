"use client"

import { useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

// const categories = [
//   {
//     name: "Fresh Fruits",
//     icon: "🍎",
//     href: "/category/fruits",
//     image: "/images/apple.png",
//     color: "bg-red-100",
//     borderColor: "border-red-200",
//     count: "120+ items",
//   },
//   {
//     name: "Vegetables",
//     icon: "🥦",
//     href: "/category/vegetables",
//     image: "/images/tomatoes.png",
//     color: "bg-green-100",
//     borderColor: "border-green-200",
//     count: "85+ items",
//   },
//   {
//     name: "Dairy & Eggs",
//     icon: "🥛",
//     href: "/category/dairy-eggs",
//     image: "/images/milk.png",
//     color: "bg-blue-100",
//     borderColor: "border-blue-200",
//     count: "60+ items",
//   },
//   {
//     name: "Bakery",
//     icon: "🍞",
//     href: "/category/bakery",
//     image: "/images/bread.png",
//     color: "bg-amber-100",
//     borderColor: "border-amber-200",
//     count: "45+ items",
//   },
//   {
//     name: "Beverages",
//     icon: "🥤",
//     href: "/category/beverages",
//     image: "/images/juice.png",
//     color: "bg-orange-100",
//     borderColor: "border-orange-200",
//     count: "70+ items",
//   },
//   {
//     name: "Snacks",
//     icon: "🍿",
//     href: "/category/snacks",
//     image: "/images/cookies.png",
//     color: "bg-yellow-100",
//     borderColor: "border-yellow-200",
//     count: "90+ items",
//   },
//   {
//     name: "Personal Care",
//     icon: "🧴",
//     href: "/category/personal-care",
//     image: "/images/toilet-paper.png",
//     color: "bg-purple-100",
//     borderColor: "border-purple-200",
//     count: "50+ items",
//   },
//   {
//     name: "Home Essentials",
//     icon: "🧹",
//     href: "/category/home-essentials",
//     image: "/images/toilet-paper.png",
//     color: "bg-indigo-100",
//     borderColor: "border-indigo-200",
//     count: "65+ items",
//   },
// ]

const categories = [
  {
    name: "Fresh Fruits",
    icon: "🍎",
    href: "/category/fruits",
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZydWl0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80",
    color: "bg-red-100",
    borderColor: "border-red-200",
    count: "120+ items",
  },
  {
    name: "Vegetables",
    icon: "🥦",
    href: "/category/vegetables",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80",
    color: "bg-green-100",
    borderColor: "border-green-200",
    count: "85+ items",
  },
  {
    name: "Dairy & Eggs",
    icon: "🥛",
    href: "/category/dairy-eggs",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRhaXJ5JTIwZWdnc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80",
    color: "bg-blue-100",
    borderColor: "border-blue-200",
    count: "60+ items",
  },
  {
    name: "Bakery",
    icon: "🍞",
    href: "/category/bakery",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJyZWFkJTIwYmFrZXJ5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=80",
    color: "bg-amber-100",
    borderColor: "border-amber-200",
    count: "45+ items",
  },
  {
    name: "Beverages",
    icon: "🥤",
    href: "/category/beverages",
    image: "https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGp1aWNlJTIwZHJpbmtzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=80",
    color: "bg-orange-100",
    borderColor: "border-orange-200",
    count: "70+ items",
  },
  {
    name: "Snacks",
    icon: "🍿",
    href: "/category/snacks",
    image: "https://images.unsplash.com/photo-1582419121077-342387e7a065?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNuYWNrc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80",
    color: "bg-yellow-100",
    borderColor: "border-yellow-200",
    count: "90+ items",
  },
  {
    name: "Personal Care",
    icon: "🧴",
    href: "/category/personal-care",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972803?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbmFsJTIwY2FyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80",
    color: "bg-purple-100",
    borderColor: "border-purple-200",
    count: "50+ items",
  },
  {
    name: "Home Essentials",
    icon: "🧹",
    href: "/category/home-essentials",
    image: "https://images.unsplash.com/photo-1583947581924-a31d1c0e488b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvbWUlMjBjbGVhbmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80",
    color: "bg-indigo-100",
    borderColor: "border-indigo-200",
    count: "65+ items",
  },
]
export function CategoryShowcase() {
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
    <section className="py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(134,239,172,0.15),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(134,239,172,0.1),transparent_70%)]"></div>

      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Shop by Category
            </h2>
            <p className="text-gray-500 mt-2 max-w-2xl">
              Explore our wide range of categories and find exactly what you need, delivered in minutes.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700"
              onClick={scrollLeft}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Scroll left</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700"
              onClick={scrollRight}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Scroll right</span>
            </Button>
          </div>
        </div>

        <div ref={scrollContainerRef} className="flex space-x-6 pb-4 overflow-x-auto scrollbar-hide snap-x">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="snap-start"
            >
              <Link
                href={category.href}
                className="block min-w-[220px] rounded-2xl overflow-hidden bg-white border shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className={`relative h-40 ${category.color} flex items-center justify-center p-6 overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={120}
                    height={120}
                    className="relative z-10 transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{category.count}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
