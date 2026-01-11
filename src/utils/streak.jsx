export function calculateStreak(tracker, daysInMonth) {
  let current = 0
  let best = 0

  for (let day = 1; day <= daysInMonth; day++) {
    const values = Object.values(tracker[day] || {})
    const completed =
      values.length > 0 && values.every(Boolean)

    if (completed) {
      current++
      best = Math.max(best, current)
    } else {
      current = 0
    }
  }

  return { streak: current, best }
}
