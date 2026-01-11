export function getMonthInfo(date) {
  const year = date.getFullYear()
  const month = date.getMonth()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const monthLabel = date.toLocaleString("default", {
    month: "long",
    year: "numeric",
  })
  const monthKey = `${year}-${month + 1}`

  // Weekly grouping
  const weeks = []
  let week = []

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day)
    if (week.length === 7 || day === daysInMonth) {
      weeks.push(week)
      week = []
    }
  }

  return { daysInMonth, monthLabel, monthKey, weeks }
}
