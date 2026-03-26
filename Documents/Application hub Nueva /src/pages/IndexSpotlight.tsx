import { useState } from "react";
import { Plus, BrainCircuit, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AppSidebar from "@/components/AppSidebar";
import ApplicationCard from "@/components/ApplicationCard";
import ProgressTracker from "@/components/ProgressTracker";
import SpotlightOnboarding from "@/components/SpotlightOnboarding";
import { useApplications, Status } from "@/context/ApplicationContext";

const allTabs: Status[] = ["Draft", "Applied", "Under Review", "Closed"];

const IndexSpotlight = () => {
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();
  const { applications, addApplication } = useApplications();

  const counts = {
    All: applications.length,
    Draft: applications.filter((a) => a.status === "Draft").length,
    Applied: applications.filter((a) => a.status === "Applied").length,
    "Under Review": applications.filter((a) => a.status === "Under Review").length,
    Closed: applications.filter((a) => a.status === "Closed").length,
  };

  const filtered = activeTab === "All" ? applications : applications.filter((a) => a.status === activeTab);

  const handleCreate = () => {
    const newId = addApplication();
    toast("New application created", { duration: 2000 });
    navigate(`/application/${newId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <main className="ml-[220px] flex justify-center">
        <div className="w-full max-w-[1200px] p-8">
          {/* Overview Banner */}
          <div className="bg-card border border-border rounded-xl p-6 mb-5">
            <div className="flex gap-6">
              {/* Left: text + progress */}
              <div className="flex-1 min-w-0">
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Hi Anna,</p>
                  <h1 className="text-2xl font-bold text-foreground">
                    Take Control of Your Applications
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1.5 max-w-xl">
                    Manage your job search in one place. Tailor your documents, track your status, and keep every application moving forward.
                  </p>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-foreground mb-3">Progress</h2>
                  <ProgressTracker
                    counts={{
                      Draft: counts.Draft,
                      Applied: counts.Applied,
                      "Under Review": counts["Under Review"],
                      Closed: counts.Closed,
                    }}
                  />
                </div>
              </div>

              {/* Right: feature promo modules */}
              <div className="flex gap-3 flex-shrink-0">
                <div className="w-[200px] border border-border rounded-lg p-4 flex flex-col justify-between bg-background">
                  <div>
                    <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center mb-3">
                      <BrainCircuit className="h-4 w-4 text-primary" />
                    </div>
                    <h4 className="text-sm font-semibold text-foreground">Interview Simulator</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Practice with AI mock interviews tailored to your role.
                    </p>
                  </div>
                  <button className="mt-3 w-full bg-primary text-primary-foreground text-xs font-medium px-3 py-2 rounded-md hover:opacity-90 transition-opacity">
                    Start Practicing
                  </button>
                </div>

                <div className="w-[200px] border border-border rounded-lg p-4 flex flex-col justify-between bg-background">
                  <div>
                    <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center mb-3">
                      <Linkedin className="h-4 w-4 text-primary" />
                    </div>
                    <h4 className="text-sm font-semibold text-foreground">LinkedIn Analyzer</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Optimize your profile to attract more recruiters.
                    </p>
                  </div>
                  <button className="mt-3 w-full bg-primary text-primary-foreground text-xs font-medium px-3 py-2 rounded-md hover:opacity-90 transition-opacity">
                    Analyze Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Applications Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[24px] font-bold text-foreground">Applications</h2>
              <button
                onClick={handleCreate}
                className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Plus className="h-4 w-4" />
                Create new application
              </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 border-b border-border mb-6 overflow-x-auto">
              {["All", ...allTabs].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2.5 text-sm font-medium transition-colors relative whitespace-nowrap ${
                    activeTab === tab
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab} ({counts[tab as keyof typeof counts]})
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t" />
                  )}
                </button>
              ))}
            </div>

            {/* Inline Guide Card - forceShow for demo */}
            <div className="mb-6">
              <SpotlightOnboarding forceShow />
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((app) => (
                <ApplicationCard
                  key={app.id}
                  id={app.id}
                  onClick={() => navigate(`/application/${app.id}`)}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-12">No applications in this category yet.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default IndexSpotlight;
