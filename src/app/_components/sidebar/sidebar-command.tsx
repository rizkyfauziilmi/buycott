import { useEffect, useState } from "react";

import {
	Bell,
	Boxes,
	HeartHandshake,
	Home,
	MessageCircle,
	MessageCircleWarning,
	Search,
	Settings,
	ShoppingBag,
} from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import { useSheetStore } from "~/app/stores/use-sheet-store";
import { Button } from "~/components/ui/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "~/components/ui/command";

interface Button {
	title: string;
	icon: React.ReactNode;
	type: "menu" | "other";
	externalLink?: string;
	isAdminRoute?: boolean;
}

const buttons: Button[] = [
	{
		title: "Home",
		icon: <Home className="mr-2 size-5" />,
		type: "menu",
	},
	{
		title: "Search Product",
		icon: <ShoppingBag className="mr-2 size-5" />,
		type: "menu",
	},
	{
		title: "Report Product",
		icon: <MessageCircleWarning className="mr-2 size-5" />,
		type: "menu",
	},
	{
		title: "Manage Product",
		icon: <Boxes className="mr-2 size-5" />,
		type: "menu",
		isAdminRoute: true,
	},
	{
		title: "Notification",
		icon: <Bell className="mr-2 size-5" />,
		type: "menu",
	},
	{
		title: "Settings",
		icon: <Settings className="mr-2 size-5" />,
		type: "other",
	},
	{
		title: "Send a Feedback",
		icon: <MessageCircle className="mr-2 size-5" />,
		type: "other",
		externalLink: "https://github.com/rizkyfauziilmi/buycott/issues/new",
	},
	{
		title: "Join as a Volunteer",
		icon: <HeartHandshake className="mr-2 size-5" />,
		type: "other",
		externalLink: "https://techforpalestine.org/",
	},
];

interface SidebarCommandProps {
	isAdmin: boolean;
}

export const SidebarCommand = ({ isAdmin }: SidebarCommandProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const { setIsOpen } = useSheetStore();

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const isActiveButton = (buttonTitle: string): boolean => {
		// if the button is home and the current path is home
		if (buttonTitle.toLowerCase() === "home" && pathname === "/") {
			return true;
		}

		return pathname.includes(buttonTitle.split(" ").join("-").toLowerCase());
	};

	const handleNavigate = (
		buttonTitle: string,
		externalLink: string | undefined,
	): void => {
		setOpen(false);

		// if there is external link, open it in new tab
		if (externalLink) {
			window.open(externalLink, "_blank");
			return;
		}

		setIsOpen(false);

		if (buttonTitle.toLowerCase() === "home") {
			router.push("/");
		} else {
			router.push(`/${buttonTitle.split(" ").join("-").toLowerCase()}`);
		}
	};

	return (
		<>
			<div className="relative">
				<Search className="absolute left-2 size-4 h-full text-muted-foreground" />
				<Button
					className="w-full justify-start pl-8 text-muted-foreground"
					variant="secondary"
					onClick={() => setOpen(true)}
				>
					Search...
				</Button>
				<div className="absolute right-2 top-0 flex h-full items-center justify-center">
					<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
						<span className="text-xs">⌘</span>K
					</kbd>
				</div>
			</div>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Menu">
						{buttons
							.filter((button) => button.type === "menu")
							.map((button) => {
								if (button.isAdminRoute && !isAdmin) {
									return null;
								}

								return (
									<CommandItem
										key={button.title}
										onSelect={() =>
											handleNavigate(button.title, button.externalLink)
										}
										disabled={isActiveButton(button.title)}
									>
										{button.icon}
										<span>{button.title}</span>
									</CommandItem>
								);
							})}
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Other">
						{buttons
							.filter((button) => button.type === "other")
							.map((button) => (
								<CommandItem
									key={button.title}
									onSelect={() =>
										handleNavigate(button.title, button.externalLink)
									}
									disabled={isActiveButton(button.title)}
								>
									{button.icon}
									<span>{button.title}</span>
								</CommandItem>
							))}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
};
