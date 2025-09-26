"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ComingSoonPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [validationError, setValidationError] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: true, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Hearts */}
        <div className="absolute top-20 left-10 text-pink-300 text-3xl animate-float opacity-60" style={{ animationDelay: "0s" }}>
          💖
        </div>
        <div className="absolute top-32 right-16 text-purple-300 text-2xl animate-float opacity-60" style={{ animationDelay: "1s" }}>
          ✨
        </div>
        <div className="absolute top-60 left-20 text-pink-200 text-2xl animate-float opacity-60" style={{ animationDelay: "2s" }}>
          🌸
        </div>
        <div className="absolute bottom-40 right-12 text-purple-200 text-3xl animate-float opacity-60" style={{ animationDelay: "0.5s" }}>
          💕
        </div>
        <div className="absolute bottom-60 left-16 text-blue-200 text-2xl animate-float opacity-60" style={{ animationDelay: "1.5s" }}>
          🦋
        </div>
        <div className="absolute top-40 right-32 text-pink-300 text-2xl animate-float opacity-60" style={{ animationDelay: "2.5s" }}>
          🎀
        </div>
        <div className="absolute bottom-32 right-28 text-purple-300 text-2xl animate-float opacity-60" style={{ animationDelay: "3s" }}>
          ⭐
        </div>
        <div className="absolute top-80 left-32 text-pink-200 text-2xl animate-float opacity-60" style={{ animationDelay: "1.8s" }}>
          🌺
        </div>
        <div className="absolute bottom-80 left-8 text-blue-300 text-2xl animate-float opacity-60" style={{ animationDelay: "2.2s" }}>
          💫
        </div>
        <div className="absolute top-96 right-8 text-purple-200 text-2xl animate-float opacity-60" style={{ animationDelay: "0.8s" }}>
          🌙
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="pt-4 sm:pt-6 md:pt-8 pb-3 sm:pb-4 px-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                <span className="text-white text-lg sm:text-xl">💖</span>
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Pink Cart
              </span>
            </div>
            <div className="text-xs sm:text-sm text-gray-600 font-mono">
              {formatTime(currentTime)}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-4 py-6 md:py-12">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-12 w-full">
            {/* Main Image */}
            <div className="relative">
              <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-3xl blur-lg opacity-30 animate-pulse"></div>
                <div className="relative w-full h-full rounded-3xl border-4 border-white/80 shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:rotate-2">
                  <img
                    src="/images/coming-soon-newspaper.png"
                    alt="Coming Soon newspaper with pink text - Pink Cart Girlies aesthetic"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl animate-bounce">
                  ✨
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4 animate-fade-in">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                    Your Pink Cart
                  </span>
                  <br />
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-700 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                    is Almost Here
                  </span>
                  <span className="text-3xl sm:text-4xl ml-1 sm:ml-2 md:ml-4 animate-bounce">💕</span>
                </h1>
                
                <div className="max-w-2xl mx-auto space-y-2 md:space-y-3 animate-slide-up px-4" style={{ animationDelay: "0.4s" }}>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium">
                    Shopping's more fun (and cheaper) when we do it together.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-500 font-serif italic">
                    Together, we're making international shipping affordable for everyone.
                  </p>
                </div>
              </div>

              {/* Prominent Signup Form - Moved to top */}
              <div className="max-w-sm sm:max-w-md mx-auto animate-slide-up px-4" style={{ animationDelay: "0.6s" }}>
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-pink-200/50 shadow-2xl">
                  <div className="text-center mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                      Join Pink Cart Now! 🎉
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                      Be the first to know about group orders
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    <div className="relative">
                      <Input
                        type="tel"
                        placeholder="Enter your phone number ✨"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg rounded-full border-2 border-pink-200 focus:border-pink-400 bg-white/90 backdrop-blur-sm placeholder:text-pink-400 shadow-lg focus:shadow-xl transition-all duration-300 text-center"
                        required
                        disabled={isSubmitted || isLoading}
                      />
                      <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-pink-400 text-lg sm:text-xl">
                        📱
                      </div>
                    </div>
                    
                    {!isSubmitted && (
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 hover:from-pink-500 hover:via-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed btn-glow"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm sm:text-base">Joining...</span>
                          </div>
                        ) : (
                          <span className="text-sm sm:text-base">Join the Pink Cart Community 🎉</span>
                        )}
                      </Button>
                    )}
                  </form>

                  {validationError && (
                    <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-2xl">
                      <p className="text-red-600 font-medium text-center text-xs sm:text-sm">{validationError}</p>
                    </div>
                  )}

                  {isSubmitted && (
                    <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gradient-to-r from-pink-50 to-purple-50 backdrop-blur-sm rounded-2xl border-2 border-pink-200 animate-fade-in">
                      <div className="text-center space-y-2 sm:space-y-3">
                        <div className="text-3xl sm:text-4xl">🎉</div>
                        <p className="text-pink-600 font-semibold text-base sm:text-lg">
                          Welcome to Pink Cart!
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          You'll be the first to know when our next group order opens. Get ready for some amazing deals! 💕
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto px-4">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-pink-200/50 hover-lift animate-slide-up" style={{ animationDelay: "0.8s" }}>
                  <div className="text-2xl sm:text-3xl md:text-3xl mb-2 sm:mb-3 animate-bounce-gentle">🚚</div>
                  <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Group Shipping</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Split shipping costs with other shoppers</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-200/50 hover-lift animate-slide-up" style={{ animationDelay: "0.9s" }}>
                  <div className="text-2xl sm:text-3xl md:text-3xl mb-2 sm:mb-3 animate-bounce-gentle" style={{ animationDelay: "0.5s" }}>💸</div>
                  <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Save Money</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Get better deals through bulk orders</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-blue-200/50 hover-lift animate-slide-up sm:col-span-2 md:col-span-1" style={{ animationDelay: "1s" }}>
                  <div className="text-2xl sm:text-3xl md:text-3xl mb-2 sm:mb-3 animate-bounce-gentle" style={{ animationDelay: "1s" }}>👥</div>
                  <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Community</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Join a community of smart shoppers</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 sm:py-8 px-4 border-t border-pink-100/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="flex space-x-3 sm:space-x-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <span className="text-xs sm:text-sm font-bold">IG</span>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <span className="text-xs sm:text-sm font-bold">TT</span>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <span className="text-xs sm:text-sm font-bold">WA</span>
                  </div>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-gray-500 font-medium text-sm sm:text-base">
                  Pink Cart © 2025 – Shopping Smarter, Together 🌸
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Making international shopping accessible for everyone
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
