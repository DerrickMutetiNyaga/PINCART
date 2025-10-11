"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart, Sparkles, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await signIn(phone, isSignUp ? name : undefined)
      router.push("/dashboard")
    } catch (error) {
      console.error("Auth error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/20">
      {/* Decorative floating elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="float absolute left-[10%] top-[20%] text-6xl opacity-20">✨</div>
        <div className="float absolute right-[15%] top-[30%] text-5xl opacity-20" style={{ animationDelay: "1s" }}>
          💖
        </div>
        <div className="float absolute left-[20%] bottom-[25%] text-4xl opacity-20" style={{ animationDelay: "2s" }}>
          ⭐
        </div>
        <div className="float absolute right-[10%] bottom-[20%] text-5xl opacity-20" style={{ animationDelay: "0.5s" }}>
          ☁️
        </div>
      </div>

      <div className="container relative flex min-h-screen items-center justify-center py-12">
        <Card className="w-full max-w-md border-2 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
              <Heart className="h-8 w-8 fill-white text-white" />
            </div>
            <CardTitle className="text-3xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
              {isSignUp ? "Join Pinkcart" : "Welcome Back"}
            </CardTitle>
            <CardDescription className="text-base">
              {isSignUp ? (
                <span className="flex items-center justify-center gap-2">
                  First time here? Sign Up <Heart className="inline h-4 w-4 fill-primary text-primary" />
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Already one of us? Log In <Sparkles className="inline h-4 w-4 text-primary" />
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="What should we call you?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-2xl"
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+254 712 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-2xl"
                  required
                />
                <p className="text-xs text-muted-foreground">We'll send you a verification code</p>
              </div>

              <Button
                type="submit"
                className="btn-gradient w-full rounded-full text-white"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Please wait..." : isSignUp ? "Create Account" : "Send Code"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">or</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full rounded-full bg-transparent"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Already have an account? Log In" : "New here? Sign Up"}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-primary">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-primary">
                Privacy Policy
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
