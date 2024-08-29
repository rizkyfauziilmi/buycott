"use client";

import type { Session } from "next-auth";

import {
  abbreviateEmail,
  generateFallbackName,
  truncateText,
} from "~/lib/string";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface UserButtonProps {
  session: Session;
}

export const UserButton = ({ session }: UserButtonProps) => {
  const { user } = session;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.image ?? ""} />
          <AvatarFallback>
            {generateFallbackName(user.name ?? "A")}
          </AvatarFallback>
        </Avatar>
        <div>
          <small className="text-sm font-medium leading-none">
            {truncateText(user.name ?? "", 12)}
          </small>
          <p className="text-xs text-muted-foreground">
            {abbreviateEmail(user.email ?? "")}
          </p>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={async () => {
          await signOut();
        }}
      >
        <LogOut className="size-4" />
      </Button>
    </div>
  );
};
