"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function OfferBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 30,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newSeconds = prev.seconds - 1

        if (newSeconds < 0) {
          const newMinutes = prev.minutes - 1

          if (newMinutes < 0) {
            const newHours = prev.hours - 1

            if (newHours < 0) {
              clearInterval(timer)
              return { hours: 0, minutes: 0, seconds: 0 }
            }

            return { hours: newHours, minutes: 59, seconds: 59 }
          }

          return { ...prev, minutes: newMinutes, seconds: 59 }
        }

        return { ...prev, seconds: newSeconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (value: number) => {
    return value.toString().padStart(2, "0")
  }

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400">
          <div className="absolute inset-0 bg-[url('/images/fruits-banner.png')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-300 rounded-full opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-300 rounded-full opacity-20 transform -translate-x-1/3 translate-y-1/3"></div>

          <div className="relative grid gap-8 p-8 md:grid-cols-2 md:gap-12 md:p-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                Flash Sale! 50% Off on Fresh Fruits
              </h2>
              <p className="mt-4 text-lg text-white/90">
                Limited time offer on premium quality fruits. Order now before the deal expires!
              </p>

              <div className="mt-8 flex gap-4">
                <div className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-sm rounded-lg p-3 w-20">
                  <span className="text-3xl font-bold text-white">{formatTime(timeLeft.hours)}</span>
                  <span className="text-xs text-white/80">Hours</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-sm rounded-lg p-3 w-20">
                  <span className="text-3xl font-bold text-white">{formatTime(timeLeft.minutes)}</span>
                  <span className="text-xs text-white/80">Minutes</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-sm rounded-lg p-3 w-20">
                  <span className="text-3xl font-bold text-white">{formatTime(timeLeft.seconds)}</span>
                  <span className="text-xs text-white/80">Seconds</span>
                </div>
              </div>

              <Button asChild className="mt-8 bg-white text-orange-500 hover:bg-white/90 rounded-full px-8">
                <Link href="/products/fruits">Shop Now</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-white/20 rounded-full blur-lg"></div>
                <Image
                  src="/images/fruits-banner.png"
                  alt="Fresh Fruits Collection"
                  width={300}
                  height={300}
                  className="relative z-10"
                />

                {/* Floating badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute top-0 right-0 bg-white rounded-full px-4 py-2 shadow-lg z-20"
                >
                  <span className="text-orange-500 font-bold">50% OFF</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute bottom-0 left-0 bg-white rounded-full px-4 py-2 shadow-lg z-20"
                >
                  <span className="text-green-500 font-bold">Organic</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
