"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"
import { motion } from "framer-motion"

const instagramPosts = [
  {
    id: "1",
    image: "/images/insta1.png",
    likes: 245,
    comments: 18,
  },
  {
    id: "2",
    image: "/images/insta2.png",
    likes: 189,
    comments: 24,
  },
  {
    id: "3",
    image: "/images/insta3.png",
    likes: 321,
    comments: 32,
  },
  {
    id: "4",
    image: "/images/insta4.png",
    likes: 178,
    comments: 14,
  },
  {
    id: "5",
    image: "/images/insta5.png",
    likes: 267,
    comments: 29,
  },
  {
    id: "6",
    image: "/images/insta6.png",
    likes: 198,
    comments: 21,
  },
]

export function InstagramFeed() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-16 bg-gradient-to-b from-white to-green-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            @quickmart on Instagram
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Follow us on Instagram for fresh inspiration, recipes, and behind-the-scenes glimpses of our products.
          </p>
        </div>

        <div ref={scrollContainerRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="aspect-square relative rounded-xl overflow-hidden group"
            >
              <Image
                src={post.image || "/placeholder.svg"}
                alt={`Instagram post ${post.id}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4">
                <div className="flex items-center gap-4 text-white mb-2">
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span className="text-sm">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span className="text-sm">{post.comments}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
          >
            <Instagram className="h-5 w-5" />
            Follow us on Instagram
          </Link>
        </div>
      </div>
    </section>
  )
}
