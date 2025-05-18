"use client";

import { useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import ProfileForm from "@/components/forms/ProfileForm";

interface UserData {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  location?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleProfileUpdate = (updatedUser: UserData) => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="text-center">
        <p>Loading profile information...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center">
        <p>User information not found</p>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
              Edit Profile
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="bg-white p-6 shadow sm:rounded-lg dark:bg-gray-800">
          <ProfileForm initialData={user} onSuccess={handleProfileUpdate} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Profile
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg dark:bg-gray-800">
        <div className="px-4 py-5 sm:px-6 flex items-center">
          <div className="mr-4 h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-indigo-100 flex items-center justify-center dark:bg-indigo-900">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <UserIcon className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
              {user.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0 dark:border-gray-700">
          <dl className="sm:divide-y sm:divide-gray-200 dark:sm:divide-gray-700">
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Full name
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 dark:text-white">
                {user.name}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 dark:text-white">
                {user.email}
              </dd>
            </div>
            {user.bio && (
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Bio
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 dark:text-white">
                  {user.bio}
                </dd>
              </div>
            )}
            {user.phone && (
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Phone
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 dark:text-white">
                  {user.phone}
                </dd>
              </div>
            )}
            {user.location && (
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Location
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 dark:text-white">
                  {user.location}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}
