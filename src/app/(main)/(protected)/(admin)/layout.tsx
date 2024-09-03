import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function AdminLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const session = await getServerAuthSession();

    if (!session || session.user.role !== "ADMIN") {
        return redirect("/");
    }

    return <>{children}</>;
}