export default function Heatmap({ tracker, tasks, daysInMonth }) {
  return (
    <div className="mt-6">
      <h3 className="text-sm mb-2 text-zinc-400">Monthly Heatmap</h3>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1
          const done =
            Object.values(tracker[day] || {}).filter(Boolean).length

          const intensity =
            tasks.length === 0 ? 0 : done / tasks.length

          let bg = "bg-zinc-800"
          if (intensity > 0.75) bg = "bg-green-600"
          else if (intensity > 0.5) bg = "bg-green-500"
          else if (intensity > 0.25) bg = "bg-green-400"

          return (
            <div
              key={day}
              className={`h-6 w-6 rounded ${bg}`}
              title={`Day ${day}`}
            />
          )
        })}
      </div>
    </div>
  )
}
