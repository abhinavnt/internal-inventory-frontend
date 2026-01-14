"use client";

import { useEffect, useState, useCallback } from "react";
import { fetchExpenses, ExpenseItem } from "@/services/expense.service";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { toast } from "sonner";

export default function ExpensePage() {
  const [data, setData] = useState<ExpenseItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const limit = 10;

  const load = useCallback(async (): Promise<void> => {
    try {
      const res = await fetchExpenses(page, limit);
      setData(res.data);
      setTotal(res.total);
    } catch {
      toast.error("Failed to load expenses");
    }
  }, [page]);

  useEffect(() => {
    load();
  }, [load]);

  const totalPages = Math.ceil(total / limit);

  return (
    <main className="p-3 sm:p-4 max-w-7xl mx-auto space-y-4">
      <Card className="bg-[#23272B] border-none">
        <CardHeader className="pb-2">
          <h1 className="text-base sm:text-lg font-semibold">Expenses</h1>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 📱 MOBILE VIEW */}
          <div className="space-y-3 sm:hidden">
            {data.map((e) => (
              <div key={e.id} className="rounded-lg bg-[#1E2226] p-3 space-y-1">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{new Date(e.createdAt).toLocaleDateString()}</span>
                  <span className="font-medium">{e.type}</span>
                </div>

                <div className="text-sm font-medium">{e.product?.name ?? "General Expense"}</div>

                <div className="text-sm font-semibold">₹{e.amount.toLocaleString("en-IN")}</div>

                <div className="text-xs text-gray-400">{e.createdBy.name}</div>

                {e.description && <div className="text-xs text-gray-300">{e.description}</div>}
              </div>
            ))}
          </div>

          {/* 🖥️ DESKTOP VIEW */}
          <div className="hidden sm:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>{new Date(e.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{e.type}</TableCell>
                    <TableCell>{e.product?.name ?? "-"}</TableCell>
                    <TableCell>₹{e.amount.toLocaleString("en-IN")}</TableCell>
                    <TableCell>{e.createdBy.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{e.description ?? "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* PAGINATION */}
          <Pagination className="pt-2">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} />
              </PaginationItem>

              <PaginationItem>
                <span className="px-2 text-xs sm:text-sm">
                  {page} / {totalPages || 1}
                </span>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </main>
  );
}
