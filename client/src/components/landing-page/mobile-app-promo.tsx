// import Image from "next/image";
// import Link from "next/link";
// import appStore from "@/public/app-store.png";
// import googlePlay from "@/public/play-store.png";

// export function MobileAppPromo() {
//   return (
//     <section className="bg-muted/30 py-12">
//       <div className="container px-4 md:px-6">
//         <div className="flex flex-col md:flex-row items-center justify-between gap-8">
//           <div className="md:w-1/2 space-y-4">
//             <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
//               Make your online shop easier with our mobile app
//             </h2>
//             <p className="text-muted-foreground">
//               Download our mobile app for a seamless shopping experience. Get
//               exclusive deals and track your orders on the go.
//             </p>
//             <div className="flex flex-wrap gap-4 pt-4">
//               <Link href="#" className="inline-block">
//                 <Image
//                   src={appStore}
//                   alt="Download on the App Store"
//                   width={140}
//                   height={42}
//                   className="rounded-lg"
//                 />
//               </Link>
//               <Link href="#" className="inline-block">
//                 <Image
//                   src={googlePlay}
//                   alt="Get it on Google Play"
//                   width={140}
//                   height={42}
//                   className="rounded-lg"
//                 />
//               </Link>
//             </div>
//           </div>
//           <div className="md:w-1/2">
//             <Image
//               src="https://img.freepik.com/free-vector/online-wishes-list-concept-illustration_114360-3900.jpg?t=st=1743009905~exp=1743013505~hmac=21cd744eb09ed18cd3344b3e583c53eaf23051537da364c014b450ee345e01a1&w=740"
//               alt="Mobile App"
//               width={500}
//               height={400}
//               className="mx-auto"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export function AppPromo() {
  return (
    <section className="py-16 bg-gradient-to-r from-green-600 to-green-500 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:w-1/2 space-y-6 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Download our app for a faster experience</h2>
            <p className="text-white/80 text-lg">
              Get exclusive app-only offers and track your orders in real-time. Enjoy a seamless shopping experience on
              the go with our feature-rich mobile app.
            </p>
            <ul className="space-y-3">
              {[
                "Exclusive app-only deals and discounts",
                "Real-time order tracking",
                "Faster checkout with saved addresses",
                "Personalized recommendations",
                "Easy reordering of previous purchases",
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="#" className="inline-block">
                <Image
                  src="/images/app-store.png"
                  alt="Download on the App Store"
                  width={150}
                  height={50}
                  className="rounded-lg"
                />
              </Link>
              <Link href="#" className="inline-block">
                <Image
                  src="/images/play-store.png"
                  alt="Get it on Google Play"
                  width={150}
                  height={50}
                  className="rounded-lg"
                />
              </Link>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-yellow-400"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>
              <span className="text-sm text-white/80">4.8/5 (10k+ reviews)</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:w-1/2 relative"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl opacity-10"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl opacity-10"></div>

            <div className="relative mx-auto w-[280px] h-[580px]">
              {/* Phone Frame */}
              <div className="absolute inset-0 bg-black rounded-[3rem] p-4 shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl" />
                {/* Screen Content */}
                <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                  <Image
                    src="/images/app-screen.png"
                    alt="App screenshot"
                    width={400}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                  {/* Screen Glare Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
