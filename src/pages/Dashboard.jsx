export default function Dashboard({ setView }) {
  return (
    <div className="
      min-h-screen
      flex flex-wrap
      items-center justify-center
      gap-6
      p-6
      bg-zinc-100 dark:bg-zinc-900
    ">

      {/* Monthly Tracker */}
      <div
        onClick={() => setView("monthly")}
        className="
          cursor-pointer w-72 p-6 rounded-xl
          bg-white dark:bg-zinc-800
          border border-zinc-200 dark:border-zinc-700
          shadow-sm dark:shadow-none
          hover:scale-105 hover:shadow-md
          transition
        "
      >
        <h2 className="text-xl font-bold mb-2">
          📅 Monthly Tracker
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Track habits, streaks & monthly progress
        </p>
      </div>

      {/* Next Day Tasks */}
      <div
        onClick={() => setView("nextday")}
        className="
          cursor-pointer w-72 p-6 rounded-xl
          bg-white dark:bg-zinc-800
          border border-zinc-200 dark:border-zinc-700
          shadow-sm dark:shadow-none
          hover:scale-105 hover:shadow-md
          transition
        "
      >
        <h2 className="text-xl font-bold mb-2">
          📝 Next Day Tasks
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Plan and focus on tomorrow
        </p>
      </div>

      {/* Goal Timer */}
      <div
        onClick={() => setView("goal")}
        className="
          cursor-pointer w-72 p-6 rounded-xl
          bg-white dark:bg-zinc-800
          border border-zinc-200 dark:border-zinc-700
          shadow-sm dark:shadow-none
          hover:scale-105 hover:shadow-md
          transition
        "
      >
        <h2 className="text-xl font-bold mb-2">
          🎯 Write Your Goal
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Set a goal & track remaining time
        </p>
      </div>

    </div>
  )
}
