"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface ResultsScreenProps {
  yesAnswers: number[]
  questions: string[]
  totalQuestions: number
  onRestart: () => void
}

export function ResultsScreen({ yesAnswers, questions, totalQuestions, onRestart }: ResultsScreenProps) {
  const resultsRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([])
  const yesCount = yesAnswers.length
  const percentage = Math.round((yesCount / totalQuestions) * 100)

  useEffect(() => {
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 1,
    }))
    setConfetti(particles)
  }, [])

  const getMessage = () => {
    if (yesCount === totalQuestions) {
      return {
        emoji: "💕",
        title: "Congratulations!",
        description: "You said YES to everything! You are absolutely amazing! A match made in heaven! 🌟",
      }
    } else if (yesCount >= totalQuestions - 1) {
      return {
        emoji: "😍",
        title: "Wonderful!",
        description: "You care deeply! That's truly beautiful and romantic! 💕",
      }
    } else if (yesCount >= Math.floor(totalQuestions / 2)) {
      return {
        emoji: "🥰",
        title: "Sweet!",
        description: "You've got that spark! There's definitely something special here! 💫",
      }
    } else {
      return {
        emoji: "😊",
        title: "Interesting!",
        description: "Every love story is unique! Who knows what the future holds! ✨",
      }
    }
  }

  const handleCapture = async () => {
    if (typeof window === "undefined") return

    const { default: html2canvas } = await import("html2canvas")

    if (resultsRef.current) {
      try {
        const canvas = await html2canvas(resultsRef.current, {
          backgroundColor: "#ffffff",
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true,
          foreignObjectRendering: true,
        })
        const link = document.createElement("a")
        link.href = canvas.toDataURL("image/png")
        link.download = `quiz-results-${new Date().getTime()}.png`
        link.click()
      } catch (error) {
        console.error("Failed to capture screenshot:", error)
      }
    }
  }

  const message = getMessage()

  const confettiElements = confetti.map((particle) => (
    <div
      key={particle.id}
      className="fixed pointer-events-none"
      style={{
        left: `${particle.left}%`,
        top: "-10px",
        animation: `fall ${particle.duration}s linear ${particle.delay}s forwards`,
        opacity: 0.8,
      }}
    >
      {["🎉", "💕", "✨", "🌹", "💑", "💖"][Math.floor(Math.random() * 6)]}
    </div>
  ))

  return (
    <main
      ref={containerRef}
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 relative overflow-hidden"
    >
      {confettiElements}

      <div className="w-full max-w-md mx-auto">
        <div ref={resultsRef} className="bg-white rounded-3xl shadow-2xl p-8 text-center space-y-6">
          {/* Main emoji with bounce animation */}
          <div className="text-6xl sm:text-8xl animate-bounce">{message.emoji}</div>

          <div className="flex justify-center items-center gap-2 sm:gap-4 py-4">
            <div className="text-3xl sm:text-5xl animate-pulse">👨</div>
            <div className="text-lg sm:text-2xl">💕</div>
            <div className="text-3xl sm:text-5xl animate-pulse">👩</div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            {message.title}
          </h1>

          {/* Results */}
          <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-4 sm:p-6 space-y-3">
            <p className="text-xs sm:text-sm text-gray-600 font-medium">Your Love Score:</p>
            <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
              {yesCount}/{totalQuestions}
            </div>
            <div className="w-full bg-white rounded-full h-2 sm:h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-400 to-pink-500 h-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-sm sm:text-lg font-bold text-rose-600">{percentage}% Compatible</p>
          </div>

          {/* Message */}
          <p className="text-sm sm:text-xl text-gray-700 font-semibold leading-relaxed">{message.description}</p>

          {yesAnswers.length > 0 && (
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-3 sm:p-4 text-left space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-rose-900">You said YES to:</p>
              <ul className="space-y-1">
                {yesAnswers.map((index) => (
                  <li key={index} className="text-xs sm:text-sm text-rose-800 flex items-start gap-2">
                    <span className="text-red-500 font-bold mt-0.5">💕</span>
                    <span>{questions[index]}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 sm:gap-3 mt-6 flex-col sm:flex-row">
          <Button
            onClick={handleCapture}
            className="flex-1 px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-lg font-bold bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Download size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Screenshot</span>
            <span className="sm:hidden">Save</span>
          </Button>

          <Button
            onClick={onRestart}
            className="flex-1 px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-lg font-bold bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Try Again 🔄
          </Button>
        </div>

        {/* Fun footer message */}
        <div className="text-center mt-8 text-rose-600 text-xs sm:text-sm font-semibold">
          <p>Made with 💕 for Love</p>
        </div>
      </div>

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotateZ(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  )
}
