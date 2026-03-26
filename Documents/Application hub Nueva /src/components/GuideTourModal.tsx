import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

interface GuideTourModalProps {
  anchorRef?: React.RefObject<HTMLElement>;
  title: string;
  description: string;
  ctaLabel: string;
  onCtaClick?: () => void;
  onDismiss?: () => void;
  storageKey?: string;
  forceShow?: boolean;
}

const GuideTourModal = ({
  anchorRef,
  title,
  description,
  ctaLabel,
  onCtaClick,
  onDismiss,
  storageKey,
  forceShow = false,
}: GuideTourModalProps) => {
  const [dismissed, setDismissed] = useState(() => {
    if (forceShow) return false;
    if (storageKey) return localStorage.getItem(storageKey) === "true";
    return false;
  });

  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const updateRect = useCallback(() => {
    if (anchorRef?.current) {
      setAnchorRect(anchorRef.current.getBoundingClientRect());
    }
  }, [anchorRef]);

  useEffect(() => {
    if (dismissed) return;
    updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);
    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
    };
  }, [dismissed, updateRect]);

  if (dismissed) return null;

  const handleDismiss = () => {
    if (storageKey && !forceShow) {
      localStorage.setItem(storageKey, "true");
    }
    setDismissed(true);
    onDismiss?.();
  };

  const pad = 8;

  const modalStyle: React.CSSProperties = anchorRect
    ? {
        position: "fixed",
        top: anchorRect.top,
        left: anchorRect.right + 16,
        zIndex: 10002,
      }
    : {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 10002,
      };

  return createPortal(
    <>
      {/* Overlay with spotlight cutout */}
      <div className="fixed inset-0 z-[10000]" onClick={handleDismiss}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <mask id="guide-tour-mask">
              <rect width="100%" height="100%" fill="white" />
              {anchorRect && (
                <rect
                  x={anchorRect.left - pad}
                  y={anchorRect.top - pad}
                  width={anchorRect.width + pad * 2}
                  height={anchorRect.height + pad * 2}
                  rx={12}
                  fill="black"
                />
              )}
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="rgba(0,0,0,0.55)"
            mask="url(#guide-tour-mask)"
          />
        </svg>
      </div>

      {/* Spotlight ring */}
      {anchorRect && (
        <div
          className="fixed z-[10001] pointer-events-none rounded-xl ring-2 ring-primary/40"
          style={{
            top: anchorRect.top - pad,
            left: anchorRect.left - pad,
            width: anchorRect.width + pad * 2,
            height: anchorRect.height + pad * 2,
          }}
        />
      )}

      {/* Modal card */}
      <div
        ref={modalRef}
        role="dialog"
        aria-label={title}
        className="w-[280px] bg-card border border-border rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-left-2 duration-200"
        style={modalStyle}
      >
        <div className="px-5 py-4 space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-foreground leading-snug">
              {title}
            </h3>
            <button
              onClick={handleDismiss}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 mt-0.5"
            >
              Skip
            </button>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>

          <button
            onClick={() => {
              onCtaClick?.();
              handleDismiss();
            }}
            className="w-full bg-primary text-primary-foreground text-xs font-medium px-3 py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </>,
    document.body
  );
};

export default GuideTourModal;
