// "use client";

// import { Switch } from "@/components/ui/switch";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Icon } from "@iconify/react";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useRouter } from "next/navigation";
// import { ProductData } from "@/types";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { approvedProduct, changeProductStatus } from "@/lib/http/api";
// import toast from "react-hot-toast";
// import { AxiosError } from "axios";
// import DeleteProduct from "./delete-product";
// import { useAuth } from "@/hooks/use-auth";

// interface Props {
//   data: ProductData[];
// }

// const ProductTable = ({ data }: Props) => {
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   const { mutate, isPending } = useMutation({
//     mutationKey: ["changeProductStatus"],
//     mutationFn: async (id: string) => {
//       return await changeProductStatus(id);
//     },
//     onSuccess: (data) => {
//       toast.success(data.data.message);
//       return queryClient.invalidateQueries({ queryKey: ["getProducts"] });
//     },
//     onError(error, variables, context) {
//       if (error instanceof AxiosError) {
//         toast.error(error.response?.data.errors[0].msg);
//       } else {
//         toast.error("Something went wrong!");
//       }
//     },
//   });

//   const { mutate: mutateApprove, isPending: pending } = useMutation({
//     mutationKey: ["approvedProduct"],
//     mutationFn: async (id: string) => {
//       return await approvedProduct(id);
//     },
//     onSuccess: (data) => {
//       toast.success(data.data.message);
//       return queryClient.invalidateQueries({ queryKey: ["getProducts"] });
//     },
//     onError(error, variables, context) {
//       if (error instanceof AxiosError) {
//         toast.error(error.response?.data.errors[0].msg);
//       } else {
//         toast.error("Something went wrong!");
//       }
//     },
//   });

//   const { isVendor } = useAuth();

//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead className="font-semibold">Name</TableHead>
//           <TableHead>Category</TableHead>
//           <TableHead>Created By</TableHead>
//           <TableHead>Created At</TableHead>
//           <TableHead>Status</TableHead>
//           {!isVendor && <TableHead>isApproved</TableHead>}
//           <TableHead>Action</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {data.map((item: ProductData) => (
//           <TableRow key={item._id}>
//             <TableCell className=" font-medium  text-card-foreground/80">
//               <div className="flex gap-3 items-center">
//                 <Avatar className="rounded-full">
//                   <AvatarImage src={item.featureImg} />
//                   <AvatarFallback>AB</AvatarFallback>
//                 </Avatar>
//                 <span className=" text-sm   text-card-foreground">
//                   {item.name}
//                 </span>
//               </div>
//             </TableCell>

//             <TableCell>{item.categoryId.name}</TableCell>
//             <TableCell>
//               {item.createdBy.firstName + " " + item.createdBy.lastName}
//             </TableCell>
//             <TableCell>{new Date(item.createdAt).toDateString()}</TableCell>

//             <TableCell>
//               <Switch
//                 checked={item.status === "active"}
//                 disabled={isPending}
//                 onCheckedChange={() => mutate(item._id)}
//                 aria-label={`Toggle status for ${item.name}`}
//               />
//             </TableCell>
//             {!isVendor && (
//               <TableCell>
//                 <Button
//                   onClick={() => mutateApprove(item._id)}
//                   variant="soft"
//                   color={item.isApproved ? "success" : "destructive"}
//                   size="sm"
//                   disabled={pending}
//                 >
//                   {item.isApproved ? "Approved" : "Unapproved"}
//                 </Button>
//               </TableCell>
//             )}
//             <TableCell className="flex">
//               <div className="flex gap-3">
//                 <Button
//                   size="icon"
//                   variant="outline"
//                   color="secondary"
//                   className=" h-7 w-7"
//                   onClick={() =>
//                     router.push(`/dashboard/product/update?id=${item._id}`)
//                   }
//                 >
//                   <Icon icon="heroicons:pencil" className=" h-4 w-4  " />
//                 </Button>
//                 <Button
//                   size="icon"
//                   variant="outline"
//                   className=" h-7 w-7"
//                   color="secondary"
//                   onClick={() =>
//                     router.push(`/dashboard/product/view?id=${item._id}`)
//                   }
//                 >
//                   <Icon icon="heroicons:eye" className="h-4 w-4" />
//                 </Button>
//                 <DeleteProduct id={item._id} name={item.name} />
//               </div>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

// export default ProductTable;

"use client";

import { Switch } from "@/components/ui/switch";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import type { ProductData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approvedProduct, changeProductStatus } from "@/lib/http/api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import DeleteProduct from "./delete-product";
import { useAuth } from "@/hooks/use-auth";

interface Props {
  data: ProductData[];
  isLoading: boolean;
  page: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  totalProducts: number;
}

const ProductTable = ({
  data,
  isLoading,
  page,
  setPage,
  rowsPerPage,
  totalProducts,
}: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isVendor } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationKey: ["changeProductStatus"],
    mutationFn: async (id: string) => {
      return await changeProductStatus(id);
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      return queryClient.invalidateQueries({ queryKey: ["getProductsDash"] });
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.errors[0].msg);
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  const { mutate: mutateApprove, isPending: pending } = useMutation({
    mutationKey: ["approvedProduct"],
    mutationFn: async (id: string) => {
      return await approvedProduct(id);
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      return queryClient.invalidateQueries({ queryKey: ["getProductsDash"] });
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.errors[0].msg);
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  const totalPages = Math.ceil(totalProducts / rowsPerPage);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
            {!isVendor && <TableHead>isApproved</TableHead>}
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No products found
              </TableCell>
            </TableRow>
          ) : (
            data.map((item: ProductData) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium text-card-foreground/80">
                  <div className="flex gap-3 items-center">
                    <Avatar className="rounded-full">
                      <AvatarImage src={item.featureImg} />
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-card-foreground">
                      {item.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{item.categoryId.name}</TableCell>
                <TableCell>
                  {item.createdBy.firstName + " " + item.createdBy.lastName}
                </TableCell>
                <TableCell>{new Date(item.createdAt).toDateString()}</TableCell>
                <TableCell>
                  <Switch
                    checked={item.status === "active"}
                    disabled={isPending}
                    onCheckedChange={() => mutate(item._id)}
                    aria-label={`Toggle status for ${item.name}`}
                  />
                </TableCell>
                {!isVendor && (
                  <TableCell>
                    <Button
                      onClick={() => mutateApprove(item._id)}
                      variant="soft"
                      color={item.isApproved ? "success" : "destructive"}
                      size="sm"
                      disabled={pending}
                    >
                      {item.isApproved ? "Approved" : "Unapproved"}
                    </Button>
                  </TableCell>
                )}
                <TableCell className="flex">
                  <div className="flex gap-3">
                    <Button
                      size="icon"
                      variant="outline"
                      color="secondary"
                      className="h-7 w-7"
                      onClick={() =>
                        router.push(`/dashboard/product/update?id=${item._id}`)
                      }
                    >
                      <Icon icon="heroicons:pencil" className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-7 w-7"
                      color="secondary"
                      onClick={() =>
                        router.push(`/dashboard/product/view?id=${item._id}`)
                      }
                    >
                      <Icon icon="heroicons:eye" className="h-4 w-4" />
                    </Button>
                    <DeleteProduct id={item._id} name={item.name} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between p-4">
        <div>
          Showing {(page - 1) * rowsPerPage + 1} to{" "}
          {Math.min(page * rowsPerPage, totalProducts)} of {totalProducts}{" "}
          products
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
