// "use client";

// import OrdersTableMain from "@/components/orders/order-table-main";
// import BreadCrumb from "@/components/ui/breadcrumb";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { getAllOrders } from "@/lib/http/api";
// import { Order } from "@/types";
// import { useQuery } from "@tanstack/react-query";
// import { Plus } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const breadcrumbItems = [{ title: "Order", link: "/dashboard/order" }];

// export default function Page() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const router = useRouter();

//   const { data, isLoading } = useQuery({
//     queryKey: ["getOrders"],
//     queryFn: async () => {
//       return await getAllOrders().then((res) => res.data);
//     },
//   });

//   useEffect(() => {
//     if (data) {
//       setOrders(data);
//     }
//   }, [data]);

//   return (
//     <>
//       <div className="flex items-center justify-between py-5">
//         <BreadCrumb items={breadcrumbItems} />
//         <Button onClick={() => router.push("/dashboard/order/new")}>
//           <Plus className="w-4 h-4 text-primary-foreground mr-1" />
//           Create New Order
//         </Button>
//       </div>
//       <Card title="Orders">
//         <OrdersTableMain data={orders} />
//       </Card>
//     </>
//   );
// }

"use client";

import { OrderFilters } from "@/components/orders/order-filters";
import OrdersTableMain from "@/components/orders/order-table-main";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllOrders } from "@/lib/http/api";
import type { Order } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const breadcrumbItems = [{ title: "Order", link: "/dashboard/order" }];

export default function Page() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["getOrders", selectedStatus],
    queryFn: async () => {
      return await getAllOrders(selectedStatus).then((res) => res.data);
    },
  });

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  return (
    <>
      <div className="flex items-center justify-between py-5">
        <BreadCrumb items={breadcrumbItems} />
        <Button onClick={() => router.push("/dashboard/order/new")}>
          <Plus className="w-4 h-4 text-primary-foreground mr-1" />
          Create New Order
        </Button>
      </div>
      <Card>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Orders</h2>
            <OrderFilters
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
            />
          </div>
        </div>
        <OrdersTableMain data={orders} />
      </Card>
    </>
  );
}
