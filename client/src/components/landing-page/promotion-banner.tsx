import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PromotionBannerProps {
  title: string;
  description: string;
  image: string;
  href: string;
  discount?: string;
}

export function PromotionBanner({
  title,
  description,
  image,
  href,
  discount,
}: PromotionBannerProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg">
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        width={600}
        height={300}
        className="h-[200px] w-full object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent p-6 flex flex-col justify-center">
        {discount && (
          <Badge className="mb-2 w-fit bg-red-600 hover:bg-red-700">
            {discount}
          </Badge>
        )}
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/80 mb-4 max-w-xs">{description}</p>
        <div>
          <Button
            className={cn("hover:bg-black bg-[#BD844C] text-white")}
            asChild
            size="sm"
            variant="ghost"
          >
            <Link href={href}>Shop Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
