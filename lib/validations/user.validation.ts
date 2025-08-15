import * as z from "zod";

export const onboardSchema = z.object({
  name: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  address: z
    .string()
    .min(1, "Address is required")
    .max(100, "Address must be less than 100 characters"),
});
