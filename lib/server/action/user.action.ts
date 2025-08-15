"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { onboardSchema } from "@/lib/validations/user.validation";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function onboardUser(values: z.infer<typeof onboardSchema>) {
  try {
    const session = await auth();

    if (!session?.user || !session.user.id) {
      return {
        ok: false,
        message: "You must be logged in to complete the onboarding.",
      };
    }

    const parsed = onboardSchema.safeParse(values);

    if (!parsed.success) {
      return {
        ok: false,
        message: "Validation failed",
      };
    }

    const result = await db
      .update(users)
      .set({
        name: parsed.data.name,
        address: parsed.data.address,
      })
      .where(eq(users.id, session.user.id))
      .returning();

    if (result.length === 0) {
      return {
        ok: false,
        message: "User not found or update failed.",
      };
    }

    return {
      ok: true,
      message: "Onboarding completed successfully.",
    };
  } catch (error) {
    console.error("Onboarding error:", error);
    return {
      ok: false,
      message: "An unexpected error occurred during onboarding.",
    };
  }
}
