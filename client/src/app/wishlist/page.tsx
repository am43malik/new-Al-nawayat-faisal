"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { removeFromWishlist, addToCart } from "@/redux/slice";
import toast from "react-hot-toast";
import logo from "@/public/logo.png";
import { HeaderLanding } from "@/components/landing-page/header-landing";
import Footer from "@/components/landing-page/footer";
import { ProductData } from "@/types";

const Page = () => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.cart.wishlist);

  if (wishlistItems.length === 0) {
    return (
      <>
        <HeaderLanding logo={logo} />
        <div className="flex flex-col items-center justify-center py-12 text-center max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <Heart className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-medium mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 max-w-md mb-6">
            Items added to your wishlist will appear here. Start shopping and
            add your favorite items to wishlist.
          </p>
          <Link href="/">
            <Button className="bg-[#BD844C] hover:bg-[#9e6f3f]">
              Continue Shopping
            </Button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <HeaderLanding logo={logo} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 py-6">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
              {item.discount > 0 && (
                <Badge className="absolute left-3 top-3 bg-red-500 text-white">
                  {item.discount}% OFF
                </Badge>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-base mb-2 line-clamp-2">
                <Link
                  href={`/products/${item.productId}`}
                  className="hover:underline"
                >
                  {item.name}
                </Link>
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold">₹  {item.price}</span>
                  {item.originalPrice > item.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹  {item.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={() => {
                      dispatch(removeFromWishlist(item.productId));
                      toast.success("Removed from wishlist");
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#BD844C] hover:bg-[#9e6f3f]"
                    onClick={() => {
                      // dispatch(addToCart(dummyProduct as ProductData));
                      toast.error("Under Maintance");
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Page;
