import { getServerAuthSession } from "~/server/auth";

import { UserButton } from "./user-button";
import { LoginButton } from "../login-button";

export const SidebarUser = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    return <LoginButton />;
  }

  return <UserButton session={session} />;
};
