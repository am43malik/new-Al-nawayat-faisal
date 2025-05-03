"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Brand } from "@/types";
import { getBrands } from "@/lib/http/api";

export const InfiniteMovingCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLUListElement | null>(null);
  const [getData, setData] = useState<Brand[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["getBrands"],
    queryFn: async () => {
      return await getBrands().then((res) => res.data);
    },
  });

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current && duplicatedItem instanceof HTMLElement) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      // containerRef.current.style.setProperty("--animation-duration", "40s");
      containerRef.current.style.setProperty("--animation-duration", "5s");
    }
  };

  return (
    <div id="brand" className="w-full py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Have a look at our Brands
        </h2>
        <div
          ref={containerRef}
          className="relative z-20 w-full overflow-hidden"
        >
          <ul
            ref={scrollerRef}
            className={`flex items-center justify-center gap-4 md:gap-8 py-4 w-max
            ${start ? "animate-scroll" : ""}
            hover:[animation-play-state:paused]`}
          >
            {getData.length > 0 &&
              getData.map((client, idx) => (
                <li
                  key={idx}
                  className="w-32 h-20 md:w-48 md:h-32 flex items-center justify-center bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105"
                >
                  <div className="relative w-full h-full p-4">
                    <Image
                      src={client.image}
                      alt={`${client.name} logo`}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
