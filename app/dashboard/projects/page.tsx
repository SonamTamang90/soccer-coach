"use client";

import { useState } from "react";
import { Tab } from "@headlessui/react";
import {
  PlusIcon,
  CheckCircleIcon,
  ClockIcon,
  BeakerIcon,
  BoltIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

// Sample data
const sampleProjects = [
  {
    id: 1,
    name: "E-commerce Dashboard",
    description: "A React-based admin dashboard for an e-commerce platform",
    progress: 75,
    technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    status: "in_progress",
    lastUpdated: "2023-05-15",
    milestones: [
      { id: 1, name: "Authentication Flow", completed: true },
      { id: 2, name: "Product Management UI", completed: true },
      { id: 3, name: "Analytics Dashboard", completed: false },
      { id: 4, name: "Order Management System", completed: false },
    ],
  },
  {
    id: 2,
    name: "Task Management App",
    description: "A mobile-friendly task management application",
    progress: 40,
    technologies: ["Vue.js", "Firebase", "Sass"],
    status: "in_progress",
    lastUpdated: "2023-05-10",
    milestones: [
      { id: 1, name: "User Authentication", completed: true },
      { id: 2, name: "Task CRUD Operations", completed: true },
      { id: 3, name: "Drag and Drop Interface", completed: false },
      { id: 4, name: "Mobile Responsiveness", completed: false },
      { id: 5, name: "Notifications System", completed: false },
    ],
  },
  {
    id: 3,
    name: "Personal Portfolio",
    description: "My developer portfolio website",
    progress: 100,
    technologies: ["React", "Three.js", "GSAP", "Framer Motion"],
    status: "completed",
    lastUpdated: "2023-04-28",
    milestones: [
      { id: 1, name: "Homepage Design", completed: true },
      { id: 2, name: "Project Showcase", completed: true },
      { id: 3, name: "Contact Form", completed: true },
      { id: 4, name: "Animations", completed: true },
      { id: 5, name: "Responsive Design", completed: true },
    ],
  },
];

const learningTracks = [
  {
    id: 1,
    name: "Advanced React Patterns",
    progress: 65,
    resources: [
      { name: "Epic React by Kent C. Dodds", type: "Course", completed: true },
      { name: "React Design Patterns", type: "Book", completed: false },
      {
        name: "State Management Deep Dive",
        type: "Workshop",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    name: "TypeScript Mastery",
    progress: 80,
    resources: [
      { name: "TypeScript Handbook", type: "Documentation", completed: true },
      { name: "Advanced Types Workshop", type: "Course", completed: true },
      { name: "Production TypeScript", type: "Book", completed: false },
    ],
  },
  {
    id: 3,
    name: "Web Performance Optimization",
    progress: 45,
    resources: [
      { name: "Web Vitals", type: "Documentation", completed: true },
      {
        name: "Performance Measuring Tools",
        type: "Tutorial",
        completed: true,
      },
      { name: "Advanced Loading Strategies", type: "Course", completed: false },
      { name: "Performance Case Studies", type: "Workshop", completed: false },
    ],
  },
];

const achievements = [
  {
    id: 1,
    name: "First Client Project",
    description: "Completed my first paid client project",
    date: "2023-02-15",
    icon: CheckCircleIcon,
  },
  {
    id: 2,
    name: "100 GitHub Commits",
    description: "Reached 100 commits on GitHub in a single month",
    date: "2023-03-30",
    icon: CodeBracketIcon,
  },
  {
    id: 3,
    name: "Conference Talk",
    description: "Gave my first tech talk at a local developer meetup",
    date: "2023-05-05",
    icon: BoltIcon,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProjectsPage() {
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Developer Hub
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track your projects, learning, and achievements
          </p>
        </div>
        <button
          onClick={() => setShowNewProjectForm(!showNewProjectForm)}
          className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          New Project
        </button>
      </div>

      {showNewProjectForm && (
        <div className="mb-8 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
            Create New Project
          </h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="project-name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Project Name
              </label>
              <input
                type="text"
                id="project-name"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="My Amazing Project"
              />
            </div>
            <div>
              <label
                htmlFor="project-description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Description
              </label>
              <textarea
                id="project-description"
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Describe your project"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="project-technologies"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Technologies (comma separated)
              </label>
              <input
                type="text"
                id="project-technologies"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="React, TypeScript, Tailwind CSS"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowNewProjectForm(false)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      )}

      <Tab.Group>
        <Tab.List className="mb-6 flex space-x-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white text-indigo-700 shadow dark:bg-gray-700 dark:text-indigo-400"
                  : "text-gray-600 hover:bg-white/[0.12] hover:text-indigo-600 dark:text-gray-400"
              )
            }
          >
            Projects
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white text-indigo-700 shadow dark:bg-gray-700 dark:text-indigo-400"
                  : "text-gray-600 hover:bg-white/[0.12] hover:text-indigo-600 dark:text-gray-400"
              )
            }
          >
            Learning
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white text-indigo-700 shadow dark:bg-gray-700 dark:text-indigo-400"
                  : "text-gray-600 hover:bg-white/[0.12] hover:text-indigo-600 dark:text-gray-400"
              )
            }
          >
            Achievements
          </Tab>
        </Tab.List>
        <Tab.Panels>
          {/* Projects Panel */}
          <Tab.Panel>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sampleProjects.map((project) => (
                <div
                  key={project.id}
                  className="overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-md dark:bg-gray-800"
                >
                  <div className="px-6 py-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {project.name}
                      </h3>
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          project.status === "completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {project.status === "completed"
                          ? "Completed"
                          : "In Progress"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {project.description}
                    </p>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Progress
                        </span>
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="mt-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-2 rounded-full bg-indigo-600"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Tech Stack
                      </span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Milestones
                      </span>
                      <ul className="mt-2 space-y-2">
                        {project.milestones.slice(0, 3).map((milestone) => (
                          <li
                            key={milestone.id}
                            className="flex items-center text-sm"
                          >
                            <span
                              className={`mr-2 h-4 w-4 ${
                                milestone.completed
                                  ? "text-green-500 dark:text-green-400"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                            >
                              <CheckCircleIcon />
                            </span>
                            <span
                              className={
                                milestone.completed
                                  ? "text-gray-700 dark:text-gray-300"
                                  : "text-gray-500 dark:text-gray-400"
                              }
                            >
                              {milestone.name}
                            </span>
                          </li>
                        ))}
                        {project.milestones.length > 3 && (
                          <li className="text-sm text-indigo-600 dark:text-indigo-400">
                            +{project.milestones.length - 3} more
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="mt-5 flex justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                      <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <ClockIcon className="mr-1 h-4 w-4" />
                        Updated {project.lastUpdated}
                      </span>
                      <button className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-indigo-400 dark:hover:bg-gray-700">
                        Manage
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Panel>

          {/* Learning Panel */}
          <Tab.Panel>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {learningTracks.map((track) => (
                <div
                  key={track.id}
                  className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800"
                >
                  <div className="px-6 py-5">
                    <div className="flex items-center">
                      <BeakerIcon className="mr-3 h-6 w-6 text-indigo-500 dark:text-indigo-400" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {track.name}
                      </h3>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Progress
                        </span>
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">
                          {track.progress}%
                        </span>
                      </div>
                      <div className="mt-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-2 rounded-full bg-indigo-600"
                          style={{ width: `${track.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Resources
                      </span>
                      <ul className="mt-2 space-y-2">
                        {track.resources.map((resource, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between text-sm"
                          >
                            <div className="flex items-center">
                              <span
                                className={`mr-2 h-4 w-4 ${
                                  resource.completed
                                    ? "text-green-500 dark:text-green-400"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              >
                                <CheckCircleIcon />
                              </span>
                              <span
                                className={
                                  resource.completed
                                    ? "text-gray-700 dark:text-gray-300"
                                    : "text-gray-500 dark:text-gray-400"
                                }
                              >
                                {resource.name}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {resource.type}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-5 flex justify-end">
                      <button className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-indigo-400 dark:hover:bg-gray-700">
                        Add Resource
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex h-full min-h-[16rem] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
                <button className="flex flex-col items-center p-5 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                  <PlusIcon className="h-10 w-10" />
                  <span className="mt-2 text-sm font-medium">
                    Add Learning Track
                  </span>
                </button>
              </div>
            </div>
          </Tab.Panel>

          {/* Achievements Panel */}
          <Tab.Panel>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="rounded-lg bg-white p-6 shadow transition-all hover:shadow-md dark:bg-gray-800"
                >
                  <div className="flex items-center">
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                      <achievement.icon
                        className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {achievement.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={achievement.date}>
                      Achieved on{" "}
                      {new Date(achievement.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </div>
              ))}
              <div className="flex h-full min-h-[10rem] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
                <button className="flex flex-col items-center p-5 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                  <PlusIcon className="h-10 w-10" />
                  <span className="mt-2 text-sm font-medium">
                    Add Achievement
                  </span>
                </button>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
