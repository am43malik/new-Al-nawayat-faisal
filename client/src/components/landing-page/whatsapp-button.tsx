"use client";

import { useEffect, useState } from "react";
import icon from "@/public/whatsapp.png";
import Image from "next/image";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

export default function WhatsAppButton({
  phoneNumber,
  message = "Hello, I have an inquiry.",
}: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <div className="fixed bottom-24 right-8 z-[99]">
      {isVisible && (
        <div
          onClick={handleClick}
          aria-label="Inquire on WhatsApp"
          className="cursor-pointer"
        >
          <Image
            src={icon}
            alt="logo"
            width={100}
            height={100}
            className="w-12"
          />
        </div>
      )}
    </div>
  );
}
