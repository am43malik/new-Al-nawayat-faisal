import CreateOrder from "@/components/orders/create/create-order";
import BreadCrumb from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const breadcrumbItems = [
    { title: "Orders", link: "/dashboard/order" },
    { title: "Create Order", link: "/dashboard/order/create" },
  ];

  return (
    <ScrollArea className="h-full">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex-1 space-y-4 py-5">
        <CreateOrder />
      </div>
    </ScrollArea>
  );
}
