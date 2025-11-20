"use client"

import { useState } from "react"
import { Question } from "@/components/question"
import { ResultsScreen } from "@/components/results-screen"

const questions = [
  "Do you care about me?",
  "Do you miss me?",
  "Do I mean anything to you?",
  "Do you think about me?",
  "Do you want to be with me?",
]

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [yesAnswers, setYesAnswers] = useState<number[]>([])
  const [isComplete, setIsComplete] = useState(false)

  const handleYes = () => {
    setYesAnswers([...yesAnswers, currentQuestion])
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsComplete(true)
    }
  }

  const handleNo = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsComplete(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setYesAnswers([])
    setIsComplete(false)
  }

  if (isComplete) {
    return (
      <ResultsScreen
        yesAnswers={yesAnswers}
        questions={questions}
        totalQuestions={questions.length}
        onRestart={handleRestart}
      />
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100">
      <Question
        question={questions[currentQuestion]}
        questionNumber={currentQuestion + 1}
        totalQuestions={questions.length}
        onYes={handleYes}
        onNo={handleNo}
      />
    </main>
  )
}
