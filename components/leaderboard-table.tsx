"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getLeaderboardData, type LeaderboardEntry } from "@/lib/storage";

export function LeaderboardTable() {
  const [data, setData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const loadData = () => {
      const leaderboardData = getLeaderboardData();
      setData(leaderboardData);
    };

    loadData();

    // Listen for storage changes to update in real-time
    const handleStorageChange = () => {
      loadData();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("leaderboard-updated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("leaderboard-updated", handleStorageChange);
    };
  }, []);

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-400 text-black";
    if (rank === 2) return "bg-yellow-600 text-black";
    if (rank === 3) return "bg-yellow-800 text-black";
    return "bg-gray-600 text-white";
  };

  return (
    <Card className="bg-gray-800/50 border-yellow-400/20 backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-yellow-400/20">
              <th className="text-left p-4 text-yellow-400 font-semibold">
                SN
              </th>
              <th className="text-left p-4 text-yellow-400 font-semibold">
                Name
              </th>
              <th className="text-center p-4 text-yellow-400 font-semibold">
                Motivation (+1)
              </th>
              <th className="text-center p-4 text-yellow-400 font-semibold">
                Discipline (+1)
              </th>
              <th className="text-center p-4 text-yellow-400 font-semibold">
                Punctuality (+1)
              </th>
              <th className="text-center p-4 text-yellow-400 font-semibold">
                Works (+1)
              </th>
              <th className="text-center p-4 text-yellow-400 font-semibold">
                Knowledge (+10)
              </th>
              <th className="text-center p-4 text-yellow-400 font-semibold">
                Achievement (+5)
              </th>
              <th className="text-center p-4 text-yellow-400 font-semibold">
                Total Score
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr
                key={entry.id}
                className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
              >
                <td className="p-4">
                  <Badge className={getRankBadgeColor(index + 1)}>
                    {index + 1}
                  </Badge>
                </td>
                <td className="p-4 text-white font-medium">{entry.name}</td>
                <td className="p-4 text-center text-green-400">
                  +{entry.motivation}
                </td>
                <td className="p-4 text-center text-green-400">
                  +{entry.discipline}
                </td>
                <td className="p-4 text-center text-green-400">
                  +{entry.punctuality}
                </td>
                <td className="p-4 text-center text-green-400">
                  +{entry.works}
                </td>
                <td className="p-4 text-center text-green-400">
                  +{entry.knowledge}
                </td>
                <td className="p-4 text-center text-green-400">
                  +{entry.achievement}
                </td>
                <td className="p-4 text-center text-yellow-400 font-bold text-lg">
                  {entry.totalScore}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
