"use client";

import { useState } from "react";
import { EnvelopeIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

interface EmailTemplatePreviewProps {
  templateType: "application" | "interview";
}

export default function EmailTemplatePreview({
  templateType,
}: EmailTemplatePreviewProps) {
  const [isLoading, setIsLoading] = useState(false);

  const companyName = "Acme Inc.";
  const jobTitle = "Frontend Developer";
  const days = templateType === "application" ? 7 : 5;

  const subject =
    templateType === "application"
      ? `Follow up on your ${jobTitle} application at ${companyName}`
      : `Follow up after your ${companyName} interview`;

  const body =
    templateType === "application"
      ? `It's been ${days} days since you applied for the ${jobTitle} position at ${companyName}. Consider following up if you haven't heard back.`
      : `It's been ${days} days since your interview for the ${jobTitle} position at ${companyName}. Consider sending a follow-up email.`;

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 600);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center">
            <EnvelopeIcon className="h-5 w-5 mr-2 text-indigo-500" />
            {templateType === "application"
              ? "Application Follow-up"
              : "Interview Follow-up"}{" "}
            Preview
          </h3>
          <button
            onClick={handleRefresh}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowPathIcon
              className={`h-5 w-5 text-gray-400 ${
                isLoading ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>

        <div className="mt-4 border rounded-lg overflow-hidden">
          <div className="border-b p-3 bg-gray-50 dark:bg-gray-700">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium mr-2">From:</span>
              <span>
                Job Application Tracker &lt;notifications@yourdomain.com&gt;
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
              <span className="font-medium mr-2">To:</span>
              <span>you@example.com</span>
            </div>
            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 mt-1">
              <span className="font-medium mr-2">Subject:</span>
              <span>{subject}</span>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800">
            <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
              <p>Hi there,</p>
              <p className="mt-2">{body}</p>
              <p className="mt-2">Here are some tips for your follow-up:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Be concise and professional</li>
                <li>Restate your interest in the position</li>
                <li>
                  Provide any additional information that might be relevant
                </li>
                <li>Ask about the next steps in the process</li>
              </ul>
              <p className="mt-2">
                Best regards,
                <br />
                Your Job Application Tracker
              </p>
            </div>
          </div>
        </div>

        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          This is a preview of the email that will be sent via Mailgun to your
          configured email address.
        </p>
      </div>
    </div>
  );
}
