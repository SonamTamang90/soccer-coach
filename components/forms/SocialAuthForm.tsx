"use client";

import React from "react";

interface SocialAuthFormProps {
  callbackUrl?: string;
}

const SocialAuthForm: React.FC<SocialAuthFormProps> = ({
  callbackUrl = "/",
}) => {
  const handleSocialLogin = async (provider: string) => {
    try {
      // In a real implementation, this would integrate with NextAuth.js
      console.log(`Signing in with ${provider}, callback URL: ${callbackUrl}`);
      // You would typically call signIn from next-auth here
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleSocialLogin("google")}
          className="inline-flex justify-center items-center py-2.5 px-4 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            className="h-5 w-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z"
              fill="none"
            />
            <path
              d="M15.14 12.33L15.14 12C15.14 11.73 15.12 11.47 15.09 11.2H12V12.81H13.76C13.68 13.23 13.44 13.62 13.09 13.89V14.94H14.39C15.07 14.3 15.14 13.33 15.14 12.33Z"
              fill="#4285F4"
            />
            <path
              d="M12 15.5C13.11 15.5 14.04 15.14 14.73 14.5L13.43 13.45C13.08 13.68 12.58 13.84 12 13.84C10.95 13.84 10.07 13.14 9.81 12.18H8.46V13.26C9.14 14.62 10.47 15.5 12 15.5Z"
              fill="#34A853"
            />
            <path
              d="M9.81 12.18C9.74 11.98 9.7 11.77 9.7 11.55C9.7 11.33 9.74 11.12 9.81 10.92V9.84H8.46C8.16 10.35 8 10.92 8 11.55C8 12.18 8.17 12.75 8.46 13.26L9.81 12.18Z"
              fill="#FBBC05"
            />
            <path
              d="M12 9.26C12.62 9.26 13.17 9.47 13.61 9.89L14.77 8.73C14.03 8.03 13.11 7.64 12 7.64C10.47 7.64 9.14 8.52 8.46 9.88L9.81 10.96C10.06 10 10.95 9.26 12 9.26Z"
              fill="#EA4335"
            />
          </svg>
          Google
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin("github")}
          className="inline-flex justify-center items-center py-2.5 px-4 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            className="h-5 w-5 mr-2"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.84 21.494C9.34 21.591 9.52 21.296 9.52 21.02C9.52 20.775 9.512 20.093 9.509 19.272C6.726 19.859 6.139 17.958 6.139 17.958C5.685 16.812 5.028 16.518 5.028 16.518C4.11 15.88 5.097 15.895 5.097 15.895C6.113 15.968 6.644 16.934 6.644 16.934C7.55 18.476 9.025 18.006 9.541 17.737C9.637 17.091 9.911 16.622 10.211 16.372C7.99 16.128 5.662 15.273 5.662 11.361C5.662 10.18 6.055 9.225 6.663 8.447C6.555 8.177 6.205 7.196 6.762 5.774C6.762 5.774 7.624 5.494 9.512 6.658C10.308 6.422 11.162 6.304 12 6.3C12.838 6.304 13.692 6.422 14.488 6.658C16.376 5.494 17.238 5.774 17.238 5.774C17.795 7.196 17.445 8.177 17.337 8.447C17.945 9.225 18.338 10.18 18.338 11.361C18.338 15.28 16.006 16.125 13.78 16.368C14.165 16.66 14.511 17.259 14.511 18.152C14.511 19.417 14.499 20.709 14.499 21.03C14.499 21.309 14.679 21.606 15.186 21.503C19.157 20.17 22 16.425 22 12C22 6.477 17.523 2 12 2Z"
            />
          </svg>
          GitHub
        </button>
      </div>
    </div>
  );
};

export default SocialAuthForm;
