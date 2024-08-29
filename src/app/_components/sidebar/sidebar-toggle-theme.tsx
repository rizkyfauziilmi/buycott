"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "~/components/ui/button";

export const SidebarToggleTheme = () => {
  const { setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-lg bg-secondary p-1 text-secondary-foreground">
      <Button
        variant="ghost"
        className="flex-1 rounded-lg bg-background transition-all hover:bg-background dark:bg-secondary"
        size="sm"
        onClick={() => setTheme("light")}
      >
        <Sun className="mr-2 size-4" />
        Light
      </Button>
      <Button
        variant="ghost"
        className="flex-1 rounded-lg bg-secondary transition-all hover:bg-background dark:bg-background"
        onClick={() => setTheme("dark")}
      >
        <Moon className="mr-2 size-4" />
        Dark
      </Button>
    </div>
  );
};
