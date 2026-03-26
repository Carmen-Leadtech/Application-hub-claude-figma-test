import { useState } from "react";
import { FileText, Plus, FolderOpen, ArrowLeft, Check, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useApplications } from "@/context/ApplicationContext";

interface ReplaceDocumentModalProps {
  type: "cv" | "cover-letter";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDocSelected?: (docName: string) => void;
}

const savedDocs = [
  { id: 1, name: "Anna_Smith_Resume_2025.pdf", date: "Jan 15, 2025" },
  { id: 2, name: "Anna_Smith_Resume_Tech.pdf", date: "Dec 8, 2024" },
  { id: 3, name: "Anna_Smith_Resume_PM.pdf", date: "Nov 20, 2024" },
  { id: 4, name: "Anna_Smith_Resume_Design.pdf", date: "Oct 5, 2024" },
];

const ReplaceDocumentModal = ({ type, open, onOpenChange, onDocSelected }: ReplaceDocumentModalProps) => {
  const { userPlan } = useApplications();
  const [view, setView] = useState<"main" | "existing" | "upsell">("main");
  const [selectedDoc, setSelectedDoc] = useState<number | null>(null);

  const label = type === "cv" ? "CV" : "Cover Letter";
  const isFree = userPlan === "free";

  const handleClose = (val: boolean) => {
    if (!val) {
      setView("main");
      setSelectedDoc(null);
    }
    onOpenChange(val);
  };

  const handleUseSelected = () => {
    const doc = savedDocs.find((d) => d.id === selectedDoc);
    if (doc && onDocSelected) {
      onDocSelected(doc.name);
    }
    handleClose(false);
  };

  const handleCreateNew = () => {
    // Free users limited to 1 CV + 1 CL
    if (isFree) {
      setView("upsell");
      return;
    }
    handleClose(false);
  };

  const handleUseExisting = () => {
    if (isFree) {
      // Free user only has 1 doc — auto-link it
      if (savedDocs.length > 0 && onDocSelected) {
        onDocSelected(savedDocs[0].name);
      }
      handleClose(false);
      return;
    }
    setView("existing");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          {view === "existing" ? (
            <div>
              <div className="flex items-center gap-2">
                <button onClick={() => setView("main")} className="text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <DialogTitle>Choose a {label}</DialogTitle>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5 ml-6">
                We'll create a copy for this application. Your original {label} stays unchanged.
              </p>
            </div>
          ) : view === "upsell" ? (
            <div>
              <div className="flex items-center gap-2">
                <button onClick={() => setView("main")} className="text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <DialogTitle>Document limit reached</DialogTitle>
              </div>
            </div>
          ) : (
            <DialogTitle>Add {label}</DialogTitle>
          )}
        </DialogHeader>

        {view === "main" ? (
          <div className="space-y-3 pt-2">
            <button
              className="w-full flex items-center gap-4 p-4 border border-border rounded-xl hover:bg-accent transition-colors text-left"
              onClick={handleCreateNew}
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Plus className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Create New {label}</p>
                <p className="text-xs text-muted-foreground">Start from scratch, upload, or use AI</p>
              </div>
            </button>

            <button
              className="w-full flex items-center gap-4 p-4 border border-border rounded-xl hover:bg-accent transition-colors text-left"
              onClick={handleUseExisting}
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FolderOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Use Existing {label}</p>
                <p className="text-xs text-muted-foreground">Choose from {savedDocs.length} saved {label}s</p>
              </div>
            </button>
          </div>
        ) : view === "upsell" ? (
          <div className="space-y-4 pt-2 text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              You've reached the limit for your free plan. Upgrade to Premium to create unlimited documents for every application.
            </p>
            <button
              onClick={() => handleClose(false)}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Upgrade to Premium
            </button>
          </div>
        ) : (
          <div className="space-y-2 pt-2">
            {savedDocs.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelectedDoc(doc.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left ${
                  selectedDoc === doc.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-accent"
                }`}
              >
                <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.date}</p>
                </div>
                {selectedDoc === doc.id && <Check className="h-4 w-4 text-primary flex-shrink-0" />}
              </button>
            ))}

            <button
              disabled={!selectedDoc}
              onClick={handleUseSelected}
              className="w-full mt-3 bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Use selected {label}
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReplaceDocumentModal;
