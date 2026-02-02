export default function Dashboard({ setView }) {
  return (
    <div className="min-h-screen flex items-center justify-center gap-6 p-6">

      <div
        onClick={() => setView("monthly")}
        className="cursor-pointer w-72 p-6 rounded-xl bg-white dark:bg-zinc-800 border hover:scale-105 transition"
      >
        <h2 className="text-xl font-bold mb-2">📅 Monthly Tracker</h2>
        <p className="text-sm text-zinc-500">
          Track habits, streaks & progress
        </p>
      </div>

      <div
        onClick={() => setView("nextday")}
        className="cursor-pointer w-72 p-6 rounded-xl bg-white dark:bg-zinc-800 border hover:scale-105 transition"
      >
        <h2 className="text-xl font-bold mb-2">⏭️ Next Day Tasks</h2>
        <p className="text-sm text-zinc-500">
          Plan tomorrow separately
        </p>
      </div>
    </div>
  )
}
