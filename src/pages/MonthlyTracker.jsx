import { useState, useEffect } from "react"
import Header from "../components/Header"
import TrackerGrid from "../components/TrackerGrid"
import StatsPanel from "../components/StatsPanel"
import AddTask from "../components/AddTask"
import ProgressGraph from "../components/ProgressGraph"
import { getMonthInfo } from "../utils/dateUtils"
import { loadMonthData, saveMonthData } from "../utils/storage"

export default function MonthlyTracker({ onBack }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { daysInMonth, monthKey, monthLabel } = getMonthInfo(currentDate)

  const [tasks, setTasks] = useState([])
  const [tracker, setTracker] = useState({})
  const [selectedDay, setSelectedDay] = useState(1)
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  )

  const today = new Date()
  const isCurrentMonth =
    today.getFullYear() === currentDate.getFullYear() &&
    today.getMonth() === currentDate.getMonth()

  const todayDay = isCurrentMonth ? today.getDate() : null
  const startDay = isCurrentMonth ? today.getDate() : 1

  useEffect(() => {
    setSelectedDay(isCurrentMonth ? today.getDate() : 1)
  }, [currentDate])

  useEffect(() => {
    const data = loadMonthData(monthKey)
    setTasks(data.tasks)
    setTracker(data.tracker)
  }, [monthKey])

  useEffect(() => {
    saveMonthData(monthKey, { tasks, tracker })
  }, [tasks, tracker, monthKey])

  function addTask(name) {
    setTasks(prev => [...prev, { id: Date.now(), name }])
  }

  function prevMonth() {
    setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))
  }

  function nextMonth() {
    setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))
  }

  function deleteTask(taskId) {
    setTasks(prev => prev.filter(t => t.id !== taskId))

    setTracker(prev => {
      const updated = {}
      for (const day in prev) {
        const dayData = { ...prev[day] }
        delete dayData[taskId]
        if (Object.keys(dayData).length > 0) updated[day] = dayData
      }
      return updated
    })
  }

  function toggleTheme() {
    setTheme(prev => {
      const next = prev === "dark" ? "light" : "dark"
      localStorage.setItem("theme", next)
      return next
    })
  }

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "dark"
          ? "dark bg-zinc-900 text-white"
          : "bg-zinc-100 text-zinc-900"
      }`}
    >
      {/* Back */}
      <button
        onClick={onBack}
        className="text-sm p-4 text-zinc-400 hover:text-white"
      >
        ← Back to Dashboard
      </button>

      <Header
        monthLabel={monthLabel}
        onPrev={prevMonth}
        onNext={nextMonth}
        onToggleTheme={toggleTheme}
      />

      <main className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4">
            <AddTask onAdd={addTask} />
          </div>

          <TrackerGrid
            tasks={tasks}
            tracker={tracker}
            setTracker={setTracker}
            daysInMonth={daysInMonth}
            setSelectedDay={setSelectedDay}
            onDeleteTask={deleteTask}
            startDay={startDay}
            todayDay={todayDay}
          />

          <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
            <ProgressGraph
              tracker={tracker}
              tasks={tasks}
              daysInMonth={daysInMonth}
            />
          </div>
        </div>

        <StatsPanel
          tasks={tasks}
          tracker={tracker}
          selectedDay={selectedDay}
          startDay={startDay}
          todayDay={todayDay}
        />
      </main>
    </div>
  )
}
