// "use client";
// import * as React from "react";

// import {
//   ColumnDef,
//   ColumnFiltersState,
//   RowSelectionState,
//   SortingState,
//   VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Icon } from "@iconify/react";
// import { cn } from "@/lib/utils";
// import { Order } from "@/types";

// interface Props {
//   orders: Order[];
// }

// const columns: ColumnDef<Order>[] = [
//   {
//     accessorKey: "invoice",
//     header: "Invoice",
//     cell: ({ row }) => <span>{row.getValue("invoice")}</span>,
//   },
//   {
//     accessorKey: "username",
//     header: "Username",
//     cell: ({ row }) => (
//       <span className="whitespace-nowrap">{row.getValue("username")}</span>
//     ),
//   },
//   {
//     accessorKey: "date",
//     header: "Date",
//     cell: ({ row }) => (
//       <span className="whitespace-nowrap">{row.getValue("date")}</span>
//     ),
//   },
//   {
//     accessorKey: "amount",
//     header: "Amount",
//     cell: ({ row }) => <span>{row.getValue("amount")}</span>,
//   },
//   {
//     accessorKey: "isComplete",
//     header: "Order Status",
//     cell: ({ row }) => (
//       <div className="whitespace-nowrap">
//         {row.getValue("isComplete") === true ? (
//           <span className="inline-block px-3 py-[2px] rounded-2xl bg-success/10 text-xs text-success">
//             Completed
//           </span>
//         ) : (
//           <span className="inline-block px-3 py-[2px] rounded-2xl bg-warning/10 text-xs text-warning">
//             {" "}
//             Pending
//           </span>
//         )}
//       </div>
//     ),
//   },
// ];

// const OrdersTable = ({ orders }: Props) => {
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   );
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({});
//   const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

//   const table = useReactTable({
//     orders,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   });

//   return (
//     <>
//       <div className=" overflow-x-auto ">
//         <div className="h-full w-full overflow-auto no-scrollbar">
//           <Table>
//             <TableHeader className="bg-default-300">
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <TableRow key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => {
//                     return (
//                       <TableHead
//                         key={header.id}
//                         className="text-sm font-semibold text-default-600 h-12 last:text-end whitespace-nowrap"
//                       >
//                         {header.isPlaceholder
//                           ? null
//                           : flexRender(
//                               header.column.columnDef.header,
//                               header.getContext()
//                             )}
//                       </TableHead>
//                     );
//                   })}
//                 </TableRow>
//               ))}
//             </TableHeader>
//             <TableBody className="[&_tr:last-child]:border-1">
//               {table.getRowModel().rows?.length ? (
//                 table.getRowModel().rows.map((row) => (
//                   <TableRow
//                     key={row.id}
//                     data-state={row.getIsSelected() && "selected"}
//                     className="hover:bg-default-50 border-default-200"
//                   >
//                     {row.getVisibleCells().map((cell) => (
//                       <TableCell
//                         key={cell.id}
//                         className="text-sm text-default-600 py-3 last:text-end "
//                       >
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext()
//                         )}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={columns.length}
//                     className="h-24 text-center"
//                   >
//                     No results.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </div>

//       <div className="flex justify-center  items-center gap-2 mt-5">
//         <Button
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//           className="w-7 h-7 p-0 bg-default-100 hover:bg-default-200 text-default-600"
//         >
//           <Icon
//             icon="heroicons:chevron-left"
//             className="w-3.5 h-3.5 rtl:rotate-180 "
//           />
//         </Button>

//         {table.getPageOptions().map((page, pageIdx) => (
//           <Button
//             onClick={() => table.setPageIndex(pageIdx)}
//             key={`orders-table-${pageIdx}`}
//             className={cn(
//               "w-7 h-7 p-0 bg-default-100 hover:bg-default-200 text-default-600",
//               {
//                 "bg-primary text-primary-foreground":
//                   pageIdx === table.getState().pagination.pageIndex,
//               }
//             )}
//           >
//             {page + 1}
//           </Button>
//         ))}

//         <Button
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//           className="w-7 h-7 p-0 bg-default-100 hover:bg-default-200 text-default-600"
//         >
//           <Icon
//             icon="heroicons:chevron-right"
//             className="w-3.5 h-3.5 rtl:rotate-180"
//           />
//         </Button>
//       </div>
//     </>
//   );
// };

// export default OrdersTable;

"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { Order } from "@/types";

interface Props {
  orders: Order[];
}

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "refId",
    header: "Order ID",
    cell: ({ row }) => <span>{row.getValue("refId")}</span>,
  },
  {
    accessorKey: "orderBy.name",
    header: "Customer",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {row.original.orderBy.firstName + " " + row.original.orderBy.lastName}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: "Amount",
    cell: ({ row }) => <span>₹  {row.getValue("totalAmount")}</span>,
  },
  {
    accessorKey: "status",
    header: "Order Status",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {row.getValue("status") === "Completed" ? (
          <span className="inline-block px-3 py-[2px] rounded-2xl bg-success/10 text-xs text-success">
            Completed
          </span>
        ) : (
          <span className="inline-block px-3 py-[2px] rounded-2xl bg-warning/10 text-xs text-warning">
            Pending
          </span>
        )}
      </div>
    ),
  },
];

const OrdersTable = ({ orders }: Props) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const table = useReactTable({
    data: orders, // ✅ Fixed incorrect key (`orders` → `data`)
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="overflow-x-auto">
        <div className="h-full w-full overflow-auto no-scrollbar">
          <Table>
            <TableHeader className="bg-default-300">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-sm font-semibold text-default-600 h-12 last:text-end whitespace-nowrap"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="[&_tr:last-child]:border-1">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-default-50 border-default-200"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="text-sm text-default-600 py-3 last:text-end"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 mt-5">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="w-7 h-7 p-0 bg-default-100 hover:bg-default-200 text-default-600"
        >
          <Icon
            icon="heroicons:chevron-left"
            className="w-3.5 h-3.5 rtl:rotate-180"
          />
        </Button>

        {table.getPageOptions().map((page, pageIdx) => (
          <Button
            onClick={() => table.setPageIndex(pageIdx)}
            key={`orders-table-${pageIdx}`}
            className={cn(
              "w-7 h-7 p-0 bg-default-100 hover:bg-default-200 text-default-600",
              {
                "bg-primary text-primary-foreground":
                  pageIdx === table.getState().pagination.pageIndex,
              }
            )}
          >
            {page + 1}
          </Button>
        ))}

        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="w-7 h-7 p-0 bg-default-100 hover:bg-default-200 text-default-600"
        >
          <Icon
            icon="heroicons:chevron-right"
            className="w-3.5 h-3.5 rtl:rotate-180"
          />
        </Button>
      </div>
    </>
  );
};

export default OrdersTable;
