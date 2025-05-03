"use client"

import Link from "next/link"
import { Home, Search, ShoppingCart, User, Menu } from "lucide-react"
import { motion } from "framer-motion"

export function MobileNavigation() {
  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: "Home", href: "/" },
    { icon: <Menu className="h-5 w-5" />, label: "Categories", href: "/categories" },
    { icon: <Search className="h-5 w-5" />, label: "Search", href: "/search" },
    { icon: <ShoppingCart className="h-5 w-5" />, label: "Cart", href: "/cart" },
    { icon: <User className="h-5 w-5" />, label: "Account", href: "/account" },
  ]

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 z-40 w-full h-16 bg-white border-t md:hidden shadow-lg"
    >
      <div className="grid h-full grid-cols-5">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`flex flex-col items-center justify-center ${
              index === 0 ? "text-green-500" : "text-gray-500 hover:text-green-500"
            } transition-colors`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}
