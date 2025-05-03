"use client";

import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ILocation } from "@/types";
import DeleteLocation from "./delete-location";

interface Props {
  data: ILocation[];
}

const LocationTable = ({ data }: Props) => {
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold">Location</TableHead>
          <TableHead>Min. Order Amount(₹  )</TableHead>
          <TableHead>Delivery Charges</TableHead>
          <TableHead>Est. Delivery Time</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Active</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: ILocation) => (
          <TableRow key={item._id}>
            <TableCell className="">{item.formatted_address}</TableCell>

            <TableCell>{item.minOrderAmount}</TableCell>
            <TableCell>{item.deliveryCharge}</TableCell>
            <TableCell>{item.estDeliveryTime}</TableCell>

            <TableCell>{new Date(item.createdAt).toDateString()}</TableCell>
            <TableCell className="flex">
              <div className="flex gap-3">
                <Button
                  onClick={() =>
                    router.push(`/dashboard/location/update?id=${item._id}`)
                  }
                  size="icon"
                  variant="outline"
                  color="secondary"
                  className=" h-7 w-7"
                >
                  <Icon icon="heroicons:pencil" className=" h-4 w-4  " />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className=" h-7 w-7"
                  color="secondary"
                  onClick={() =>
                    router.push(`/dashboard/location/view?id=${item._id}`)
                  }
                >
                  <Icon icon="heroicons:eye" className="h-4 w-4" />
                </Button>
                <DeleteLocation id={item._id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LocationTable;
