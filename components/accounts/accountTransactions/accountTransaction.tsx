/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LJOsXzfnG73
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TransactionsTable from "./transactionsTable";
import CustomDialog from "@/components/common/CustomDialog";
import TransactionForm from "./transactionForm";
import { Label } from "@/components/ui/label";

export default function AccountTransactionsComponent() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "2023-04-15",
      merchant: "Amazon",
      category: "Shopping",
      author: "John Doe",
      notes: "Compra de libros",
    },
    {
      id: 2,
      date: "2023-04-12",
      merchant: "Restaurante XYZ",
      category: "Food",
      author: "Jane Smith",
      notes: "Almuerzo con amigos",
    },
    {
      id: 3,
      date: "2023-04-10",
      merchant: "Gasolinera ABC",
      category: "Transportation",
      author: "Michael Johnson",
      notes: "Reabastecimiento de combustible",
    },
    {
      id: 4,
      date: "2023-04-08",
      merchant: "Tienda de Música",
      category: "Entertainment",
      author: "Sarah Lee",
      notes: "Compra de nuevo álbum",
    },
    {
      id: 5,
      date: "2023-04-05",
      merchant: "Supermercado XYZ",
      category: "Groceries",
      author: "David Brown",
      notes: "Compra semanal",
    },
  ]);
  const [dataTransaction, setdataTransaction] = useState<any>(null);
  const [showImportModal, setShowImportModal] = useState(false);



  const handleImport = () => {
    setShowImportModal(true);
  };
  const handleCreate = () => {
    setdataTransaction({ a: "" });
  };
  const handleImportSubmit = (importedTransactions) => {
    setTransactions([...transactions, ...importedTransactions]);
    setShowImportModal(false);
  };

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleImportFileSubmit = () => {
    if (file) {
      const importedTransactions = [
        {
          id: transactions.length + 1,
          date: "2023-05-01",
          merchant: "Tienda de Ropa",
          category: "Shopping",
          author: "Jane Doe",
          notes: "Compra de ropa de verano",
        },
      ];
      handleImportSubmit(importedTransactions);
    }
  };
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 md:px-8 lg:px-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Transacciones bancarias</h1>
        <Button variant="outline" onClick={handleGoBack}>
          Volver
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            size="sm"
            variant="outline"
            onClick={handleImport}
            className="w-full sm:w-auto"
          >
            Importar transacciones
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCreate}
            className="w-full sm:w-auto"
          >
            Crear transacción
          </Button>
        </div>
        {/* <div className="flex-1 max-w-md w-full">
          <Input
            type="search"
            placeholder="Buscar transacciones..."
            className="w-full"
          />
        </div> */}
      </div>

      {dataTransaction && (
        <CustomDialog
          title="Editar transacción"
          setShowModal={setdataTransaction}
        >
          <TransactionForm />
        </CustomDialog>
      )}
      {showImportModal && (
        <CustomDialog
          title="Importar transacciones"
          setShowModal={setShowImportModal}
        >
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="file">Archivo</Label>
              <Input type="file" id="file" onChange={handleFileChange} />
            </div>
            <Button onClick={handleImportFileSubmit}>Importar</Button>
          </div>
        </CustomDialog>
      )}
      <TransactionsTable setEditingTransaction={setdataTransaction} />
    </div>
  );
}
