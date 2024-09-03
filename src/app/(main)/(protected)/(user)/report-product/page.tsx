import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { ReportProductForm } from "./_components/report-product-form";

export default async function ReportProductPage() {
	const session = await getServerAuthSession();

	if (!session) {
		return redirect("/auth/login");
	}

	return <ReportProductForm />;
}
