"use client";

import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/Button";
import { SelectField, TextField } from "@/components/ui/Fields";
import { SignUpFormData, SignUpSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
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

  const onSubmit = async (data: SignUpFormData) => {
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
        router.push("/sign-in?registered=true");
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      return {
        success: false,
        error: { form: "Failed to create account. Please try again." },
      };
    }
  };

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-6">
          <TextField
            label="First Name"
            type="text"
            autoComplete="given_name"
            {...register("firstname")}
            error={errors.firstname?.message}
          />
          <TextField
            label="Last Name"
            type="text"
            autoComplete="family_name"
            {...register("lastname")}
            error={errors.lastname?.message}
          />
          <TextField
            className="col-span-full"
            label="Email address"
            type="email"
            autoComplete="email"
            {...register("email")}
            error={errors.email?.message}
          />
          <TextField
            className="col-span-full"
            label="Password"
            type="password"
            autoComplete="new-password"
            {...register("password")}
            error={errors.password?.message}
          />
          <SelectField
            className="col-span-full"
            label="How did you hear about us?"
            {...register("referralsource")}
          >
            <option>AltaVista search</option>
            <option>Super Bowl commercial</option>
            <option>Our route 34 city bus ad</option>
            <option>The “Never Use This” podcast</option>
          </SelectField>
        </div>
        <Button
          type="submit"
          color="cyan"
          className="mt-8 w-full"
          disabled={isSubmitting}
        >
          Get started today
        </Button>
      </form>
    </AuthLayout>
  );
};

export default SignUp;

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
