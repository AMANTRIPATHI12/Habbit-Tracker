export function loadMonthData(monthKey) {
  const data = localStorage.getItem(`tracker-${monthKey}`)
  return data ? JSON.parse(data) : { tasks: [], tracker: {} }
}

export function saveMonthData(monthKey, data) {
  localStorage.setItem(`tracker-${monthKey}`, JSON.stringify(data))
}
