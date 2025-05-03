// import Link from "next/link";
// import {
//   Mail,
//   Facebook,
//   Linkedin,
//   Instagram,
//   Phone,
//   MapPin,
// } from "lucide-react";
// import Image from "next/image";
// import logo from "@/public/logo.png";

// export default function Footer() {
//   return (
//     <footer className="bg-zinc-900 text-gray-200" id="contact-us">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1">
//           <div className="py-16">
//             <div className="grid md:grid-cols-12 grid-cols-1 gap-8">
//               {/* Logo and Description Section */}
//               <div className="lg:col-span-4 md:col-span-12">
//                 <Link href="/" className="text-2xl font-bold">
//                   <Image
//                     src={logo}
//                     alt="Logo"
//                     width={100}
//                     height={100}
//                     className="w-20"
//                   />
//                 </Link>
//                 <p className="mt-6 text-gray-300">
//                   AL-Nawayath, the place where fashion finds a home and comfort
//                   meets style. Discover our vibrant world of on-trend clothing,
//                   meticulously designed to enhance your wardrobe with the ideal
//                   balance of style and quality.
//                 </p>
//                 <div className="flex gap-2 mt-6">
//                   <div className="flex space-x-4">
//                     <Link
//                       href="#"
//                       target="_blank"
//                       className="text-gray-400 hover:text-white"
//                     >
//                       <svg
//                         className=""
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="20"
//                         height="20"
//                         viewBox="0 0 20 20"
//                         fill="none"
//                       >
//                         <g id="Social Media">
//                           <path
//                             id="Vector"
//                             d="M11.3214 8.93654L16.4919 3.05554H15.2667L10.7772 8.16193L7.1914 3.05554H3.05566L8.47803 10.7773L3.05566 16.9444H4.28097L9.022 11.5519L12.8088 16.9444H16.9446L11.3211 8.93654H11.3214ZM9.64322 10.8453L9.09382 10.0764L4.72246 3.95809H6.60445L10.1322 8.89578L10.6816 9.66469L15.2672 16.0829H13.3852L9.64322 10.8456V10.8453Z"
//                             fill="currentColor"
//                           />
//                         </g>
//                       </svg>
//                     </Link>
//                     <Link
//                       href="#"
//                       target="_blank"
//                       className="text-gray-400 hover:text-white"
//                     >
//                       <Facebook size={20} />
//                     </Link>
//                     <Link
//                       href="#"
//                       target="_blank"
//                       className="text-gray-400 hover:text-white"
//                     >
//                       <Linkedin size={20} />
//                     </Link>
//                     <Link
//                       href="#"
//                       target="_blank"
//                       className="text-gray-400 hover:text-white"
//                     >
//                       <Instagram size={20} />
//                     </Link>
//                   </div>
//                 </div>
//               </div>

//               {/* Company Links Section */}
//               <div className="lg:col-span-2 md:col-span-4">
//                 <h5 className="tracking-wider text-gray-100 font-semibold mb-6">
//                   Quick Links
//                 </h5>
//                 <ul className="space-y-3">
//                   {companyLinks.map((link) => (
//                     <li key={link.title}>
//                       <Link
//                         href={link.href}
//                         className="text-gray-300 hover:text-gray-400 transition-colors"
//                       >
//                         {link.title}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Useful Links Section */}
//               <div className="lg:col-span-2 md:col-span-4">
//                 <h5 className="tracking-wider text-gray-100 font-semibold mb-6">
//                   Useful Links
//                 </h5>
//                 <ul className="space-y-3">
//                   {usefulLinks.map((link) => (
//                     <li key={link.title}>
//                       <Link
//                         href={link.href}
//                         className="text-gray-300 hover:text-gray-400 transition-colors"
//                       >
//                         {link.title}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Contact Info Section */}
//               <div className="lg:col-span-4 md:col-span-4">
//                 <h5 className="tracking-wider text-gray-100 font-semibold mb-6">
//                   Contact Info
//                 </h5>
//                 <ul className="space-y-4">
//                   <li className="flex items-center space-x-3">
//                     <Phone size={20} className="flex-shrink-0" />
//                     <Link
//                       href="tel:+917020398600"
//                       className="text-gray-300 hover:text-gray-400 transition-colors"
//                     >
//                       +966 54 419 0590
//                     </Link>
//                   </li>
//                   <li className="flex items-center space-x-3">
//                     <Mail size={20} className="flex-shrink-0" />
//                     <Link
//                       href="mailto:info@alnawayath.com"
//                       className="text-gray-300 hover:text-gray-400 transition-colors"
//                     >
//                       info@alnawayath.com
//                     </Link>
//                   </li>
//                   <li className="flex items-start space-x-3">
//                     <MapPin size={24} className="flex-shrink-0 mt-1" />
//                     <span className="text-gray-300">
//                       Al Nawayath Ghazween Trading company.Building 8617, Omar
//                       ibn al fadhl street, As suq dist, postal code 32242,
//                       Dammam, Saudi arabia.
//                     </span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Section */}
//       <div className="border-t border-slate-800 py-8">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-center">
//             <span className="text-sm text-gray-300">
//               © {new Date().getFullYear()} Al Nawayath. All rights reserved.
//             </span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// const companyLinks = [
//   { title: "Home", href: "/" },
//   { title: "About us", href: "#about" },
//   { title: "Product", href: "/products" },
//   { title: "Category", href: "/category" },
//   // { title: "Contact us", href: "#" },
// ];

// const usefulLinks = [
//   { title: "Policies", href: "/policy" },
//   { title: "Delivery Policy", href: "#" },
//   { title: "Cancellation Policy", href: "#" },
//   { title: "Refund Policy", href: "#" },
//   { title: "End-User License Agreement", href: "#" },
// ];

"use client"

import Link from "next/link"
import { Mail, Phone, Facebook, Instagram, Twitter, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export function Footer() {
  const footerLinks = {
    quickLinks: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Products", href: "/products" },
      { label: "Categories", href: "/categories" },
      { label: "Contact Us", href: "/contact" },
    ],
    customerService: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping Policy", href: "/shipping" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
    categories: [
      { label: "Fruits & Vegetables", href: "/category/fruits-vegetables" },
      { label: "Dairy & Breakfast", href: "/category/dairy-breakfast" },
      { label: "Beverages", href: "/category/beverages" },
      { label: "Snacks", href: "/category/snacks" },
      { label: "Personal Care", href: "/category/personal-care" },
    ],
  }

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#", label: "Facebook" },
    { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
    { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
  ]

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-200 pt-16 pb-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-gradient-to-r from-green-500 to-green-400 text-white p-2 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
                  <path d="M16.5 9.4 7.55 4.24"></path>
                  <polyline points="3.29 7 12 12 20.71 7"></polyline>
                  <line x1="12" y1="22" x2="12" y2="12"></line>
                  <circle cx="18.5" cy="15.5" r="2.5"></circle>
                  <path d="M20.27 17.27 22 19"></path>
                </svg>
              </div>
              <span className="font-bold text-xl text-white">QuickMart</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your one-stop shop for daily essentials and groceries delivered at lightning speed. We're committed to
              bringing fresh, quality products to your doorstep in minutes.
            </p>
            <div className="flex space-x-4 mb-8">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="flex-shrink-0 mt-1" />
                <span>123 Commerce Street, Bangalore, Karnataka, India - 560001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} />
                <span>+91 1234567890</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} />
                <span>support@quickmart.com</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-white text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold text-white text-lg mt-8 mb-6">Categories</h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-white text-lg mb-6">Customer Service</h3>
            <ul className="space-y-3">
              {footerLinks.customerService.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h4 className="font-semibold text-white text-lg mb-4">Download Our App</h4>
              <div className="flex flex-wrap gap-4">
                <Link href="#" className="inline-block">
                  <img
                    src="/placeholder.svg?height=40&width=120"
                    alt="Download on the App Store"
                    className="h-10 rounded-md"
                  />
                </Link>
                <Link href="#" className="inline-block">
                  <img
                    src="/placeholder.svg?height=40&width=120"
                    alt="Get it on Google Play"
                    className="h-10 rounded-md"
                  />
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-white text-lg mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get special offers, free giveaways, and updates on new arrivals.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 border-gray-700 text-white focus-visible:ring-green-500"
              />
              <Button className="bg-green-500 hover:bg-green-600">Subscribe</Button>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-white text-lg mb-4">We Accept</h4>
              <div className="flex flex-wrap gap-3">
                {["Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay"].map((payment, index) => (
                  <div key={index} className="bg-gray-800 rounded-md px-3 py-1 text-xs text-gray-300">
                    {payment}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} QuickMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
