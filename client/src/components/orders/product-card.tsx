import { Card, CardContent } from "@/components/ui/card";
import { ProductData } from "@/types";
import Image from "next/image";

interface ProductCardProps {
  product: ProductData;
  quantity: number;
  total: number;
  color?: string;
  size?: string;
  material?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantity,
  total,
  color,
  size,
  material,
}) => {
  const variant = product.variants[0]; // Using first variant as default

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className="relative h-20 w-20 flex-shrink-0">
            <Image
              src={product.featureImg}
              alt={product.name}
              fill
              className="rounded-md object-cover"
            />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="font-semibold">{product.name}</h4>
            <div className="text-sm text-muted-foreground">
              {color && <span className="mr-2">Color: {color}</span>}
              {size && <span className="mr-2">Size: {size}</span>}
              {material && <span>Material: {material}</span>}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold">₹  {variant.rate}</span>
              {variant.mrp > variant.rate && (
                <span className="text-sm line-through text-muted-foreground">
                  ₹  {variant.mrp}
                </span>
              )}
              {variant.discount > 0 && (
                <span className="text-sm text-green-600">
                  {variant.discount}% off
                </span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Quantity: {quantity}</span>
              <span className="font-semibold">
                Total: ₹  {(variant.rate * quantity).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
