"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IAttribute } from "@/types";
import DeleteAttribute from "./delete-attribute";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  data: IAttribute[];
}

const AttributeTable = ({ data }: PageProps) => {
  const router = useRouter();

  const formatValues = (values: string[]) => {
    if (values.length <= 3) {
      return (
        <div className="flex flex-wrap gap-1">
          {values.map((value, index) => (
            <Badge key={index} variant="outline">
              {value}
            </Badge>
          ))}
        </div>
      );
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex flex-wrap gap-1">
              {values.slice(0, 2).map((value, index) => (
                <Badge key={index} variant="outline">
                  {value}
                </Badge>
              ))}
              <Badge variant="outline">+{values.length - 2} more</Badge>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex flex-wrap gap-1 max-w-[200px]">
              {values.map((value, index) => (
                <Badge key={index} variant="outline">
                  {value}
                </Badge>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold">Name</TableHead>
          <TableHead>Values</TableHead>
          <TableHead>Created By</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: IAttribute) => (
          <TableRow key={item._id}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{formatValues(item.values)}</TableCell>
            <TableCell>
              {item.createdBy.firstName + " " + item.createdBy.lastName}
            </TableCell>
            <TableCell>{new Date(item.createdAt).toDateString()}</TableCell>
            <TableCell>
              <div className="flex gap-3">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  onClick={() =>
                    router.push(`/dashboard/attributes/update?id=${item._id}`)
                  }
                >
                  <Icon icon="heroicons:pencil" className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() =>
                    router.push(`/dashboard/attributes/view?id=${item._id}`)
                  }
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                >
                  <Icon icon="heroicons:eye" className="h-4 w-4" />
                </Button>
                <DeleteAttribute id={item._id} name={item.name} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AttributeTable;
