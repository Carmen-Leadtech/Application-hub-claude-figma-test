import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import confetti from "canvas-confetti";
import { Status } from "@/context/ApplicationContext";

// Dot colors per status
const statusDotColor: Record<Status, string> = {
  Draft: "var(--status-draft-fill)",
  Applied: "var(--status-applied-fill)",
  "Under Review": "var(--status-underreview-fill)",
  Closed: "var(--status-closed-fill)",
};

const statusDescriptions: Record<Status, string> = {
  Draft: "Not yet submitted",
  Applied: "Application sent",
  "Under Review": "Employer is reviewing",
  Closed: "Process finished",
};

const allStatuses: Status[] = ["Draft", "Applied", "Under Review", "Closed"];

interface StatusDropdownProps {
  status: Status;
  onChange: (status: Status) => void;
  /** S = compact (inside card), M = standard (detail page) */
  size?: "S" | "M";
}

const StatusDropdown = ({ status, onChange, size = "M" }: StatusDropdownProps) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleSelect = (s: Status) => {
    onChange(s);
    setOpen(false);
    if (s === "Applied" && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      confetti({
        particleCount: 60,
        spread: 55,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: ["#3b82f6", "#6366f1", "#8b5cf6", "#ec4899", "#f59e0b"],
        ticks: 90,
        gravity: 1.2,
        scalar: 0.8,
        disableForReducedMotion: true,
      });
    }
  };

  const isSmall = size === "S";

  return (
    <div ref={containerRef} style={{ position: "relative", display: "inline-flex" }}>
      <button
        ref={btnRef}
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "var(--spacing-xxs-exception)",
          padding: isSmall
            ? "var(--spacing-xxs-exception) var(--spacing-xs)"
            : "var(--spacing-xs) var(--spacing-s-exception)",
          background: "var(--color-fill-common-default)",
          border: "1px solid var(--color-border-weaker)",
          borderRadius: "var(--corner-radius-s)",
          cursor: "pointer",
          fontSize: isSmall
            ? "var(--font-size-small-details-xs-captions)"
            : "var(--font-size-body-s)",
          fontWeight: "var(--font-weight-strong)",
          color: "var(--color-text-default)",
          fontFamily: "var(--font-family-body)",
          whiteSpace: "nowrap",
        }}
      >
        {/* Status dot */}
        <span style={{
          height: isSmall ? "7px" : "8px",
          width: isSmall ? "7px" : "8px",
          borderRadius: "50%",
          background: statusDotColor[status],
          flexShrink: 0,
          display: "inline-block",
        }} />
        {status}
        <ChevronDown style={{
          height: isSmall ? "12px" : "14px",
          width: isSmall ? "12px" : "14px",
          color: "var(--color-icons-default)",
          flexShrink: 0,
        }} />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + var(--spacing-xxs-exception))",
            background: "var(--color-fill-common-default)",
            border: "1px solid var(--color-border-weaker)",
            borderRadius: "var(--corner-radius-s)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            zIndex: 100,
            width: "256px",
            overflow: "hidden",
          }}
        >
          {allStatuses.map((s) => (
            <button
              key={s}
              onClick={(e) => { e.stopPropagation(); handleSelect(s); }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "flex-start",
                gap: "var(--spacing-xs)",
                padding: "var(--spacing-s-exception) var(--spacing-m)",
                textAlign: "left",
                background: s === status ? "var(--color-fill-common-weakest)" : "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-family-body)",
              }}
            >
              <span style={{
                height: "8px",
                width: "8px",
                borderRadius: "50%",
                marginTop: "5px",
                flexShrink: 0,
                background: statusDotColor[s],
                display: "inline-block",
              }} />
              <div>
                <p style={{
                  fontSize: "var(--font-size-body-s)",
                  fontWeight: s === status ? "var(--font-weight-strong)" : "var(--font-weight-default)",
                  color: "var(--color-text-default)",
                  margin: 0,
                }}>
                  {s}
                </p>
                <p style={{
                  fontSize: "var(--font-size-small-details-xs-captions)",
                  color: "var(--color-text-secondary)",
                  margin: "var(--spacing-xxs-exception) 0 0",
                }}>
                  {statusDescriptions[s]}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
