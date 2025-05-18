"use client";

import { useState, useEffect } from "react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
} from "../../../components/ui/DragDropWrapper";
import JobDetailsModal, {
  StatusEvent,
} from "@/components/dashboard/JobDetailsModal";
import { createFollowUpEmail, scheduleFollowUpEmail } from "@/lib/emailService";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  posted: string;
  status?: "applied" | "saved" | "interviewing" | "rejected" | "offered";
  description?: string;
  appliedDate?: string;
  resume?: string;
  coverLetter?: string;
  salary?: string;
  url?: string;
  companyWebsite?: string;
  contactEmail?: string;
  contactPhone?: string;
  statusEvents?: StatusEvent[];
}

const KANBAN_COLUMNS = [
  { id: "saved", name: "Saved", color: "bg-gray-100 dark:bg-gray-700" },
  { id: "applied", name: "Applied", color: "bg-blue-100 dark:bg-blue-900" },
  {
    id: "interviewing",
    name: "Interviewing",
    color: "bg-green-100 dark:bg-green-900",
  },
  { id: "rejected", name: "Rejected", color: "bg-red-100 dark:bg-red-900" },
  { id: "offered", name: "Offered", color: "bg-purple-100 dark:bg-purple-900" },
];

export default function JobsPage() {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  const fiveDaysAgo = new Date(today);
  fiveDaysAgo.setDate(today.getDate() - 5);

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const tenDaysAgo = new Date(today);
  tenDaysAgo.setDate(today.getDate() - 10);

  const twelveDaysAgo = new Date(today);
  twelveDaysAgo.setDate(today.getDate() - 12);

  const fifteenDaysAgo = new Date(today);
  fifteenDaysAgo.setDate(today.getDate() - 15);

  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Full-time",
      posted: "2 days ago",
      status: "applied",
      appliedDate: twoDaysAgo.toISOString(),
      description:
        "We're looking for a Frontend Developer experienced in React.js, TypeScript, and modern CSS frameworks to build user interfaces for our products.",
      resume: "John_Doe_Resume.pdf",
      coverLetter: "Cover_Letter_TechCorp.pdf",
      salary: "$120,000 - $150,000",
      url: "https://example.com/jobs/frontend-developer",
      companyWebsite: "https://techcorp-example.com",
      contactEmail: "hiring@techcorp-example.com",
      statusEvents: [
        {
          type: "applied",
          date: twoDaysAgo.toISOString(),
          notes: "Applied online through company website",
        },
      ],
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
      salary: "$130,000 - $160,000",
      url: "https://example.com/jobs/backend-engineer",
      statusEvents: [
        {
          type: "note",
          date: tenDaysAgo.toISOString(),
          notes: "Saved for later consideration, need to update resume",
        },
      ],
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
      url: "https://example.com/jobs/ux-designer",
    },
    {
      id: "4",
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Remote",
      type: "Full-time",
      posted: "Just now",
      status: "applied",
      appliedDate: fiveDaysAgo.toISOString(),
      description:
        "We need a DevOps Engineer with AWS expertise to optimize our cloud infrastructure and deployment processes.",
      resume: "John_Doe_Resume.pdf",
      salary: "$125,000 - $155,000",
      companyWebsite: "https://cloudtech-example.com",
      statusEvents: [
        {
          type: "applied",
          date: fiveDaysAgo.toISOString(),
          notes: "Applied through LinkedIn Easy Apply",
        },
        {
          type: "note",
          date: new Date(fiveDaysAgo.getTime() + 86400000).toISOString(),
          notes: "Received confirmation email, application under review",
        },
      ],
    },
    {
      id: "5",
      title: "Product Manager",
      company: "InnovateTech",
      location: "Boston, MA",
      type: "Full-time",
      posted: "5 days ago",
      status: "interviewing",
      appliedDate: sevenDaysAgo.toISOString(),
      description:
        "As a Product Manager, you'll lead the development of innovative software products from conception to launch, working with cross-functional teams.",
      resume: "John_Doe_Resume.pdf",
      coverLetter: "PM_Cover_Letter.pdf",
      salary: "$140,000 - $170,000",
      contactEmail: "pm-hiring@innovatetech-example.com",
      contactPhone: "555-123-4567",
      statusEvents: [
        {
          type: "applied",
          date: sevenDaysAgo.toISOString(),
          notes: "Applied through company careers page",
        },
        {
          type: "screening",
          date: new Date(sevenDaysAgo.getTime() + 172800000).toISOString(),
          notes: "Initial phone screening with HR",
          contactPerson: "Sarah Johnson, HR Manager",
        },
        {
          type: "interview_scheduled",
          date: today.toISOString(),
          notes: "Technical interview scheduled for next week",
          contactPerson: "Mike Chen, Senior PM",
        },
      ],
    },
    {
      id: "6",
      title: "Senior iOS Developer",
      company: "MobileFirst",
      location: "Chicago, IL",
      type: "Full-time",
      posted: "1 week ago",
      status: "rejected",
      appliedDate: twelveDaysAgo.toISOString(),
      description:
        "Looking for an experienced iOS developer to lead our mobile app development efforts and mentor junior developers.",
      resume: "John_Doe_Resume.pdf",
      coverLetter: "iOS_Dev_Cover_Letter.pdf",
      statusEvents: [
        {
          type: "applied",
          date: twelveDaysAgo.toISOString(),
          notes: "Applied through company website",
        },
        {
          type: "screening",
          date: new Date(twelveDaysAgo.getTime() + 172800000).toISOString(),
          notes: "15-minute phone screen with recruiter",
          contactPerson: "Alex Torres, Technical Recruiter",
        },
        {
          type: "interview_completed",
          date: new Date(twelveDaysAgo.getTime() + 345600000).toISOString(),
          notes: "Technical interview with iOS team lead",
          contactPerson: "Jennifer Lee, iOS Team Lead",
        },
        {
          type: "rejected",
          date: today.toISOString(),
          notes: "Position required stronger Swift experience",
        },
      ],
    },
    {
      id: "7",
      title: "Data Scientist",
      company: "AnalyticsPro",
      location: "Remote",
      type: "Full-time",
      posted: "3 days ago",
      status: "offered",
      appliedDate: fifteenDaysAgo.toISOString(),
      description:
        "Join our data science team to build predictive models and derive insights from large datasets using machine learning techniques.",
      resume: "John_Doe_Resume.pdf",
      coverLetter: "Data_Scientist_Cover.pdf",
      salary: "$135,000 - $165,000",
      contactEmail: "talent@analyticspro-example.com",
      statusEvents: [
        {
          type: "applied",
          date: fifteenDaysAgo.toISOString(),
          notes: "Applied through LinkedIn",
        },
        {
          type: "screening",
          date: new Date(fifteenDaysAgo.getTime() + 172800000).toISOString(),
          notes: "Initial screening call with recruiter",
          contactPerson: "Maria Garcia, Talent Acquisition",
        },
        {
          type: "technical_interview",
          date: new Date(fifteenDaysAgo.getTime() + 345600000).toISOString(),
          notes: "Technical assessment and modeling challenge",
        },
        {
          type: "interview_completed",
          date: new Date(fifteenDaysAgo.getTime() + 518400000).toISOString(),
          notes: "Panel interview with data science team",
        },
        {
          type: "reference_check",
          date: new Date(fifteenDaysAgo.getTime() + 691200000).toISOString(),
          notes: "References contacted and checked",
        },
        {
          type: "offer",
          date: new Date(fifteenDaysAgo.getTime() + 864000000).toISOString(),
          notes: "Verbal offer made via phone call",
        },
      ],
    },
    {
      id: "8",
      title: "Full Stack Developer",
      company: "StartupHub",
      location: "Austin, TX",
      type: "Full-time",
      posted: "1 day ago",
      description:
        "Join our fast-growing startup as a Full Stack Developer working on exciting new products with cutting-edge technologies.",
      salary: "$110,000 - $140,000",
      companyWebsite: "https://startuphub-example.com",
    },
  ]);

  const [isClient, setIsClient] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"listings" | "kanban">("listings");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCardJob, setSelectedCardJob] = useState<Job | null>(null);

  // Mark when we're on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load jobs from localStorage on initial render
  useEffect(() => {
    if (!isClient) return;

    const storedJobs = localStorage.getItem("jobs");
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }

    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    const statusParam = params.get("status");

    // Set initial filters based on URL parameters
    if (statusParam) {
      setStatusFilter(statusParam);
    }
  }, [isClient]);

  // Save jobs to localStorage whenever they change
  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem("jobs", JSON.stringify(jobs));

    // Dispatch storage event to update other components
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "jobs",
        newValue: JSON.stringify(jobs),
      })
    );
  }, [jobs, isClient]);

  // Function to save or unsave a job
  const toggleSaveJob = (jobId: string) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id === jobId) {
          // If saved, unsave it; if not saved, save it
          if (job.status === "saved") {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { status, ...jobWithoutStatus } = job;
            return jobWithoutStatus;
          } else {
            return { ...job, status: "saved" };
          }
        }
        return job;
      })
    );
  };

  // Function to update a job
  const updateJob = (jobId: string, updates: Partial<Job>) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id === jobId) {
          const updatedJob = { ...job, ...updates };

          // Check if a status event was added
          if (updates.statusEvents && job.statusEvents) {
            const newEvents = updates.statusEvents.filter(
              (newEvent) =>
                !job.statusEvents?.some(
                  (existingEvent) =>
                    existingEvent.date === newEvent.date &&
                    existingEvent.type === newEvent.type
                )
            );

            // Schedule follow-up emails for new events if appropriate
            newEvents.forEach((event) => {
              if (
                event.type === "applied" ||
                event.type === "interview_completed" ||
                event.type === "technical_interview"
              ) {
                const email = createFollowUpEmail(
                  job.id,
                  event,
                  job.title,
                  job.company
                );

                if (email) {
                  scheduleFollowUpEmail(email);
                  console.log(
                    `Scheduled follow-up email for ${event.type} event`
                  );
                }
              }
            });
          }

          return updatedJob;
        }
        return job;
      })
    );
  };

  // Function to apply for a job
  const applyForJob = (jobId: string) => {
    const now = new Date().toISOString();
    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id === jobId) {
          // Create a status event for the application
          const newStatusEvent: StatusEvent = {
            type: "applied",
            date: now,
            notes: "Application submitted",
          };

          // Add the event to existing events or create a new array
          const updatedStatusEvents = job.statusEvents
            ? [...job.statusEvents, newStatusEvent]
            : [newStatusEvent];

          const updatedJob: Job = {
            ...job,
            status: "applied" as const,
            appliedDate: now,
            resume: job.resume || "John_Doe_Resume.pdf", // Default resume
            statusEvents: updatedStatusEvents,
          };

          // Schedule a follow-up email reminder
          const email = createFollowUpEmail(
            job.id,
            newStatusEvent,
            job.title,
            job.company
          );

          if (email) {
            scheduleFollowUpEmail(email);
          }

          return updatedJob;
        }
        return job;
      })
    );
  };

  // Function to update job status in Kanban board
  const updateJobStatus = (jobId: string, newStatus: Job["status"]) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id === jobId) {
          return { ...job, status: newStatus };
        }
        return job;
      })
    );
  };

  // Handle drag end event for the Kanban board
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If dropped outside of a droppable area or in the same place
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    // Get the new status
    const newStatus = destination.droppableId as Job["status"];

    // Find the job being moved
    const job = jobs.find((job) => job.id === draggableId);

    if (job) {
      // Create a status event based on the new status
      let eventType: StatusEvent["type"];
      let notes = "Status updated";

      switch (newStatus) {
        case "interviewing":
          eventType = "interview_scheduled";
          notes = "Interview process started";
          break;
        case "offered":
          eventType = "offer";
          notes = "Offer received";
          break;
        case "rejected":
          eventType = "rejected";
          notes = "Application rejected";
          break;
        case "saved":
          eventType = "note";
          notes = "Saved for later consideration";
          break;
        default:
          eventType = "applied";
          notes = "Application submitted";
      }

      // Create the new status event
      const newStatusEvent: StatusEvent = {
        type: eventType,
        date: new Date().toISOString(),
        notes,
      };

      // Add the event to existing events or create a new array
      const updatedStatusEvents = job.statusEvents
        ? [...job.statusEvents, newStatusEvent]
        : [newStatusEvent];

      // Update the job with new status and event
      updateJob(draggableId, {
        status: newStatus,
        statusEvents: updatedStatusEvents,
      });
    } else {
      // Fallback to simple status update if job not found
      updateJobStatus(draggableId, newStatus);
    }
  };

  // Get filtered jobs
  const filteredJobs = jobs.filter((job) => {
    // Filter by status
    if (statusFilter !== "all") {
      if (statusFilter === "none") {
        if (job.status) return false;
      } else if (job.status !== statusFilter) {
        return false;
      }
    }

    // Filter by job type
    if (typeFilter !== "all" && job.type !== typeFilter) {
      return false;
    }

    // Filter by search term
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Get jobs for each Kanban column
  const getColumnJobs = (columnId: string) => {
    return jobs.filter((job) => job.status === columnId);
  };

  // Reset all job statuses (for demo purposes)
  const resetJobStatuses = () => {
    const demoStatuses: (
      | "saved"
      | "applied"
      | "interviewing"
      | "rejected"
      | "offered"
    )[] = ["saved", "applied", "interviewing", "rejected", "offered"];

    setJobs((prevJobs) =>
      prevJobs.map((job, index) => {
        // Assign a status or remove status based on index
        if (index < demoStatuses.length) {
          return { ...job, status: demoStatuses[index] };
        } else if (index % 3 === 0) {
          // Remove status for some jobs
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { status, ...jobWithoutStatus } = job;
          return jobWithoutStatus as Job;
        }
        return job;
      })
    );
  };

  // Function to open the job details modal
  const openJobModal = (job: Job) => {
    setSelectedCardJob(job);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeJobModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Tab navigation */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("listings")}
            className={`${
              activeTab === "listings"
                ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            Job Listings
          </button>
          <button
            onClick={() => setActiveTab("kanban")}
            className={`${
              activeTab === "kanban"
                ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            Application Tracker
          </button>
        </nav>
      </div>

      {activeTab === "listings" ? (
        <>
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Job Listings
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Discover opportunities that match your skills and interests
              </p>
            </div>
            <div className="mt-4 flex md:ml-4 md:mt-0">
              <span className="rounded-md shadow-sm">
                <button
                  type="button"
                  className="flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  <Bars3Icon
                    className="-ml-1 mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  Sort
                </button>
              </span>
            </div>
          </div>

          {/* Filters and search */}
          <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-800">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="relative rounded-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                />
              </div>

              <div>
                <label htmlFor="status-filter" className="sr-only">
                  Status
                </label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="none">Not Applied</option>
                  <option value="saved">Saved</option>
                  <option value="applied">Applied</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="rejected">Rejected</option>
                  <option value="offered">Offered</option>
                </select>
              </div>

              <div>
                <label htmlFor="type-filter" className="sr-only">
                  Job Type
                </label>
                <select
                  id="type-filter"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                    setTypeFilter("all");
                  }}
                  className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-700 dark:hover:bg-indigo-600"
                >
                  <FunnelIcon
                    className="-ml-1 mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Job count */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </p>
          </div>

          {/* Job listings */}
          <div className="grid grid-cols-1 gap-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition-all hover:shadow-md cursor-pointer"
                  onClick={() =>
                    setSelectedJob(selectedJob?.id === job.id ? null : job)
                  }
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
                        {job.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {job.company} • {job.location}
                      </p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {job.type} • Posted {job.posted}
                      </p>
                    </div>
                    {job.status && (
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          job.status === "applied"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            : job.status === "saved"
                            ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                            : job.status === "interviewing"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : job.status === "rejected"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                        }`}
                      >
                        {job.status.charAt(0).toUpperCase() +
                          job.status.slice(1)}
                      </span>
                    )}
                  </div>
                  {selectedJob && selectedJob.id === job.id && (
                    <div className="mt-4 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <h4 className="text-base font-semibold mb-2">
                          Job Description
                        </h4>
                        <p>{job.description}</p>

                        <h4 className="text-base font-semibold mt-4 mb-2">
                          Requirements
                        </h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>
                            Experience with{" "}
                            {job.title.includes("Frontend")
                              ? "React, TypeScript, and modern CSS"
                              : job.title.includes("Backend")
                              ? "Node.js, databases, and API design"
                              : "relevant technologies"}
                          </li>
                          <li>
                            {job.type === "Full-time"
                              ? "Ability to work full-time"
                              : job.type === "Contract"
                              ? "Available for contract work"
                              : "Flexible schedule"}
                          </li>
                          <li>Strong communication and teamwork skills</li>
                          <li>
                            {job.location.includes("Remote")
                              ? "Comfortable with remote work environment"
                              : `Located in or willing to relocate to ${job.location}`}
                          </li>
                        </ul>

                        <h4 className="text-base font-semibold mt-4 mb-2">
                          Benefits
                        </h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Competitive salary</li>
                          <li>Health insurance</li>
                          <li>Flexible working hours</li>
                          <li>
                            {job.location.includes("Remote")
                              ? "Remote-first culture"
                              : "Modern office space"}
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                  <div
                    className="mt-4 flex space-x-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {job.status === "applied" ||
                    job.status === "interviewing" ? (
                      <button className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-700 dark:hover:bg-indigo-600">
                        View Application
                      </button>
                    ) : (
                      <button
                        onClick={() => applyForJob(job.id)}
                        className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-700 dark:hover:bg-indigo-600"
                      >
                        Apply Now
                      </button>
                    )}

                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className={`rounded border px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                        job.status === "saved"
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:border-indigo-400 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {job.status === "saved" ? "Saved" : "Save"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No jobs match your filters. Try adjusting your search
                  criteria.
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Kanban board header */}
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Application Tracker
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Track the status of your job applications (Drag & Drop cards
                between columns)
              </p>
            </div>
            <div className="mt-4 flex items-center space-x-3 md:ml-4 md:mt-0">
              <button
                onClick={resetJobStatuses}
                type="button"
                className="flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                <ArrowPathIcon
                  className="-ml-1 mr-2 h-5 w-5"
                  aria-hidden="true"
                />
                Randomize (Demo)
              </button>
            </div>
          </div>

          {/* Kanban board with drag and drop */}
          <div className="overflow-x-auto pb-4">
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="flex min-w-[1000px] space-x-4">
                {KANBAN_COLUMNS.map((column) => {
                  const columnJobs = getColumnJobs(column.id);

                  return (
                    <div key={column.id} className="w-1/5 flex-shrink-0">
                      <div
                        className={`rounded-t-md ${column.color} px-4 py-2 font-medium`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{column.name}</span>
                          <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold dark:bg-gray-700">
                            {columnJobs.length}
                          </span>
                        </div>
                      </div>

                      <Droppable droppableId={column.id}>
                        {(
                          provided: DroppableProvided,
                          snapshot: DroppableStateSnapshot
                        ) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`mt-2 min-h-[500px] rounded-b-md space-y-3 p-2 transition-colors ${
                              snapshot.isDraggingOver
                                ? `${column.color} bg-opacity-50`
                                : "bg-gray-50 dark:bg-gray-900"
                            }`}
                          >
                            {columnJobs.length > 0 ? (
                              columnJobs.map((job, index) => (
                                <Draggable
                                  key={job.id}
                                  draggableId={job.id}
                                  index={index}
                                >
                                  {(
                                    provided: DraggableProvided,
                                    snapshot: DraggableStateSnapshot
                                  ) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`rounded-md border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800 ${
                                        snapshot.isDragging
                                          ? "opacity-75 shadow-lg ring-2 ring-indigo-500"
                                          : ""
                                      } cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700`}
                                      style={{
                                        ...provided.draggableProps.style,
                                      }}
                                      onClick={() => openJobModal(job)}
                                    >
                                      <div className="flex flex-col space-y-2">
                                        <div>
                                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                            {job.title}
                                          </h3>
                                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                            {job.company}
                                          </p>
                                          <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {job.location}
                                          </p>
                                        </div>
                                        <div className="flex items-center pt-2">
                                          <span className="inline-block w-2 h-2 rounded-full mr-1 bg-indigo-400"></span>
                                          <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {job.type}
                                          </span>
                                        </div>
                                        {job.appliedDate && (
                                          <div className="flex items-center pt-1">
                                            <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                                              {new Date(
                                                job.appliedDate
                                              ).toLocaleDateString()}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))
                            ) : (
                              <div className="rounded-md border border-dashed border-gray-300 bg-white p-4 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                                Drop jobs here
                              </div>
                            )}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  );
                })}
              </div>
            </DragDropContext>
          </div>

          {/* Instructions panel */}
          <div className="mt-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4">
            <h3 className="text-md font-medium text-indigo-800 dark:text-indigo-300">
              How to use the Kanban board
            </h3>
            <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-400">
              • Drag and drop job cards between columns to update their status
              <br />
              • The board automatically reflects your application progress
              <br />• Click on any card to view detailed application information
              <br />• Use the &quot;Randomize&quot; button to reset the board
              for demonstration purposes
            </p>
          </div>
        </>
      )}

      {/* Job Details Modal */}
      <JobDetailsModal
        isOpen={isModalOpen}
        onClose={closeJobModal}
        job={selectedCardJob}
        onUpdate={updateJob}
      />
    </div>
  );
}
