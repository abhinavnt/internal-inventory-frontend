"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { updateCapital } from "@/services/capital.service";
import { toast } from "sonner";

interface EditCapitalModalProps {
  open: boolean;
  onClose: () => void;
  currentAmount: number;
  onUpdated: () => void;
}

export function EditCapitalModal({
  open,
  onClose,
  currentAmount,
  onUpdated,
}: EditCapitalModalProps) {
  const [amount, setAmount] = useState<number>(currentAmount);
  const [reason, setReason] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (): Promise<void> => {
    if (amount < 0) {
      toast.error("Amount must be positive");
      return;
    }

    try {
      setLoading(true);
      await updateCapital({ newAmount: amount, reason });
      toast.success("Capital updated");
      onUpdated();
      onClose();
    } catch {
      toast.error("Failed to update capital");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Initial Capital</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Capital amount"
          />

          <Input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason (optional)"
          />

          <Button onClick={handleSubmit} disabled={loading}>
            Update Capital
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
