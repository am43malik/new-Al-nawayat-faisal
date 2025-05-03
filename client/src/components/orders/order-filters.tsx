"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OderStatus } from "@/constants";
import { ChevronDown } from "lucide-react";

const orderStatuses = [
  { label: "All", value: "" },
  { label: "Dispatch", value: OderStatus.DISPATCH },
  { label: "In Transit", value: OderStatus.INTRANSIT },
  { label: "Out for Delivery", value: OderStatus.OUT_FOR_DELIVERY },
  { label: "Request for Delivery", value: OderStatus.REQUEST_FOR_DELIVERY },
  { label: "Delivered", value: OderStatus.DELIVERED },
  { label: "Completed", value: OderStatus.COMPLETED },
  { label: "Cancelled", value: OderStatus.CANCELLED },
  { label: "Returned", value: OderStatus.RETURNED },
  { label: "Refunded", value: OderStatus.REFUNDED },
];

interface OrderFiltersProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

export function OrderFilters({
  selectedStatus,
  onStatusChange,
}: OrderFiltersProps) {
  const activeStatus =
    orderStatuses.find((status) => status.value === selectedStatus)?.label ||
    "All Orders";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[180px] justify-between">
          {activeStatus}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px]">
        <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {orderStatuses.map((status) => (
          <DropdownMenuItem
            key={status.value}
            onClick={() => onStatusChange(status.value)}
          >
            {status.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
