"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const profileSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    bio: z.string().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => !data.newPassword || data.newPassword === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  )
  .refine((data) => !data.newPassword || data.currentPassword, {
    message: "Current password is required to set a new password",
    path: ["currentPassword"],
  });

type ProfileFormValues = z.infer<typeof profileSchema>;

// Define proper types for the update data
interface UpdateUserData {
  userId: string;
  name: string;
  bio?: string;
  phone?: string;
  location?: string;
  avatar?: string;
  password?: string;
  currentPassword?: string;
}

interface ProfileFormProps {
  initialData: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
    phone?: string;
    location?: string;
  };
  onSuccess: (data: UpdateUserData) => void;
}

export default function ProfileForm({
  initialData,
  onSuccess,
}: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    initialData.avatar || null
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialData.name,
      email: initialData.email,
      bio: initialData.bio || "",
      phone: initialData.phone || "",
      location: initialData.location || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setFormError("Please upload an image file");
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setFormError("Image size should be less than 2MB");
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFormError(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // New function to handle avatar-only updates
  const handleAvatarOnlyUpdate = async () => {
    if (!avatarFile) {
      setFormError("Please select a new profile picture first");
      return;
    }

    setLoading(true);
    setFormError(null);

    try {
      // Upload avatar
      let avatarUrl = initialData.avatar;

      const formData = new FormData();
      formData.append("file", avatarFile);

      // For local development testing without Cloudinary
      // Store the image in a base64 format, which isn't ideal for production
      // but works for demonstration
      const reader = new FileReader();
      reader.readAsDataURL(avatarFile);

      await new Promise<void>((resolve) => {
        reader.onloadend = () => {
          avatarUrl = reader.result as string;
          resolve();
        };
      });

      // In a real app, you'd use Cloudinary or another storage service like this:
      /*
      formData.append("upload_preset", "your_preset_name"); 
      const uploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const uploadResult = await uploadResponse.json();
      if (uploadResult.secure_url) {
        avatarUrl = uploadResult.secure_url;
      }
      */

      // Update just the avatar
      const updateData: UpdateUserData = {
        userId: initialData._id,
        name: initialData.name, // Required field
        avatar: avatarUrl,
      };

      const response = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error?.form || "Failed to update profile picture"
        );
      }

      // Update local storage with new user data
      if (result.success) {
        const userData = result.data;
        localStorage.setItem("user", JSON.stringify(userData));

        // Trigger a storage event to notify other components
        window.dispatchEvent(
          new StorageEvent("storage", {
            key: "user",
            newValue: JSON.stringify(userData),
          })
        );

        onSuccess(userData);
      }
    } catch (error) {
      console.error("Avatar update error:", error);
      setFormError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (data: ProfileFormValues) => {
    setLoading(true);
    setFormError(null);

    try {
      // First, upload avatar if there's a new one
      let avatarUrl = initialData.avatar;

      if (avatarFile) {
        // For local development testing without Cloudinary
        // Store the image in a base64 format
        const reader = new FileReader();
        reader.readAsDataURL(avatarFile);

        await new Promise<void>((resolve) => {
          reader.onloadend = () => {
            avatarUrl = reader.result as string;
            resolve();
          };
        });

        // In a real app with Cloudinary:
        /*
        const formData = new FormData();
        formData.append("file", avatarFile);
        formData.append("upload_preset", "your_preset_name");

        const uploadResponse = await fetch(
          "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const uploadResult = await uploadResponse.json();
        if (uploadResult.secure_url) {
          avatarUrl = uploadResult.secure_url;
        }
        */
      }

      // Now update user profile with avatar URL
      const updateData: UpdateUserData = {
        userId: initialData._id,
        name: data.name,
        bio: data.bio,
        phone: data.phone,
        location: data.location,
        avatar: avatarUrl,
      };

      // Only include password fields if a new password is being set
      if (data.newPassword) {
        updateData.password = data.newPassword;
        updateData.currentPassword = data.currentPassword;
      }

      const response = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.form || "Failed to update profile");
      }

      // Update local storage with new user data
      if (result.success) {
        const userData = result.data;
        localStorage.setItem("user", JSON.stringify(userData));

        // Trigger a storage event to notify other components
        window.dispatchEvent(
          new StorageEvent("storage", {
            key: "user",
            newValue: JSON.stringify(userData),
          })
        );

        onSuccess(userData);

        // Reset password fields
        reset({
          ...data,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error("Profile update error:", error);
      setFormError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {formError && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{formError}</p>
        </div>
      )}

      {/* Avatar upload */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative h-32 w-32">
          {avatarPreview ? (
            <Image
              src={avatarPreview}
              alt="Avatar preview"
              width={128}
              height={128}
              className="h-32 w-32 rounded-full object-cover"
            />
          ) : (
            <UserCircleIcon className="h-32 w-32 text-gray-300 dark:text-gray-600" />
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={triggerFileInput}
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700"
          >
            Choose picture
          </button>

          {avatarFile && (
            <button
              type="button"
              onClick={handleAvatarOnlyUpdate}
              disabled={loading}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
            >
              {loading ? "Updating..." : "Update picture only"}
            </button>
          )}
        </div>
      </div>

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Full Name
        </label>
        <div className="mt-1">
          <input
            id="name"
            {...register("name")}
            type="text"
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            {...register("email")}
            type="email"
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Bio */}
      <div>
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Bio
        </label>
        <div className="mt-1">
          <textarea
            id="bio"
            {...register("bio")}
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder="Tell us about yourself"
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Phone
        </label>
        <div className="mt-1">
          <input
            id="phone"
            {...register("phone")}
            type="text"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Location
        </label>
        <div className="mt-1">
          <input
            id="location"
            {...register("location")}
            type="text"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      <div className="pt-5">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          Change Password
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Leave blank if you don&apos;t want to change your password
        </p>
      </div>

      {/* Current Password */}
      <div>
        <label
          htmlFor="currentPassword"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Current Password
        </label>
        <div className="mt-1">
          <input
            id="currentPassword"
            {...register("currentPassword")}
            type="password"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.currentPassword.message}
            </p>
          )}
        </div>
      </div>

      {/* New Password */}
      <div>
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          New Password
        </label>
        <div className="mt-1">
          <input
            id="newPassword"
            {...register("newPassword")}
            type="password"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.newPassword.message}
            </p>
          )}
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Confirm New Password
        </label>
        <div className="mt-1">
          <input
            id="confirmPassword"
            {...register("confirmPassword")}
            type="password"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit button */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70"
        >
          {loading ? "Saving..." : "Save All Changes"}
        </button>
      </div>
    </form>
  );
}
