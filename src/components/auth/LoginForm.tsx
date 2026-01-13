"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { loginThunk } from "@/redux/features/AuthSlice";
import { useRouter } from "next/router";

export function LoginForm() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmit = async () => {
    try {
      await dispatch(loginThunk({ email, password })).unwrap();
      toast.success("Login successful");
       router.replace("/");
    } catch {
      toast.error("Invalid credentials");
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <h2 className="text-lg font-semibold">Admin Login</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button className="w-full" onClick={onSubmit}>
          Login
        </Button>
      </CardContent>
    </Card>
  );
}
