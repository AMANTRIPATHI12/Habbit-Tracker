export function loadMonthData(monthKey) {
  const data = localStorage.getItem(monthKey)
  return data ? JSON.parse(data) : { tasks: [], tracker: {} }
}

export function saveMonthData(monthKey, data) {
  localStorage.setItem(monthKey, JSON.stringify(data))
}
