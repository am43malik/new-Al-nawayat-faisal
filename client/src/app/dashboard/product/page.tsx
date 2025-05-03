"use client";

import React, { useState } from "react";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import ProductTable from "@/components/product/product-table";
import { useRouter } from "next/navigation";
import { getProductsDash, searchProducts } from "@/lib/http/api";
import { useQuery } from "@tanstack/react-query";
import { ProductData } from "@/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Page = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const { data, isLoading } = useQuery({
    queryKey: ["getProductsDash", page, rowsPerPage],
    queryFn: async () => {
      return await getProductsDash(page, rowsPerPage).then((res) => res.data);
    },
  });

  const { data: searchData, isLoading: searchLoading } = useQuery({
    queryKey: ["searchProducts", search, filter],
    queryFn: async () => {
      return await searchProducts(search, filter).then((res) => res.data);
    },
    enabled: !!search || filter !== "all",
  });

  const router = useRouter();

  const breadcrumbItems = [{ title: "Products", link: "/dashboard/product" }];

  const products =
    search || filter !== "all" ? searchData?.products : data?.products;
  const totalProducts =
    search || filter !== "all" ? searchData?.total : data?.total;

  return (
    <div>
      <div className="flex items-center justify-between py-5">
        <BreadCrumb items={breadcrumbItems} />
        <Button onClick={() => router.push(`/dashboard/product/new`)}>
          <Plus className="w-4 h-4 text-primary-foreground mr-1" />
          Add Product
        </Button>
      </div>
      <Card>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64"
            />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="unapproved">Unapproved</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <Select
              value={rowsPerPage.toString()}
              onValueChange={(value) => setRowsPerPage(Number(value))}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <ProductTable
          data={products || []}
          isLoading={isLoading || searchLoading}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          totalProducts={totalProducts || 0}
        />
      </Card>
    </div>
  );
};

export default Page;
