"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { getProductById } from "@/lib/http/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckCircle2,
  XCircle,
  Package,
  Tag,
  Calendar,
  DollarSign,
  Boxes,
  Store,
  LayoutGrid,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ProductData } from "@/types";
import BreadCrumb from "@/components/ui/breadcrumb";
import { formatDate } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page() {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const params = useSearchParams();
  const id = params.get("id");

  const { data, isLoading, error } = useQuery({
    queryKey: ["getProductById", id],
    queryFn: async () => {
      return await getProductById(id!).then((res) => res.data);
    },
  });

  useEffect(() => {
    if (data) {
      setProduct(data);
      setSelectedImage(data.featureImg);
    }
  }, [data]);

  if (isLoading) return <ProductDetailSkeleton />;
  if (error)
    return <div>Error loading product: {(error as Error).message}</div>;
  if (!product) return <div>Product not found</div>;

  const breadcrumbItems = [
    { title: "Products", link: "/dashboard/product" },
    { title: "Product Details", link: "/dashboard/product/view" },
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <BreadCrumb items={breadcrumbItems} />
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle className="text-2xl">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  SKU: {product.variants[0]?.sku}
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.isFeatured && (
                  <Badge variant="outline" color="success">
                    Featured Product
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  color={product.isApproved ? "default" : "destructive"}
                >
                  {product.isApproved ? "Approved" : "Pending Approval"}
                </Badge>
                <Badge variant="outline">{product.status}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-square relative rounded-lg overflow-hidden border">
                  <Image
                    src={selectedImage || "/placeholder.png"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <ScrollArea className="w-full">
                  <div className="flex gap-2 pb-4">
                    {[product.featureImg, ...product.images].map(
                      (img, index) => (
                        <div
                          key={index}
                          className={`relative w-20 h-20 rounded-md overflow-hidden border cursor-pointer transition-all ${
                            selectedImage === img ? "ring-2 ring-primary" : ""
                          }`}
                          onClick={() => setSelectedImage(img)}
                        >
                          <Image
                            src={img}
                            alt={`${product.name} ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* Product Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      <Store className="h-4 w-4" />
                      Brand
                    </h3>
                    <p className="text-muted-foreground">
                      {product.brandId.name}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      <LayoutGrid className="h-4 w-4" />
                      Category
                    </h3>
                    <p className="text-muted-foreground">
                      {product.categoryId.name} / {product.subCategoryId.name}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Created
                    </h3>
                    <p className="text-muted-foreground">
                      {formatDate(product.createdAt)}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Updated
                    </h3>
                    <p className="text-muted-foreground">
                      {formatDate(product.updatedAt)}
                    </p>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Boxes className="h-5 w-5" />
                      Variants ({product.variants.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {product.variants.map((variant, index) => (
                        <Card key={index}>
                          <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {/* Price Information */}
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-muted-foreground">
                                  Pricing
                                </h4>
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">MRP:</span>
                                    <span className="font-medium">
                                      ₹  {variant.mrp}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">
                                      Selling Price:
                                    </span>
                                    <span className="font-medium text-green-600">
                                      ₹  {variant.rate}
                                    </span>
                                  </div>
                                  {variant.discount > 0 && (
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Discount:</span>
                                      <Badge variant="outline">
                                        {variant.discount}% off
                                      </Badge>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Stock Information */}
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-muted-foreground">
                                  Inventory
                                </h4>
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">SKU:</span>
                                    <span className="font-medium font-mono">
                                      {variant.sku}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">Stock:</span>
                                    <Badge
                                      variant="outline"
                                      color={
                                        variant.quantity > 0
                                          ? "default"
                                          : "destructive"
                                      }
                                    >
                                      {variant.quantity} in stock
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              {/* Attributes */}
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-muted-foreground">
                                  Attributes
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                  {variant.attributes.map((attr, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center gap-1.5 rounded-md border px-2 py-1 text-sm"
                                    >
                                      <span className="text-muted-foreground">
                                        {attr.attributeId.name}:
                                      </span>
                                      <span className="font-medium">
                                        {attr.value}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Created By</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {product.createdBy.firstName[0]}
                        {product.createdBy.lastName[0]}
                      </div>
                      <div>
                        <p className="font-medium">
                          {product.createdBy.firstName}{" "}
                          {product.createdBy.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {product.createdBy.email}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      <Skeleton className="h-8 w-[200px]" />
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <Skeleton className="h-8 w-[300px]" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="w-20 h-20" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-24 w-full" />
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-40 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
