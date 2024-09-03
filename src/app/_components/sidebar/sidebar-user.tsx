import type { Session } from "next-auth";
import { LoginButton } from "../login-button";
import { UserButton } from "./user-button";

interface SidebarUserProps {
	session: Session | null | undefined;
}

export const SidebarUser = ({ session }: SidebarUserProps) => {
	if (!session) {
		return <LoginButton />;
	}

	return <UserButton session={session} />;
};
