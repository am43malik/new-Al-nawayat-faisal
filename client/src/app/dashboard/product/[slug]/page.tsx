"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Loader2, Package, X, Plus } from "lucide-react";

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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Brand, CategoryData, IAttribute, SubCategory } from "@/types";
import {
  getBrands,
  getCategories,
  getSubCategories,
  getAttributes,
  createProduct,
} from "@/lib/http/api";
import { useMutation, useQuery } from "@tanstack/react-query";
// import {
//   validateMultipleImages,
//   validateSingleImage,
// } from "@/lib/image-validation";

import * as z from "zod";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Switch } from "@/components/ui/switch";
import { Roles } from "@/constants";
import { useAuth } from "@/hooks/use-auth";

const variantSchema = z.object({
  attributes: z
    .array(
      z.object({
        attributeId: z.string().min(1, "Attribute is required"),
        value: z.string().min(1, "Value is required"),
      })
    )
    .min(1, "At least one attribute is required"),
  quantity: z.number().min(0, "Quantity must be non-negative"),
  rate: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Rate must be a valid number",
    })
    .transform(Number),
  mrp: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "MRP must be a valid number",
    })
    .transform(Number),
  discount: z.number().min(0).max(100),
});

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  categoryId: z.string().min(1, "Category is required"),
  subCategoryId: z.string().optional(),
  brandId: z.string().min(1, "Brand is required"),
  status: z.string().min(1, "Status is required"),
  files: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required")
    .max(5, "Maximum 5 images allowed"),
  featureImg: z.any(),
  // .refine((files) => files?.length === 1, "Image is required.")
  // .refine(
  //   async (files) => {
  //     if (!files?.[0]) return false;
  //     const result = await validateSingleImage(files[0]);
  //     return result.isValid ;
  //   },
  //   {
  //     message:
  //       "Invalid image. Must be a square image between 200x200 and 1200x1200 pixels, and less than 2MB.",
  //   }
  // ),
  variants: z.array(variantSchema).min(1, "At least one variant is required"),
  isFeatured: z.boolean(),
});

export default function CreateProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [category, setCategory] = useState<CategoryData | null>(null);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [attributes, setAttributes] = useState<IAttribute[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [featureImg, setFeatureImg] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredAttributes, setFilteredAttributes] = useState(attributes);
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string;
  }>({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      subCategoryId: "",
      brandId: "",
      status: "",
      files: [],
      featureImg: undefined,
      variants: [],
      isFeatured: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const { data: attributesData } = useQuery({
    queryKey: ["attributes"],
    queryFn: async () => {
      return await getAttributes();
    },
  });

  useEffect(() => {
    if (attributesData) {
      setAttributes(attributesData.data);
    }
  }, [attributesData]);

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return await getCategories();
    },
  });

  const { data: subCategoriesData } = useQuery({
    queryKey: ["subCategories", category?._id],
    queryFn: async () => {
      return await getSubCategories(category?._id);
    },
    enabled: !!category?._id,
  });

  const { data: brandsData } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      return await getBrands();
    },
  });

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData.data.data);
    }
  }, [categoriesData]);

  useEffect(() => {
    if (subCategoriesData) {
      setSubCategories(subCategoriesData.data);
    }
  }, [subCategoriesData]);

  useEffect(() => {
    if (brandsData) {
      setBrands(brandsData.data);
    }
  }, [brandsData]);

  const handleAttributeSelect = (attributeId: string, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeId]: value,
    }));
  };

  const handleAddVariant = () => {
    const attributes = Object.entries(selectedAttributes).map(
      ([attributeId, value]) => ({
        attributeId,
        value,
      })
    );

    if (attributes.length === 0) {
      toast.error("Please select at least one attribute");
      return;
    }

    append({
      attributes,
      quantity: 0,
      mrp: 0,
      rate: 0,
      discount: 0,
    });

    // Reset selected attributes
    setSelectedAttributes({});
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: async (data: FormData) => {
      return await createProduct(data);
    },
    onSuccess: () => {
      toast.success("Product created successfully");
      form.reset();
      setImages([]);
      setFeatureImg(null);
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files);
      // const result = await validateMultipleImages(newImages);

      // if (!result.isValid) {
      //   toast.error("Invalid Images");
      //   e.target.value = "";
      //   return;
      // }

      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...newImages];
        if (updatedImages.length > 5) {
          toast.error("Maximum 5 images allowed");
          return prevImages;
        }
        form.setValue("files", updatedImages);
        return updatedImages;
      });
    }
  };

  const handleFeatureImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      // const file = e.target.files[0];
      // const result = await validateSingleImage(file);

      // if (!result.isValid) {
      //   toast.error("Invalid Image");
      //   e.target.value = "";
      //   return;
      // }

      form.setValue("featureImg", e.target.files);
    }
  };

  const { isVendor } = useAuth();

  const removeImage = (index: number) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      form.setValue("files", newImages);
      return newImages;
    });
  };

  const calculateDiscount = (mrp: number, rate: number) => {
    if (mrp > 0 && rate > 0) {
      const discountPercentage = ((mrp - rate) / mrp) * 100;
      return Math.round(discountPercentage * 100) / 100; // Round to 2 decimal places
    }
    return 0;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();

      // Handle file uploads
      values.files.forEach((file, index) => {
        formData.append("files", file);
      });

      // Set the feature image
      if (values.featureImg) {
        formData.append("file", values.featureImg[0]);
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
      formData.append("isFeatured", values.isFeatured ? "true" : "false");

      // Handle variants
      formData.append("variants", JSON.stringify(values.variants));

      // Use the mutate function to send the data
      mutate(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        "An error occurred while submitting the form. Please try again."
      );
    }
  }

  const breadcrumbItems = [
    { title: "Products", link: "/dashboard/product" },
    { title: "Add Product", link: "/dashboard/product/new" },
  ];

  useEffect(() => {
    const filtered = attributes.filter((attribute) => {
      const nameMatches = attribute.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const valueMatches = attribute.values.some((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return nameMatches || valueMatches;
    });
    setFilteredAttributes(filtered);
  }, [attributes, searchTerm]);
  const handleSuggestionClick = (attribute: IAttribute) => {
    setSearchTerm(attribute.name); // Autofill search term with clicked suggestion
    setFilteredAttributes([attribute]); // Show only the selected attribute
  };

  return (
    <ScrollArea className="h-full">
      <BreadCrumb items={breadcrumbItems} />
      <div className="container mx-auto">
        <Card className="max-w-5xl mx-auto">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Create Product
              </h2>
            </div>
            <Separator />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
                          }}
                          value={field.value}
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
                          value={field.value}
                          disabled={!category}
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

                  <FormField
                    control={form.control}
                    name="brandId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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

                  {isVendor == false && (
                    <FormField
                      control={form.control}
                      name="isFeatured"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Featured Product?</FormLabel>
                            <FormDescription>
                              Displays the product as a featured item on the
                              landing page and in the application&apos;s
                              featured section.
                              {/* <span className="text-sm text-red-500 block">
                                You can select a maximum of 3 featured images.
                              </span> */}
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
                  )}
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
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Product Variants</h3>
                  {/* <div className="space-y-4">
      <Input 
        type="text" 
        placeholder="Search attributes or values..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        className="mb-4" 
      />
      {filteredAttributes.length > 0 ? ( 
        <ScrollArea className="h-[400px] pr-4">
          {filteredAttributes.map((attribute) => (
            <Card key={attribute._id} className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">{attribute.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {attribute.values.map((value) => (
                    <Badge 
                      key={value} 
                      variant={selectedAttributes[attribute._id] === value ? "default" : "outline"} 
                      className="cursor-pointer" 
                      onClick={() => handleAttributeSelect(attribute._id, value)}
                    >
                      {value}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      ) : (
        <div>No matching attributes found.</div> 
      )}
      <Button 
        type="button" 
        variant="outline" 
        size="sm" 
        onClick={handleAddVariant} 
        className="mt-4"
      >
        Add Variant with Selected Attributes
      </Button>
    </div> */}

                  <div className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Search attributes or values..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="mb-4"
                    />

                    {searchTerm.trim() && (
                      <div className="absolute z-10 bg-white border rounded shadow-md max-h-60 overflow-y-auto w-6/12 mt-1">
                        {filteredAttributes.length > 0 ? (
                          filteredAttributes.map((attribute) => (
                            // <div
                            //   key={attribute._id}
                            //   className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            //   onClick={() => handleSuggestionClick(attribute)}
                            // >
                            //   {attribute.name}
                            // </div>
                            <></>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-gray-500">
                            No matching attributes found.
                          </div>
                        )}
                      </div>
                    )}
                    {searchTerm.trim() && filteredAttributes.length > 0 ? (
                      <ScrollArea className="h-[150px] pr-4">
                        {filteredAttributes.map((attribute) => (
                          <Card key={attribute._id} className="mb-4">
                            <CardHeader>
                              <CardTitle className="text-lg">
                                {attribute.name}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-wrap gap-2">
                                {attribute.values.map((value) => (
                                  <Badge
                                    key={value}
                                    variant={
                                      selectedAttributes[attribute._id] ===
                                      value
                                        ? "soft"
                                        : "outline"
                                    }
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleAttributeSelect(
                                        attribute._id,
                                        value
                                      )
                                    }
                                  >
                                    {value}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </ScrollArea>
                    ) : searchTerm.trim() && filteredAttributes.length === 0 ? (
                      <div>No matching attributes found.</div>
                    ) : null}

                    {searchTerm.trim() && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleAddVariant}
                        className="mt-4"
                      >
                        Add Variant with Selected Attributes
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {fields.map((field, index) => (
                      <Card key={field.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium">Variant {index + 1}</h4>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => remove(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                              {field.attributes.map((attr, attrIndex) => {
                                const attribute = attributes.find(
                                  (a) => a._id === attr.attributeId
                                );
                                return (
                                  <Badge key={attrIndex}>
                                    {attribute?.name}: {attr.value}
                                  </Badge>
                                );
                              })}
                            </div>
                            <FormField
                              control={form.control}
                              name={`variants.${index}.quantity`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Quantity</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(parseInt(e.target.value))
                                      }
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
                                  <FormLabel>
                                    MRP (Enter the Maximum Retail Price.)
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="0.00"
                                      {...field}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        const mrp = parseFloat(e.target.value);
                                        const rate = form.getValues(
                                          `variants.${index}.rate`
                                        );
                                        const discount = calculateDiscount(
                                          mrp,
                                          rate
                                        );
                                        form.setValue(
                                          `variants.${index}.discount`,
                                          discount
                                        );
                                      }}
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
                                  <FormLabel>
                                    Rate (Enter the selling price of the
                                    product.)
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="0.00"
                                      {...field}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        const rate = parseFloat(e.target.value);
                                        const mrp = form.getValues(
                                          `variants.${index}.mrp`
                                        );
                                        const discount = calculateDiscount(
                                          mrp,
                                          rate
                                        );
                                        form.setValue(
                                          `variants.${index}.discount`,
                                          discount
                                        );
                                      }}
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
                                    <Input type="number" {...field} readOnly />
                                  </FormControl>
                                  <FormDescription>
                                    Automatically calculated discount.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormLabel htmlFor="picture">Product Images</FormLabel>
                    <Input
                      id="picture"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <FormDescription>
                      Upload up to 5 product images
                    </FormDescription>
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 lg:grid-cols-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative aspect-square">
                          <Image
                            src={URL.createObjectURL(image)}
                            alt={`Product ${index + 1}`}
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
                  )}
                </div>

                <div className="space-y-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="featureImg"
                      render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                          <FormLabel>Feature Image</FormLabel>
                          <FormControl>
                            <div className="space-y-4">
                              <Input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleFeatureImageUpload}
                                {...field}
                              />
                              {value?.[0] && (
                                <div className="relative aspect-square w-48 overflow-hidden rounded-lg border">
                                  <Image
                                    src={URL.createObjectURL(value[0])}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormDescription>
                            Upload a square product image (200x200px to
                            1200x1200px, max 2MB)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/dashboard/products")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Product"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </Card>
      </div>
    </ScrollArea>
  );
}
