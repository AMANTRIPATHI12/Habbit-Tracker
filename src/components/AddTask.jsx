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
      className="
        w-full px-4 py-2 rounded-lg
        bg-white dark:bg-zinc-800
        border border-zinc-300 dark:border-zinc-700
        text-zinc-900 dark:text-white
        placeholder-zinc-400
        focus:outline-none focus:ring-2 focus:ring-blue-500
      "
      placeholder="Add task and press Enter"
    />
  )
}
