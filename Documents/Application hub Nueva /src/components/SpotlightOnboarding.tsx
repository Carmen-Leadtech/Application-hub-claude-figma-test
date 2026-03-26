import { useState } from "react";
import { X, Lightbulb } from "lucide-react";

interface SpotlightOnboardingProps {
  forceShow?: boolean;
}

const STORAGE_KEY = "onboarding_spotlight_seen";

const SpotlightOnboarding = ({ forceShow = false }: SpotlightOnboardingProps) => {
  const [dismissed, setDismissed] = useState(() =>
    forceShow ? false : localStorage.getItem(STORAGE_KEY) === "true"
  );

  if (dismissed) return null;

  const handleDismiss = () => {
    if (!forceShow) {
      localStorage.setItem(STORAGE_KEY, "true");
    }
    setDismissed(true);
  };

  return (
    <div className="border-l-4 border-primary bg-primary/5 rounded-lg p-5 relative">
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="h-4 w-4" />
      </button>

      <h3 className="text-sm font-bold text-foreground mb-1.5">
        Build your application pack
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed mb-4 max-w-xl">
        Keep everything for this role in one place. Pair your CV with a cover letter, add the job details, and track your progress.
      </p>

      <div className="flex items-start gap-2 bg-accent/50 rounded-md px-3 py-2">
        <Lightbulb className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">Pro Tip:</span> Remember to tailor your CV to the job description in our builder — matching requirements is the fastest way to get noticed.
        </p>
      </div>
    </div>
  );
};

export default SpotlightOnboarding;
