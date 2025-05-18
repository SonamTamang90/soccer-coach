import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  PencilIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { createFollowUpEmail, scheduleFollowUpEmail } from "@/lib/emailService";

// Enhanced status event tracking
export interface StatusEvent {
  type:
    | "applied"
    | "screening"
    | "interview_scheduled"
    | "interview_completed"
    | "technical_interview"
    | "follow_up"
    | "reference_check"
    | "offer"
    | "rejected"
    | "accepted"
    | "declined"
    | "note";
  date: string;
  notes?: string;
  contactPerson?: string;
}

export interface JobDetails {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
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

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobDetails | null;
  onUpdate?: (jobId: string, updates: Partial<JobDetails>) => void;
}

export default function JobDetailsModal({
  isOpen,
  onClose,
  job,
  onUpdate,
}: JobDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "timeline" | "notes">(
    "overview"
  );
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [showFollowUpConfirmation, setShowFollowUpConfirmation] =
    useState(false);

  if (!job) return null;

  const statusColors = {
    saved: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    applied: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    interviewing:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    offered:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  };

  // Calculate days since application
  let daysSinceApplied = "";
  if (job.appliedDate) {
    const appliedDate = new Date(job.appliedDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - appliedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      daysSinceApplied = "Applied today";
    } else if (diffDays === 1) {
      daysSinceApplied = "Applied yesterday";
    } else {
      daysSinceApplied = `Applied ${diffDays} days ago`;
    }
  }

  // Construct a timeline from statusEvents or fallback to old status
  const timeline = job.statusEvents || [];

  // If no status events but we have an appliedDate, create a basic applied event
  if (timeline.length === 0 && job.appliedDate) {
    timeline.push({
      type: "applied",
      date: job.appliedDate,
      notes: "Application submitted",
    });
  }

  // If we have a status but no matching event, add a synthetic event based on status
  if (job.status && !timeline.some((event) => event.type === job.status)) {
    if (job.status === "interviewing") {
      timeline.push({
        type: "interview_scheduled",
        date: new Date().toISOString(),
        notes: "Interview process started",
      });
    } else if (job.status === "offered") {
      timeline.push({
        type: "offer",
        date: new Date().toISOString(),
        notes: "Offer received",
      });
    } else if (job.status === "rejected") {
      timeline.push({
        type: "rejected",
        date: new Date().toISOString(),
        notes: "Application rejected",
      });
    }
  }

  // Sort timeline by date, newest first
  const sortedTimeline = [...timeline].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get formatted date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get status event icon and colors
  const getEventStyles = (eventType: StatusEvent["type"]) => {
    switch (eventType) {
      case "applied":
        return {
          color: "bg-blue-100 dark:bg-blue-900/50",
          dot: "bg-blue-600 dark:bg-blue-400",
        };
      case "screening":
      case "interview_scheduled":
      case "interview_completed":
      case "technical_interview":
      case "follow_up":
        return {
          color: "bg-green-100 dark:bg-green-900/50",
          dot: "bg-green-600 dark:bg-green-400",
        };
      case "reference_check":
        return {
          color: "bg-yellow-100 dark:bg-yellow-900/50",
          dot: "bg-yellow-600 dark:bg-yellow-400",
        };
      case "offer":
      case "accepted":
        return {
          color: "bg-purple-100 dark:bg-purple-900/50",
          dot: "bg-purple-600 dark:bg-purple-400",
        };
      case "rejected":
      case "declined":
        return {
          color: "bg-red-100 dark:bg-red-900/50",
          dot: "bg-red-600 dark:bg-red-400",
        };
      case "note":
      default:
        return {
          color: "bg-gray-100 dark:bg-gray-900/50",
          dot: "bg-gray-600 dark:bg-gray-400",
        };
    }
  };

  // Get human-readable event name
  const getEventName = (eventType: StatusEvent["type"]) => {
    switch (eventType) {
      case "applied":
        return "Applied";
      case "screening":
        return "Phone Screening";
      case "interview_scheduled":
        return "Interview Scheduled";
      case "interview_completed":
        return "Interview Completed";
      case "technical_interview":
        return "Technical Interview";
      case "follow_up":
        return "Follow-up";
      case "reference_check":
        return "Reference Check";
      case "offer":
        return "Offer Received";
      case "accepted":
        return "Offer Accepted";
      case "declined":
        return "Offer Declined";
      case "rejected":
        return "Application Rejected";
      case "note":
        return "Note";
      default:
        return eventType
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
    }
  };

  // Handle adding a new note
  const handleAddNote = () => {
    if (!noteText.trim() || !onUpdate || !job) return;

    const newEvent: StatusEvent = {
      type: "note",
      date: new Date().toISOString(),
      notes: noteText,
    };

    const updatedEvents = [...(job.statusEvents || []), newEvent];

    onUpdate(job.id, {
      statusEvents: updatedEvents,
    });

    setNoteText("");
    setIsAddingNote(false);
  };

  // Helper function to add a follow-up event
  const addFollowUpEvent = () => {
    if (!onUpdate || !job) return;

    const now = new Date().toISOString();
    const newEvent: StatusEvent = {
      type: "follow_up",
      date: now,
      notes: "Follow-up sent to the company",
    };

    const updatedEvents = [...(job.statusEvents || []), newEvent];

    onUpdate(job.id, {
      statusEvents: updatedEvents,
    });

    // Create and schedule follow-up email reminder
    const email = createFollowUpEmail(job.id, newEvent, job.title, job.company);

    if (email) {
      scheduleFollowUpEmail(email);
      setShowFollowUpConfirmation(true);
      setTimeout(() => setShowFollowUpConfirmation(false), 3000);
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity dark:bg-gray-900 dark:bg-opacity-90" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Header */}
                <div className="bg-gray-50 px-4 py-5 dark:bg-gray-900/50 sm:px-6">
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        {job.title}
                        {job.status && (
                          <span
                            className={`ml-3 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                              statusColors[job.status]
                            }`}
                          >
                            {job.status.charAt(0).toUpperCase() +
                              job.status.slice(1)}
                          </span>
                        )}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {job.company} • {job.location}
                      </p>
                      {daysSinceApplied && (
                        <p className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                          {daysSinceApplied}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {job.companyWebsite && (
                        <a
                          href={job.companyWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-600"
                        >
                          Visit Website
                        </a>
                      )}
                      {job.contactEmail && (
                        <a
                          href={`mailto:${job.contactEmail}`}
                          className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 shadow-sm hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50"
                        >
                          <EnvelopeIcon className="-ml-0.5 mr-1.5 inline-block h-4 w-4" />
                          Contact
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <nav className="-mb-px flex" aria-label="Tabs">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`${
                        activeTab === "overview"
                          ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      } w-1/3 border-b-2 py-4 px-1 text-center text-sm font-medium`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab("timeline")}
                      className={`${
                        activeTab === "timeline"
                          ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      } w-1/3 border-b-2 py-4 px-1 text-center text-sm font-medium`}
                    >
                      Timeline
                    </button>
                    <button
                      onClick={() => setActiveTab("notes")}
                      className={`${
                        activeTab === "notes"
                          ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      } w-1/3 border-b-2 py-4 px-1 text-center text-sm font-medium`}
                    >
                      Notes & Details
                    </button>
                  </nav>
                </div>

                {/* Tab content */}
                <div className="px-4 py-5 sm:p-6">
                  {/* Overview Tab */}
                  {activeTab === "overview" && (
                    <div className="space-y-4">
                      {job.description && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Description
                          </h4>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {job.description}
                          </p>
                        </div>
                      )}

                      {/* Job Details */}
                      <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Job Type
                          </h4>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {job.type}
                          </p>
                        </div>

                        {job.salary && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              Salary Range
                            </h4>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                              {job.salary}
                            </p>
                          </div>
                        )}

                        {job.contactEmail && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              Contact Email
                            </h4>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                              {job.contactEmail}
                            </p>
                          </div>
                        )}

                        {job.contactPhone && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              Contact Phone
                            </h4>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                              {job.contactPhone}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Application Materials */}
                      <div className="space-y-3 pt-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          Application Materials
                        </h4>

                        <div className="rounded-md border border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              Resume
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {job.resume || "No resume uploaded"}
                            </p>
                          </div>
                          {job.resume && (
                            <button className="rounded bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400">
                              View
                            </button>
                          )}
                        </div>

                        <div className="rounded-md border border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              Cover Letter
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {job.coverLetter || "No cover letter uploaded"}
                            </p>
                          </div>
                          {job.coverLetter && (
                            <button className="rounded bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400">
                              View
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Recent Activity */}
                      {sortedTimeline.length > 0 && (
                        <div className="pt-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              Recent Activity
                            </h4>
                            <button
                              onClick={() => setActiveTab("timeline")}
                              className="text-xs text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                            >
                              View all
                            </button>
                          </div>
                          <div className="mt-2 space-y-2">
                            {sortedTimeline
                              .slice(0, 3)
                              .map((event, eventIdx) => {
                                const styles = getEventStyles(event.type);
                                return (
                                  <div
                                    key={eventIdx}
                                    className="flex items-start"
                                  >
                                    <div>
                                      <div
                                        className={`flex h-6 w-6 items-center justify-center rounded-full ${styles.color}`}
                                      >
                                        <div
                                          className={`h-2 w-2 rounded-full ${styles.dot}`}
                                        ></div>
                                      </div>
                                      {eventIdx <
                                        Math.min(
                                          sortedTimeline.length - 1,
                                          2
                                        ) && (
                                        <div className="ml-3 -mt-1 h-6 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                                      )}
                                    </div>
                                    <div className="ml-4">
                                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {getEventName(event.type)}
                                      </p>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {formatDate(event.date)}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Timeline Tab */}
                  {activeTab === "timeline" && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                          Application Timeline
                        </h4>
                        <div className="flex space-x-2">
                          {onUpdate && (
                            <>
                              <button
                                onClick={addFollowUpEvent}
                                className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
                              >
                                <EnvelopeIcon className="-ml-0.5 mr-1.5 h-4 w-4" />
                                Record Follow-up
                              </button>
                              <button
                                onClick={() => setIsAddingNote(true)}
                                className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
                              >
                                <PencilIcon className="-ml-0.5 mr-1.5 h-4 w-4" />
                                Add Note
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {showFollowUpConfirmation && (
                        <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/30">
                          <div className="flex">
                            <div className="ml-3">
                              <p className="text-sm font-medium text-green-800 dark:text-green-300">
                                Follow-up recorded and reminder scheduled
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {isAddingNote && (
                        <div className="mt-2 rounded-md border border-gray-200 dark:border-gray-700 p-3">
                          <textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Enter your note..."
                            className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder-gray-400"
                            rows={3}
                          />
                          <div className="mt-2 flex justify-end space-x-2">
                            <button
                              type="button"
                              onClick={() => setIsAddingNote(false)}
                              className="rounded px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleAddNote}
                              className="rounded bg-indigo-600 px-2 py-1 text-sm text-white hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="mt-2 space-y-6">
                        {sortedTimeline.length > 0 ? (
                          sortedTimeline.map((event, eventIdx) => {
                            const styles = getEventStyles(event.type);
                            return (
                              <div key={eventIdx} className="flex items-start">
                                <div>
                                  <div
                                    className={`flex h-8 w-8 items-center justify-center rounded-full ${styles.color}`}
                                  >
                                    <div
                                      className={`h-2.5 w-2.5 rounded-full ${styles.dot}`}
                                    ></div>
                                  </div>
                                  {eventIdx < sortedTimeline.length - 1 && (
                                    <div className="ml-3.5 h-12 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                                  )}
                                </div>
                                <div className="ml-4 min-w-0 flex-1">
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                      {getEventName(event.type)}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {formatDate(event.date)}
                                    </p>
                                  </div>
                                  {(event.notes || event.contactPerson) && (
                                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                      {event.contactPerson && (
                                        <p className="mb-1 font-medium">
                                          Contact: {event.contactPerson}
                                        </p>
                                      )}
                                      {event.notes}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              No timeline events yet.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Notes & Details Tab */}
                  {activeTab === "notes" && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                          Notes
                        </h4>
                        {onUpdate && (
                          <button
                            onClick={() => setIsAddingNote(true)}
                            className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
                          >
                            <PencilIcon className="-ml-0.5 mr-1.5 h-4 w-4" />
                            Add Note
                          </button>
                        )}
                      </div>

                      {isAddingNote && (
                        <div className="mt-2 rounded-md border border-gray-200 dark:border-gray-700 p-3">
                          <textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Enter your note..."
                            className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder-gray-400"
                            rows={3}
                          />
                          <div className="mt-2 flex justify-end space-x-2">
                            <button
                              type="button"
                              onClick={() => setIsAddingNote(false)}
                              className="rounded px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleAddNote}
                              className="rounded bg-indigo-600 px-2 py-1 text-sm text-white hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="space-y-3">
                        {sortedTimeline.filter((event) => event.type === "note")
                          .length > 0 ? (
                          sortedTimeline
                            .filter((event) => event.type === "note")
                            .map((event, idx) => (
                              <div
                                key={idx}
                                className="rounded-md border border-gray-200 dark:border-gray-700 p-3"
                              >
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                  {event.notes}
                                </p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                  {formatDate(event.date)}
                                </p>
                              </div>
                            ))
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              No notes added yet.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Additional job details */}
                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                          Additional Details
                        </h4>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                          {job.url && (
                            <div>
                              <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Job URL
                              </h5>
                              <a
                                href={job.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 break-words"
                              >
                                {job.url}
                              </a>
                            </div>
                          )}

                          {job.companyWebsite && (
                            <div>
                              <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Company Website
                              </h5>
                              <a
                                href={job.companyWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 break-words"
                              >
                                {job.companyWebsite}
                              </a>
                            </div>
                          )}

                          {job.contactEmail && (
                            <div>
                              <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Contact Email
                              </h5>
                              <a
                                href={`mailto:${job.contactEmail}`}
                                className="mt-1 text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                              >
                                {job.contactEmail}
                              </a>
                            </div>
                          )}

                          {job.contactPhone && (
                            <div>
                              <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Contact Phone
                              </h5>
                              <a
                                href={`tel:${job.contactPhone}`}
                                className="mt-1 text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                              >
                                {job.contactPhone}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-4 py-3 dark:bg-gray-900/50 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto dark:bg-indigo-700 dark:hover:bg-indigo-600"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  {job.status === "applied" && onUpdate && (
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-600"
                      onClick={() =>
                        onUpdate(job.id, { status: "interviewing" })
                      }
                    >
                      Mark as Interviewing
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
