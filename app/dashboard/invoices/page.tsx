import { columns } from "@/components/columns/column-invoice";
import { DataTable } from "@/components/table/data-table";
import React from "react";

import { auth } from "@/lib/auth";
import { getInvoiceById } from "@/lib/server/data/invoce.data";
import { CustomAlert } from "@/components/form/alert-form";

export default async function InvoicesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return <CustomAlert variant="destructive" description="Please Login" />;
  }

  const invoice = await getInvoiceById(session.user.id);

  if (!invoice.ok || !invoice.data) {
    return <CustomAlert description={invoice.message} />;
  }

  const dataType = ["PENDING", "PAID"];

  return (
    <div>
      <DataTable
        columns={columns}
        data={invoice.data}
        searchBy="header"
        labelSearch="Header"
        filterBy="status"
        filterOptions={dataType}
      />
    </div>
  );
}
