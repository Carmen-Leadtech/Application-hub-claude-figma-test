type Status = "Draft" | "Applied" | "Under Review" | "Closed";

interface ProgressTrackerProps {
  counts: Record<Status, number>;
}

const statusDotColors: Record<Status, string> = {
  Draft: "bg-status-draft",
  Applied: "bg-status-applied",
  "Under Review": "bg-status-underreview",
  Closed: "bg-status-closed",
};

const statusBgColors: Record<Status, string> = {
  Draft: "hsl(var(--muted))",
  Applied: "hsl(var(--status-applied) / 0.12)",
  "Under Review": "hsl(var(--status-underreview) / 0.12)",
  Closed: "hsl(var(--muted) / 0.6)",
};

const stages: Status[] = ["Draft", "Applied", "Under Review", "Closed"];

const getClipPath = (index: number, total: number) => {
  const d = 14; // arrow depth in px
  if (index === 0) {
    return `polygon(0 0, calc(100% - ${d}px) 0, 100% 50%, calc(100% - ${d}px) 100%, 0 100%)`;
  }
  if (index === total - 1) {
    return `polygon(0 0, 100% 0, 100% 100%, 0 100%, ${d}px 50%)`;
  }
  return `polygon(0 0, calc(100% - ${d}px) 0, 100% 50%, calc(100% - ${d}px) 100%, 0 100%, ${d}px 50%)`;
};

const ProgressTracker = ({ counts }: ProgressTrackerProps) => {
  return (
    <div className="w-full py-1">
      {/* Desktop: arrow segments */}
      <div className="hidden sm:flex">
        {stages.map((label, index) => (
          <div
            key={label}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
            style={{
              backgroundColor: statusBgColors[label],
              clipPath: getClipPath(index, stages.length),
              paddingLeft: index === 0 ? 16 : 22,
              paddingRight: index === stages.length - 1 ? 16 : 22,
            }}
          >
            <span className={`h-2.5 w-2.5 rounded-full ${statusDotColors[label]} flex-shrink-0`} />
            <span className="text-sm font-medium text-foreground whitespace-nowrap">
              {label} ({counts[label]})
            </span>
          </div>
        ))}
      </div>

      {/* Mobile: vertical stack */}
      <div className="flex sm:hidden flex-col gap-2">
        {stages.map((label) => (
          <button
            key={label}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 min-h-[44px] active:scale-[0.98] transition-transform duration-200"
            style={{ backgroundColor: statusBgColors[label] }}
          >
            <span className={`h-2.5 w-2.5 rounded-full ${statusDotColors[label]} flex-shrink-0`} />
            <span className="text-sm font-medium text-foreground whitespace-nowrap">
              {label} ({counts[label]})
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
