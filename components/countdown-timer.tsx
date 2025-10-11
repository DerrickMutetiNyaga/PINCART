"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

interface CountdownTimerProps {
  targetDate: Date
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-3">
          <Clock className="h-4 w-4 text-primary" />
          <span className="body-small font-medium text-primary">Limited Time Offer</span>
        </div>
        <h3 className="heading-4 mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
          Shipment Closes Soon!
        </h3>
        <p className="body-small text-muted-foreground">Join now to secure your spot in this group shipment</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { value: timeLeft.days, label: "Days", color: "primary" },
          { value: timeLeft.hours, label: "Hours", color: "secondary" },
          { value: timeLeft.minutes, label: "Minutes", color: "accent" },
          { value: timeLeft.seconds, label: "Seconds", color: "primary" },
        ].map((item, index) => (
          <div key={index} className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border-2 border-${item.color}/20 p-4 text-center`}>
            <div className={`text-2xl sm:text-3xl font-bold text-${item.color} mb-1`} style={{ fontFamily: "var(--font-fredoka)" }}>
              {String(item.value).padStart(2, "0")}
            </div>
            <div className="body-small font-medium text-muted-foreground uppercase tracking-wide">{item.label}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="body-small font-medium text-muted-foreground">Live countdown • Updates every second</span>
        </div>
      </div>
    </div>
  )
}
