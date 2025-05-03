// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// const sliderImages = [
//   "https://img.freepik.com/free-vector/flat-geometric-fashion-youtube-thumbnail_23-2148918593.jpg?t=st=1743010335~exp=1743013935~hmac=79ca23dfa20062ba612daa06de4e9be865a07b9ec016ecf3857436929ad8c71c&w=1380",
//   "https://img.freepik.com/free-vector/fashion-sale-landing-page-webtemplate_23-2148585983.jpg?t=st=1743010393~exp=1743013993~hmac=40a7e01d8e47cd7983a7c2705efadffe27ce4c7c642814f2af3d49919d433275&w=996",
//   "https://img.freepik.com/free-vector/woman-holding-bag-fashion-sale-landing-page_23-2148589537.jpg?t=st=1743010418~exp=1743014018~hmac=3387563540ef11bba6e6dd22e484a7ea0d66d36d69f8f5e76494864b53d85b6c&w=996",
// ];

// export function HeroSection() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const nextSlide = () => {
//     setCurrentSlide((prev) =>
//       prev === sliderImages.length - 1 ? 0 : prev + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) =>
//       prev === 0 ? sliderImages.length - 1 : prev - 1
//     );
//   };

//   // Auto slide functionality
//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const router = useRouter();

//   return (
//     <section className="py-6 bg-white">
//       <div className="container px-4">
//         <div className="grid gap-6 md:grid-cols-7">
//           <div className="col-span-4 relative overflow-hidden rounded-lg">
//             {/* Slider */}
//             <div
//               onClick={() => router.push("/products")}
//               className="relative h-full cursor-pointer"
//             >
//               {sliderImages.map((img, index) => (
//                 <div
//                   key={index}
//                   className={`absolute inset-0 transition-opacity duration-500 ${
//                     index === currentSlide
//                       ? "opacity-100"
//                       : "opacity-0 pointer-events-none"
//                   }`}
//                 >
//                   <Image
//                     src={img || "/placeholder.svg"}
//                     alt={`Breakfast Banner ${index + 1}`}
//                     className="w-full h-full object-cover"
//                     priority={index === 0}
//                     width={600}
//                     height={400}
//                   />
//                 </div>
//               ))}

//               {/* Navigation buttons */}
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 text-gray-800 hover:bg-white/90"
//                 onClick={prevSlide}
//               >
//                 <ChevronLeft className="h-6 w-6" />
//                 <span className="sr-only">Previous slide</span>
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 text-gray-800 hover:bg-white/90"
//                 onClick={nextSlide}
//               >
//                 <ChevronRight className="h-6 w-6" />
//                 <span className="sr-only">Next slide</span>
//               </Button>

//               {/* Pagination dots */}
//               <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
//                 {sliderImages.map((_, index) => (
//                   <button
//                     key={index}
//                     className={`h-2 w-2 rounded-full transition-colors ${
//                       index === currentSlide ? "bg-amber-500" : "bg-white/60"
//                     }`}
//                     onClick={() => setCurrentSlide(index)}
//                   >
//                     <span className="sr-only">Go to slide {index + 1}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div
//             onClick={() => router.push("/products")}
//             className="col-span-3 relative overflow-hidden rounded-lg cursor-pointer"
//           >
//             <Image
//               src={
//                 "https://img.freepik.com/premium-vector/fashion-sale-promotion-banner-template_99493-46.jpg?w=1060"
//               }
//               alt="Today's Best Deal - 50% OFF"
//               className="w-full h-full object-cover"
//               width={600}
//               height={400}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // const slides = [
  //   {
  //     title: "Fresh Groceries",
  //     subtitle: "Delivered in Minutes",
  //     description: "Farm-fresh produce and daily essentials at your doorstep in 20 minutes or less.",
  //     image: "/images/hero-grocery.png",
  //     bgColor: "from-green-500/20 to-green-600/20",
  //     accent: "green",
  //   },
  //   {
  //     title: "Healthy Breakfast",
  //     subtitle: "Start Your Day Right",
  //     description: "Premium dairy products, cereals, and breakfast essentials for a nutritious morning.",
  //     image: "/images/hero-grocery.png",
  //     bgColor: "from-orange-500/20 to-orange-600/20",
  //     accent: "orange",
  //   },
  //   {
  //     title: "Weekend Specials",
  //     subtitle: "Exclusive Offers",
  //     description: "Discover amazing deals on premium products every weekend.",
  //     image: "/images/hero-grocery.png",
  //     bgColor: "from-purple-500/20 to-purple-600/20",
  //     accent: "purple",
  //   },
  // ]

  const slides = [
    {
      title: "Fresh Groceries",
      subtitle: "Delivered in Minutes",
      description: "Farm-fresh produce and daily essentials at your doorstep in 20 minutes or less.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3JvY2VyeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80",
      bgColor: "from-green-500/20 to-green-600/20",
      accent: "green",
    },
    {
      title: "Healthy Breakfast",
      subtitle: "Start Your Day Right",
      description: "Premium dairy products, cereals, and breakfast essentials for a nutritious morning.",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnJlYWtmYXN0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80",
      bgColor: "from-orange-500/20 to-orange-600/20",
      accent: "orange",
    },
    {
      title: "Weekend Specials",
      subtitle: "Exclusive Offers",
      description: "Discover amazing deals on premium products every weekend.",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3JvY2VyeSUyMGRpc2NvdW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80",
      bgColor: "from-purple-500/20 to-purple-600/20",
      accent: "purple",
    },
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const currentAccent = slides[currentSlide].accent
  const accentColor =
    currentAccent === "green"
      ? "bg-green-500 hover:bg-green-600"
      : currentAccent === "orange"
        ? "bg-orange-500 hover:bg-orange-600"
        : "bg-purple-500 hover:bg-purple-600"

  const outlineAccent =
    currentAccent === "green"
      ? "border-green-500 text-green-500 hover:bg-green-50"
      : currentAccent === "orange"
        ? "border-orange-500 text-orange-500 hover:bg-orange-50"
        : "border-purple-500 text-purple-500 hover:bg-purple-50"

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-20 lg:pt-16 lg:pb-24">
      <div
        className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].bgColor} transition-colors duration-700`}
      />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-white opacity-10 blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center space-y-4"
            >
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
                  {slides[currentSlide].title} <br />
                  <span className={`text-${currentAccent}-500`}>{slides[currentSlide].subtitle}</span>
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {slides[currentSlide].description}
                </p>
              </div>

              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className={`${accentColor} rounded-full text-white`}>
                  <Link href="/products">Shop Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className={`${outlineAccent} rounded-full`}>
                  <Link href="/categories">Browse Categories</Link>
                </Button>
              </div>

              <div className="mt-6 max-w-md">
                <div className="relative">
                  {/* <Input
                    type="search"
                    placeholder="Search for groceries, fruits, vegetables..."
                    className="pl-10 pr-4 py-3 rounded-full border-gray-200 focus-visible:ring-green-500 shadow-sm"
                  /> */}
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm mt-4">
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
                    className={`text-${currentAccent}-500`}
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <span>Free delivery on orders above ₹100</span>
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
                    className={`text-${currentAccent}-500`}
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <span>20 min delivery</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            key={`image-${currentSlide}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative h-[300px] md:h-[400px] lg:h-[500px]"
          >
            <Image
              src={slides[currentSlide].image || "/placeholder.svg"}
              width={600}
              height={600}
              alt={slides[currentSlide].title}
              className="mx-auto object-contain drop-shadow-xl"
              priority
            />

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className={`absolute top-10 right-10 bg-white rounded-full px-4 py-2 shadow-lg border border-${currentAccent}-100`}
            >
              <span className="text-sm font-medium">100% Fresh</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className={`absolute bottom-10 left-10 bg-white rounded-full px-4 py-2 shadow-lg border border-${currentAccent}-100`}
            >
              <span className="text-sm font-medium">Express Delivery</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? `w-10 bg-${currentAccent}-500` : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
