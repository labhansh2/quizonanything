"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import styles from "./loading.module.css"

function LoadingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const roomId = searchParams.get("roomId") || ""
  const topic = searchParams.get("topic") || "General Knowledge"
  const mode = searchParams.get("mode") || "trivia"
  const difficulty = searchParams.get("difficulty") || "medium"

  const [loadingText, setLoadingText] = useState("Creating your quiz...")
  const [progress, setProgress] = useState(0)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const loadingMessages = [
      "Creating your quiz...",
      "Generating questions...",
      "Preparing quiz room...",
      "Almost ready...",
    ]

    let currentMessageIndex = 0
    const messageInterval = setInterval(() => {
      currentMessageIndex = (currentMessageIndex + 1) % loadingMessages.length
      setLoadingText(loadingMessages[currentMessageIndex])
    }, 2000)

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 5
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 700)

    // Fetch quiz data from API
    const fetchQuiz = async () => {
      try {
        const response = await fetch('/api/generate-quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            topic,
            mode,
            difficulty,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate quiz');
        }

        const quizData = await response.json();
        
        // Store quiz data in localStorage
        localStorage.setItem('quizData', JSON.stringify(quizData));
        
        // Redirect to quiz page
        router.push(`/quiz/room/${roomId}`);
      } catch (error) {
        console.error('Error generating quiz:', error);
        setIsError(true);
        setLoadingText('Error creating quiz. Please try again.');
      }
    };

    fetchQuiz();

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [topic, mode, difficulty, roomId, router])

  return (
    <div className={styles.container}>
      <div className={styles.loadingCard}>
        {isError ? (
          <>
            <h2 className={styles.loadingText}>{loadingText}</h2>
            <button 
              onClick={() => router.back()} 
              className={styles.button}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--primary)',
                border: 'none',
                borderRadius: 'var(--radius)',
                color: 'white',
                fontWeight: 500,
                cursor: 'pointer',
                marginTop: '1rem'
              }}
            >
              Go Back
            </button>
          </>
        ) : (
          <>
            <div className={styles.spinner}></div>
            <h2 className={styles.loadingText}>{loadingText}</h2>

            <div className={styles.progressContainer}>
              <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
            </div>

            <div className={styles.quizInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Topic:</span>
                <span className={styles.infoValue}>{topic}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Mode:</span>
                <span className={styles.infoValue}>{mode}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Difficulty:</span>
                <span className={styles.infoValue}>{difficulty}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function LoadingPage() {
  return (
    <Suspense fallback={
      <div className={styles.container}>
        <div className={styles.loadingCard}>
          <div className={styles.spinner}></div>
          <h2 className={styles.loadingText}>Loading...</h2>
        </div>
      </div>
    }>
      <LoadingContent />
    </Suspense>
  )
} 