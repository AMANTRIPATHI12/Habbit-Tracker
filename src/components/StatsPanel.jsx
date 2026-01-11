export default function StatsPanel({
  tasks,
  tracker,
  selectedDay,
}) {
  const done = Object.values(tracker[selectedDay] || {}).filter(Boolean).length
  const notDone = tasks.length - done

  return (
    <section className="w-full md:w-80 p-4 border-t md:border-l border-zinc-800">
      <h2 className="font-semibold mb-2">Day {selectedDay}</h2>

      <p className="text-green-400">Done: {done}</p>
      <p className="text-red-400">Not Done: {notDone}</p>
    </section>
  )
}
