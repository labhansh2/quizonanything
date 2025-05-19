"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import styles from "./page.module.css"
import UsernameModal from "@/components/username-modal"
import TopicSuggestions from "@/components/topic-suggestions"
import QuizControls from "@/components/quiz-controls"
import PublicRoomCard from "@/components/public-room-card"
import ScrollIndicator from "@/components/scroll-indicator"

// Sample topic suggestions
const TOPIC_SUGGESTIONS = [
  "World History",
  "Space & Astronomy",
  "Pop Culture",
  "Movies & TV Shows",
  "Science & Technology",
  "Sports",
  "Geography",
  "Music",
  "Literature",
  "Food & Cuisine",
  "Art & Design",
  "Ancient Civilizations",
]

const QUIZ_MODES = [
  { id: "trivia", label: "Trivia" },
  { id: "educational", label: "Educational" },
  { id: "general", label: "General" },
]

const DIFFICULTY_LEVELS = [
  { id: "easy", label: "Easy" },
  { id: "medium", label: "Medium" },
  { id: "hard", label: "Hard" },
]

// Sample room images
const ROOM_IMAGES = [
  "https://picsum.photos/id/237/300/300",
  "https://picsum.photos/id/24/300/300",
  "https://picsum.photos/id/96/300/300",
  "https://picsum.photos/id/65/300/300",
  "https://picsum.photos/id/129/300/300",
  "https://picsum.photos/id/169/300/300",
]

// Sample public quiz rooms
const PUBLIC_QUIZ_ROOMS = [
  {
    id: "room1",
    name: "Science Quiz",
    topic: "Science & Technology",
    mode: "educational",
    difficulty: "medium",
    participants: 3,
    creator: "ScienceGuru",
    image: ROOM_IMAGES[0],
  },
  {
    id: "room2",
    name: "Movie Trivia",
    topic: "Movies & TV Shows",
    mode: "trivia",
    difficulty: "easy",
    participants: 5,
    creator: "FilmBuff",
    image: ROOM_IMAGES[1],
  },
  {
    id: "room3",
    name: "History Challenge",
    topic: "World History",
    mode: "educational",
    difficulty: "hard",
    participants: 2,
    creator: "HistoryNerd",
    image: ROOM_IMAGES[2],
  },
  {
    id: "room4",
    name: "Music Quiz",
    topic: "Music",
    mode: "trivia",
    difficulty: "medium",
    participants: 4,
    creator: "MusicLover",
    image: ROOM_IMAGES[3],
  },
]

export default function HomePage() {
  const [searchTopic, setSearchTopic] = useState("")
  const [quizMode, setQuizMode] = useState("trivia")
  const [difficulty, setDifficulty] = useState("medium")
  const [isPublic, setIsPublic] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const [modalComplete, setModalComplete] = useState(false)
  const router = useRouter()

  const handleStartQuiz = () => {
    const roomId = Date.now().toString(36) + Math.random().toString(36).substring(2)
    router.push(`/`)
  }

  const handleTopicSelect = (topic: string) => {
    setSearchTopic(topic)
  }

  const toggleDropdown = (dropdown: string) => {
    if (dropdownOpen === dropdown) {
      setDropdownOpen(null)
    } else {
      setDropdownOpen(dropdown)
    }
  }

  const handleModeSelect = (mode: string) => {
    setQuizMode(mode)
    setDropdownOpen(null)
  }

  const handleDifficultySelect = (level: string) => {
    setDifficulty(level)
    setDropdownOpen(null)
  }

  const handleJoinRoom = (roomId: string) => {
    router.push(`/quiz/room/${roomId}`)
  }

  const handleModalComplete = () => {
    setModalComplete(true)
  }

  const handleSignOut = () => {
    localStorage.removeItem("quizmaster_user_id")
    localStorage.removeItem("quizmaster_username")
    window.location.reload()
  }

  return (
    <div className={styles.container}>
      <UsernameModal onComplete={handleModalComplete} />

      <button onClick={handleSignOut} className={styles.signOutButton}>
        Sign Out
      </button>

      <main className={styles.main}>
        <section className={styles.heroSection}>
          <div className={styles.promptContainer}>
            <h2 className={styles.title}>Create a Quiz Room</h2>

            <div className={styles.promptWrapper}>
              <input
                type="text"
                placeholder="Enter any topic..."
                value={searchTopic}
                onChange={(e) => setSearchTopic(e.target.value)}
                className={styles.promptInput}
              />

              <QuizControls
                quizMode={quizMode}
                difficulty={difficulty}
                isPublic={isPublic}
                dropdownOpen={dropdownOpen}
                styles={styles}
                onModeSelect={handleModeSelect}
                onDifficultySelect={handleDifficultySelect}
                onToggleDropdown={toggleDropdown}
                onTogglePublic={() => setIsPublic(!isPublic)}
                onStartQuiz={handleStartQuiz}
                quizModes={QUIZ_MODES}
                difficultyLevels={DIFFICULTY_LEVELS}
              />
            </div>

            <TopicSuggestions
              topics={TOPIC_SUGGESTIONS}
              onTopicSelect={handleTopicSelect}
              styles={styles}
            />
          </div>

          <ScrollIndicator styles={styles} />
        </section>

        <section className={styles.publicRoomsSection}>
          <h2 className={styles.publicRoomsTitle}>Public Quiz Rooms</h2>

          <div className={styles.roomsGrid}>
            {PUBLIC_QUIZ_ROOMS.map((room) => (
              <PublicRoomCard
                key={room.id}
                room={room}
                styles={styles}
                onJoinRoom={handleJoinRoom}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
