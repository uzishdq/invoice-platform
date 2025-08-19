import { z } from "zod";

// export const invoiceSchema = z.object({
//   draft: z.string(),
//   invoiceNo: z.string(),
//   currency: z.string(),
//   fromName: z.string(),
//   fromEmail: z.string(),
//   fromAdress: z.string(),
//   toName: z.string(),
//   toEmail: z.string(),
//   toAdress: z.string(),
//   date: z.date({
//     error: "A date is required",
//   }),
//   invoiceDue: z.string(),
// });

export const invoiceSchema = z.object({
  invoiceNo: z.string().min(1, "Invoice number is required"),
  currency: z.string().min(1, "Currency is required"),
  yourName: z.string().min(1, "Your name is required"),
  yourEmail: z.email("Invalid email address"),
  yourAddress: z.string().min(1, "Your address is required"),
  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.email("Invalid email address"),
  clientAddress: z.string().min(1, "Client address is required"),
  date: z.date({
    error: "A date is required",
  }),
  dueDate: z.string().min(1, "Due date is required"),
  itemName: z.string().optional(),
  quantity: z.number().min(0, "Quantity must be at least 0"),
  rate: z.number().min(0, "Rate must be at least 0"),
  note: z.string().max(200),
});
