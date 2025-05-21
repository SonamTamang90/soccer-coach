import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Fields";
import Link from "next/link";
import React from "react";

const SignIn = () => {
  return (
    <AuthLayout
      title="Sign in to account"
      subtitle={
        <>
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-cyan-600">
            Sign up
          </Link>{" "}
          for a free trial.
        </>
      }
    >
      <form>
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

// "use client";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import AuthForm from "@/components/forms/AuthForm";
// import { FormData, SignInSchema } from "@/components/validation/auth-schemas";

// const SignIn = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [message, setMessage] = useState<string | null>(null);

//   // Show success message if redirected from registration
//   useEffect(() => {
//     const registered = searchParams.get("registered");
//     if (registered === "true") {
//       setMessage("Account created successfully! Please sign in.");
//     }
//   }, [searchParams]);

//   const handleSignIn = async (data: FormData) => {
//     try {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();

//       if (result.success) {
//         // Store user data in localStorage (in a real app, you'd use a proper session management)
//         localStorage.setItem("user", JSON.stringify(result.data));

//         // Redirect to dashboard on success
//         router.push("/dashboard");
//         return { success: true, data: result.data };
//       } else {
//         // Return errors from the API
//         return { success: false, error: result.error };
//       }
//     } catch (error) {
//       console.error("Sign in error:", error);
//       return {
//         success: false,
//         error: { form: "Failed to sign in. Please try again." },
//       };
//     }
//   };

//   return (
//     <>
//       {message && (
//         <div className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-700">
//           {message}
//         </div>
//       )}
//       <AuthForm
//         schema={SignInSchema}
//         formType="SIGN_IN"
//         defaultValues={{ email: "", password: "" }}
//         onSubmit={handleSignIn}
//       />
//     </>
//   );
// };

// export default SignIn;
