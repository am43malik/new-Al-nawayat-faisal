"use client"

import { useState, useEffect } from "react"
import { Truck, Clock, CheckCircle2, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"

export function DeliveryBanner() {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    {
      icon: <CheckCircle2 className="h-4 w-4" />,
      text: "Free delivery on all orders above ₹100",
    },
    {
      icon: <Truck className="h-4 w-4" />,
      text: "Fast delivery in your area",
    },
    {
      icon: <Clock className="h-4 w-4" />,
      text: "Delivered in 20 mins",
    },
    {
      icon: <ShieldCheck className="h-4 w-4" />,
      text: "100% secure checkout",
    },
  ]

  return (
    <div
      className={`bg-gradient-to-r from-green-600 to-green-500 text-white py-3 transition-all duration-300 ${
        isSticky ? "sticky top-[60px] z-40 shadow-md" : ""
      }`}
    >
      <div className="container px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-2"
            >
              {feature.icon}
              <span>{feature.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
