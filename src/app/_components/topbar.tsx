"use client";

import { Menu } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { Sidebar } from "./sidebar/sidebar";
import { useSheetStore } from "../stores/use-sheet-store";

export const Topbar = () => {
  const { isOpen, setIsOpen } = useSheetStore();

  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex items-center">
        <div className="h-8 w-8 rounded-md bg-muted"></div>
        <h1 className="ml-2 text-xl font-bold">Buycott</h1>
      </div>
      <Button variant="outline" size="icon" onClick={() => setIsOpen(true)}>
        <Menu className="size-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader className="pb-4">
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>
              Here you can find all the options to navigate through the app
            </SheetDescription>
          </SheetHeader>
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
};
