"use client"

import { useState, useEffect } from "react"
import { isAuthenticated } from "@/lib/auth"

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      setAuthenticated(isAuthenticated())
      setLoading(false)
    }

    checkAuth()

    // Listen for auth changes
    const handleAuthChange = () => {
      checkAuth()
    }

    window.addEventListener("auth-changed", handleAuthChange)

    return () => {
      window.removeEventListener("auth-changed", handleAuthChange)
    }
  }, [])

  return { isAuthenticated: authenticated, loading }
}
