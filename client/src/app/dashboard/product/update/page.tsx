"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Loader2, Package, Plus, X } from "lucide-react";
import { toast } from "react-hot-toast";

import BreadCrumb from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

import {
  getBrands,
  getCategories,
  getProductById,
  getSubCategories,
  updateProduct,
} from "@/lib/http/api";
import type { Brand, CategoryData, SubCategory } from "@/types";
import { AxiosError } from "axios";

const variantSchema = z
  .object({
    quantity: z.string(),
    sku: z.string().min(1, "SKU is required"),
    mrp: z.string(),
    rate: z.string(),
    discount: z.string(),
    attributes: z.array(
      z.object({
        attributeId: z.object({
          _id: z.string(),
          name: z.string(),
        }),
        value: z.string(),
      })
    ),
  })
  .transform((data) => ({
    ...data,
    quantity: Number(data.quantity) || 0,
    mrp: Number(data.mrp) || 0,
    rate: Number(data.rate) || 0,
    discount: Number(data.discount) || 0,
  }));

const formSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters."),
  description: z.string().min(5, "Description must be at least 5 characters."),
  categoryId: z.string(),
  subCategoryId: z.string(),
  brandId: z.string(),
  status: z.string(),
  isApproved: z.boolean(),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
  featureImg: z.any().optional(),
  files: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required")
    .max(5, "Maximum 5 images allowed"),
  variants: z.array(variantSchema),
});

type FormValues = z.input<typeof formSchema>;

export default function UpdateProduct() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [category, setCategory] = useState<CategoryData | null>(null);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [featureImage, setFeatureImage] = useState<string>("");
  const [hasNewFeatureImage, setHasNewFeatureImage] = useState(false);
  const [hasNewImages, setHasNewImages] = useState(false);

  const params = useSearchParams();
  const router = useRouter();
  const id = params.get("id");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      subCategoryId: "",
      brandId: "",
      status: "",
      isApproved: false,
      isActive: false,
      isFeatured: false,
      variants: [
        {
          quantity: "0",
          sku: "",
          mrp: "0",
          rate: "0",
          discount: "0",
          attributes: [],
        },
      ],
    },
  });

  const { data: productData, isLoading: isProductLoading } = useQuery({
    queryKey: ["getProduct", id],
    queryFn: async () => {
      return await getProductById(String(id)).then((res) => res.data);
    },
    enabled: !!id,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return await getCategories().then((res) => res.data);
    },
  });

  const { data: subData, refetch: refetchSubCategories } = useQuery({
    queryKey: ["getSubCategories", category?._id],
    queryFn: async () => {
      if (category?._id) {
        return await getSubCategories(category._id).then((res) => res.data);
      }
      return [];
    },
    enabled: !!category?._id,
  });

  const { data: brandsData } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      return await getBrands().then((res) => res.data);
    },
  });

  useEffect(() => {
    if (categoriesData) setCategories(categoriesData.data);
    if (subData) setSubCategories(subData);
    if (brandsData) setBrands(brandsData);
  }, [categoriesData, subData, brandsData]);

  useEffect(() => {
    if (productData) {
      setFeatureImage(productData.featureImg);
      setSelectedImages(productData.images);
      form.reset({
        name: productData.name,
        description: productData.description,
        categoryId: productData.categoryId._id,
        subCategoryId: productData.subCategoryId._id,
        brandId: productData.brandId._id,
        status: productData.status,
        isApproved: productData.isApproved,
        isActive: productData.isActive,
        isFeatured: productData.isFeatured,
        variants: productData.variants.map((variant: any) => ({
          quantity: variant.quantity.toString(),
          sku: variant.sku,
          mrp: variant.mrp.toString(),
          rate: variant.rate.toString(),
          discount: variant.discount.toString(),
          attributes: variant.attributes,
        })),
      });
      setCategory(productData.categoryId);
    }
  }, [productData, form]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: async (data: FormData) => {
      return await updateProduct(data, String(id));
    },
    onSuccess: () => {
      toast.success("Product updated successfully");
      router.push("/dashboard/product");
    },
    onError(error, variables, context) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.errors[0].msg);
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  const calculateDiscount = (mrp: number, rate: number): number => {
    if (!mrp || !rate || mrp <= 0 || rate <= 0) return 0;
    if (rate > mrp) return 0;
    const discountPercentage = ((mrp - rate) / mrp) * 100;
    return Math.round(discountPercentage * 100) / 100;
  };

  const handleMRPChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const mrp = Number(e.target.value) || 0;
    const rate = Number(form.getValues(`variants.${index}.rate`)) || 0;

    form.setValue(`variants.${index}.mrp`, e.target.value);

    if (mrp && rate) {
      const discount = calculateDiscount(mrp, rate);
      form.setValue(`variants.${index}.discount`, discount.toString());
    }
  };

  const handleRateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const rate = Number(e.target.value) || 0;
    const mrp = Number(form.getValues(`variants.${index}.mrp`)) || 0;

    form.setValue(`variants.${index}.rate`, e.target.value);

    if (mrp && rate) {
      const discount = calculateDiscount(mrp, rate);
      form.setValue(`variants.${index}.discount`, discount.toString());
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files);

      // Check total number of images (existing + new)
      if (selectedImages.length + newImages.length > 5) {
        toast.error("Maximum 5 images allowed");
        return;
      }

      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...newImages];
        form.setValue("files", updatedImages);
        setHasNewImages(true);
        return updatedImages;
      });
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      form.setValue("files", newImages);
      return newImages;
    });
  };

  const removeExistingImage = (index: number) => {
    setSelectedImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const formData = new FormData();

      if (hasNewImages) {
        values.files.forEach((file, index) => {
          formData.append("files", file);
        });
      }

      // Set the feature image
      if (hasNewFeatureImage && values.featureImg instanceof File) {
        formData.append("file", values.featureImg);
      }

      // Add other form values
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("categoryId", values.categoryId);
      if (values.subCategoryId) {
        formData.append("subCategoryId", values.subCategoryId);
      }
      formData.append("brandId", values.brandId);
      formData.append("status", values.status);
      formData.append("isActive", values.isActive.toString());
      formData.append("isApproved", values.isApproved.toString());
      formData.append("isFeatured", values.isFeatured.toString());

      // Handle variants
      formData.append("variants", JSON.stringify(values.variants));

      formData.append(
        "removedImages",
        JSON.stringify(
          productData.images.filter(
            (img: string) => !selectedImages.includes(img)
          )
        )
      );

      mutate(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to update product");
    }
  };

  if (isProductLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="container mx-auto py-6">
        <BreadCrumb
          items={[
            { title: "Products", link: "/dashboard/product" },
            { title: "Update Product", link: "/dashboard/product/update" },
          ]}
        />
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Package className="h-6 w-6" />
              Update Product
            </CardTitle>
            <CardDescription>
              Update your product details and inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="brandId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select brand" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {brands.length > 0 &&
                              brands.map((brand) => (
                                <SelectItem key={brand._id} value={brand._id}>
                                  {brand.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter product description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            const selectedCategory = categories?.find(
                              (cat) => cat._id === value
                            );
                            setCategory(selectedCategory || null);
                            refetchSubCategories();
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.length > 0 &&
                              categories.map((category) => (
                                <SelectItem
                                  key={category._id}
                                  value={category._id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subCategoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subcategory</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select subcategory" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subCategories.length > 0 &&
                              subCategories.map((subCategory) => (
                                <SelectItem
                                  key={subCategory._id}
                                  value={subCategory._id}
                                >
                                  {subCategory.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Active State</FormLabel>
                          <FormDescription>
                            Enable or disable this product
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isApproved"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Approval Status</FormLabel>
                          <FormDescription>
                            Set product approval status
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isFeatured"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Featured Product?</FormLabel>
                          <FormDescription>
                            Displays the product as a featured item on the
                            landing page
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Product Images</h3>
                    <p className="text-sm text-muted-foreground">
                      Add images for your product
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="featureImg"
                      render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel>Feature Image</FormLabel>
                          <FormControl>
                            <div className="space-y-4">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    onChange(file);
                                    setFeatureImage(URL.createObjectURL(file));
                                    setHasNewFeatureImage(true);
                                  }
                                }}
                                {...field}
                              />
                              {featureImage && (
                                <div className="relative w-full aspect-square">
                                  <Image
                                    src={featureImage || "/placeholder.svg"}
                                    alt="Feature image"
                                    fill
                                    className="object-cover rounded-lg"
                                  />
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="files"
                      render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel>Additional Images</FormLabel>
                          <FormControl>
                            <div className="space-y-4">
                              <Input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                {...field}
                              />
                              <div className="grid grid-cols-2 gap-4">
                                {/* Show existing images */}
                                {selectedImages.map((imageUrl, index) => (
                                  <div
                                    key={`existing-${index}`}
                                    className="relative aspect-square"
                                  >
                                    <Image
                                      src={imageUrl || "/placeholder.svg"}
                                      alt={`Product ${index + 1}`}
                                      fill
                                      className="object-cover rounded-lg"
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="absolute top-2 right-2 h-8 w-8 p-0 bg-background/80 hover:bg-background/90"
                                      onClick={() => removeExistingImage(index)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                {/* Show newly added images */}
                                {images.map((image, index) => (
                                  <div
                                    key={`new-${index}`}
                                    className="relative aspect-square"
                                  >
                                    <Image
                                      src={
                                        URL.createObjectURL(image) ||
                                        "/placeholder.svg"
                                      }
                                      alt={`New Product ${index + 1}`}
                                      fill
                                      className="object-cover rounded-lg"
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="absolute top-2 right-2 h-8 w-8 p-0 bg-background/80 hover:bg-background/90"
                                      onClick={() => removeImage(index)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Product Variants</h3>
                      <p className="text-sm text-muted-foreground">
                        Add variants with different attributes
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const currentVariants = form.getValues("variants");
                        form.setValue("variants", [
                          ...currentVariants,
                          {
                            quantity: "0",
                            sku: "",
                            mrp: "0",
                            rate: "0",
                            discount: "0",
                            attributes: [],
                          },
                        ]);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Variant
                    </Button>
                  </div>

                  {form.watch("variants").map((_, index) => (
                    <Card key={index}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Variant {index + 1}
                        </CardTitle>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const currentVariants =
                                form.getValues("variants");
                              form.setValue(
                                "variants",
                                currentVariants.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name={`variants.${index}.sku`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>SKU</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter SKU" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`variants.${index}.quantity`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Quantity</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="Enter quantity"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`variants.${index}.mrp`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>MRP</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="Enter MRP"
                                    {...field}
                                    onChange={(e) => handleMRPChange(e, index)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`variants.${index}.rate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Rate</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="Enter rate"
                                    {...field}
                                    onChange={(e) => handleRateChange(e, index)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`variants.${index}.discount`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Discount (%)</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    readOnly
                                    className="bg-muted"
                                  />
                                </FormControl>
                                <FormDescription>
                                  Automatically calculated based on MRP and Rate
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="mt-4">
                          <FormField
                            control={form.control}
                            name={`variants.${index}.attributes`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Attributes</FormLabel>
                                <div className="flex flex-wrap gap-2">
                                  {field.value.map((attr, attrIndex) => (
                                    <Badge key={attrIndex} variant="outline">
                                      {attr.attributeId.name}: {attr.value}
                                    </Badge>
                                  ))}
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isPending}>
                    {isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Update Product
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
