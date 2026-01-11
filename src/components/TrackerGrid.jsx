export default function TrackerGrid({
  tasks,
  tracker,
  setTracker,
  daysInMonth,
  setSelectedDay,
}) {
  function toggle(taskId, day) {
    setTracker(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [taskId]: !prev[day]?.[taskId],
      },
    }))
  }

  return (
    <div className="overflow-x-auto p-4 flex-1">
      <table className="border-collapse min-w-max">
        <thead>
          <tr>
            <th className="sticky left-0 bg-zinc-900 border border-zinc-800 px-3">
              Task
            </th>

            {Array.from({ length: daysInMonth }, (_, i) => (
              <th
                key={i}
                className="border border-zinc-800 px-2 cursor-pointer"
                onClick={() => setSelectedDay(i + 1)}
              >
                {i + 1}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td className="sticky left-0 bg-zinc-900 border border-zinc-800 px-3">
                {task.name}
              </td>

              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1
                return (
                  <td
                    key={day}
                    className="border border-zinc-800 text-center"
                  >
                    <input
                      type="checkbox"
                      checked={tracker[day]?.[task.id] || false}
                      onChange={() => toggle(task.id, day)}
                    />
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
