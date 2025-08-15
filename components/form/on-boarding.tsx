import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
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
import { onboardSchema } from "@/lib/validations/user.validation";

export default function OnBoarding() {
  const form = useForm<z.infer<typeof onboardSchema>>({
    resolver: zodResolver(onboardSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  async function onSubmit(values: z.infer<typeof onboardSchema>) {
    toast.error("Login failed. Please try again.");
    console.log(values);
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="max-w-sm mx-auto">
        <CardTitle className="text-xl">You almost finished.</CardTitle>
        <CardDescription>
          Your profile is incomplete. Please fill in the necessary details to
          proceed with the application.
        </CardDescription>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
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
                {!form.formState.isSubmitting ? "Submit" : "Loading..."}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
