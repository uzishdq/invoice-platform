"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { invoiceSchema } from "@/lib/validations/invoice.validation";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function createInvoice(values: z.infer<typeof invoiceSchema>) {
  try {
    const session = await auth();

    if (!session?.user || !session.user.email) {
      return {
        ok: false,
        message: "You must be logged in to complete.",
      };
    }

    const parsed = invoiceSchema.safeParse(values);

    if (!parsed.success) {
      return {
        ok: false,
        message: "Validation failed",
      };
    }

    const amount = values.invoiceItemQTY * values.invoiceItemRate;
    const total = amount; // Simple calculation, can be expanded
    console.log({ ...values, amount, total });

    // const result = await db
    //   .update(users)
    //   .set({
    //     name: parsed.data.name,
    //     address: parsed.data.address,
    //   })
    //   .where(eq(users.email, session.user.email))
    //   .returning();

    // if (result.length === 0) {
    //   return {
    //     ok: false,
    //     message: "User not found or update failed.",
    //   };
    // }

    return {
      ok: true,
      message: "Create Invoice completed successfully.",
    };
  } catch (error) {
    console.error("Create Invoice error:", error);
    return {
      ok: false,
      message: "An unexpected error occurred during create Invoice.",
    };
  }
}
