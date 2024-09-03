"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import {
	ArrowDown01,
	ArrowDown10,
	ArrowDownAZ,
	ArrowDownZA,
	CalendarArrowDown,
	CalendarArrowUp,
	Check,
	ClockArrowDown,
	ClockArrowUp,
	Edit,
	LoaderCircle,
	PackageCheck,
	PackageX,
	Trash,
	Wrench,
	X,
} from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import type { ProductWithAuthor } from "types";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { generateFallbackName } from "~/lib/string";

import { useState } from "react";
import { toast } from "sonner";
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
import { Checkbox } from "~/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { api } from "~/trpc/react";

export const productColumns: ColumnDef<ProductWithAuthor>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "logo_url",
		header: "Logo",
		cell: ({ row }) => (
			<Avatar>
				<AvatarImage
					src={row.original.logo_url ?? ""}
					className="object-contain object-center"
				/>
				<AvatarFallback>
					{generateFallbackName(row.original.name)}
				</AvatarFallback>
			</Avatar>
		),
	},
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Name
					{column.getIsSorted() === "asc" ? (
						<ArrowDownAZ className="ml-2 size-4" />
					) : (
						<ArrowDownZA className="ml-2 size-4" />
					)}
				</Button>
			);
		},
		cell: ({ row }) => (
			<small className="text-sm font-medium leading-none">
				{row.original.name}
			</small>
		),
	},
	{
		accessorKey: "author",
		header: () => <div className="text-center">Author</div>,
		cell: ({ row }) => {
			const author = row.original.author;
			return (
				<div className="flex justify-center">
					<div className="flex w-fit items-center gap-2 rounded-full bg-gray-500/20 p-1 pr-2 backdrop-blur-xl">
						<Avatar className="h-6 w-6">
							<AvatarImage src={author.image ?? ""} />
							<AvatarFallback>
								{generateFallbackName(author.name ?? "A")}
							</AvatarFallback>
						</Avatar>
						{author.role === "ADMIN" && (
							<Wrench className="size-4 text-blue-500" />
						)}
						<p className="line-clamp-1 text-xs font-semibold">
							{author.name ?? "Unknown"}
						</p>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "isApproved",
		header: ({ column }) => (
			<div className="flex justify-center">
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Approved
					{column.getIsSorted() === "asc" ? (
						<ArrowDown01 className="ml-2 size-4" />
					) : (
						<ArrowDown10 className="ml-2 size-4" />
					)}
				</Button>
			</div>
		),
		cell: ({ row }) => (
			<div className="text-center">
				<small className="text-sm font-medium leading-none">
					{row.original.isApproved ? "Yes" : "No"}
				</small>
			</div>
		),
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Created At
				{column.getIsSorted() === "asc" ? (
					<CalendarArrowUp className="ml-2 size-4" />
				) : (
					<CalendarArrowDown className="ml-2 size-4" />
				)}
			</Button>
		),
		cell: ({ row }) => (
			<small className="text-sm font-medium">
				{formatDistanceToNow(row.original.createdAt, { addSuffix: true })}
			</small>
		),
	},
	{
		accessorKey: "updatedAt",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Updated At
				{column.getIsSorted() === "asc" ? (
					<ClockArrowDown className="ml-2 size-4" />
				) : (
					<ClockArrowUp className="ml-2 size-4" />
				)}
			</Button>
		),
		cell: ({ row }) => (
			<small className="text-sm font-medium">
				{formatDistanceToNow(row.original.updatedAt, { addSuffix: true })}
			</small>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const product = row.original;
			const utils = api.useUtils();
			const updateProductMutation = api.product.updateProductById.useMutation({
				onSuccess: async (product) => {
					await utils.product.invalidate();

					toast("Product updated successfully", {
						description: `Product "${product.name}" is now ${
							product.isApproved ? "approved" : "unapproved"
						}`,
						icon: <Check className="mr-2 size-4" />,
					});
				},
				onError: (error) => {
					toast("Failed to update product", {
						description: error.message,
						icon: <X className="mr-2 size-4" />,
					});
				},
			});
			const deleteProductMutation = api.product.deleteProductById.useMutation({
				onSuccess: async (product) => {
					await utils.product.invalidate();

					toast("Product deleted successfully", {
						description: `Product "${product.name}" has been deleted`,
						icon: <Check className="mr-2 size-4" />,
					});
				},
				onError: (error) => {
					toast("Failed to delete product", {
						description: error.message,
						icon: <X className="mr-2 size-4" />,
					});
				},
			});
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false);

			const isLoading =
				updateProductMutation.isPending || deleteProductMutation.isPending;

			return (
				<>
					<DropdownMenu>
						<DropdownMenuTrigger asChild disabled={isLoading}>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								{isLoading ? (
									<LoaderCircle className="size-4 animate-spin" />
								) : (
									<MoreHorizontal className="size-4" />
								)}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem>
								<Edit className="mr-2 size-4" /> Edit Product
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									updateProductMutation.mutate({
										id: product.id,
										product: {
											isApproved: !product.isApproved,
										},
									});
								}}
							>
								{product.isApproved ? (
									<PackageX className="mr-2 size-4" />
								) : (
									<PackageCheck className="mr-2 size-4" />
								)}
								Set as {product.isApproved ? "Unapproved" : "Approved"}
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setAlertDialogOpen(true)}>
								<Trash className="mr-2 size-4" /> Delete Product
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will permanently delete
									product data from servers.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									className="bg-destructive/80 text-white hover:bg-destructive/100"
									onClick={() =>
										deleteProductMutation.mutate({
											id: product.id,
										})
									}
								>
									<Trash className="mr-2 size-4" /> Delete
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</>
			);
		},
	},
];
