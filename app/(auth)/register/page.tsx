"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/shared/Logo";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "coach",
    teamName: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!formData.teamName.trim())
      newErrors.teamName = "Team/Organization name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // TODO: Implement actual registration logic
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Image with Blue Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/hero.png')",
          }}
        />

        {/* Subtle overlay for text readability */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div> */}

        {/* Content */}
        <div className="relative z-10 p-12 text-white w-full">
          {/* Logo */}
          <div className="mb-11">
            <Logo 
              size={56}
              textColor="text-white"
              textSize="text-xl"
              textClassName="drop-shadow-lg"
              iconClassName="w-14 h-14"
              className="space-x-1"
            />
          </div>

          {/* Main Content */}
          <div>
            <h1 className="text-5xl font-bold leading-tight mb-5 drop-shadow-lg">
              Build Champions, Not Just Teams.
            </h1>
            <p className="text-xl leading-relaxed max-w-lg drop-shadow-md">
              Simple, powerful tools to organize your team, track progress, and
              communicate effectively.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12 bg-surface">
        <div className="max-w-md w-full bg-surface-light p-8 rounded-2xl border border-dark shadow-2xl">
          {/* Header */}
          <div className="text-left mb-8">
            <h2 className="text-3xl font-bold text-primary-white mb-2">
              Let&apos;s get started
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="firstName"
                name="firstName"
                type="text"
                label="First name"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Alex"
                error={errors.firstName}
              />

              <Input
                id="lastName"
                name="lastName"
                type="text"
                label="Last name"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Parkinson"
                error={errors.lastName}
              />
            </div>

            {/* Email */}
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="alex@example.com"
              error={errors.email}
            />

            {/* Role and Team */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-primary-white mb-2"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 border border-dark rounded-xl text-primary-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-surface"
                >
                  <option value="coach">Coach</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Administrator</option>
                  <option value="parent">Parent</option>
                </select>
              </div>

              <Input
                id="teamName"
                name="teamName"
                type="text"
                label="Team name"
                required
                value={formData.teamName}
                onChange={handleInputChange}
                placeholder="Eagles FC"
                error={errors.teamName}
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-primary-white mb-2"
              >
                Phone number
              </label>
              <div className="flex">
                <div className="flex items-center px-3 py-3.5 border border-r-0 border-dark rounded-l-xl bg-surface">
                  <span className="mr-2">🇺🇸</span>
                  <span className="text-sm text-secondary">+1</span>
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="478729"
                  className="flex-1 px-4 py-3.5 border border-dark rounded-r-xl text-primary-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-surface placeholder-secondary"
                />
              </div>
            </div>

            {/* Password */}
            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              required
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••••••"
              showPasswordToggle
              error={errors.password}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-primary hover:bg-primary text-black py-4 text-base font-semibold"
            >
              GET STARTED →
            </Button>
          </form>

          {/* Sign in link */}
          <div className="text-center mt-6">
            <p className="text-sm text-secondary">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-primary hover:text-primary transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
