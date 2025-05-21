"use client";

import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/Button";
import { SelectField, TextField } from "@/components/ui/Fields";
import { SignUpFormData, SignUpSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      referralsource: "",
    },
  });

  return (
    <AuthLayout
      title="Sign up for an account"
      subtitle={
        <>
          Already a member?{" "}
          <Link href="/sign-in" className="text-cyan-600">
            Sign in
          </Link>{" "}
          to your account.
        </>
      }
    >
      <form>
        <div className="grid grid-cols-2 gap-6">
          <TextField
            label="First Name"
            name="first_name"
            type="text"
            autoComplete="given_name"
            required
          />
          <TextField
            label="Last Name"
            name="last_name"
            type="text"
            autoComplete="family_name"
            required
          />
          <TextField
            className="col-span-full"
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            className="col-span-full"
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
          />
          <SelectField
            className="col-span-full"
            label="How did you hear about us?"
            name="referral_source"
          >
            <option>AltaVista search</option>
            <option>Super Bowl commercial</option>
            <option>Our route 34 city bus ad</option>
            <option>The “Never Use This” podcast</option>
          </SelectField>
        </div>
        <Button type="submit" color="cyan" className="mt-8 w-full">
          Get started today
        </Button>
      </form>
    </AuthLayout>
  );
};

export default SignUp;

// "use client";
// import React from "react";
// import AuthForm from "@/components/forms/AuthForm";
// import { FormData, SignUpSchema } from "@/components/validation/auth-schemas";
// import { useRouter } from "next/navigation";

// const SignUp = () => {
//   const router = useRouter();

//   const handleSignUp = async (data: FormData) => {
//     try {
//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();

//       if (result.success) {
//         // Redirect to sign-in page on success
//         router.push("/sign-in?registered=true");
//         return { success: true, data: result.data };
//       } else {
//         // Return errors from the API
//         return { success: false, error: result.error };
//       }
//     } catch (error) {
//       console.error("Sign up error:", error);
//       return {
//         success: false,
//         error: { form: "Failed to create account. Please try again." },
//       };
//     }
//   };

//   return (
//     <AuthForm
//       schema={SignUpSchema}
//       formType="SIGN_UP"
//       defaultValues={{ email: "", name: "", password: "" }}
//       onSubmit={handleSignUp}
//     />
//   );
// };

// export default SignUp;
