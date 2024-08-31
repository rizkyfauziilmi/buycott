import { SidebarTitle } from "./sidebar-title";
import { SidebarCommand } from "./sidebar-command";
import { SidebarNavigation } from "./sidebar-navigation";
import { SidebarToggleTheme } from "./sidebar-toggle-theme";
import { SidebarUser } from "./sidebar-user";
import type { Dispatch, SetStateAction } from "react";

interface SidebarProps {
  setIsSheetOpen?: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = ({ setIsSheetOpen = undefined }: SidebarProps) => {
  return (
    <div className="md:h-screen space-y-4 overflow-y-auto p-4 md:border-r">
      <SidebarTitle title="Buycott" />
      <SidebarCommand setIsSheetOpen={setIsSheetOpen} />
      <SidebarNavigation setIsSheetOpen={setIsSheetOpen} />
      <SidebarToggleTheme />
      <SidebarUser />
    </div>
  );
};
