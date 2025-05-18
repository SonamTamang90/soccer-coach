"use client";
import React from "react";
import AuthForm from "@/components/forms/AuthForm";
import { FormData, SignUpSchema } from "@/components/validation/auth-schemas";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();

  const handleSignUp = async (data: FormData) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // Redirect to sign-in page on success
        router.push("/sign-in?registered=true");
        return { success: true, data: result.data };
      } else {
        // Return errors from the API
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error("Sign up error:", error);
      return {
        success: false,
        error: { form: "Failed to create account. Please try again." },
      };
    }
  };

  return (
    <AuthForm
      schema={SignUpSchema}
      formType="SIGN_UP"
      defaultValues={{ email: "", name: "", password: "" }}
      onSubmit={handleSignUp}
    />
  );
};

export default SignUp;
