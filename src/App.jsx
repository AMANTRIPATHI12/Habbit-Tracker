import { useState, useEffect } from "react"
import Header from "./components/Header"
import TrackerGrid from "./components/TrackerGrid"
import StatsPanel from "./components/StatsPanel"
import AddTask from "./components/AddTask"
import { getMonthInfo } from "./utils/dateUtils"
import { loadMonthData, saveMonthData } from "./utils/storage"

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { daysInMonth, monthKey, monthLabel, weeks } =
    getMonthInfo(currentDate)

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
        <div className="flex-1 flex flex-col">
          <div className="p-4">
            <AddTask onAdd={addTask} />
          </div>

          <TrackerGrid
            tasks={tasks}
            tracker={tracker}
            setTracker={setTracker}
            weeks={weeks}
            setSelectedDay={setSelectedDay}
          />
        </div>

        <StatsPanel
          tasks={tasks}
          tracker={tracker}
          selectedDay={selectedDay}
          daysInMonth={daysInMonth}
        />
      </main>
    </div>
  )
}
