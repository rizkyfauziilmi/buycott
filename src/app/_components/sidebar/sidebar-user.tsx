"use client";

import { UserButton } from "./user-button";
import { LoginButton } from "../login-button";
import { api } from "~/trpc/react";

export const SidebarUser = () => {
  const { data: session } = api.user.getCurrentUser.useQuery();

  if (!session) {
    return <LoginButton />;
  }

  return <UserButton session={session} />;
};
