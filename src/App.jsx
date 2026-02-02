import { useState } from "react"
import Dashboard from "./pages/Dashboard"
import MonthlyTracker from "./pages/MonthlyTracker"
import NextDayTask from "./pages/NextDayTask"

export default function App() {
  const [view, setView] = useState("dashboard")

  return (
    <>
      {view === "dashboard" && (
        <Dashboard setView={setView} />
      )}

      {view === "monthly" && (
        <MonthlyTracker onBack={() => setView("dashboard")} />
      )}

      {view === "nextday" && (
        <NextDayTask onBack={() => setView("dashboard")} />
      )}
    </>
  )
}
