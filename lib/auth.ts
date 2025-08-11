"use client"

const AUTH_TOKEN_KEY = "leaders_club_auth_token"
const ADMIN_CREDENTIALS = {
  username: process.env.NEXT_PUBLIC_ADMIN_USERNAME,
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
}

export function login(username: string, password: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        const token = btoa(`${username}:${Date.now()}`)
        localStorage.setItem(AUTH_TOKEN_KEY, token)

        // Set cookie for additional security
        document.cookie = `auth_token=${token}; path=/; max-age=86400; secure; samesite=strict`

        window.dispatchEvent(new CustomEvent("auth-changed"))
        resolve(true)
      } else {
        resolve(false)
      }
    }, 1000)
  })
}

export function logout(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY)
  document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
  window.dispatchEvent(new CustomEvent("auth-changed"))
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false

  const token = localStorage.getItem(AUTH_TOKEN_KEY)
  if (!token) return false

  try {
    const decoded = atob(token)
    const [username, timestamp] = decoded.split(":")
    const tokenAge = Date.now() - Number.parseInt(timestamp)

    // Token expires after 24 hours
    if (tokenAge > 24 * 60 * 60 * 1000) {
      logout()
      return false
    }

    return username === ADMIN_CREDENTIALS.username
  } catch {
    return false
  }
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(AUTH_TOKEN_KEY)
}
