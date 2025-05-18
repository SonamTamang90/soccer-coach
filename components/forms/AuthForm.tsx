"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox, Label, Input, Field } from "@headlessui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { FormData } from "@/components/validation/auth-schemas";
import SocialAuthForm from "./SocialAuthForm";
import { z } from "zod";

export type FormType = "SIGN_IN" | "SIGN_UP";

interface SubmitResult {
  success: boolean;
  data?: FormData;
  error?: Record<string, string>;
}

interface AuthFormProps {
  formType: FormType;
  defaultValues: FormData;
  schema: z.ZodType<any, any>;
  onSubmit: (data: FormData) => Promise<SubmitResult>;
}

// Types for form register and errors
type FormRegister = ReturnType<typeof useForm>["register"];
type FormErrors = ReturnType<typeof useForm>["formState"]["errors"];

// Custom helper text component
const HelperText: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <p className={`text-sm mt-1 ${className}`}>{children}</p>
);

// Form contents based on type
const SignInFormContent: React.FC<{
  register: FormRegister;
  errors: FormErrors;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  rememberMe: boolean;
  setRememberMe: (val: boolean) => void;
}> = ({
  register,
  errors,
  showPassword,
  togglePasswordVisibility,
  rememberMe,
  setRememberMe,
}) => (
  <>
    <div>
      <Field>
        <Label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </Label>
        <div className="mt-1">
          <Input
            id="email"
            {...register("email")}
            type="email"
            autoComplete="email"
            required
            className="block w-full text-gray-950 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2"
            placeholder="email@example.com"
          />
          {errors.email && (
            <HelperText className="text-red-500">
              {errors.email.message?.toString()}
            </HelperText>
          )}
        </div>
      </Field>
    </div>

    <div>
      <Field>
        <Label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </Label>
        <div className="mt-1 relative">
          <Input
            id="password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pr-10 py-2"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
          {errors.password && (
            <HelperText className="text-red-500">
              {errors.password.message?.toString()}
            </HelperText>
          )}
        </div>
      </Field>
    </div>

    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Field className="flex items-center">
          <Checkbox
            id="remember-me"
            name="remember-me"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <Label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900"
          >
            Remember me
          </Label>
        </Field>
      </div>

      <div className="text-sm">
        <a
          href="#"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Forgot your password?
        </a>
      </div>
    </div>
  </>
);

const SignUpFormContent: React.FC<{
  register: FormRegister;
  errors: FormErrors;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}> = ({ register, errors, showPassword, togglePasswordVisibility }) => (
  <>
    <div>
      <Field>
        <Label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Full Name
        </Label>
        <div className="mt-1">
          <Input
            id="name"
            {...register("name")}
            type="text"
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2"
            placeholder="John Doe"
          />
          {errors.name && (
            <HelperText className="text-red-500">
              {errors.name.message?.toString()}
            </HelperText>
          )}
        </div>
      </Field>
    </div>

    <div>
      <Field>
        <Label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </Label>
        <div className="mt-1">
          <Input
            id="email"
            {...register("email")}
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2"
            placeholder="email@example.com"
          />
          {errors.email && (
            <HelperText className="text-red-500">
              {errors.email.message?.toString()}
            </HelperText>
          )}
        </div>
      </Field>
    </div>

    <div>
      <Field>
        <Label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </Label>
        <div className="mt-1 relative">
          <Input
            id="password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pr-10 py-2"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
          {errors.password && (
            <HelperText className="text-red-500">
              {errors.password.message?.toString()}
            </HelperText>
          )}
        </div>
      </Field>
    </div>
  </>
);

const AuthForm: React.FC<AuthFormProps> = ({
  formType,
  defaultValues,
  schema,
  onSubmit,
}) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const isSignIn = formType === "SIGN_IN";

  // Use a single form instance with the provided schema
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Common submit handler for both form types
  const processSubmit = async (data: Record<string, any>) => {
    setLoading(true);
    setServerErrors({});

    try {
      const result = await onSubmit(data as FormData);

      if (!result.success && result.error) {
        // Handle server-side errors
        const fieldErrors = result.error;
        Object.keys(fieldErrors).forEach((field) => {
          if (field === "form") {
            setServerErrors((prev) => ({ ...prev, form: fieldErrors[field] }));
          } else {
            setError(field, {
              type: "server",
              message: fieldErrors[field],
            });
          }
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setServerErrors({ form: "An unexpected error occurred" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8 rounded-lg bg-white p-8 shadow-md">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          {isSignIn ? "Sign in to your account" : "Create your account"}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {isSignIn
            ? "Enter your credentials to access your account"
            : "Fill in the information to create your account"}
        </p>
      </div>

      <form onSubmit={handleSubmit(processSubmit)} className="mt-8 space-y-6">
        {isSignIn ? (
          <SignInFormContent
            register={register}
            errors={errors}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
          />
        ) : (
          <SignUpFormContent
            register={register}
            errors={errors}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        )}

        {serverErrors.form && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{serverErrors.form}</p>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={loading}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70"
          >
            {loading ? "Processing..." : isSignIn ? "Sign in" : "Sign up"}
          </button>
        </div>

        <div className="text-center text-sm">
          {isSignIn ? (
            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <a
                href="/sign-up"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </a>
            </p>
          ) : (
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="/sign-in"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </a>
            </p>
          )}
        </div>
      </form>

      <SocialAuthForm />
    </div>
  );
};

export default AuthForm;
