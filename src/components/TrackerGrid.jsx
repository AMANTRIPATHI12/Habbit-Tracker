export default function TrackerGrid({
  tasks,
  tracker,
  setTracker,
  daysInMonth,
  setSelectedDay,
  onDeleteTask,
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
            <th className="
              sticky left-0 px-3
              bg-zinc-100 dark:bg-zinc-900
              border border-zinc-300 dark:border-zinc-800
              font-medium
            ">
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
              {/* ✅ FIXED TASK CELL */}
              <td className="
                  border border-zinc-300 dark:border-zinc-800
                  bg-white dark:bg-zinc-900
                  text-center
                ">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate">{task.name}</span>

                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="ml-2 text-red-500 hover:text-red-600 text-xs"
                  >
                    ✕
                  </button>
                </div>
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
