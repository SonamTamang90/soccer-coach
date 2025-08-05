import AuthLayout from "@/components/layouts/AuthLayout";
import { TextField } from "@/components/ui/Fields";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import React from "react";

const SignIn = () => {
  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle={
        <>
          Not a member?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:text-"
          >
            Sign up for a free trial
          </Link>
        </>
      }
    >
      <form className="space-y-6">
        <TextField
          label="Email address"
          type="email"
          name="email"
          required
          placeholder="Enter your email"
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          required
          placeholder="Enter your password"
        />

        <Button type="submit" className="w-full">
          Sign in to account
        </Button>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
