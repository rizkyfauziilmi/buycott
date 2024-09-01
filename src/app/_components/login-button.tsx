"use client";

import { KeyRound } from "lucide-react";
import { Button } from "~/components/ui/button";

import { useRouter } from "next/navigation";
import { useSheetStore } from "../stores/use-sheet-store";

export const LoginButton = () => {
  const router = useRouter();
  const { setIsOpen } = useSheetStore();

  return (
    <Button
      className="w-full"
      variant="outline"
      onClick={() => {
        setIsOpen(false);
        router.push("/auth/login");
      }}
    >
      <KeyRound className="mr-2 size-4" /> Login Now
    </Button>
  );
};
