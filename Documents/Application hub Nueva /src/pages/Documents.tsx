import { useState } from "react";
import { FileText, Download, Trash2, Eye, Plus, Link2, Pencil, MoreVertical } from "lucide-react";
import AppSidebar from "@/components/AppSidebar";

interface DocCard {
  id: number;
  name: string;
  updatedDate: string;
  language: string;
  languageFlag: string;
}

const resumes: DocCard[] = [
  { id: 1, name: "Document untitled", updatedDate: "Feb 11, 21:45", language: "English", languageFlag: "🇺🇸" },
  { id: 2, name: "Document untitled", updatedDate: "Feb 03, 08:12", language: "English", languageFlag: "🇺🇸" },
  { id: 3, name: "Document untitled", updatedDate: "Jul 31, 11:29", language: "English", languageFlag: "🇺🇸" },
  { id: 4, name: "Document untitled", updatedDate: "Jul 09, 08:09", language: "English", languageFlag: "🇺🇸" },
  { id: 5, name: "Document untitled", updatedDate: "May 22, 16:22", language: "Español", languageFlag: "🇪🇸" },
  { id: 6, name: "Document untitled", updatedDate: "Apr 17, 12:29", language: "English", languageFlag: "🇺🇸" },
  { id: 7, name: "Document untitled", updatedDate: "Mar 20, 09:01", language: "English", languageFlag: "🇺🇸" },
];

const coverLetters: DocCard[] = [
  { id: 10, name: "Document untitled", updatedDate: "Jan 28, 14:30", language: "English", languageFlag: "🇺🇸" },
  { id: 11, name: "Document untitled", updatedDate: "Jan 10, 09:15", language: "English", languageFlag: "🇺🇸" },
  { id: 12, name: "Document untitled", updatedDate: "Dec 22, 17:00", language: "Español", languageFlag: "🇪🇸" },
];

const DocumentCard = ({ doc }: { doc: DocCard }) => (
  <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
    {/* Preview area */}
    <div className="aspect-[3/4] bg-muted/40 relative flex items-center justify-center border-b border-border">
      <FileText className="h-16 w-16 text-muted-foreground/30" />
      <div className="absolute bottom-2 right-2 bg-card border border-border rounded-full px-2.5 py-1 text-[10px] font-medium flex items-center gap-1">
        {doc.language} <span>{doc.languageFlag}</span>
      </div>
    </div>
    {/* Info */}
    <div className="p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <p className="text-sm font-medium text-foreground italic truncate">{doc.name}</p>
        <button className="text-muted-foreground hover:text-foreground flex-shrink-0">
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button className="text-muted-foreground hover:text-foreground flex-shrink-0 ml-auto">
          <MoreVertical className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="text-xs text-muted-foreground uppercase">Updated {doc.updatedDate}</p>
      <div className="flex items-center justify-between pt-1">
        <button className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
          <Download className="h-3.5 w-3.5" />
          Download
        </button>
        <button className="text-muted-foreground hover:text-foreground">
          <Link2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  </div>
);

const Documents = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-[220px] flex justify-center">
        <div className="w-full max-w-[1200px] p-8 space-y-10">
          {/* Resumes Section */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Resumes</h2>
            <div className="mb-5 p-3 bg-accent/40 rounded-lg border border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Pro Tip:</span>{" "}
                Tailor your resume for each job description. Studies show tailored resumes are 3x more likely to get interview callbacks.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {/* New Resume card */}
              <button className="bg-card border-2 border-dashed border-border rounded-xl aspect-[3/4] flex flex-col items-center justify-center gap-3 text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors">
                <div className="h-12 w-12 rounded-full border-2 border-dashed border-primary/40 flex items-center justify-center">
                  <Plus className="h-6 w-6" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-wide">New Resume</span>
              </button>
              {resumes.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} />
              ))}
            </div>
          </section>

          {/* Cover Letters Section */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-5">Cover Letters</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              <button className="bg-card border-2 border-dashed border-border rounded-xl aspect-[3/4] flex flex-col items-center justify-center gap-3 text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors">
                <div className="h-12 w-12 rounded-full border-2 border-dashed border-primary/40 flex items-center justify-center">
                  <Plus className="h-6 w-6" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-wide">New Cover Letter</span>
              </button>
              {coverLetters.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Documents;
