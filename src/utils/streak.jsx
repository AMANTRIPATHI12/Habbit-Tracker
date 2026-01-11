export function calculateStreak(tracker, daysInMonth) {
  let streak = 0
  let best = 0
  let current = 0

  for (let day = 1; day <= daysInMonth; day++) {
    const dayData = tracker[day]
    const completed =
      dayData &&
      Object.values(dayData).length > 0 &&
      Object.values(dayData).every(Boolean)

    if (completed) {
      current++
      best = Math.max(best, current)
    } else {
      current = 0
    }
  }

  streak = current
  return { streak, best }
}
