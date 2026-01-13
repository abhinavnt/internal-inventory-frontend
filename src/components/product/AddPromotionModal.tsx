"use client";

import { useState } from "react";
import { createPromotion } from "@/services/promotion.service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  productId: string;
  onSuccess: () => void;
}

interface Errors {
  influencerName?: string;
  socialMediaLink?: string;
  amountPaid?: string;
  campaignDate?: string;
}

export function AddPromotionModal({
  open,
  onClose,
  productId,
  onSuccess,
}: Props) {
  const [form, setForm] = useState({
    influencerName: "",
    socialMediaLink: "",
    amountPaid: 0,
    campaignDate: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.influencerName) e.influencerName = "Influencer name is required";
    if (!form.socialMediaLink) e.socialMediaLink = "Link is required";
    if (form.amountPaid <= 0) e.amountPaid = "Amount is required";
    if (!form.campaignDate) e.campaignDate = "Campaign date required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      await createPromotion({
        productId,
        ...form,
        notes: form.notes || undefined,
      });

      toast.success("Promotion added");
      onSuccess();
      onClose();
    } catch {
      toast.error("Failed to add promotion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Promotion</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400">Influencer Name</label>
            <Input
              value={form.influencerName}
              onChange={(e) =>
                setForm({ ...form, influencerName: e.target.value })
              }
            />
            {errors.influencerName && (
              <p className="text-xs text-red-500">{errors.influencerName}</p>
            )}
          </div>

          <div>
            <label className="text-xs text-gray-400">Social Media Link</label>
            <Input
              value={form.socialMediaLink}
              onChange={(e) =>
                setForm({ ...form, socialMediaLink: e.target.value })
              }
            />
            {errors.socialMediaLink && (
              <p className="text-xs text-red-500">{errors.socialMediaLink}</p>
            )}
          </div>

          <div>
            <label className="text-xs text-gray-400">Amount Paid</label>
            <Input
              type="number"
              value={form.amountPaid}
              onChange={(e) =>
                setForm({ ...form, amountPaid: Number(e.target.value) })
              }
            />
            {errors.amountPaid && (
              <p className="text-xs text-red-500">{errors.amountPaid}</p>
            )}
          </div>

          <div>
            <label className="text-xs text-gray-400">Campaign Date</label>
            <Input
              type="date"
              value={form.campaignDate}
              onChange={(e) =>
                setForm({ ...form, campaignDate: e.target.value })
              }
            />
            {errors.campaignDate && (
              <p className="text-xs text-red-500">{errors.campaignDate}</p>
            )}
          </div>

          <Button onClick={submit} disabled={loading} className="w-full">
            {loading ? "Saving..." : "Save Promotion"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
