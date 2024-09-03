import { capitalizeString, generateFallbackName } from "~/lib/string";

import {
	Link2,
	PackageSearch,
	ScrollText,
	Split,
	Wrench,
	XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import type { ProductWithAlternativesAndAuthor } from "types";
import { useElementVisibility } from "~/app/hooks/use-observer";
import MarkdownToReact from "~/components/markdown-to-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

interface ProductCardProps {
	product: ProductWithAlternativesAndAuthor;
	isLastItem: boolean;
	isLastNextCursor: boolean;
	fetchNextPage: () => Promise<void>;
	hasNextPage: boolean;
}

export const ProductCard = ({
	product,
	isLastItem,
	isLastNextCursor,
	fetchNextPage,
	hasNextPage,
}: ProductCardProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const isVisible = useElementVisibility(ref);

	const author = product.author;
	const alternatives = product.alternatives;

	useEffect(() => {
		if (isVisible && isLastItem && isLastNextCursor && hasNextPage) {
			fetchNextPage()
				.then(() => {
					console.log("Fetched next page");
				})
				.catch((error) => {
					toast("Failed to fetch next page", {
						description: `Error: ${error}`,
						icon: <XCircle className="size-4" />,
					});
				});
		}
	}, [isVisible, isLastItem, isLastNextCursor, fetchNextPage, hasNextPage]);

	return (
		<div ref={ref} key={product.id} className="rounded-2xl border-[1px]">
			<div
				className={cn(
					!product.logo_url && "bg-muted",
					"relative flex h-60 w-full items-center justify-center overflow-hidden rounded-t-2xl",
				)}
			>
				{product.logo_url ? (
					<Image
						src={product.logo_url ?? ""}
						alt={""}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
						placeholder="blur"
						blurDataURL={product.logo_url}
						className="w-full rounded-2xl object-cover object-center"
					/>
				) : (
					<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
						{product.name}
					</h3>
				)}
				<div className="absolute left-3 top-3 flex w-fit items-center gap-2 rounded-full bg-gray-500/20 p-1 pr-2 backdrop-blur-xl">
					<Avatar className="h-6 w-6">
						<AvatarImage src={author.image ?? ""} />
						<AvatarFallback>
							{generateFallbackName(author.name ?? "A")}
						</AvatarFallback>
					</Avatar>
					{author.role === "ADMIN" && (
						<Wrench className="size-4 text-blue-500" />
					)}
					<p className="text-xs font-semibold">
						{product.author.name ?? "Unknown"}
					</p>
				</div>
			</div>
			<div className="space-y-2 p-4">
				<p className="font-medium">{product.name}</p>
				<small className="line-clamp-1 text-sm font-semibold leading-none">
					{product.reason}
				</small>
				<div className="flex gap-2 overflow-x-auto pt-2">
					{product.categories.map((category) => (
						<Badge key={category} variant="secondary">
							{capitalizeString(category)}
						</Badge>
					))}
				</div>
			</div>
			<Separator orientation="horizontal" />
			<div className="flex items-center gap-2 p-4">
				<Dialog>
					<DialogTrigger asChild>
						<Button className="flex-1" variant="outline">
							<ScrollText className="mr-2 size-4" /> Evidence
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>Evidence for {product.name}</DialogTitle>
							<DialogDescription>
								This evidence is provided by{" "}
								{product.author.role === "ADMIN"
									? "the admin of buycott"
									: product.author.role === "USER"
										? "community members"
										: "unknown"}
								.
							</DialogDescription>
						</DialogHeader>
						<ScrollArea className="h-[100px]">
							<MarkdownToReact markdown={product.evidence} />
						</ScrollArea>
						<DialogFooter className="sm:justify-start">
							<Button className="w-full" asChild>
								<Link href={product.evidence_url} target="_blank">
									<Link2 className="mr-2 size-4" /> See Evidence Link
								</Link>
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>

				<Button
					className="flex-1"
					variant="outline"
					onClick={() => {
						if (alternatives.length === 0) {
							toast("No alternatives available", {
								description: "This product has no alternatives",
								icon: <PackageSearch className="mr-2 size-4" />,
							});
						}
					}}
				>
					<Split className="mr-2 size-4" /> Alternatives
				</Button>
			</div>
		</div>
	);
};
