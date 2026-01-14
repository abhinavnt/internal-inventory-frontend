"use client";

import { useEffect, useState, useCallback } from "react";
import { fetchActivityLogs, ActivityLogItem } from "@/services/activity-log.service";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { toast } from "sonner";

export default function ActivityLogPage() {
  const [data, setData] = useState<ActivityLogItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const limit = 10;

  const load = useCallback(async (): Promise<void> => {
    try {
      const res = await fetchActivityLogs(page, limit);
      setData(res.data);
      setTotal(res.total);
    } catch {
      toast.error("Failed to load activity logs");
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
          <h1 className="text-base sm:text-lg font-semibold">Activity Logs</h1>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 📱 MOBILE VIEW */}
          <div className="space-y-3 sm:hidden">
            {data.map((log) => (
              <div key={log.id} className="rounded-lg bg-[#1E2226] p-3 space-y-1">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{new Date(log.createdAt).toLocaleDateString()}</span>
                  <span className="font-medium">{log.action}</span>
                </div>

                <div className="text-sm font-medium">{log.module}</div>

                <div className="text-xs text-gray-300">{log.description}</div>

                <div className="pt-1 text-xs text-gray-400">
                  {log.performedBy.name}
                  <div className="text-[11px]">{log.performedBy.email}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 🖥️ DESKTOP VIEW */}
          <div className="hidden sm:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>User</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.module}</TableCell>
                    <TableCell className="max-w-xs truncate">{log.description}</TableCell>
                    <TableCell>
                      {log.performedBy.name}
                      <div className="text-xs text-gray-400">{log.performedBy.email}</div>
                    </TableCell>
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
