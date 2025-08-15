"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { IconFileDollar } from "@tabler/icons-react";
import { loginSchema } from "@/lib/validations/auth.validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { ROUTES } from "@/lib/constant";

function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      await signIn("nodemailer", {
        email: values.email,
        redirect: true,
        callbackUrl: ROUTES.AUTH.DASHBOARD,
      });
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <a href="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md">
              <IconFileDollar className="size-6" />
            </div>
            <span className="sr-only">Invoice Platfrom.</span>
          </a>
          <h1 className="text-xl font-bold">Welcome to Invoice Platfrom.</h1>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline underline-offset-4">
              Register{" "}
            </Link>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {!form.formState.isSubmitting ? "Login" : "Logging in..."}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
