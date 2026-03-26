import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import AppSidebar from "@/components/AppSidebar";
import ReplaceDocumentModal from "@/components/ReplaceDocumentModal";

const PreviewCL = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [replaceOpen, setReplaceOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-[220px] flex justify-center">
        <div className="w-full max-w-[900px] p-8 space-y-6">
          <button
            onClick={() => navigate(`/application/${id}`)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Application
          </button>

          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Cover Letter Preview</h1>
            <div className="flex items-center gap-2">
              <button
                className="px-4 py-2 text-sm font-medium border border-border rounded-lg text-foreground bg-card hover:bg-accent transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => setReplaceOpen(true)}
                className="px-4 py-2 text-sm font-medium border border-border rounded-lg text-foreground bg-card hover:bg-accent transition-colors"
              >
                Replace
              </button>
              <button
                className="px-4 py-2 text-sm font-medium border border-border rounded-lg text-foreground bg-card hover:bg-accent transition-colors inline-flex items-center gap-1.5"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          </div>

          {/* Document Preview Mockup */}
          <div className="flex justify-center">
            <div className="bg-white rounded-sm shadow-lg border border-border/50 w-full max-w-[612px] p-10 space-y-6" style={{ aspectRatio: '8.5/11' }}>
              {/* Sender Info */}
              <div className="space-y-1">
                <div className="h-3.5 w-36 bg-gray-200 rounded" />
                <div className="h-2.5 w-44 bg-gray-100 rounded" />
                <div className="h-2.5 w-32 bg-gray-100 rounded" />
                <div className="h-2.5 w-28 bg-gray-100 rounded" />
              </div>

              {/* Date */}
              <div className="h-2.5 w-28 bg-gray-150 rounded" />

              {/* Recipient Info */}
              <div className="space-y-1">
                <div className="h-3 w-32 bg-gray-200 rounded" />
                <div className="h-2.5 w-40 bg-gray-100 rounded" />
                <div className="h-2.5 w-36 bg-gray-100 rounded" />
              </div>

              {/* Greeting */}
              <div className="h-3 w-36 bg-gray-200 rounded" />

              {/* Body Paragraphs */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="h-2.5 w-full bg-gray-100 rounded" />
                  <div className="h-2.5 w-full bg-gray-100 rounded" />
                  <div className="h-2.5 w-full bg-gray-100 rounded" />
                  <div className="h-2.5 w-4/5 bg-gray-100 rounded" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-2.5 w-full bg-gray-100 rounded" />
                  <div className="h-2.5 w-full bg-gray-100 rounded" />
                  <div className="h-2.5 w-full bg-gray-100 rounded" />
                  <div className="h-2.5 w-3/4 bg-gray-100 rounded" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-2.5 w-full bg-gray-100 rounded" />
                  <div className="h-2.5 w-full bg-gray-100 rounded" />
                  <div className="h-2.5 w-2/3 bg-gray-100 rounded" />
                </div>
              </div>

              {/* Closing */}
              <div className="space-y-2 pt-2">
                <div className="h-3 w-24 bg-gray-200 rounded" />
                <div className="h-3.5 w-32 bg-gray-200 rounded mt-4" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <ReplaceDocumentModal type="cover-letter" open={replaceOpen} onOpenChange={setReplaceOpen} />
    </div>
  );
};

export default PreviewCL;
