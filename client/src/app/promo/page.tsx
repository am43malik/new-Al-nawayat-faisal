"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Globe, Smartphone, Share2, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Card className="w-full max-w-md mx-4 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Welcome to Our Platform
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Maintenance Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="inline-block h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Currently we&apos;re under maintenance
                </p>
              </div>
            </div>
          </motion.div>

          {/* Navigation Options */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              variant="outline"
              className="w-full h-14 text-lg justify-start space-x-3 hover:scale-105 transition-transform"
              onClick={() => router.push("/")}
            >
              <Smartphone className="w-5 h-5" />
              <span>Download Mobile Application</span>
            </Button>

            <Button
              variant="outline"
              className="w-full h-14 text-lg justify-start space-x-3 hover:scale-105 transition-transform"
              onClick={() => router.push("/")}
            >
              <Globe className="w-5 h-5" />
              <span>Go to Landing Page</span>
            </Button>

            <Button
              variant="outline"
              className="w-full h-14 text-lg justify-start space-x-3 hover:scale-105 transition-transform"
              onClick={() => router.push("/")}
            >
              <Share2 className="w-5 h-5" />
              <span>Go to Social Media</span>
            </Button>
          </motion.div>

          {/* WhatsApp Chat Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="pt-4"
          >
            <Button
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white h-16 text-lg group relative overflow-hidden"
              onClick={() =>
                window.open("https://wa.me/966544190590", "_blank")
              }
            >
              <div className="absolute inset-0 bg-white/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <div className="flex items-center justify-center space-x-2 relative">
                <MessageCircle className="w-6 h-6 animate-bounce" />
                <span>Chat on WhatsApp</span>
                <Badge variant="soft" color="secondary" className="bg-white/20">
                  Online
                </Badge>
              </div>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
