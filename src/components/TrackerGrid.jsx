export default function TrackerGrid({
  tasks,
  tracker,
  setTracker,
  weeks,
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
    <div className="overflow-auto flex-1 p-4">
      {weeks.map((week, wIndex) => (
        <div key={wIndex} className="mb-6">
          <h3 className="text-sm text-zinc-400 mb-2">
            Week {wIndex + 1}
          </h3>

          <table className="border-collapse w-full">
            <thead>
              <tr>
                <th className="border border-zinc-800 px-2">Task</th>
                {week.map(day => (
                  <th
                    key={day}
                    className="border border-zinc-800 px-2 cursor-pointer"
                    onClick={() => setSelectedDay(day)}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td className="border border-zinc-800 px-2">
                    {task.name}
                  </td>

                  {week.map(day => (
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
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}
