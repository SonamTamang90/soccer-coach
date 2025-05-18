"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthForm from "@/components/forms/AuthForm";
import { FormData, SignInSchema } from "@/components/validation/auth-schemas";

const SignIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string | null>(null);

  // Show success message if redirected from registration
  useEffect(() => {
    const registered = searchParams.get("registered");
    if (registered === "true") {
      setMessage("Account created successfully! Please sign in.");
    }
  }, [searchParams]);

  const handleSignIn = async (data: FormData) => {
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
        // Store user data in localStorage (in a real app, you'd use a proper session management)
        localStorage.setItem("user", JSON.stringify(result.data));

        // Redirect to dashboard on success
        router.push("/dashboard");
        return { success: true, data: result.data };
      } else {
        // Return errors from the API
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
    <>
      {message && (
        <div className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-700">
          {message}
        </div>
      )}
      <AuthForm
        schema={SignInSchema}
        formType="SIGN_IN"
        defaultValues={{ email: "", password: "" }}
        onSubmit={handleSignIn}
      />
    </>
  );
};

export default SignIn;
