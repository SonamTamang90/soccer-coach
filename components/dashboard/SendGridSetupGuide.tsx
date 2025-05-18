"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

export default function SendGridSetupGuide() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg overflow-hidden">
      <div
        className="px-4 py-5 sm:p-6 cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            SendGrid Setup Guide
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Learn how to configure SendGrid for sending follow-up emails
          </p>
        </div>
        <div>
          {isExpanded ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 py-5 sm:p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-6 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Step 1: Create a SendGrid Account
              </h4>
              <p>
                First, sign up for a SendGrid account at{" "}
                <a
                  href="https://sendgrid.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                  sendgrid.com
                </a>{" "}
                (free tier available, no credit card required).
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Step 2: Create an API Key
              </h4>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Log in to your SendGrid dashboard</li>
                <li>Navigate to Settings → API Keys</li>
                <li>Click &quot;Create API Key&quot;</li>
                <li>Give your key a name and select Mail Send permission</li>
                <li>Copy your API key (you&apos;ll only see it once)</li>
              </ol>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Step 3: Verify Your Sender Identity
              </h4>
              <p>
                Go to Settings → Sender Authentication and either verify a
                single sender email address or authenticate your domain for
                sending.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Step 4: Configure Your Application
              </h4>
              <p>
                Create a{" "}
                <code className="bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded">
                  .env.local
                </code>{" "}
                file in your project root with the following content:
              </p>

              <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md mt-2 overflow-x-auto">
                <code>
                  SENDGRID_API_KEY=your_api_key_here
                  <br />
                  EMAIL_FROM=Job Application Tracker
                  &lt;your_verified_email@domain.com&gt;
                </code>
              </pre>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Step 5: Restart Your Application
              </h4>
              <p>
                After setting up the environment variables, restart your
                application for the changes to take effect.
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-md">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">
                Important Notes
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-yellow-700 dark:text-yellow-200">
                <li>
                  Keep your API key secure and never expose it in client-side
                  code
                </li>
                <li>Always use a verified sender email address or domain</li>
                <li>
                  SendGrid offers 100 free emails per day on the free tier
                </li>
                <li>
                  Check your SendGrid Activity feed for delivery status and
                  issues
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
