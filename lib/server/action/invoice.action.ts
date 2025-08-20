"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { invoice } from "@/lib/db/schema";
import { invoiceSchema } from "@/lib/validations/invoice.validation";
import { z } from "zod";

export async function createInvoice(values: z.infer<typeof invoiceSchema>) {
  try {
    const session = await auth();

    if (!session?.user || !session.user.id) {
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

    const total = values.invoiceItemQTY * values.invoiceItemRate;

    const result = await db
      .insert(invoice)
      .values({
        userId: session.user.id,
        fromName: parsed.data.fromName,
        fromEmail: parsed.data.fromEmail,
        fromAddress: parsed.data.fromAddress,
        clientName: parsed.data.clientName,
        clientEmail: parsed.data.clientEmail,
        clientAddress: parsed.data.clientAddress,
        invoiceNo: parsed.data.invoiceNo,
        name: parsed.data.name,
        currency: parsed.data.currency,
        total: total,
        invoiceDescription: parsed.data.invoiceDescription,
        invoiceItemQTY: parsed.data.invoiceItemQTY,
        invoiceItemRate: parsed.data.invoiceItemRate,
        note: parsed.data.note,
        status: parsed.data.status,
      })
      .returning();

    if (result.length === 0) {
      return {
        ok: false,
        message: "Create Invoice completed failed.",
      };
    }

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
