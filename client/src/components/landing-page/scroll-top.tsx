"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const springProgress = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressToDegrees = useTransform(springProgress, [0, 1], [0, 360]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const updateScrollProgress = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.pageYOffset / totalScroll;

      setIsVisible(window.pageYOffset > 300);

      if (window.pageYOffset > 300) {
        setScrollProgress(currentProgress);
        animate(springProgress, currentProgress, {
          duration: 0.3,
        });
      }
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, [springProgress]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-[99]"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.2 }}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="relative h-12 w-12 cursor-pointer"
      >
        {/* Background circle */}
        <div className="absolute inset-0 rounded-full border border-black opacity-20" />

        {/* Progress circle */}
        <svg
          className="absolute inset-0 h-full w-full -rotate-90 transform"
          viewBox="0 0 100 100"
        >
          <motion.path
            d="M 50,50 m 0,-46 a 46,46 0 1,1 0,92 a 46,46 0 1,1 0,-92"
            style={{
              pathLength: springProgress,
            }}
            className="stroke-black fill-none stroke-[1.5]"
          />
        </svg>

        {/* Arrow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ y: 2 }}
            animate={{ y: -2 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1,
              ease: "easeInOut",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 4L12 20M12 4L6 10M12 4L18 10"
                stroke="#000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </button>
    </motion.div>
  );
}
