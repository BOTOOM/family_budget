/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LJOsXzfnG73
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TransactionsTable from "./transactionsTable";
import CustomDialog from "@/components/common/CustomDialog";
import TransactionForm from "./transactionForm";
import { Label } from "@/components/ui/label";
import { AccountTransactions } from "@/services/types";
import { FileWarningIcon } from "lucide-react";
import { useTranslation } from "@/i18n/client";

export default function AccountTransactionsComponent({
  accountTransactions,
  lng,
}: {
  accountTransactions: AccountTransactions[];
  lng: string;
}) {
  const { t } = useTranslation(lng);
  const [transactions, setTransactions] = useState<AccountTransactions[]>([]);
  const [dataTransaction, setdataTransaction] = useState<any>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  useEffect(() => {
    setTransactions(accountTransactions);
    return () => {};
  }, [accountTransactions]);

  const handleImport = () => {
    setShowImportModal(true);
  };
  const handleCreate = () => {
    setdataTransaction({});
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
        <h1 className="text-2xl font-bold">{t("Transactions.title")}</h1>
        <Button variant="outline" onClick={handleGoBack}>
          {t("Common.back")}
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
            {t("Transactions.import")}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCreate}
            className="w-full sm:w-auto"
          >
            {t("Transactions.create")}
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
          title={t("Transactions.form.title")}
          setShowModal={setdataTransaction}
        >
          <TransactionForm
            transaction={dataTransaction}
            setShowModal={setdataTransaction}
            lng={lng}
          />
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
      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-muted rounded-lg">
          <FileWarningIcon className="h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">
            {t("Transactions.empty")}
          </p>
        </div>
      ) : (
        <TransactionsTable
          setEditingTransaction={setdataTransaction}
          accountTransactions={transactions}
          lng={lng}
        />
      )}
    </div>
  );
}
