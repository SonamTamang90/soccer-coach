"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@headlessui/react";
import EmailSettings from "@/components/dashboard/EmailSettings";
import SendGridSetupGuide from "@/components/dashboard/SendGridSetupGuide";
import EmailTemplatePreview from "@/components/dashboard/EmailTemplatePreview";
import { initEmailService } from "@/lib/emailService";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only showing UI after mount
  useEffect(() => {
    setMounted(true);
    // Set initial darkMode state based on the theme
    setDarkMode(theme === "dark");
    initEmailService();
  }, [theme]);

  // Toggle dark mode
  const toggleDarkMode = (enabled: boolean) => {
    setDarkMode(enabled);
    setTheme(enabled ? "dark" : "light");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Settings
          </h2>
        </div>
      </div>

      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow dark:divide-gray-700 dark:bg-gray-800">
        <div className="px-4 py-5 sm:px-6 dark:text-white">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Preferences
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <ul className="space-y-6">
            <li className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Email Notifications
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Receive email about account activity
                </span>
              </div>
              <Switch
                checked={emailNotifications}
                onChange={setEmailNotifications}
                className={classNames(
                  emailNotifications
                    ? "bg-indigo-600"
                    : "bg-gray-200 dark:bg-gray-700",
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                )}
              >
                <span className="sr-only">Enable email notifications</span>
                <span
                  className={classNames(
                    emailNotifications ? "translate-x-5" : "translate-x-0",
                    "pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  )}
                >
                  <span
                    className={classNames(
                      emailNotifications
                        ? "opacity-0 duration-100 ease-out"
                        : "opacity-100 duration-200 ease-in",
                      "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
                    )}
                    aria-hidden="true"
                  >
                    <svg
                      className="h-3 w-3 text-gray-400"
                      fill="none"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span
                    className={classNames(
                      emailNotifications
                        ? "opacity-100 duration-200 ease-in"
                        : "opacity-0 duration-100 ease-out",
                      "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
                    )}
                    aria-hidden="true"
                  >
                    <svg
                      className="h-3 w-3 text-indigo-600"
                      fill="currentColor"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                    </svg>
                  </span>
                </span>
              </Switch>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Push Notifications
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Receive push notifications on your device
                </span>
              </div>
              <Switch
                checked={pushNotifications}
                onChange={setPushNotifications}
                className={classNames(
                  pushNotifications
                    ? "bg-indigo-600"
                    : "bg-gray-200 dark:bg-gray-700",
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                )}
              >
                <span className="sr-only">Enable push notifications</span>
                <span
                  className={classNames(
                    pushNotifications ? "translate-x-5" : "translate-x-0",
                    "pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  )}
                ></span>
              </Switch>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Dark Mode
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Use dark theme across the application
                </span>
              </div>
              <Switch
                checked={darkMode}
                onChange={toggleDarkMode}
                className={classNames(
                  darkMode ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-700",
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                )}
              >
                <span className="sr-only">Enable dark mode</span>
                <span
                  className={classNames(
                    darkMode ? "translate-x-5" : "translate-x-0",
                    "pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  )}
                ></span>
              </Switch>
            </li>
          </ul>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Security
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your account security settings
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Two-Factor Authentication
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Add an extra layer of security to your account
              </span>
            </div>
            <Switch
              checked={twoFactorAuth}
              onChange={setTwoFactorAuth}
              className={classNames(
                twoFactorAuth
                  ? "bg-indigo-600"
                  : "bg-gray-200 dark:bg-gray-700",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              )}
            >
              <span className="sr-only">Enable two-factor authentication</span>
              <span
                className={classNames(
                  twoFactorAuth ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                )}
              ></span>
            </Switch>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Email & Notifications
          </h3>
          <EmailSettings />
        </div>

        <SendGridSetupGuide />

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Email Templates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EmailTemplatePreview templateType="application" />
            <EmailTemplatePreview templateType="interview" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
              About Follow-up Emails
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
              <p>
                Our automated follow-up system helps you stay on top of your job
                applications by:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  Reminding you to follow up after submitting applications
                </li>
                <li>Sending timely notifications after interviews</li>
                <li>Keeping track of all your communications</li>
                <li>
                  Helping you maintain professional relationships with
                  recruiters
                </li>
              </ul>
            </div>
            <div className="mt-5">
              <div className="rounded-md bg-gray-50 dark:bg-gray-900/50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      This demo version simulates email sending
                    </p>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      In a production application, emails would be sent through
                      a server-side service. For demonstration purposes,
                      scheduled emails will show as browser notifications when
                      due.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
