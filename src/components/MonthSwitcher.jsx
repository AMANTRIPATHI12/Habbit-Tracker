export default function MonthSwitcher({ monthLabel, onPrev, onNext }) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onPrev}
        className="px-3 py-1 border border-zinc-700 rounded hover:bg-zinc-800"
      >
        ←
      </button>

      <span className="text-sm text-zinc-300">{monthLabel}</span>

      <button
        onClick={onNext}
        className="px-3 py-1 border border-zinc-700 rounded hover:bg-zinc-800"
      >
        →
      </button>
    </div>
  )
}
