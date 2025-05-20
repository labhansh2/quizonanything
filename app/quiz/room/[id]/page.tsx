"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import styles from "./quiz.module.css"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

interface QuizData {
  topic: string
  mode: string
  difficulty: string
  questions: QuizQuestion[]
}

export default function QuizPage() {
  const router = useRouter()
  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>([])
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Try to load quiz data from localStorage
    const storedQuizData = localStorage.getItem('quizData')
    
    if (storedQuizData) {
      try {
        const parsedData = JSON.parse(storedQuizData)
        setQuizData(parsedData)
        
        // Initialize selectedOptions array with nulls
        if (parsedData.questions) {
          setSelectedOptions(new Array(parsedData.questions.length).fill(null))
        }
        
        setIsLoading(false)
      } catch (error) {
        console.error('Error parsing quiz data:', error)
        router.push('/')
      }
    } else {
      // If no quiz data in localStorage, redirect to home
      router.push('/')
    }
  }, [router])

  if (isLoading || !quizData) {
    return (
      <div className={styles.loadingContainer}>
        <div style={{ textAlign: "center" }}>
          <div className={styles.spinner}></div>
          <p>Loading quiz...</p>
        </div>
      </div>
    )
  }

  const currentQuestion = quizData.questions[currentQuestionIndex]

  const answeredCount = selectedOptions.filter((option) => option !== null).length
  const unansweredCount = quizData.questions.length - answeredCount

  // Calculate progress based on answered questions
  const progress = (answeredCount / quizData.questions.length) * 100

  const handleOptionSelect = (optionIndex: number) => {
    const newSelectedOptions = [...selectedOptions]
    newSelectedOptions[currentQuestionIndex] = optionIndex
    setSelectedOptions(newSelectedOptions)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Calculate score
      let totalScore = 0
      selectedOptions.forEach((selected, index) => {
        if (selected === quizData.questions[index].correctAnswer) {
          totalScore++
        }
      })
      setScore(totalScore)
      setQuizCompleted(true)
    }
  }

  const handleNavigateToQuestion = (index: number) => {
    setCurrentQuestionIndex(index)
  }

  const handleExitQuiz = () => {
    router.push("/")
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedOptions(new Array(quizData.questions.length).fill(null))
    setScore(0)
    setQuizCompleted(false)
  }

  const handleBackToDashboard = () => {
    router.push("/")
  }

  if (quizCompleted) {
    return (
      <div className={styles.resultsContainer}>
        <div className={styles.resultsCard}>
          <div className={styles.resultsContent}>
            <h2 className={styles.resultsTitle}>Quiz Results</h2>

            <div>
              <p className={styles.score}>
                {score} / {quizData.questions.length}
              </p>
              <p className={styles.scoreMessage}>
                {score === quizData.questions.length
                  ? "Perfect score! Impressive!"
                  : score >= quizData.questions.length / 2
                    ? "Good job! You passed the quiz."
                    : "Keep practicing to improve your score."}
              </p>
            </div>

            <div className={styles.resultsActions}>
              <button onClick={handleRestartQuiz} className={styles.restartButton}>
                Restart Quiz
              </button>
              <button onClick={handleBackToDashboard} className={styles.backButton}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.quizContainer}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <h1 className={styles.topicTitle}>{quizData.topic}</h1>
            <div className={styles.questionCounter}>
              {currentQuestionIndex + 1} / {quizData.questions.length}
            </div>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressIndicator} style={{ width: `${progress}%` }}></div>
          </div>
          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <div className={`${styles.statDot} ${styles.statDotAnswered}`}></div>
              <span>Answered: {answeredCount}</span>
            </div>
            <div className={styles.statItem}>
              <div className={`${styles.statDot} ${styles.statDotUnanswered}`}></div>
              <span>Unanswered: {unansweredCount}</span>
            </div>
          </div>
        </header>

        <div className={styles.card}>
          <div className={styles.questionSection}>
            <h2 className={styles.question}>{currentQuestion.question}</h2>
          </div>
          <div className={styles.optionsSection}>
            <div className={styles.optionsList}>
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`${styles.optionButton} ${selectedOptions[currentQuestionIndex] === index ? styles.optionSelected : ""}`}
                >
                  <div className={styles.optionLabel}>
                    <div className={styles.optionIndicator}>{String.fromCharCode(65 + index)}</div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.navigationSection}>
            {quizData.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => handleNavigateToQuestion(index)}
                className={`${styles.navigationButton} 
                  ${currentQuestionIndex === index ? styles.navigationButtonActive : ""} 
                  ${selectedOptions[index] !== null ? styles.navigationButtonAnswered : ""}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className={styles.actionsSection}>
            <button onClick={handleExitQuiz} className={styles.exitButton}>
              Exit Quiz
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={selectedOptions[currentQuestionIndex] === null}
              className={styles.nextButton}
            >
              {currentQuestionIndex === quizData.questions.length - 1 ? "Finish Quiz" : "Next Question"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 