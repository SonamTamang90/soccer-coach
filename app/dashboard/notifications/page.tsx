"use client";

import { useState } from "react";
import { BellIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

// Sample notification data
const SAMPLE_NOTIFICATIONS = [
  {
    id: 1,
    title: "Welcome to Auth App",
    message: "Thanks for joining! We're glad to have you here.",
    date: "2 days ago",
    read: false,
  },
  {
    id: 2,
    title: "Profile completion reminder",
    message: "Complete your profile to get the most out of our platform.",
    date: "1 day ago",
    read: false,
  },
  {
    id: 3,
    title: "Account security tip",
    message: "Consider enabling two-factor authentication for better security.",
    date: "12 hours ago",
    read: true,
  },
  {
    id: 4,
    title: "New feature available",
    message: "We've added new features to the dashboard. Check them out!",
    date: "3 hours ago",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Notifications
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={markAllAsRead}
            className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Mark all as read
          </button>
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
          <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Recent Notifications
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                You have {unreadCount} unread notifications
              </p>
            </div>
          </div>
        </div>

        {notifications.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <BellIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No notifications
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You don&apos;t have any notifications at the moment.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`px-4 py-4 sm:px-6 ${
                  notification.read ? "bg-white" : "bg-indigo-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {notification.message}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {notification.date}
                    </p>
                  </div>
                  <div className="ml-4 flex shrink-0 space-x-2">
                    {!notification.read && (
                      <button
                        type="button"
                        onClick={() => markAsRead(notification.id)}
                        className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="sr-only">Mark as read</span>
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => deleteNotification(notification.id)}
                      className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">Delete</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
