"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";

import type { Product } from "@prisma/client";
import {
  Check,
  Download,
  Edit,
  LoaderCircle,
  RefreshCw,
  Trash,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { Skeleton } from "~/components/ui/skeleton";

interface DataTableProps<TData extends Product, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  reftech: () => Promise<void>;
  isRefetching: boolean;
}

export function ProductTable<TData extends Product, TValue>({
  columns,
  data,
  reftech,
  isRefetching,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [alertDialogOpen, setAlertDialogOpen] = React.useState(false);

  const utils = api.useUtils();
  const updateProductsMutation = api.product.updateProductsByIds.useMutation({
    onSuccess: async (product) => {
      await utils.product.invalidate();

      toast("Products updated successfully", {
        description: `${product.count} products updated`,
        icon: <Check className="mr-2 size-4" />,
      });
    },
    onError: (error) => {
      toast("Failed to update products", {
        description: error.message,
        icon: <X className="mr-2 size-4" />,
      });
    },
  });
  const deleteProductsMutation = api.product.deleteProductsByIds.useMutation({
    onSuccess: async () => {
      await utils.product.invalidate();

      toast("Products deleted successfully", {
        description: `${Object.keys(rowSelection).length} products deleted`,
        icon: <Check className="mr-2 size-4" />,
      });
    },
    onError: (error) => {
      toast("Failed to delete products", {
        description: error.message,
        icon: <X className="mr-2 size-4" />,
      });
    },
  });

  const isLoading =
    updateProductsMutation.isPending || deleteProductsMutation.isPending;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.id,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4 py-4 md:gap-0">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Columns</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          {data.length === 0 && (
            <Button variant="outline" onClick={reftech} disabled={isRefetching}>
              <RefreshCw
                className={cn(isRefetching && "animate-spin", "mr-2 size-4")}
              />
              {isRefetching ? "Refreshing..." : "Refresh"}
            </Button>
          )}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
                  {isRefetching ? (
                    <Skeleton className="h-48 w-full md:h-96" />
                  ) : (
                    "No results. Try refreshing the page."
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div
        className={cn(
          table.getFilteredSelectedRowModel().rows.length > 0
            ? "flex-col"
            : "flex-row items-center justify-between",
          "flex py-4 gap-4 md:flex-row md:items-center md:justify-between md:gap-0",
        )}
      >
        <div className="flex justify-between md:block">
          <p className="text-sm text-muted-foreground">
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()} Pages
          </p>
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <div className="text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
          )}
        </div>
        <div className="flex items-center w-full md:w-fit overflow-y-auto gap-2">
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.toggleAllRowsSelected(false)}
              >
                Clear Selection
              </Button>
              {table.getFilteredSelectedRowModel().rows.length !==
                table.getFilteredRowModel().rows.length && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.toggleAllRowsSelected(true)}
                >
                  Select All Rows
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild disabled={isLoading}>
                  <Button variant="outline" size="sm">
                    {isLoading && (
                      <LoaderCircle className="mr-2 size-4 animate-spin" />
                    )}
                    {updateProductsMutation.isPending
                      ? "Updating..."
                      : deleteProductsMutation.isPending
                        ? "Deleting..."
                        : "More Actions"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    Actions for{" "}
                    {table.getFilteredSelectedRowModel().rows.length} row(s)
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Download className="mr-2 size-4" />
                      Export
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>PDF</DropdownMenuItem>
                        <DropdownMenuItem>CSV</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Edit className="mr-2 size-4" />
                      Update Status
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem
                          onClick={() =>
                            updateProductsMutation.mutate({
                              ids: table
                                .getFilteredSelectedRowModel()
                                .rows.map((row) => row.id),
                              product: {
                                isApproved: true,
                              },
                            })
                          }
                        >
                          Approved
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            updateProductsMutation.mutate({
                              ids: table
                                .getFilteredSelectedRowModel()
                                .rows.map((row) => row.id),
                              product: {
                                isApproved: false,
                              },
                            })
                          }
                        >
                          Unpproved
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem onClick={() => setAlertDialogOpen(true)}>
                    <Trash className="mr-2 size-4" />
                    Delete Rows
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <AlertDialog
                open={alertDialogOpen}
                onOpenChange={setAlertDialogOpen}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will{" "}
                      <span className="font-bold text-primary">
                        permanently delete{" "}
                        {table.getFilteredSelectedRowModel().rows.length}{" "}
                        product data from servers.
                      </span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="text-white dark:bg-destructive/80 dark:hover:bg-destructive/100"
                      onClick={() =>
                        deleteProductsMutation.mutate({
                          ids: table
                            .getFilteredSelectedRowModel()
                            .rows.map((row) => row.id),
                        })
                      }
                    >
                      <Trash className="mr-2 size-4" /> Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
