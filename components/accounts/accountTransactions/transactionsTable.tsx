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

export default function TransactionsTable({setEditingTransaction}: {setEditingTransaction: Function}) {
  const [transactions, setTransactions] = useState([
    {
      id: '1',
      date: "2023-04-15",
      merchant: "Amazon",
      category: "Shopping",
      author: "John Doe",
      notes: "Compra de libros",
    },
    {
      id: '2',
      date: "2023-04-12",
      merchant: "Restaurante XYZ",
      category: "Food",
      author: "Jane Smith",
      notes: "Almuerzo con amigos",
    },
    {
      id: '3',
      date: "2023-04-10",
      merchant: "Gasolinera ABC",
      category: "Transportation",
      author: "Michael Johnson",
      notes: "Reabastecimiento de combustible",
    },
    {
      id: '4',
      date: "2023-04-08",
      merchant: "Tienda de Música",
      category: "Entertainment",
      author: "Sarah Lee",
      notes: "Compra de nuevo álbum",
    },
    {
      id: '5',
      date: "2023-04-05",
      merchant: "Supermercado XYZ",
      category: "Groceries",
      author: "David Brown",
      notes: "Compra semanal",
    },
  ]);
  // const [editingTransaction, setEditingTransaction] = useState(null);

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
          <th className="px-4 py-2 text-left">Categoría</th>
          <th className="px-4 py-2 text-left">Autor</th>
          <th className="px-4 py-2 text-left">Notas</th>
          <th className="px-4 py-2 text-right">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr
            key={transaction.id}
            className="border-b sm:table-row block sm:flex"
          >
            <td className="px-4 py-2 sm:table-cell block">
              {transaction.date}
            </td>
            <td className="px-4 py-2 sm:table-cell block">
              {transaction.merchant}
            </td>
            <td className="px-4 py-2 sm:table-cell block">
              <Badge
                variant={
                  transaction.category === "Shopping"
                    ? "primary"
                    : transaction.category === "Food"
                    ? "success"
                    : transaction.category === "Transportation"
                    ? "warning"
                    : "info"
                }
              >
                {transaction.category}
              </Badge>
            </td>
            <td className="px-4 py-2 sm:table-cell hidden">
              {transaction.author}
            </td>
            <td className="px-4 py-2 sm:table-cell hidden">
              {transaction.notes}
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
                    <DropdownMenuItem
                      onClick={() => handleEdit(transaction)}
                    >
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