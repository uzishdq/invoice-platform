import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/lib/constant";
import { Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

function VerifyPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Check Your Email
            </CardTitle>
            <CardDescription className="text-center">
              We have sent a verification link to your email.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Mail className="h-12 w-12 text-primary" />
            <p className="text-center text-sm text-gray-600">
              Please check your inbox (and spam/junk folder) for a link to sign
              in. The link will expire in 10 minutes.
            </p>
            <Button asChild>
              <Link href={ROUTES.PUBLIC.HOME} className="w-full">
                Back to Home Page
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default VerifyPage;
