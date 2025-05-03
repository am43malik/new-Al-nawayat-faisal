"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import q1 from "@/public/jeddah.png";
import q2 from "@/public/riyadh.png";
import q3 from "@/public/damam.jpeg";
import logo from "@/public/logo.png";
import Image from "next/image";

export default function BusinessCard() {
  const locations = [
    {
      city: "Jeddah",
      cityAr: "جــدة",
      phone: "054 419 0590",
      qr: q1,
    },
    {
      city: "Riyadh",
      cityAr: "الرياض",
      phone: "054 066 3393",
      qr: q2,
    },
    {
      city: "Dammam",
      cityAr: "الدمــام",
      phone: "056 767 1765",
      qr: q3,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-6 flex items-center justify-center">
      <Card className="w-full max-w-4xl bg-white shadow-xl overflow-hidden">
        <div className="p-8 space-y-8">
          {/* Maintenance Message */}
          <div className="text-center bg-yellow-100 p-4 rounded-md mb-8 -mx-8">
            <p className="text-yellow-800 font-bold text-2xl">
              Currently we are under maintenance
            </p>
          </div>

          {/* Header Section with Logo */}
          <div className="flex items-center gap-6 border-b border-gray-200 pb-8">
            <motion.div
              className="w-24 h-24 relative"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={logo || "/placeholder.svg"}
                alt="Company Logo"
                width={96}
                height={96}
                className=""
              />
            </motion.div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-[#8B0000]">
                AL NAWAYATH GHAZWEEN TRADING CO.
              </h1>
              <p className="text-xl text-[#C5A572]">
                Wholesaler of Readymade Garments
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="space-y-4 p-6 rounded-lg bg-gray-50"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-xl font-semibold text-[#8B0000]">
                Quality Manufacturer & Importer
              </h2>
              <p className="text-gray-600">
                Premium readymade garments & uniforms at reasonable prices in
                Saudi Arabia
              </p>
            </motion.div>

            <motion.div
              className="space-y-4 p-6 rounded-lg bg-gray-50"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-xl font-semibold text-[#8B0000] text-right">
                مصنع ومصدر عالي الجودة
              </h2>
              <p className="text-gray-600 text-right">
                للملابس الجاهزة والزي الرسمي بأسعار معقولة في المملكة العربية
                السعودية
              </p>
            </motion.div>
          </div>

          {/* App Download QR Section */}
          {/* <div className="flex flex-col items-center space-y-4 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-[#8B0000]">
              Download Our App
            </h3>
            <div className="relative w-32 h-32">
              <Image
                src={q1 || "/placeholder.svg"}
                alt="App Download QR"
                width={128}
                height={128}
                className="rounded-lg shadow-md"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#8B0000] text-white rounded-full hover:bg-[#700000] transition-colors">
              <Download className="w-4 h-4" />
              <span>Download App</span>
            </button>
          </div> */}

          {/* Locations Grid with QR Codes */}
          <div className="grid md:grid-cols-3 gap-6">
            {locations.map((location) => (
              <motion.div
                key={location.city}
                className="p-4 rounded-lg border border-gray-200 hover:border-[#8B0000] transition-colors"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="text-[#8B0000]" />
                  <h3 className="font-semibold">{location.city}</h3>
                  <span className="text-[#C5A572]">{location.cityAr}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <Phone className="w-4 h-4" />
                  <a
                    href={`tel:${location.phone}`}
                    className="hover:text-[#8B0000]"
                  >
                    {location.phone}
                  </a>
                </div>
                <div className="relative w-full h-32">
                  <Image
                    src={q1 || "/placeholder.svg"}
                    alt={`${location.city} QR Code`}
                    width={128}
                    height={128}
                    className="rounded-lg shadow-sm mx-auto"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex flex-wrap justify-between items-center pt-6 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <Mail className="text-[#8B0000]" />
              <a
                href="mailto:info@alnawayath.com"
                className="hover:text-[#8B0000]"
              >
                info@alnawayath.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Globe className="text-[#8B0000]" />
              <a
                href="https://www.alnawayath.com"
                className="hover:text-[#8B0000]"
              >
                www.alnawayath.com
              </a>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
