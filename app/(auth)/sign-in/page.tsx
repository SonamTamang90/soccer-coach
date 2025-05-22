"use client";

import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Fields";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SignIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hasShownToast, setHasShownToast] = useState(false);

  // Show success message if redirected from registration
  useEffect(() => {
    const registered = searchParams.get("registered");
    if (registered === "true" && !hasShownToast) {
      setHasShownToast(true);
      toast.success("Account created successfully! Please sign in.", {
        duration: 5000,
        position: "top-center",
      });
    }
  }, [searchParams, hasShownToast]);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("user", JSON.stringify(result.data));
        router.push("/dashboard");
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error("Sign in error:", error);
      return {
        success: false,
        error: { form: "Failed to sign in. Please try again." },
      };
    }
  };
  return (
    <AuthLayout
      title="Sign in to account"
      subtitle={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-cyan-600">
            Sign up
          </Link>{" "}
          for a free trial.
        </>
      }
    >
      <form onSubmit={handleSignIn}>
        <div className="space-y-6">
          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
        <Button type="submit" color="cyan" className="mt-8 w-full py-2">
          Sign in to account
        </Button>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
