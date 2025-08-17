import { CustomAlert } from "@/components/form/alert-form";
import OnBoarding from "@/components/form/on-boarding";
import { auth } from "@/lib/auth";
import { ROUTES } from "@/lib/constant";
import { isOnboard } from "@/lib/server/data/user.data";
import { redirect } from "next/navigation";
import React from "react";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session?.user?.email) {
    return <CustomAlert variant="destructive" description="Please Login" />;
  }

  const user = await isOnboard(session.user.email);

  if (!user.ok) {
    return <CustomAlert variant="destructive" description="Please Login" />;
  }

  if (user.status) {
    redirect(ROUTES.AUTH.DASHBOARD);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <OnBoarding />
    </div>
  );
}
