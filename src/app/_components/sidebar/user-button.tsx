"use client";

import type { Session } from "next-auth";

import { generateFallbackName } from "~/lib/string";

import { LogOut, Wrench } from "lucide-react";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

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
          <small className="flex text-sm font-medium leading-none">
            {session.user.role === "ADMIN" && (
              <Wrench className="mr-2 size-4 text-blue-500" />
            )}
            {user.name}
          </small>
          <p className="text-xs text-muted-foreground">{user.email}</p>
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
