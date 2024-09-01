"use client";

import {
  Bell,
  HeartHandshake,
  Home,
  MessageCircle,
  MessageCircleWarning,
  Settings,
  ShoppingBag,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";
import { useSheetStore } from "~/app/stores/use-sheet-store";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

interface Button {
  title: string;
  icon: React.ReactNode;
  type: "menu" | "other";
  externalLink?: string;
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

export const SidebarNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsOpen } = useSheetStore();

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
    <div>
      <p className="mb-2 font-semibold text-muted-foreground">Menu</p>
      <div className="space-y-4">
        {buttons.map((button, index) => (
          <Fragment key={button.title}>
            <Button
              className={cn(
                isActiveButton(button.title) &&
                  "bg-accent text-accent-foreground",
                "w-full justify-start pl-4",
              )}
              size="lg"
              variant="ghost"
              onClick={() => handleNavigate(button.title, button.externalLink)}
            >
              {button.icon}
              <p>{button.title}</p>
            </Button>
            {/* after notification button, show separator */}
            {button.type === "menu" && index === 3 && <Separator />}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
