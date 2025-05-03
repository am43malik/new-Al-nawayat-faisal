"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getAdminProducts, getProducts } from "@/lib/http/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cart } from "./cart";

interface CartItem extends ProductData {
  quantity: number;
  selectedAttributes: { attributeId: string; name: string; value: string }[];
}

interface ProductSearchProps {
  addToCart: (
    product: ProductData,
    quantity: number,
    attributes: { attributeId: string; name: string; value: string }[]
  ) => void;
  cart: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({
  addToCart,
  cart,
  updateQuantity,
  removeFromCart,
  clearCart,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: { attributeId: string; name: string; value: string }[];
  }>({});

  const [products, setProducts] = useState<ProductData[]>([]);
  const [availableQuantities, setAvailableQuantities] = useState<{
    [key: string]: number;
  }>({});

  const { data, isLoading } = useQuery({
    queryKey: ["getProducts"],
    queryFn: async () => {
      return await getProducts().then((res) => res.data);
    },
  });

  // const { data, isLoading } = useQuery({
  //   queryKey: ["getAdminProducts"],
  //   queryFn: async () => {
  //     return await getAdminProducts().then((res) => res.data);
  //   },
  // });

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: Math.max(0, quantity) }));
  };

  const handleAttributeChange = (
    productId: string,
    attributeId: string,
    attributeName: string,
    value: string
  ) => {
    setSelectedAttributes((prev) => {
      const existingAttributes = prev[productId] || [];
      const updatedAttributes = existingAttributes.filter(
        (attr) => attr.attributeId !== attributeId
      );

      return {
        ...prev,
        [productId]: [
          ...updatedAttributes,
          { attributeId: attributeId, name: attributeName, value },
        ],
      };
    });

    const product = products.find((p) => p._id === productId);
    if (product) {
      const selectedAttrs = selectedAttributes[productId] || [];
      const allAttributes = [
        ...selectedAttrs,
        { attributeId: attributeId, name: attributeName, value },
      ];
      const variant = product.variants.find((v) =>
        v.attributes.every((attr) =>
          allAttributes.some(
            (selectedAttr) =>
              selectedAttr.attributeId === attr.attributeId._id &&
              selectedAttr.value === attr.value
          )
        )
      );
      if (variant) {
        setAvailableQuantities((prev) => ({
          ...prev,
          [productId]: variant.quantity,
        }));
      }
    }
  };

  const handleAddToCart = (product: ProductData) => {
    const quantity = quantities[product._id] || 1;
    const attributes = selectedAttributes[product._id] || [];
    addToCart(product, quantity, attributes);
    setQuantities((prev) => ({ ...prev, [product._id]: 0 }));
    setSelectedAttributes((prev) => ({ ...prev, [product._id]: [] }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="product-search">Search Products</Label>
        <Input
          id="product-search"
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {searchTerm &&
          filteredProducts.map((product) => (
            <Card key={product._id} className="overflow-hidden">
              <CardHeader className="p-0">
                <img
                  src={product.featureImg}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-primary">
                    ₹  {product.variants[0].rate}
                  </p>
                  {product.variants[0].mrp > product.variants[0].rate && (
                    <p className="text-lg line-through text-muted-foreground">
                      ₹  {product.variants[0].mrp}
                    </p>
                  )}
                  {product.variants[0].discount > 0 && (
                    <p className="text-sm text-green-600">
                      {product.variants[0].discount}% off
                    </p>
                  )}
                </div>
                <div className="mt-4 space-y-2">
                  {product.variants[0].attributes.map((attr) => (
                    <Select
                      key={attr.attributeId._id}
                      value={
                        selectedAttributes[product._id]?.find(
                          (a) => a.attributeId === attr.attributeId._id
                        )?.value || ""
                      }
                      onValueChange={(value) =>
                        handleAttributeChange(
                          product._id,
                          attr.attributeId._id,
                          attr.attributeId.name,
                          value
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={`Select ${attr.attributeId.name}`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {attr.value.split(",").map((value) => (
                          <SelectItem key={value.trim()} value={value.trim()}>
                            {value.trim()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ))}
                </div>
                {availableQuantities[product._id] !== undefined && (
                  <p className="mt-2 text-sm text-gray-600">
                    Available: {availableQuantities[product._id]}
                  </p>
                )}
              </CardContent>
              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <Input
                  type="number"
                  min="0"
                  value={quantities[product._id] || ""}
                  placeholder="0"
                  onChange={(e) =>
                    handleQuantityChange(product._id, parseInt(e.target.value))
                  }
                  className="w-20"
                />
                <Button onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
      <Cart
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    </div>
  );
};
