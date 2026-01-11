export default function WeeklyView({ tasks, tracker, selectedDay }) {
  const start = selectedDay - ((selectedDay - 1) % 7)

  return (
    <div>
      <h2 className="font-semibold mb-2">Weekly View</h2>

      {tasks.map(task => (
        <div key={task.id} className="flex items-center gap-2 mb-1">
          <span className="w-24 text-sm truncate">{task.name}</span>

          {Array.from({ length: 7 }, (_, i) => {
            const day = start + i
            return (
              <input
                key={day}
                type="checkbox"
                readOnly
                checked={tracker[day]?.[task.id] || false}
                className="accent-green-500"
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
