import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

import data from "./data.json";
import { auth } from "@/lib/auth";
import { CustomAlert } from "@/components/form/alert-form";
import { isOnboard } from "@/lib/server/data/user.data";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constant";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    return <CustomAlert variant="destructive" description="Please Login" />;
  }

  const user = await isOnboard(session.user.email);

  if (!user.ok) {
    return <CustomAlert variant="destructive" description="Please Login" />;
  }

  if (!user.status) {
    redirect(ROUTES.AUTH.ONBOARDING);
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </div>
  );
}
