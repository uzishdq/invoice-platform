import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  address: text("address"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const invoiceStatusEnum = pgEnum("invoice_status_enum", [
  "PENDING",
  "PAID",
]);

export const invoice = pgTable("invoice", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  total: integer("total").notNull(),
  status: invoiceStatusEnum("status").default("PENDING"),
  fromName: text("from_name").notNull(),
  fromEmail: text("from_email").notNull(),
  fromAddress: text("from_address").notNull(),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),
  clientAddress: text("client_address").notNull(),
  currency: text("currency").notNull(),
  invoiceNo: integer("invoice_no").notNull(),
  invoiceItemQTY: integer("invoice_item_qty").notNull(),
  invoiceItemRate: integer("invoice_item_rate").notNull(),
  invoiceDescription: text("invoice_description"),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// --- Relations ---
export const usersRelations = relations(users, ({ many }) => ({
  invoices: many(invoice), // satu user bisa punya banyak invoice
}));

export const invoiceRelations = relations(invoice, ({ one }) => ({
  user: one(users, {
    fields: [invoice.userId],
    references: [users.id],
  }),
}));
