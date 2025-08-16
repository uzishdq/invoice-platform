import OnBoarding from "@/components/form/on-boarding";
import { auth } from "@/lib/auth";
import { ROUTES } from "@/lib/constant";
import { redirect } from "next/navigation";
import React from "react";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session || session.user?.name) {
    redirect(ROUTES.AUTH.DASHBOARD);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <OnBoarding />
    </div>
  );
}
