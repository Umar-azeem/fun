"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface QuestionProps {
  question: string
  questionNumber: number
  totalQuestions: number
  onYes: () => void
  onNo: () => void
}

export function Question({ question, questionNumber, totalQuestions, onYes, onNo }: QuestionProps) {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleMouseEnter = () => {
    const randomX = Math.random() * 200 - 100
    const randomY = Math.random() * 200 - 100
    setNoButtonPos({ x: randomX, y: randomY })
  }

  const handleTouchStart = () => {
    const randomX = Math.random() * 160 - 80
    const randomY = Math.random() * 160 - 80
    setNoButtonPos({ x: randomX, y: randomY })
  }

  const handleClick = () => {
    if (isMobile) {
      handleTouchStart()
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Progress indicator */}
      <div className="text-center mb-8">
        <div className="text-sm font-medium text-gray-600 mb-3">
          Question {questionNumber} of {totalQuestions}
        </div>
        <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-rose-400 to-pink-500 h-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center space-y-8">
        {/* Question text */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-balance leading-tight">{question}</h2>
        </div>

        {/* Decorative emoji */}
        <div className="text-6xl animate-bounce">💕</div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center flex-wrap pt-4">
          <Button
            onClick={onYes}
            className="px-8 py-6 text-lg font-bold bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Yes 💚
          </Button>

          <div className="relative w-24 h-14">
            <button
              onMouseEnter={handleMouseEnter}
              onTouchStart={handleTouchStart}
              onClick={handleClick}
              style={{
                transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
              }}
              className="absolute inset-0 px-8 py-3 text-lg font-bold bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-700 rounded-full shadow-lg hover:shadow-xl transition-transform duration-200 cursor-pointer"
            >
              No 😢
            </button>
          </div>
        </div>

        {/* Hint text */}
        <p className="text-sm text-gray-500 italic">Try clicking the No button... 👀</p>
      </div>
    </div>
  )
}
