export default function StatsPanel({
  tasks,
  tracker,
  selectedDay,
  startDay,
  todayDay,
}) {
  // Before tracking started
  if (selectedDay < startDay) {
    return (
      <section className="w-full md:w-80 p-4 border-t md:border-l border-zinc-800">
        <h2 className="font-semibold mb-2">Day {selectedDay}</h2>
        <p className="text-zinc-400 text-sm">
          Tracking not started for this day
        </p>
      </section>
    )
  }

  // Not today (future or past locked)
  if (todayDay && selectedDay !== todayDay) {
    return (
      <section className="w-full md:w-80 p-4 border-t md:border-l border-zinc-800">
        <h2 className="font-semibold mb-2">Day {selectedDay}</h2>
        <p className="text-zinc-400 text-sm">
          You can only update today’s habits
        </p>
      </section>
    )
  }

  // Today stats
  const done = Object.values(tracker[selectedDay] || {}).filter(Boolean).length
  const notDone = Math.max(tasks.length - done, 0)

  return (
    <section className="w-full md:w-80 p-4 border-t md:border-l border-zinc-800">
      <h2 className="font-semibold mb-2">
        Today (Day {selectedDay})
      </h2>

      <p className="text-green-400">Done: {done}</p>
      <p className="text-red-400">Not Done: {notDone}</p>
    </section>
  )
}
