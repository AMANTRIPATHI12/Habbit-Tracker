import { useEffect, useState } from "react"

const STORAGE_KEY = "next_day_tasks"

export default function NextDayTask({ onBack }) {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState("")

  /* ---------- Load ---------- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (saved) setTasks(saved)
  }, [])

  /* ---------- Save ---------- */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  /* ---------- Actions ---------- */
  function addTask() {
    if (!input.trim()) return

    setTasks(prev => [
      ...prev,
      {
        id: Date.now(),
        text: input.trim(),
        done: false,
      },
    ])
    setInput("")
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    )
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen flex flex-col bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white">

      {/* Top Bar */}
      <div className="flex items-center gap-4 p-4 border-b border-zinc-200 dark:border-zinc-800">
        <button
          onClick={onBack}
          className="text-sm text-zinc-500 hover:text-white"
        >
          ← Dashboard
        </button>

        <h1 className="text-xl font-bold">
          ⏭️ Next Day Tasks
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-2xl mx-auto w-full p-6">

        {/* Add Task */}
        <div className="flex gap-3 mb-6">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addTask()}
            placeholder="What do you want to do tomorrow?"
            className="
              flex-1 px-4 py-3 rounded-lg
              bg-white dark:bg-zinc-800
              border border-zinc-300 dark:border-zinc-700
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          />

          <button
            onClick={addTask}
            className="
              px-5 py-3 rounded-lg font-medium
              bg-blue-600 hover:bg-blue-500 text-white
            "
          >
            Add
          </button>
        </div>

        {/* Task List */}
        {tasks.length === 0 ? (
          <p className="text-zinc-400 text-center mt-20">
            No tasks planned yet 🌙
          </p>
        ) : (
          <ul className="space-y-3">
            {tasks.map(task => (
              <li
                key={task.id}
                className="
                  flex items-center justify-between
                  bg-white dark:bg-zinc-800
                  border border-zinc-200 dark:border-zinc-700
                  rounded-lg px-4 py-3
                "
              >
                <div
                  onClick={() => toggleTask(task.id)}
                  className={`cursor-pointer flex-1 ${
                    task.done
                      ? "line-through text-zinc-400"
                      : ""
                  }`}
                >
                  {task.text}
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="ml-4 text-zinc-400 hover:text-red-400"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
