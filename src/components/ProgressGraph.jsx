import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function ProgressGraph({
  tracker,
  tasks,
  daysInMonth,
  startDay,
  todayDay,
}) {
  const totalTasks = tasks.length

  const graphData = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1

    // ❌ Before tracking or future → inactive
    if (day < startDay || day > todayDay) {
      return {
        day,
        label: day,
        completed: 0,
        percentage: 0,
        active: false,
      }
    }

    const dayData = tracker[day] || {}
    const completed = Object.values(dayData).filter(Boolean).length

    const percentage =
      totalTasks === 0 ? 0 : Math.round((completed / totalTasks) * 100)

    return {
      day,
      label: day,
      completed,
      percentage,
      active: Object.keys(dayData).length > 0,
    }
  })

  /* ---------------- STREAK LOGIC ---------------- */
  let currentStreak = 0
  let longestStreak = 0

  graphData.forEach(d => {
    if (d.active && d.percentage === 100 && totalTasks > 0) {
      currentStreak++
      longestStreak = Math.max(longestStreak, currentStreak)
    } else if (d.day <= todayDay) {
      currentStreak = 0
    }
  })

  /* ---------------- AVERAGE (ACTIVE DAYS ONLY) ---------------- */
  const activeDays = graphData.filter(
    d => d.day >= startDay && d.day <= todayDay
  )

  const avgCompletion =
    activeDays.length === 0
      ? 0
      : Math.round(
          activeDays.reduce((s, d) => s + d.percentage, 0) /
            activeDays.length
      )

  return (
    <div className="
      bg-white dark:bg-zinc-800
      rounded-xl p-6
      border border-zinc-200 dark:border-zinc-700
      shadow-sm dark:shadow-none
    ">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Progress</h2>

        <div className="flex gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {currentStreak}
            </div>
            <div className="text-zinc-400 text-sm">Current streak</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {longestStreak}
            </div>
            <div className="text-zinc-400 text-sm">Longest streak</div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

            <XAxis
              dataKey="label"
              stroke="#9CA3AF"
              fontSize={12}
              interval={Math.max(1, Math.floor(daysInMonth / 10))}
            />

            {/* ✅ Completed tasks axis */}
            <YAxis
              yAxisId="left"
              stroke="#9CA3AF"
              domain={[0, Math.max(totalTasks, 1)]}
            />

            {/* ✅ Percentage axis */}
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#9CA3AF"
              domain={[0, 100]}
              tickFormatter={v => `${v}%`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                borderColor: "#4B5563",
                borderRadius: "0.5rem",
              }}
              formatter={(value, name) =>
                name === "percentage"
                  ? [`${value}%`, "Completion"]
                  : [value, "Completed"]
              }
              labelFormatter={l => `Day ${l}`}
            />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="completed"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="percentage"
              stroke="#3B82F6"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-zinc-900 p-4 rounded-lg">
          <div className="text-2xl font-bold">
            {graphData.reduce((s, d) => s + d.completed, 0)}
          </div>
          <div className="text-zinc-400 text-sm">Total completed</div>
        </div>

        <div className="bg-zinc-900 p-4 rounded-lg">
          <div className="text-2xl font-bold">{avgCompletion}%</div>
          <div className="text-zinc-400 text-sm">Avg completion</div>
        </div>

        <div className="bg-zinc-900 p-4 rounded-lg">
          <div className="text-2xl font-bold">
            {graphData.filter(
              d => d.active && d.percentage === 100
            ).length}
          </div>
          <div className="text-zinc-400 text-sm">Perfect days</div>
        </div>
      </div>
    </div>
  )
}
