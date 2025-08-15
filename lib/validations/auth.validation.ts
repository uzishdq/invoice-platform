import * as z from "zod";

const emailSchema = z.email("Invalid email address");

export const loginSchema = z.object({
  email: emailSchema,
});
