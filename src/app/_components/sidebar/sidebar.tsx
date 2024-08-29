import { SidebarTitle } from "./sidebar-title";
import { SidebarCommand } from "./sidebar-command";
import { SidebarNavigation } from "./sidebar-navigation";
import { SidebarToggleTheme } from "./sidebar-toggle-theme";
import { SidebarUser } from "./sidebar-user";

export const Sidebar = () => {
  return (
    <div className="h-screen space-y-4 overflow-y-auto p-4">
      <SidebarTitle title="Buycott" />
      <SidebarCommand />
      <SidebarNavigation />
      <SidebarToggleTheme />
      <SidebarUser />
    </div>
  );
};
