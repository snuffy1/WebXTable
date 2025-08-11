import { LeaderboardTable } from "@/components/leaderboard-table";
import Image from "next/image";
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 flex justify-between">
          <div className="flex items-center justify-center ">
            <Image src="/leader.png" alt="okay" width={200} height={100} />
          </div>
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black flex justify-center items-center px-6 py-2 rounded-full font-semibold">
            Leaders Table
          </div>
        </div>

        <LeaderboardTable />

        <div className="text-center mt-8">
          <p className="text-yellow-400 text-xl font-bold flex items-center justify-center gap-2">
            ⭐ Push Hard Or Stay Behind. ⭐
          </p>
        </div>
      </div>
    </div>
  );
}
