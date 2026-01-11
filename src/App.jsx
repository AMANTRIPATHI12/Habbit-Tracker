import { useState, useEffect } from "react"
import Header from "./components/Header"
import TrackerGrid from "./components/TrackerGrid"
import StatsPanel from "./components/StatsPanel"
import AddTask from "./components/AddTask"
import ProgressGraph from "./components/ProgressGraph"
import { getMonthInfo } from "./utils/dateUtils"
import { loadMonthData, saveMonthData } from "./utils/storage"

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { daysInMonth, monthKey, monthLabel } = getMonthInfo(currentDate)

  const [tasks, setTasks] = useState([])
  const [tracker, setTracker] = useState({})
  const [selectedDay, setSelectedDay] = useState(1)

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

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col">
      <Header monthLabel={monthLabel} onPrev={prevMonth} onNext={nextMonth} />

      <main className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* LEFT SIDE */}
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
          />

          {/* 🔥 ProgressGraph AT BOTTOM OF TASKS */}
          <div className="p-4 border-t border-zinc-800">
            <ProgressGraph
              tracker={tracker}
              tasks={tasks}
              daysInMonth={daysInMonth}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <StatsPanel
          tasks={tasks}
          tracker={tracker}
          selectedDay={selectedDay}
        />
      </main>
    </div>
  )
}
