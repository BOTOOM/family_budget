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
import {
  AccountTransactions,
  AccountTransactionsForm,
  transactionsImport,
} from "@/services/types";
import { FileWarningIcon } from "lucide-react";
import { useTranslation } from "@/i18n/client";
import { serverlessURL } from "@/utils/supabase/constants";
import { adjustNumberByDebit } from "@/utils/convertNumber";
import { useParams } from "next/navigation";
import { UpsertAccountTransactionAction } from "@/actions";

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
  const { slug } = useParams<{ slug: string }>();
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
  const handleImportSubmit = async (importedTransactions: AccountTransactionsForm[]) => {
    const response = await UpsertAccountTransactionAction(importedTransactions);
    if (response && response[0]?.id) {
      setShowImportModal(false);
    }
  };

  const [file, setFile] = useState(null);
  const handleFileChange = (e: any) => {
    console.log("HOLAAA");
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };
  const handleImportFileSubmit = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    try {
      const response = await fetch(`${serverlessURL}/readTransactions`, {
        method: "POST",
        body: formData,
      });
      console.log(response);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      console.log("antes", response.ok);
      console.log("Response status:", response.status);
      console.log("Response body used:", response.bodyUsed);
      const result: transactionsImport[] = (await response.json()).data;
      console.log("Success:", result);
      const transactions: AccountTransactionsForm[]  = result.map((item) => {
        const isDebit = !!item.Debitos;
        return {
          account_id: slug,
          amount: adjustNumberByDebit(
            isDebit,
            isDebit ? item.Debitos : item.Creditos
          ),
          comment: item.Descripcion,
          date: new Date(item.Fecha).toISOString(),
          transaction_categorie_id: null,
          name: item.Descripcion,
          is_debit: isDebit,
        };
      });
      console.log("transformado:", transactions);
      await handleImportSubmit(transactions)
    } catch (error) {
      console.error("Error uploading file:", error);
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
              <Input
                type="file"
                id="file"
                accept=".csv, .xlsx"
                onChange={handleFileChange}
              />
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
