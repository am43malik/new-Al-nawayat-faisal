"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    avatar: "/images/avatar1.png",
    role: "Regular Customer",
    content:
      "QuickMart has completely changed how I shop for groceries. The 20-minute delivery is a game-changer for busy professionals like me. The quality of fresh produce is exceptional!",
    rating: 5,
  },
  {
    id: 2,
    name: "Rahul Verma",
    avatar: "/images/avatar2.png",
    role: "Food Enthusiast",
    content:
      "I'm extremely particular about the quality of ingredients I use, and QuickMart never disappoints. Their organic selection is impressive, and the app makes ordering so convenient.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ananya Patel",
    avatar: "/images/avatar3.png",
    role: "Working Mom",
    content:
      "As a mother of two, I rely on QuickMart for all our household essentials. The consistent quality and lightning-fast delivery have made my life so much easier!",
    rating: 4,
  },
  {
    id: 4,
    name: "Vikram Singh",
    avatar: "/images/avatar4.png",
    role: "Fitness Trainer",
    content:
      "I recommend QuickMart to all my clients. Their selection of healthy foods and protein products is excellent, and the nutritional information is always accurate.",
    rating: 5,
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our happy customers have to say about their QuickMart
            experience.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-0 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-8 md:p-10"
              >
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3 flex flex-col items-center">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-green-100">
                      <Image
                        src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                        alt={testimonials[currentIndex].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="mt-4 font-semibold text-lg">{testimonials[currentIndex].name}</h3>
                    <p className="text-gray-500 text-sm">{testimonials[currentIndex].role}</p>
                    <div className="flex items-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonials[currentIndex].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="md:w-2/3">
                    <div className="relative">
                      <svg
                        className="absolute -top-6 -left-6 h-12 w-12 text-green-100"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                      >
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="relative text-lg md:text-xl text-gray-700 italic">
                        {testimonials[currentIndex].content}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === index ? "bg-green-500" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex justify-center mt-6 gap-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10 border-green-200 text-green-600 hover:bg-green-50"
                onClick={prevTestimonial}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous testimonial</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10 border-green-200 text-green-600 hover:bg-green-50"
                onClick={nextTestimonial}
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next testimonial</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
