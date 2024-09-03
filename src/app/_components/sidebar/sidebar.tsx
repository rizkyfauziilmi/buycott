"use client";

import { api } from "~/trpc/react";
import { SidebarCommand } from "./sidebar-command";
import { SidebarNavigation } from "./sidebar-navigation";
import { SidebarTitle } from "./sidebar-title";
import { SidebarToggleTheme } from "./sidebar-toggle-theme";
import { SidebarUser } from "./sidebar-user";

export const Sidebar = () => {
  const { data: session } = api.user.getCurrentUser.useQuery();

  const isAdmin = session?.user.role === "ADMIN";

  return (
    <div className="flex h-screen flex-col justify-between gap-4 overflow-y-auto md:p-6 p-4 md:border-r">
      <div className="space-y-4">
        <SidebarTitle title="Buycott" />
        <SidebarCommand isAdmin={isAdmin} />
        <SidebarNavigation isAdmin={isAdmin} />
      </div>
      <div className="space-y-4">
        <SidebarToggleTheme />
        <SidebarUser session={session} />
      </div>
    </div>
  );
};
