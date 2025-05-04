"use client";

// import {Footer} from "@/components/landing-page/footer";
import { HeaderLanding } from "@/components/landing-page/header-landing";
import React, { useEffect, useState } from "react";
import logo from "@/public/logo.png";
import { CategoryCard } from "@/components/landing-page/category-card";
import { CategoryData } from "@/types";
import { getCategories } from "@/lib/http/api";
import { useQuery } from "@tanstack/react-query";
import { Footer } from "@/components/landing-page/footer";

const Page = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["getCategories"],
    queryFn: async () => {
      return await getCategories().then((res) => res.data);
    },
  });

  useEffect(() => {
    if (data) {
      setCategories(data.data);
    }
  }, [data]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <HeaderLanding  />
      <div className="container px-4 md:px-6 py-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.length > 0 &&
            categories.map((item) => (
              <CategoryCard
                key={item._id}
                title={item.name}
                image={item.image}
                href={`/category/${item._id}`}
              />
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
