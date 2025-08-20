"use server";

import { db } from "@/lib/db";
import { invoice } from "@/lib/db/schema";
import { TInvoice } from "@/lib/types/invoice.type";
import { eq } from "drizzle-orm";

export const getInvoiceById = async (id: string | null | undefined) => {
  try {
    if (!id) {
      return { ok: false, message: "Please Login", data: null };
    }

    const result = await db
      .select()
      .from(invoice)
      .where(eq(invoice.userId, id));

    return {
      ok: true,
      message: "Error fetching invoice by id",
      data: result as TInvoice[],
    };
  } catch (error) {
    console.error("Error fetching invoice by id:", error);
    return { ok: false, message: "Error fetching invoice by id", data: null };
  }
};
