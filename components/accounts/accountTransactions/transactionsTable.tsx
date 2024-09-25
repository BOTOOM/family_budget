/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LJOsXzfnG73
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { AccountTransactions } from "@/services/types";

export default function TransactionsTable({
  accountTransactions,
  setEditingTransaction,
}: {
  accountTransactions: AccountTransactions[];
  setEditingTransaction: Function;
}) {
  console.log("llegaron",accountTransactions)
  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleDelete = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-700 hidden sm:table-row">
            <th className="px-4 py-2 text-left">Fecha</th>
            <th className="px-4 py-2 text-left">Comercio</th>
            <th className="px-4 py-2 text-left">Monto</th>
            <th className="px-4 py-2 text-left">Categoría</th>
            <th className="px-4 py-2 text-left">Autor</th>
            <th className="px-4 py-2 text-left">Notas</th>
            <th className="px-4 py-2 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {accountTransactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="border-b sm:table-row block sm:flex"
            >
              <td className="px-4 py-2 sm:table-cell block">
                {transaction.date}
              </td>
              <td className="px-4 py-2 sm:table-cell block">
                {transaction.name}
              </td>
              <td className="px-4 py-2 sm:table-cell block">
                {transaction.amount.toLocaleString("es-CO", { style: 'currency', currency: 'COP' })}
              </td>
              <td className="px-4 py-2 sm:table-cell block">
                <Badge variant="default">
                  {transaction.categorie?.name ?? ""}
                </Badge>
              </td>
              <td className="px-4 py-2 sm:table-cell hidden">
                {transaction.author_id}
              </td>
              <td className="px-4 py-2 sm:table-cell hidden">
                {transaction.comment}
              </td>
              <td className="px-4 py-2 sm:table-cell block text-right">
                <div className="flex justify-end gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <EllipsisVertical className="h-4 w-4" />
                        <span className="sr-only">Opciones</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(transaction)}>
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(transaction.id)}
                      >
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
