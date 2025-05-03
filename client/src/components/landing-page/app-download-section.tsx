"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Download, Share2 } from "lucide-react";

export default function AppDownloadSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [10, -10]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 mt-20"
    >
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_800px_at_50%_-30%,rgba(255,255,255,0.1),transparent)]" />
        <div className="absolute w-full h-full bg-[radial-gradient(circle_600px_at_80%_40%,rgba(255,255,255,0.1),transparent)]" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0 bg-[radial-gradient(circle_400px_at_70%_60%,rgba(255,255,255,0.08),transparent)]"
        />
      </div>

      <div className="container relative mx-auto px-4 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Rating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge
                color="secondary"
                variant="soft"
                className="mb-6 px-4 py-1"
              >
                <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
                <span className="text-sm">4.9/5 from 10k+ reviews</span>
              </Badge>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Your Next-Gen
              <br />
              Shopping Experience
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-lg">
              Transform your shopping journey with our revolutionary app. Enjoy
              personalized recommendations, instant checkout, and exclusive
              rewards - all in one place.
            </p>

            {/* Download Stats */}
            <div className="flex flex-wrap gap-8 mb-10 justify-center lg:justify-start">
              <div className="text-center">
                <h4 className="text-3xl font-bold text-white">1M+</h4>
                <p className="text-white/80">Downloads</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl font-bold text-white">4.9</h4>
                <p className="text-white/80">App Rating</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl font-bold text-white">150k+</h4>
                <p className="text-white/80">Active Users</p>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-8">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-purple-600 hover:bg-white/90 hover:text-purple-700"
              >
                <svg
                  className="w-8 h-8 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                </svg>
                App Store
              </Button>
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-purple-600 hover:bg-white/90 hover:text-purple-700"
              >
                <svg
                  className="w-8 h-8 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                Google Play
              </Button>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            style={{ y, rotate }}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative mx-auto w-[280px] h-[580px]">
              {/* Phone Frame */}
              <div className="absolute inset-0 bg-black rounded-[3rem] p-4 shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl" />
                {/* Screen Content */}
                <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=800&width=400"
                    alt="App screenshot"
                    width={400}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                  {/* Screen Glare Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-20" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-20" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Feature Pills */}
      <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2  flex-wrap justify-center gap-4 max-w-2xl px-4">
        {[
          "Real-time Tracking",
          "Secure Payments",
          "24/7 Support",
          "Exclusive Deals",
        ].map((feature, index) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm"
          >
            {feature}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
