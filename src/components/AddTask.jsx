import { useState } from "react"

export default function AddTask({ onAdd }) {
  const [value, setValue] = useState("")

  function handleKeyDown(e) {
    if (e.key === "Enter" && value.trim()) {
      onAdd(value.trim())
      setValue("")
    }
  }

  return (
    <input
      className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2"
      placeholder="Add task and press Enter"
      value={value}
      onChange={e => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  )
}
