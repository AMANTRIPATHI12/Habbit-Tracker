import MonthSwitcher from "./MonthSwitcher"

export default function Header({ monthLabel, onPrev, onNext }) {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-zinc-800">
      <h1 className="text-xl font-semibold">Monthly Tracker</h1>
      <MonthSwitcher
        monthLabel={monthLabel}
        onPrev={onPrev}
        onNext={onNext}
      />
    </header>
  )
}
