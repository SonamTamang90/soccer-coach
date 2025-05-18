"use client";

import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import {
  getEmailSettings,
  saveEmailSettings,
  DEFAULT_EMAIL_SETTINGS,
  type EmailSettings as EmailSettingsType,
} from "@/lib/emailService";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function EmailSettings() {
  const [settings, setSettings] = useState<EmailSettingsType>(
    DEFAULT_EMAIL_SETTINGS
  );
  const [isSaved, setIsSaved] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedSettings = getEmailSettings();
    setSettings(storedSettings);
  }, []);

  const handleToggleEnabled = (enabled: boolean) => {
    setSettings({ ...settings, enabled });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, emailAddress: e.target.value });
  };

  const handleToggleNotification = (
    key: keyof EmailSettingsType["notifications"]
  ) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    });
  };

  const handleDaysChange = (
    key: keyof EmailSettingsType["followUpDays"],
    value: string
  ) => {
    const days = parseInt(value, 10);
    if (isNaN(days)) return;

    setSettings({
      ...settings,
      followUpDays: {
        ...settings.followUpDays,
        [key]: days,
      },
    });
  };

  const handleSave = () => {
    saveEmailSettings(settings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (!isClient) {
    return (
      <div className="animate-pulse h-96 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
              Email Notifications
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
              <p>
                Configure automated follow-up reminders for your job
                applications.
              </p>
            </div>
          </div>
          <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex sm:flex-shrink-0 sm:items-center">
            <div className="flex flex-col items-end space-y-2">
              <div className="rounded-md bg-blue-50 p-2 dark:bg-blue-900/30">
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Powered by Mailgun
                </p>
              </div>
              <Switch.Group as="div" className="flex items-center">
                <Switch
                  checked={settings.enabled}
                  onChange={handleToggleEnabled}
                  className={classNames(
                    settings.enabled
                      ? "bg-indigo-600"
                      : "bg-gray-200 dark:bg-gray-700",
                    "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      settings.enabled ? "translate-x-5" : "translate-x-0",
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    )}
                  />
                </Switch>
                <Switch.Label as="span" className="ml-3 text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {settings.enabled ? "Enabled" : "Disabled"}
                  </span>
                </Switch.Label>
              </Switch.Group>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <div className="relative flex flex-grow items-stretch focus-within:z-10">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <EnvelopeIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  disabled={!settings.enabled}
                  className={classNames(
                    !settings.enabled
                      ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                      : "",
                    "block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  )}
                  placeholder="you@example.com"
                  value={settings.emailAddress}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Follow-up Timing
            </h4>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              When should we remind you to follow up?
            </p>

            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label
                  htmlFor="after-applied"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Days after applying
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="after-applied"
                    id="after-applied"
                    min="1"
                    max="30"
                    disabled={!settings.enabled}
                    className={classNames(
                      !settings.enabled
                        ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                        : "",
                      "block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    )}
                    value={settings.followUpDays.afterApplied}
                    onChange={(e) =>
                      handleDaysChange("afterApplied", e.target.value)
                    }
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="after-interview"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Days after interview
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="after-interview"
                    id="after-interview"
                    min="1"
                    max="14"
                    disabled={!settings.enabled}
                    className={classNames(
                      !settings.enabled
                        ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                        : "",
                      "block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    )}
                    value={settings.followUpDays.afterInterview}
                    onChange={(e) =>
                      handleDaysChange("afterInterview", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Notification Types
            </h4>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Choose which types of follow-ups you&apos;d like to receive.
            </p>

            <div className="mt-4 space-y-4">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="application-reminders"
                    name="application-reminders"
                    type="checkbox"
                    disabled={!settings.enabled}
                    checked={settings.notifications.applicationReminders}
                    onChange={() =>
                      handleToggleNotification("applicationReminders")
                    }
                    className={classNames(
                      !settings.enabled ? "cursor-not-allowed" : "",
                      "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800"
                    )}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="application-reminders"
                    className="font-medium text-gray-700 dark:text-gray-300"
                  >
                    Application follow-ups
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">
                    Reminders to follow up after submitting an application
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="interview-reminders"
                    name="interview-reminders"
                    type="checkbox"
                    disabled={!settings.enabled}
                    checked={settings.notifications.interviewReminders}
                    onChange={() =>
                      handleToggleNotification("interviewReminders")
                    }
                    className={classNames(
                      !settings.enabled ? "cursor-not-allowed" : "",
                      "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800"
                    )}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="interview-reminders"
                    className="font-medium text-gray-700 dark:text-gray-300"
                  >
                    Interview follow-ups
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">
                    Reminders to follow up after completing interviews
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="status-changes"
                    name="status-changes"
                    type="checkbox"
                    disabled={!settings.enabled}
                    checked={settings.notifications.statusChanges}
                    onChange={() => handleToggleNotification("statusChanges")}
                    className={classNames(
                      !settings.enabled ? "cursor-not-allowed" : "",
                      "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800"
                    )}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="status-changes"
                    className="font-medium text-gray-700 dark:text-gray-300"
                  >
                    Status change alerts
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">
                    Notifications when application status changes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end space-x-4">
          {isSaved && (
            <span className="text-sm text-green-600 dark:text-green-400">
              Settings saved successfully
            </span>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={!settings.enabled || !settings.emailAddress}
            className={classNames(
              !settings.enabled || !settings.emailAddress
                ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600",
              "inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            )}
          >
            Save settings
          </button>
        </div>
      </div>
    </div>
  );
}
