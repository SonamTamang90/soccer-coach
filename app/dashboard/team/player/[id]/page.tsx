"use client";
import { useEffect, useState } from "react";
import {
  UserCircleIcon,
  ChartBarIcon,
  CalendarIcon,
  ClockIcon,
  TrophyIcon,
  StarIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

interface PlayerStats {
  matches: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  passAccuracy: number;
  shotsOnTarget: number;
}

interface TrainingRecord {
  _id: string;
  date: string;
  type: string;
  duration: number;
  performance: number;
  notes: string;
}

interface PlayerNote {
  _id: string;
  date: string;
  author: string;
  category: "strength" | "weakness" | "improvement" | "general";
  content: string;
}

interface TrainingVideo {
  _id: string;
  title: string;
  youtubeId: string;
  thumbnail: string;
  duration: number;
  category: string;
  uploadDate: string;
  description: string;
}

interface Player {
  _id: string;
  name: string;
  position: string;
  number: number;
  age: number;
  height: number;
  weight: number;
  nationality: string;
  joinedDate: string;
  stats: PlayerStats;
  trainingHistory: TrainingRecord[];
  achievements: string[];
  notes: PlayerNote[];
  videos: TrainingVideo[];
  skills: {
    technical: number;
    tactical: number;
    physical: number;
    mental: number;
    teamwork: number;
  };
}

export default function PlayerProfile({ params }: { params: { id: string } }) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlayer, setEditedPlayer] = useState<Player | null>(null);
  const [userRole, setUserRole] = useState<"player" | "coach" | "team_manager">(
    "player"
  );
  const [newNote, setNewNote] = useState({ category: "general", content: "" });
  const [selectedVideo, setSelectedVideo] = useState<TrainingVideo | null>(
    null
  );

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockPlayer: Player = {
      _id: params.id,
      name: "John Doe",
      position: "Forward",
      number: 9,
      age: 25,
      height: 180,
      weight: 75,
      nationality: "England",
      joinedDate: "2023-01-15",
      stats: {
        matches: 20,
        goals: 15,
        assists: 8,
        yellowCards: 2,
        redCards: 0,
        minutesPlayed: 1800,
        passAccuracy: 85,
        shotsOnTarget: 45,
      },
      trainingHistory: [
        {
          _id: "1",
          date: "2024-03-19",
          type: "Technical Training",
          duration: 90,
          performance: 85,
          notes: "Excellent ball control and finishing",
        },
        {
          _id: "2",
          date: "2024-03-18",
          type: "Team Practice",
          duration: 120,
          performance: 90,
          notes: "Great teamwork and communication",
        },
      ],
      achievements: [
        "Top Scorer - Season 2023/24",
        "Player of the Month - February 2024",
        "Best Newcomer - 2023",
      ],
      notes: [
        {
          _id: "1",
          date: "2024-03-19",
          author: "Coach Smith",
          category: "strength",
          content:
            "Excellent ball control and first touch. Shows great potential in tight spaces.",
        },
        {
          _id: "2",
          date: "2024-03-18",
          author: "Coach Johnson",
          category: "improvement",
          content: "Needs to work on defensive positioning and tracking back.",
        },
      ],
      videos: [
        {
          _id: "1",
          title: "Technical Training Session",
          youtubeId: "dQw4w9WgXcQ",
          thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
          duration: 120,
          category: "Technical",
          uploadDate: "2024-03-19",
          description: "Focus on ball control and dribbling",
        },
        {
          _id: "2",
          title: "Match Highlights",
          youtubeId: "dQw4w9WgXcQ",
          thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
          duration: 90,
          category: "Match",
          uploadDate: "2024-03-18",
          description: "Key moments from the last match",
        },
      ],
      skills: {
        technical: 85,
        tactical: 78,
        physical: 82,
        mental: 80,
        teamwork: 88,
      },
    };
    setPlayer(mockPlayer);
    setEditedPlayer(mockPlayer);
    // TODO: Replace with actual user role check
    setUserRole("coach");
    setIsLoading(false);
  }, [params.id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    // TODO: Implement API call to save changes
    setPlayer(editedPlayer);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPlayer(player);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof Player, value: string | number) => {
    if (editedPlayer) {
      setEditedPlayer({
        ...editedPlayer,
        [field]: value,
      });
    }
  };

  const handleStatsChange = (field: keyof PlayerStats, value: number) => {
    if (editedPlayer) {
      setEditedPlayer({
        ...editedPlayer,
        stats: {
          ...editedPlayer.stats,
          [field]: value,
        },
      });
    }
  };

  const handleAddNote = () => {
    if (!newNote.content.trim()) return;

    const note: PlayerNote = {
      _id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      author: "Current Coach", // TODO: Get actual coach name
      category: newNote.category as PlayerNote["category"],
      content: newNote.content,
    };

    if (editedPlayer) {
      setEditedPlayer({
        ...editedPlayer,
        notes: [note, ...editedPlayer.notes],
      });
    }
    setNewNote({ category: "general", content: "" });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!player) {
    return <div>Player not found</div>;
  }

  const currentPlayer = isEditing ? editedPlayer : player;

  return (
    <div className="space-y-6">
      {/* Player Header */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <UserCircleIcon className="h-24 w-24 text-gray-400" />
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={currentPlayer?.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="text-2xl font-bold bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
                />
              ) : (
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentPlayer?.name}
                </h2>
              )}
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                {isEditing ? (
                  <>
                    <input
                      type="number"
                      value={currentPlayer?.number || ""}
                      onChange={(e) =>
                        handleInputChange("number", parseInt(e.target.value))
                      }
                      className="w-16 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
                    />
                    <input
                      type="text"
                      value={currentPlayer?.position || ""}
                      onChange={(e) =>
                        handleInputChange("position", e.target.value)
                      }
                      className="w-32 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
                    />
                  </>
                ) : (
                  <>
                    <span>#{currentPlayer?.number}</span>
                    <span>{currentPlayer?.position}</span>
                  </>
                )}
                <span>{currentPlayer?.age} years old</span>
                <span>{currentPlayer?.nationality}</span>
              </div>
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span>{currentPlayer?.height}cm</span>
                <span>{currentPlayer?.weight}kg</span>
                <span>
                  Joined:{" "}
                  {currentPlayer?.joinedDate
                    ? new Date(currentPlayer.joinedDate).toLocaleDateString()
                    : ""}
                </span>
              </div>
            </div>
          </div>
          {(userRole === "coach" || userRole === "team_manager") && (
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    <CheckIcon className="h-4 w-4 mr-1" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    <XMarkIcon className="h-4 w-4 mr-1" />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <PencilIcon className="h-4 w-4 mr-1" />
                  Edit Profile
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(currentPlayer?.stats || {}).map(([key, value]) => (
          <div
            key={key}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
          >
            <div className="flex items-center">
              <ChartBarIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </p>
                {isEditing ? (
                  <input
                    type="number"
                    value={value}
                    onChange={(e) =>
                      handleStatsChange(
                        key as keyof PlayerStats,
                        parseInt(e.target.value)
                      )
                    }
                    className="text-2xl font-semibold bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 w-24"
                  />
                ) : (
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {value}
                    {key === "passAccuracy" ? "%" : ""}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Statistics */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Detailed Statistics
          </h3>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Matches
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {currentPlayer?.stats.matches}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Yellow Cards
              </p>
              <p className="text-xl font-semibold text-yellow-600 dark:text-yellow-400">
                {currentPlayer?.stats.yellowCards}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Red Cards
              </p>
              <p className="text-xl font-semibold text-red-600 dark:text-red-400">
                {currentPlayer?.stats.redCards}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Shots on Target
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {currentPlayer?.stats.shotsOnTarget}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Training History */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Recent Training History
          </h3>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {currentPlayer?.trainingHistory.map((record) => (
              <li key={record._id} className="px-4 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      {record.type}
                    </h4>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {record.date}
                      </span>
                      <span className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {record.duration} mins
                      </span>
                      <span className="flex items-center">
                        <StarIcon className="h-4 w-4 mr-1" />
                        Performance: {record.performance}%
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {record.notes}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Performance Trends */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Performance Trends
          </h3>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={currentPlayer?.trainingHistory.map((record) => ({
                  date: record.date,
                  performance: record.performance,
                  type: record.type,
                }))}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date: string) =>
                    new Date(date).toLocaleDateString()
                  }
                />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  labelFormatter={(date: string) =>
                    new Date(date).toLocaleDateString()
                  }
                  formatter={(value: number) => [`${value}%`, "Performance"]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="performance"
                  stroke="#4F46E5"
                  activeDot={{ r: 8 }}
                  name="Performance"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {currentPlayer?.trainingHistory.map((record, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(record.date).toLocaleDateString()}
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {record.performance}%
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {record.type}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Radar Chart */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Skills Assessment
          </h3>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                outerRadius={90}
                data={[
                  { subject: "Technical", A: currentPlayer?.skills.technical },
                  { subject: "Tactical", A: currentPlayer?.skills.tactical },
                  { subject: "Physical", A: currentPlayer?.skills.physical },
                  { subject: "Mental", A: currentPlayer?.skills.mental },
                  { subject: "Teamwork", A: currentPlayer?.skills.teamwork },
                ]}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="#4F46E5"
                  fill="#4F46E5"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Training Videos */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Training Videos
          </h3>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentPlayer?.videos.map((video) => (
              <div
                key={video._id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative aspect-video">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-opacity duration-200">
                    <VideoCameraIcon className="h-12 w-12 text-white opacity-75" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                    {Math.floor(video.duration / 60)}:
                    {(video.duration % 60).toString().padStart(2, "0")}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                    {video.title}
                  </h4>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {video.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{video.category}</span>
                    <span>
                      {new Date(video.uploadDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Achievements */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Achievements
          </h3>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentPlayer?.achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => {
                  /* TODO: Show achievement details */
                }}
              >
                <div className="flex items-center">
                  <TrophyIcon className="h-8 w-8 text-yellow-500 mr-3" />
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      {achievement}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Click to view details
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Player Notes */}
      {(userRole === "coach" || userRole === "team_manager") && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Player Notes
            </h3>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            {/* Add Note Form */}
            <div className="mb-6">
              <div className="flex space-x-4 mb-4">
                <select
                  value={newNote.category}
                  onChange={(e) =>
                    setNewNote({
                      ...newNote,
                      category: e.target.value as PlayerNote["category"],
                    })
                  }
                  className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="strength">Strength</option>
                  <option value="weakness">Weakness</option>
                  <option value="improvement">Improvement</option>
                  <option value="general">General</option>
                </select>
                <button
                  onClick={handleAddNote}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Add Note
                </button>
              </div>
              <textarea
                value={newNote.content}
                onChange={(e) =>
                  setNewNote({ ...newNote, content: e.target.value })
                }
                placeholder="Add your notes here..."
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                rows={3}
              />
            </div>

            {/* Notes List */}
            <div className="space-y-4">
              {currentPlayer?.notes.map((note) => (
                <div
                  key={note._id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                        {note.category.charAt(0).toUpperCase() +
                          note.category.slice(1)}
                      </span>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        {note.author} •{" "}
                        {new Date(note.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-900 dark:text-white">
                    {note.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Backdrop */}
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 dark:bg-gray-900 bg-opacity-75"
              onClick={() => setSelectedVideo(null)}
            ></div>

            {/* Modal Content */}
            <div className="relative inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="absolute top-0 right-0 pt-4 pr-4 z-10">
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="bg-white dark:bg-gray-800 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                      {selectedVideo.title}
                    </h3>
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                        title={selectedVideo.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                      ></iframe>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedVideo.description}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>{selectedVideo.category}</span>
                        <span>
                          {new Date(
                            selectedVideo.uploadDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
