"use client";

import React from "react";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-indigo-100 via-white to-indigo-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-8 inset-x-0 flex justify-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500">
            Auth App
          </span>
        </Link>
      </div>
      <div className="w-full max-w-md">{children}</div>
      <div className="mt-8 text-center text-sm text-gray-600">
        <p>
          By continuing, you agree to our{" "}
          <Link
            href="/terms"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
