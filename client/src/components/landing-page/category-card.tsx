import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  image: string;
  href: string;
}

export function CategoryCard({ title, image, href }: CategoryCardProps) {
  return (
    <Link href={href} className="group flex flex-col items-center">
      <div className="mb-3 overflow-hidden rounded-full border p-1">
        <div className="relative h-24 w-24 overflow-hidden rounded-full bg-muted">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-110"
          />
        </div>
      </div>
      <h3 className="text-center text-sm font-medium">{title}</h3>
    </Link>
  );
}
