import { useState } from "react"

export default function AddTask({ onAdd }) {
  const [value, setValue] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

    const trimmed = value.trim()
    if (!trimmed) return

    onAdd(trimmed)
    setValue("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Add task and press Enter"
        className="w-full px-4 py-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </form>
  )
}
