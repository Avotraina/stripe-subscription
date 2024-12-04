"use client";

import React from "react";
import { DataTable } from "../components/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { T_Article } from "../types/article";

type PlanificationsProps = {
    articles: T_Article[],
    planificationProp?: unknown[],
}

export const Planifications: React.FC<PlanificationsProps> = ({ articles }) => {
    return (
        <div className="p-4 space-y-6 m-4">
            <DataTable columns={columns} data={articles} />
        </div>

    );
}

export const columns: ColumnDef<T_Article>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "createdAt",
      header: "Created at",
      cell: (({row}) => {
        const originalDate = new Date(row.getValue("createdAt") as string);
        const formattedDate = originalDate.toLocaleString()

        return <div className="text-left font-medium">{formattedDate}</div>
      })
    }
  ]