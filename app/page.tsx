"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ComingSoonPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [validationError, setValidationError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const validateKenyanPhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, "")
    return cleanPhone.length === 10 && (cleanPhone.startsWith("07") || cleanPhone.startsWith("01"))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!validateKenyanPhone(phoneNumber)) {
      setValidationError("Please enter a valid Kenyan phone number")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/phone-numbers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        setValidationError(data.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setValidationError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Header */}
      <header className="w-full max-w-md mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Pink Cart</h1>
          <p className="text-gray-600">Coming Soon</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Join the Waitlist
            </h2>
            <p className="text-gray-600 text-sm">
              Be the first to know when we launch
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                required
                disabled={isSubmitted || isLoading}
              />
            </div>
            
            {!isSubmitted && (
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-4 rounded-md font-medium disabled:opacity-50"
              >
                {isLoading ? "Joining..." : "Join Waitlist"}
              </Button>
            )}
          </form>

          {validationError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm text-center">{validationError}</p>
            </div>
          )}

          {isSubmitted && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <div className="text-center">
                <p className="text-green-600 font-medium mb-1">
                  Welcome to Pink Cart!
                </p>
                <p className="text-green-600 text-sm">
                  You'll be notified when we launch.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          Pink Cart © 2025
        </p>
      </footer>
    </div>
  )
}
