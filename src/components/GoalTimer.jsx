import { useEffect, useState } from "react"

/* Calendar-accurate diff */
function getCalendarDiff(target) {
  const now = new Date()
  const end = new Date(target)

  if (end <= now) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  let years = end.getFullYear() - now.getFullYear()
  let months = end.getMonth() - now.getMonth()
  let days = end.getDate() - now.getDate()
  let hours = end.getHours() - now.getHours()
  let minutes = end.getMinutes() - now.getMinutes()
  let seconds = end.getSeconds() - now.getSeconds()

  if (seconds < 0) { seconds += 60; minutes-- }
  if (minutes < 0) { minutes += 60; hours-- }
  if (hours < 0) { hours += 24; days-- }
  if (days < 0) {
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0)
    days += prevMonth.getDate()
    months--
  }
  if (months < 0) { months += 12; years-- }

  return { years, months, days, hours, minutes, seconds }
}

/* Ring progress */
function ringProgress(remaining, total, color) {
  const progress = Math.max(1 - remaining / total, 0)
  return {
    background: `
      conic-gradient(
        ${color} ${progress * 360}deg,
        rgba(255,255,255,0.08) 0deg
      )
    `,
  }
}

export default function GoalTimer({ targetTime, goalText, onBack }) {
  const [, tick] = useState(0)

  useEffect(() => {
    const i = setInterval(() => tick(v => v + 1), 1000)
    return () => clearInterval(i)
  }, [])

  const { years, months, days, hours, minutes, seconds } =
    getCalendarDiff(targetTime)

  const now = new Date()
  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate()

  /* Build rings dynamically */
  const rings = []

  if (years > 0) {
    rings.push({ key: "years", remaining: years % 10, total: 10, color: "#7c3aed" })
  }
  if (months > 0) {
    rings.push({ key: "months", remaining: months, total: 12, color: "#2563eb" })
  }
  if (days > 0) {
    rings.push({ key: "days", remaining: days, total: daysInMonth, color: "#0891b2" })
  }

  rings.push({ key: "hours", remaining: hours, total: 24, color: "#16a34a" })
  rings.push({ key: "minutes", remaining: minutes, total: 60, color: "#eab308" })
  rings.push({ key: "seconds", remaining: seconds, total: 60, color: "#ef4444", pulse: true })

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col z-50">
      {/* Top */}
      <div className="flex items-center justify-between p-6">
        <button onClick={onBack} className="text-zinc-400 hover:text-white">
          ← Dashboard
        </button>
        <div className="text-xs tracking-widest text-zinc-500">
          TIME IS PASSING
        </div>
      </div>

      {/* Goal text */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-4">
        <p className="text-lg text-zinc-300 leading-relaxed">
          {goalText}
        </p>
      </div>

      {/* Rings */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-[520px] h-[520px]">
          {rings.map((r, i) => (
            <div
              key={r.key}
              className={`
                absolute rounded-full
                transition-[background] duration-1000 linear
                ${r.pulse ? "animate-pulse" : ""}
              `}
              style={{
                inset: `${i * 30}px`,
                ...ringProgress(r.remaining, r.total, r.color),
              }}
            />
          ))}

          {/* Core */}
          <div
            className="absolute bg-black rounded-full flex flex-col items-center justify-center"
            style={{
              inset: `${rings.length * 30 + 40}px`,
            }}
          >
            <div className="text-6xl font-extrabold text-red-500">
              {seconds}s
            </div>
            <div className="text-xs tracking-widest text-zinc-500 mt-2">
              RIGHT NOW
            </div>
          </div>
        </div>
      </div>

      {/* Bottom breakdown */}
      <div className="pb-10 grid grid-cols-6 gap-6 text-center text-sm text-zinc-400">
        <div>{years}y</div>
        <div>{months}mo</div>
        <div>{days}d</div>
        <div>{hours}h</div>
        <div>{minutes}m</div>
        <div className="text-red-500 font-bold">{seconds}s</div>
      </div>
    </div>
  )
}
