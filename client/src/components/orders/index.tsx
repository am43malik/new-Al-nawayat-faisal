"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrdersTable from "./orders-table";
import { useEffect, useState } from "react";
import { getRecentOrders } from "@/lib/http/api";
import { useQuery } from "@tanstack/react-query";
import { Order } from "@/types";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["getRecentOrders"],
    queryFn: async () => {
      return await getRecentOrders().then((res) => res.data);
    },
  });

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  return (
    <Card>
      <CardHeader className="mb-0 p-6">
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <OrdersTable orders={orders} />
      </CardContent>
    </Card>
  );
};

export default Orders;
