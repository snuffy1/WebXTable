"use client"

export interface LeaderboardEntry {
  id: string
  name: string
  motivation: number
  discipline: number
  punctuality: number
  works: number
  knowledge: number
  achievement: number
  totalScore: number
}

const STORAGE_KEY = "leaders_club_data"

const defaultData: LeaderboardEntry[] = [
  {
    id: "1",
    name: "Rojan",
    motivation: 5,
    discipline: 5,
    punctuality: 5,
    works: 5,
    knowledge: 10,
    achievement: 5,
    totalScore: 35,
  },
  {
    id: "2",
    name: "Allen",
    motivation: 4,
    discipline: 4,
    punctuality: 4,
    works: 4,
    knowledge: 10,
    achievement: 5,
    totalScore: 31,
  },
  {
    id: "3",
    name: "Sunil",
    motivation: 4,
    discipline: 4,
    punctuality: 4,
    works: 4,
    knowledge: 10,
    achievement: 5,
    totalScore: 31,
  },
  {
    id: "4",
    name: "Sijan",
    motivation: 3,
    discipline: 3,
    punctuality: 3,
    works: 3,
    knowledge: 10,
    achievement: 5,
    totalScore: 27,
  },
  {
    id: "5",
    name: "Bibek",
    motivation: 3,
    discipline: 3,
    punctuality: 3,
    works: 2,
    knowledge: 10,
    achievement: 5,
    totalScore: 26,
  },
  {
    id: "6",
    name: "Krishna",
    motivation: 3,
    discipline: 3,
    punctuality: 3,
    works: 2,
    knowledge: 10,
    achievement: 5,
    totalScore: 26,
  },
  {
    id: "7",
    name: "Rewant",
    motivation: 3,
    discipline: 3,
    punctuality: 3,
    works: 2,
    knowledge: 10,
    achievement: 5,
    totalScore: 26,
  },
  {
    id: "8",
    name: "Shyam",
    motivation: 1,
    discipline: 1,
    punctuality: 1,
    works: 1,
    knowledge: 10,
    achievement: 1,
    totalScore: 15,
  },
  {
    id: "9",
    name: "Bishnu",
    motivation: 0,
    discipline: 0,
    punctuality: 0,
    works: 0,
    knowledge: 5,
    achievement: 0,
    totalScore: 5,
  },
  {
    id: "10",
    name: "Aakash",
    motivation: 0,
    discipline: 0,
    punctuality: 0,
    works: 0,
    knowledge: 0,
    achievement: 0,
    totalScore: 0,
  },
]

export function getLeaderboardData(): LeaderboardEntry[] {
  if (typeof window === "undefined") return defaultData

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      return data.sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.totalScore - a.totalScore)
    }
  } catch (error) {
    console.error("Error loading leaderboard data:", error)
  }

  // Initialize with default data
  saveLeaderboardData(defaultData)
  return defaultData
}

export function saveLeaderboardData(data: LeaderboardEntry[]): void {
  if (typeof window === "undefined") return

  try {
    const sortedData = data.sort((a, b) => b.totalScore - a.totalScore)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sortedData))
  } catch (error) {
    console.error("Error saving leaderboard data:", error)
  }
}

export function addLeaderboardEntry(entry: Omit<LeaderboardEntry, "id" | "totalScore">): void {
  const data = getLeaderboardData()
  const newEntry: LeaderboardEntry = {
    ...entry,
    id: Date.now().toString(),
    totalScore:
      entry.motivation + entry.discipline + entry.punctuality + entry.works + entry.knowledge + entry.achievement,
  }

  data.push(newEntry)
  saveLeaderboardData(data)
}

export function updateLeaderboardEntry(id: string, updates: Partial<LeaderboardEntry>): void {
  const data = getLeaderboardData()
  const index = data.findIndex((entry) => entry.id === id)

  if (index !== -1) {
    const updatedEntry = { ...data[index], ...updates }
    updatedEntry.totalScore =
      updatedEntry.motivation +
      updatedEntry.discipline +
      updatedEntry.punctuality +
      updatedEntry.works +
      updatedEntry.knowledge +
      updatedEntry.achievement

    data[index] = updatedEntry
    saveLeaderboardData(data)
  }
}

export function deleteLeaderboardEntry(id: string): void {
  const data = getLeaderboardData()
  const filteredData = data.filter((entry) => entry.id !== id)
  saveLeaderboardData(filteredData)
}
