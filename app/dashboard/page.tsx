"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardCard } from "@/components/dashboard";
import ConsolidatedJobCard from "@/components/dashboard/ConsolidatedJobCard";

interface UserData {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  location?: string;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  posted: string;
  status?: "applied" | "saved" | "interviewing" | "rejected" | "offered";
  description?: string;
  appliedDate?: string; // ISO date string for when the job was applied to
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Load user data
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Load jobs data
    const storedJobs = localStorage.getItem("jobs");
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    } else {
      // Set default jobs data if none exists
      const defaultJobs: Job[] = [
        {
          id: "1",
          title: "Frontend Developer",
          company: "TechCorp",
          location: "San Francisco, CA",
          type: "Full-time",
          posted: "2 days ago",
          status: "applied",
          appliedDate: new Date(
            Date.now() - 2 * 24 * 60 * 60 * 1000
          ).toISOString(), // 2 days ago
          description:
            "We're looking for a Frontend Developer experienced in React.js, TypeScript, and modern CSS frameworks to build user interfaces for our products.",
        },
        {
          id: "2",
          title: "Backend Engineer",
          company: "DataSystems",
          location: "Remote",
          type: "Full-time",
          posted: "1 week ago",
          status: "saved",
          description:
            "Join our team as a Backend Engineer with expertise in Node.js, MongoDB, and RESTful API design to help scale our data processing systems.",
        },
        {
          id: "3",
          title: "UX Designer",
          company: "CreativeAgency",
          location: "New York, NY",
          type: "Contract",
          posted: "3 days ago",
          description:
            "Creative Agency is seeking a talented UX Designer to create intuitive, user-centered digital experiences for our clients.",
        },
        {
          id: "4",
          title: "DevOps Engineer",
          company: "CloudTech",
          location: "Remote",
          type: "Full-time",
          posted: "Just now",
          status: "applied",
          appliedDate: new Date(
            Date.now() - 5 * 24 * 60 * 60 * 1000
          ).toISOString(), // 5 days ago
          description:
            "We need a DevOps Engineer with AWS expertise to optimize our cloud infrastructure and deployment processes.",
        },
        {
          id: "5",
          title: "Product Manager",
          company: "InnovateTech",
          location: "Boston, MA",
          type: "Full-time",
          posted: "5 days ago",
          status: "interviewing",
          appliedDate: new Date(
            Date.now() - 7 * 24 * 60 * 60 * 1000
          ).toISOString(), // 7 days ago
          description:
            "As a Product Manager, you'll lead the development of innovative software products from conception to launch, working with cross-functional teams.",
        },
        {
          id: "6",
          title: "Senior iOS Developer",
          company: "MobileFirst",
          location: "Chicago, IL",
          type: "Full-time",
          posted: "1 week ago",
          status: "rejected",
          appliedDate: new Date(
            Date.now() - 12 * 24 * 60 * 60 * 1000
          ).toISOString(), // 12 days ago
          description:
            "Looking for an experienced iOS developer to lead our mobile app development efforts and mentor junior developers.",
        },
        {
          id: "7",
          title: "Data Scientist",
          company: "AnalyticsPro",
          location: "Remote",
          type: "Full-time",
          posted: "3 days ago",
          status: "offered",
          appliedDate: new Date(
            Date.now() - 15 * 24 * 60 * 60 * 1000
          ).toISOString(), // 15 days ago
          description:
            "Join our data science team to build predictive models and derive insights from large datasets using machine learning techniques.",
        },
        {
          id: "8",
          title: "Full Stack Developer",
          company: "StartupHub",
          location: "Austin, TX",
          type: "Full-time",
          posted: "1 day ago",
          status: "applied",
          appliedDate: new Date().toISOString(), // today
          description:
            "Join our fast-growing startup as a Full Stack Developer working on exciting new products with cutting-edge technologies.",
        },
      ];
      setJobs(defaultJobs);
      localStorage.setItem("jobs", JSON.stringify(defaultJobs));
    }

    // Listen for storage events to update user and jobs data
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user" && e.newValue) {
        setUser(JSON.parse(e.newValue));
      }
      if (e.key === "jobs" && e.newValue) {
        setJobs(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isClient]);

  // Calculate job statistics
  const appliedJobs = jobs.filter((job) => job.status === "applied");

  // Sort applied jobs by appliedDate (most recent first)
  const sortedAppliedJobs = [...appliedJobs].sort((a, b) => {
    const dateA = a.appliedDate ? new Date(a.appliedDate).getTime() : 0;
    const dateB = b.appliedDate ? new Date(b.appliedDate).getTime() : 0;
    return dateB - dateA;
  });

  // Get the most recent job application
  const mostRecentJob =
    sortedAppliedJobs.length > 0 ? sortedAppliedJobs[0] : null;

  // Calculate days since submission for the most recent job
  let daysSinceSubmission: number | undefined = undefined;
  if (mostRecentJob?.appliedDate) {
    const appliedDate = new Date(mostRecentJob.appliedDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - appliedDate.getTime());
    daysSinceSubmission = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // If it's today, show 0 days
    if (daysSinceSubmission === 0) {
      daysSinceSubmission = 0;
    }
  }

  // Navigate to jobs page with specific filter
  const navigateToJobs = (status?: string) => {
    router.push(`/dashboard/jobs${status ? `?status=${status}` : ""}`);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h2>

      {/* Welcome section */}
      <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Welcome back, {user?.name || "User"}!
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
            <p>Here&apos;s an overview of your job application progress.</p>
          </div>
        </div>
      </div>

      {/* Consolidated Job Status Card */}
      <ConsolidatedJobCard
        appliedCount={appliedJobs.length}
        recentJobTitle={mostRecentJob?.title}
        daysSinceSubmission={daysSinceSubmission}
        onClick={() => navigateToJobs("applied")}
      />

      {/* Quick links */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <DashboardCard
          title="Find New Jobs"
          description="Browse through job listings and find your next opportunity."
        />
        <DashboardCard
          title="Application Tracker"
          description="Track the status of your applications with our Kanban board."
        />
        <DashboardCard
          title="Complete Your Profile"
          description="Enhance your profile to improve your chances of getting hired."
        />
      </div>

      {/* User info */}
      {user && (
        <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
          <div className="px-4 py-5 sm:p-6 dark:text-white">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
              Your Account Information
            </h3>
            <div className="mt-5 border-t border-gray-200 dark:border-gray-700">
              <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                    {user.name}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                    {user.email}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    User ID
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                    {user._id}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
