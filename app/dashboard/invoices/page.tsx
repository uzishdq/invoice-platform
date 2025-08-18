import { columns } from "@/components/columns/column-invoice";
import { DataTable } from "@/components/table/data-table";
import React from "react";

import data from "../data.json";

export default function InvoicesPage() {
  const dataType = ["In Process", "Done"];

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        searchBy="header"
        labelSearch="Header"
        filterBy="status"
        filterOptions={dataType}
      />
    </div>
  );
}
