import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Minus, Plus } from "lucide-react";
import AppSidebar from "@/components/AppSidebar";
import ReplaceDocumentModal from "@/components/ReplaceDocumentModal";

const PreviewCV = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [replaceOpen, setReplaceOpen] = useState(false);
  const [zoom, setZoom] = useState(100);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-[220px] flex flex-col h-screen">
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-border bg-card">
          <button
            onClick={() => navigate(`/application/${id}`)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-medium border border-border rounded-lg text-foreground bg-card hover:bg-accent transition-colors">
              Edit
            </button>
            <button
              onClick={() => setReplaceOpen(true)}
              className="px-4 py-2 text-sm font-medium border border-border rounded-lg text-foreground bg-card hover:bg-accent transition-colors"
            >
              Replace
            </button>
            <button className="px-4 py-2 text-sm font-medium border border-border rounded-lg text-foreground bg-card hover:bg-accent transition-colors inline-flex items-center gap-1.5">
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
        </div>

        {/* Document preview area */}
        <div className="flex-1 overflow-auto flex justify-center py-8 relative bg-muted/30">
          <div
            className="bg-white rounded-sm shadow-lg border border-border/50 w-full max-w-[612px] p-10 space-y-5 origin-top"
            style={{ aspectRatio: "8.5/11", transform: `scale(${zoom / 100})` }}
          >
            {/* Photo + Header */}
            <div className="flex items-start gap-4 pb-4 border-b border-border/40">
              <div className="h-16 w-16 rounded-full bg-muted flex-shrink-0" />
              <div className="space-y-1">
                <div className="text-lg font-bold text-foreground">Anna Smith</div>
                <div className="text-sm text-muted-foreground">UX Designer</div>
                <div className="flex gap-3 mt-1">
                  <span className="text-xs text-muted-foreground">anna@email.com</span>
                  <span className="text-xs text-muted-foreground">+1 234 567 890</span>
                  <span className="text-xs text-muted-foreground">New York, NY</span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <div className="text-sm font-semibold text-foreground">Summary</div>
              <div className="space-y-1.5">
                <div className="h-2.5 w-full bg-muted/70 rounded" />
                <div className="h-2.5 w-full bg-muted/70 rounded" />
                <div className="h-2.5 w-3/4 bg-muted/70 rounded" />
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <div className="text-sm font-semibold text-foreground">Experience</div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-foreground">Senior UX Designer</span>
                    <span className="text-xs text-muted-foreground">2022 – Present</span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">Acme Corp</div>
                  <div className="space-y-1">
                    <div className="h-2 w-full bg-muted/50 rounded" />
                    <div className="h-2 w-full bg-muted/50 rounded" />
                    <div className="h-2 w-2/3 bg-muted/50 rounded" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-foreground">UX Designer</span>
                    <span className="text-xs text-muted-foreground">2019 – 2022</span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">Design Studio</div>
                  <div className="space-y-1">
                    <div className="h-2 w-full bg-muted/50 rounded" />
                    <div className="h-2 w-5/6 bg-muted/50 rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <div className="text-sm font-semibold text-foreground">Education</div>
              <div>
                <div className="text-xs font-medium text-foreground">B.A. Graphic Design</div>
                <div className="text-xs text-muted-foreground">NYU, 2019</div>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <div className="text-sm font-semibold text-foreground">Skills</div>
              <div className="flex flex-wrap gap-1.5">
                {["Figma", "User Research", "Prototyping", "Design Systems", "Accessibility"].map((s) => (
                  <span key={s} className="text-[10px] font-medium px-2 py-1 bg-muted rounded-full text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-2">
              <div className="text-sm font-semibold text-foreground">Languages</div>
              <div className="flex gap-4">
                <span className="text-xs text-muted-foreground">English — Native</span>
                <span className="text-xs text-muted-foreground">Spanish — Fluent</span>
              </div>
            </div>
          </div>

          {/* Zoom control */}
          <div className="absolute bottom-6 right-8 flex items-center gap-2 bg-card border border-border rounded-lg shadow-sm px-2 py-1.5">
            <button onClick={() => setZoom((z) => Math.max(50, z - 10))} className="text-muted-foreground hover:text-foreground p-1">
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-xs font-medium text-foreground min-w-[40px] text-center">{zoom}%</span>
            <button onClick={() => setZoom((z) => Math.min(200, z + 10))} className="text-muted-foreground hover:text-foreground p-1">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>

      <ReplaceDocumentModal type="cv" open={replaceOpen} onOpenChange={setReplaceOpen} />
    </div>
  );
};

export default PreviewCV;
