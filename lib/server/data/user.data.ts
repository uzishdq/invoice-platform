"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const isOnboard = async (email: string | null | undefined) => {
  try {
    if (!email) {
      return false;
    }

    const [result] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!result.name || !result.address) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return false;
  }
};
