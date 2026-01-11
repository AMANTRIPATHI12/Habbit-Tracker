import MonthSwitcher from "./MonthSwitcher"

export default function Header({ monthLabel, onPrev, onNext, onToggleTheme }) {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
      <h1 className="text-xl font-semibold">Monthly Tracker</h1>

      <div className="flex items-center gap-4">
        <MonthSwitcher
          monthLabel={monthLabel}
          onPrev={onPrev}
          onNext={onNext}
        />

        <button
          onClick={onToggleTheme}
          className="px-3 py-1 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          🌙 / ☀️
        </button>
      </div>
    </header>
  )
}
