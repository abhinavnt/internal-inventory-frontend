"use client";

import { useEffect, useState } from "react";
import { fetchExpenses, ExpenseItem } from "@/services/expense.service";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { toast } from "sonner";

export default function ExpensePage() {
  const [data, setData] = useState<ExpenseItem[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    load();
  }, [page]);

  const load = async () => {
    try {
      const res = await fetchExpenses(page, limit);
      setData(res.data);
      setTotal(res.total);
    } catch {
      toast.error("Failed to load expenses");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <main className="p-4 max-w-7xl mx-auto space-y-6">
      <Card className="bg-[#23272B] border-none">
        <CardHeader>
          <h1 className="text-lg font-semibold">Expenses</h1>
        </CardHeader>

        <CardContent>
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
                  <TableCell>{e.description ?? "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} />
              </PaginationItem>
              <PaginationItem>
                <span className="px-2 text-sm">
                  {page} / {totalPages}
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
