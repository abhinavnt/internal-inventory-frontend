"use client";

import React, { useState } from "react";
import { Button } from "@/ui/Button/Button";
import { subscribeNewsletter } from "@/services/newsletterServices";
import { toast } from "sonner";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter a valid email");

    setLoading(true);
    try {
      await subscribeNewsletter({ email });
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else if (typeof error === "object" && error && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        toast.error(err.response?.data?.message || "Failed to submit detials");
      } else {
        toast.error("Failed to submit detials");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[14px] md:rounded-[18px] md:p-4">
      <form onSubmit={handleSubmit} className="relative mx-auto w-full md:max-w-[768px] flex flex-row items-center gap-2 lg:gap-0">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>

        <input
          id="newsletter-email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email ID"
          className="flex-1 h-10 lg:h-22 rounded-[12px] lg:rounded-[14px] bg-[#0000001A] border border-gray-600 text-white placeholder-gray-400 pl-2 pr-2 md:pl-4 lg:pr-4 focus:border-[#0cc2ef] focus:outline-none"
          required
          disabled={loading}
        />

        <Button
          type="submit"
          size="md"
          variant="gradient"
          className="h-10 lg:h-16 px-4 lg:px-0 lg:w-[100px] lg:absolute lg:right-7 lg:top-1/2 lg:-translate-y-1/2"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
}
