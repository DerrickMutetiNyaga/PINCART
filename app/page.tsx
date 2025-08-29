"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ComingSoonPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [validationError, setValidationError] = useState("")

  const validateKenyanPhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, "")
    return cleanPhone.length === 10 && (cleanPhone.startsWith("07") || cleanPhone.startsWith("01"))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateKenyanPhone(phoneNumber)) {
      setValidationError("Please enter a valid Kenyan phone number")
      return
    }

    try {
      const response = await fetch("https://formspree.io/f/meoledqo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          message: `New PinkCart Number signup: ${phoneNumber}`,
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        setValidationError("Something went wrong. Please try again.")
      }
    } catch (error) {
      setValidationError("Something went wrong. Please try again.")
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPhoneNumber(value)

    if (validationError) {
      setValidationError("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200 flex items-center justify-center px-4 animate-pulse-bg relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-pink-400 text-2xl animate-float" style={{ animationDelay: "0s" }}>
          💖
        </div>
        <div
          className="absolute top-32 right-16 text-purple-400 text-xl animate-float"
          style={{ animationDelay: "1s" }}
        >
          ✨
        </div>
        <div className="absolute top-60 left-20 text-pink-300 text-lg animate-float" style={{ animationDelay: "2s" }}>
          🌸
        </div>
        <div
          className="absolute bottom-40 right-12 text-purple-300 text-2xl animate-float"
          style={{ animationDelay: "0.5s" }}
        >
          💕
        </div>
        <div
          className="absolute bottom-60 left-16 text-blue-300 text-xl animate-float"
          style={{ animationDelay: "1.5s" }}
        >
          🦋
        </div>
        <div
          className="absolute top-40 right-32 text-pink-400 text-lg animate-float"
          style={{ animationDelay: "2.5s" }}
        >
          🎀
        </div>
        <div
          className="absolute bottom-32 right-28 text-purple-400 text-xl animate-float"
          style={{ animationDelay: "3s" }}
        >
          ⭐
        </div>
        <div className="absolute top-80 left-32 text-pink-300 text-lg animate-float" style={{ animationDelay: "1.8s" }}>
          🌺
        </div>
        <div
          className="absolute bottom-80 left-8 text-blue-400 text-xl animate-float"
          style={{ animationDelay: "2.2s" }}
        >
          💫
        </div>
        <div
          className="absolute top-96 right-8 text-purple-300 text-lg animate-float"
          style={{ animationDelay: "0.8s" }}
        >
          🌙
        </div>
      </div>

      <div className="max-w-2xl mx-auto text-center space-y-8 relative z-10">
        <div className="flex justify-center mb-8">
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-3xl border-4 border-white/60 shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img
              src="/images/coming-soon-newspaper.png"
              alt="Coming Soon newspaper with pink text - Pink Cart Girlies aesthetic"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pink-600 mb-4 text-balance">
            Your Pink Cart is Almost Here 💕
          </h1>
          <p className="text-lg md:text-xl text-purple-600 mb-4 text-pretty">
            Shopping’s more fun (and cheaper) when we do it together.
          </p>
          <p className="text-base md:text-lg text-purple-500 mb-8 font-serif italic text-pretty">
            Together, we're making international shipping affordable for everyone.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="tel"
              placeholder="Enter your phone number ✨"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className="flex-1 px-6 py-4 text-lg rounded-full border-2 border-pink-200 focus:border-pink-400 bg-white/80 backdrop-blur-sm placeholder:text-pink-400"
              required
              disabled={isSubmitted}
            />
            {!isSubmitted && (
              <Button
                type="submit"
                className="px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:glow"
              >
                Join Us
              </Button>
            )}
          </form>

          {validationError && <div className="mt-2 text-red-500 text-sm font-medium">{validationError}</div>}

          {isSubmitted && (
            <div className="mt-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-pink-200 animate-fade-in">
              <p className="text-pink-600 font-semibold text-base">
                Thanks for joining! 🎉 You’ll be the first to be added to our WhatsApp group when the next group order
                opens.
              </p>
            </div>
          )}
        </div>

        <footer className="pt-8 space-y-4">
          <div className="flex justify-center space-x-4">
            <div className="w-8 h-8 bg-pink-300/50 rounded-full flex items-center justify-center text-xs text-pink-600">
              IG
            </div>
            <div className="w-8 h-8 bg-purple-300/50 rounded-full flex items-center justify-center text-xs text-purple-600">
              TT
            </div>
            <div className="w-8 h-8 bg-blue-300/50 rounded-full flex items-center justify-center text-xs text-blue-600">
              WA
            </div>
          </div>
          <p className="text-purple-500 font-medium text-sm">Pink Cart © 2025 – Shopping Smarter, Together 🌸</p>
        </footer>
      </div>
    </div>
  )
}
