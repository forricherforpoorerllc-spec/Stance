"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Lock } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim()) return

    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push("/admin")
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || "Incorrect password")
      }
    } catch {
      setError("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0e13] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/stance-logo-white.png"
            alt="Stance Marketing"
            width={140}
            height={32}
            className="h-8 w-auto"
          />
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#0d1117] overflow-hidden">
          {/* Header */}
          <div className="border-b border-white/[0.06] px-6 py-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
              <Lock className="h-4 w-4 text-red-400" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">Admin Access</h1>
              <p className="text-xs text-slate-600">Stance Marketing — restricted area</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <Label className="text-slate-400 text-sm mb-2 block">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError("") }}
                placeholder="Enter admin password"
                autoFocus
                className="bg-white/[0.04] border-white/[0.1] text-white placeholder:text-slate-600 h-11 rounded-xl focus:border-red-500/60 focus:ring-0"
              />
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading || !password.trim()}
              className="w-full bg-red-500 hover:bg-red-400 text-white font-bold rounded-xl h-11 shadow-lg shadow-red-500/30 transition-all disabled:opacity-50"
            >
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Verifying...</>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
