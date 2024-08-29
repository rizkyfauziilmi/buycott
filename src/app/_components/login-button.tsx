"use client"

import { KeyRound } from "lucide-react";
import { Button } from "~/components/ui/button";

import { useRouter } from "next/navigation";

export const LoginButton = () => {
    const router = useRouter();

    return (
      <Button className="w-full" variant="outline" onClick={() => router.push("/auth/login")}>
        <KeyRound className="mr-2 size-4" /> Login Now
      </Button>
    );
}