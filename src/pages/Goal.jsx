import { useEffect, useState } from "react"
import GoalTimer from "../components/GoalTimer"

const STORAGE_KEY = "main_goal"

export default function Goal({ onBack }) {
  const [goal, setGoal] = useState({
    text: "",
    targetTime: null,
    startTime: null,
    date: "",
    time: "",
  })

  /* Load goal */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return

    const parsed = JSON.parse(saved)
    setGoal({
      text: parsed.text || "",
      targetTime: parsed.targetTime || null,
      startTime: parsed.startTime || null,
      date: parsed.date || "",
      time: parsed.time || "",
    })
  }, [])

  function saveGoal() {
    if (!goal.text || !goal.date || !goal.time) return

    const targetTime = new Date(`${goal.date}T${goal.time}`).getTime()
    if (targetTime <= Date.now()) return

    const startTime = Date.now()

    const data = { ...goal, targetTime, startTime }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    setGoal(data)
  }

  const canStart =
    goal.text && goal.date && goal.time && !goal.targetTime

  function updateText(text) {
    setGoal(g => {
      const updated = { ...g, text }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white">
      {/* Header */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-4">
        <button onClick={onBack} className="text-zinc-400 hover:text-white">
          ← Dashboard
        </button>
        <h1 className="text-xl font-bold">🎯 Your Main Goal</h1>
      </div>

      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Goal Text — ALWAYS visible */}
        <textarea
          value={goal.text}
          onChange={e => updateText(e.target.value)}
          placeholder="Write your goal in detail..."
          className="
            w-full min-h-32 p-4 rounded-lg
            bg-white dark:bg-zinc-800
            border border-zinc-300 dark:border-zinc-700
            focus:outline-none
          "
        />

        {/* Time Selector */}
        {!goal.targetTime && (
          <div className="flex flex-wrap gap-4">
            <input
              type="date"
              value={goal.date}
              onChange={e =>
                setGoal(g => ({ ...g, date: e.target.value }))
              }
              className="bg-white dark:bg-zinc-800 border p-3 rounded-lg"
            />

            <input
              type="time"
              value={goal.time}
              onChange={e =>
                setGoal(g => ({ ...g, time: e.target.value }))
              }
              className="bg-white dark:bg-zinc-800 border p-3 rounded-lg"
            />

            <button
              onClick={saveGoal}
              disabled={!canStart}
              className="
                bg-blue-600 hover:bg-blue-500 disabled:opacity-50
                text-white px-6 rounded-lg
              "
            >
              Start
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen Timer Overlay */}
      {goal.targetTime && (
        <GoalTimer
            targetTime={goal.targetTime}
            goalText={goal.text}
            onBack={onBack}
        />
      )}
    </div>
  )
}
