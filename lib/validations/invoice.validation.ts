import { z } from "zod";

export const invoiceSchema = z.object({
  name: z.string().min(1, "Invoice name is required").max(20),
  total: z.number().min(0, "total must be at least 0"),
  status: z.enum(["PAID", "PENDING"]).default("PENDING"),
  date: z
    .date({
      error: "A date is required",
    })
    .min(1),
  dueDate: z.number().min(1, "Due date is required"),
  fromName: z.string().min(1, "From name is required"),
  fromEmail: z.email("Invalid email address"),
  fromAddress: z.string().min(1, "From address is required"),
  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.email("Invalid email address"),
  clientAddress: z.string().min(1, "Client address is required"),
  currency: z.string().min(1, "Currency is required"),
  invoiceNo: z.number().min(1, "Invoice number is required"),
  invoiceItemQTY: z.number().min(0, "Quantity must be at least 0"),
  invoiceItemRate: z.number().min(0, "Rate must be at least 0"),
  invoiceDescription: z.string().optional(),
  note: z.string().max(200).optional(),
});
