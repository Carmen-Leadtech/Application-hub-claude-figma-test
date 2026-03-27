import { useState, useRef } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AppSidebar from "@/components/AppSidebar";
import ApplicationCard from "@/components/ApplicationCard";
import EmptyState from "@/components/EmptyState";
import GuideTourModal from "@/components/GuideTourModal";
import { useApplications, Status } from "@/context/ApplicationContext";
import { Button } from "components/Button/Button";
import { Tabs } from "components/Tabs/Tabs";
import { Tab } from "components/Tab/Tab";
import featureBanner from "../../img/Feature Banner.svg";
import featureBanner2 from "../../img/Feature Banner 2.svg";

const allTabs: Status[] = ["Draft", "Applied", "Under Review", "Closed"];
const tabLabels = ["All", ...allTabs];

const Index = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const navigate = useNavigate();
  const { applications, addApplication, userPlan, setUserPlan } = useApplications();
  const firstCardRef = useRef<HTMLDivElement>(null);

  const counts: Record<string, number> = {
    All: applications.length,
    Draft: applications.filter((a) => a.status === "Draft").length,
    Applied: applications.filter((a) => a.status === "Applied").length,
    "Under Review": applications.filter((a) => a.status === "Under Review").length,
    Closed: applications.filter((a) => a.status === "Closed").length,
  };

  const activeTab = tabLabels[activeTabIndex];
  const filtered = activeTab === "All" ? applications : applications.filter((a) => a.status === activeTab);

  const handleCreate = () => {
    const newId = addApplication();
    toast("New application created", { duration: 2000 });
    navigate(`/application/${newId}`);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-background-default)" }}>
      <AppSidebar />

      <main style={{ marginLeft: "220px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "1200px", padding: "var(--spacing-xl)" }}>

          {/* Hero Banner */}
          <div style={{
            borderRadius: "var(--corner-radius-m)",
            padding: "var(--spacing-l)",
            marginBottom: "var(--size-20)",
            overflow: "hidden",
            background: "linear-gradient(135deg, var(--brand-light-10), var(--neutrals-light-10))",
          }}>
            <div style={{ display: "flex", gap: "var(--spacing-l)", alignItems: "stretch" }}>

              {/* Left: greeting + headline + realistic resume mockup */}
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
                <p style={{
                  fontSize: "var(--font-size-body-s)",
                  color: "var(--color-text-secondary)",
                  marginBottom: "var(--spacing-xxs-exception)",
                }}>
                  Hi, David
                </p>
                <h1 style={{
                  fontSize: "var(--font-size-titles-l)",
                  fontWeight: "var(--font-weight-strong)",
                  color: "var(--color-text-default)",
                  marginBottom: "var(--spacing-l)",
                }}>
                  Take control of your applications
                </h1>

                {/* Resume mockup card */}
                <div style={{ position: "relative", flex: 1 }}>
                  <div style={{
                    background: "var(--color-fill-common-default)",
                    border: "1px solid var(--color-border-weaker)",
                    borderRadius: "var(--corner-radius-s)",
                    padding: "var(--spacing-m)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    maxWidth: "260px",
                  }}>
                    {/* Avatar + name row */}
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-xs)", marginBottom: "var(--spacing-s-exception)" }}>
                      <div style={{
                        height: "36px", width: "36px", borderRadius: "50%", flexShrink: 0,
                        background: "var(--color-fill-common-weak)",
                        border: "2px solid var(--color-border-weaker)",
                      }} />
                      <div>
                        <div style={{ height: "7px", width: "100px", background: "var(--color-fill-common-strong)", borderRadius: "var(--corner-radius-xs)", marginBottom: "var(--spacing-xxs-exception)" }} />
                        <div style={{ fontSize: "var(--font-size-small-details-xxs)", color: "var(--color-text-secondary)", letterSpacing: "0.04em" }}>JONATHAN IVERSSON</div>
                      </div>
                    </div>
                    {/* Content lines */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xxs-exception)" }}>
                      <div style={{ height: "6px", background: "var(--color-fill-common-weaker)", borderRadius: "var(--corner-radius-xs)" }} />
                      <div style={{ height: "6px", width: "80%", background: "var(--color-fill-common-weaker)", borderRadius: "var(--corner-radius-xs)" }} />
                      <div style={{ height: "6px", width: "90%", background: "var(--color-fill-common-weaker)", borderRadius: "var(--corner-radius-xs)" }} />
                      <div style={{ height: "6px", width: "70%", background: "var(--color-fill-common-weaker)", borderRadius: "var(--corner-radius-xs)" }} />
                    </div>
                  </div>
                  {/* $$$ salary badge */}
                  <div style={{
                    position: "absolute", top: "-8px", right: "24px",
                    background: "var(--color-fill-system-warning-weak)",
                    border: "1px solid var(--color-border-system-warning-weak)",
                    borderRadius: "var(--corner-radius-xl)",
                    padding: "2px var(--spacing-xs)",
                    fontSize: "var(--font-size-small-details-xs-captions)",
                    fontWeight: "var(--font-weight-strong)",
                    color: "var(--color-text-system-warning)",
                  }}>
                    $$$
                  </div>
                </div>
              </div>

              {/* Right: two promo cards */}
              <div style={{ display: "flex", gap: "var(--spacing-s-exception)", flexShrink: 0 }}>

                {/* LinkedIn Analyzer */}
                <div style={{
                  width: "200px",
                  border: "1px solid var(--color-border-weaker)",
                  borderRadius: "var(--corner-radius-s)",
                  padding: "var(--spacing-m)",
                  background: "var(--color-fill-common-default)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--spacing-xs)",
                }}>
                  <div>
                    <h4 style={{
                      fontSize: "var(--font-size-body-s)",
                      fontWeight: "var(--font-weight-strong)",
                      color: "var(--color-text-default)",
                      margin: "0 0 var(--spacing-xxs-exception)",
                    }}>
                      Linkedin Analyzer
                    </h4>
                    <p style={{
                      fontSize: "var(--font-size-small-details-xs-captions)",
                      color: "var(--color-text-secondary)",
                      margin: 0,
                      lineHeight: 1.4,
                    }}>
                      Subtitle for more info lorem ipsum dolor sit amet consec
                    </p>
                  </div>
                  {/* Illustration image */}
                  <div style={{ flex: 1, display: "flex", alignItems: "flex-end" }}>
                    <img
                      src={featureBanner}
                      alt="LinkedIn Analyzer illustration"
                      style={{ width: "100%", maxHeight: "100px", objectFit: "contain", objectPosition: "bottom left" }}
                    />
                  </div>
                </div>

                {/* Interview Practice */}
                <div style={{
                  width: "200px",
                  border: "1px solid var(--color-border-weaker)",
                  borderRadius: "var(--corner-radius-s)",
                  padding: "var(--spacing-m)",
                  background: "var(--color-fill-system-warning-weak)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--spacing-xs)",
                }}>
                  <div>
                    <h4 style={{
                      fontSize: "var(--font-size-body-s)",
                      fontWeight: "var(--font-weight-strong)",
                      color: "var(--color-text-default)",
                      margin: "0 0 var(--spacing-xxs-exception)",
                    }}>
                      Interview Practice
                    </h4>
                    <p style={{
                      fontSize: "var(--font-size-small-details-xs-captions)",
                      color: "var(--color-text-secondary)",
                      margin: 0,
                      lineHeight: 1.4,
                    }}>
                      Subtitle for more info lorem ipsum dolor sit amet consec
                    </p>
                  </div>
                  {/* Illustration image */}
                  <div style={{ flex: 1, display: "flex", alignItems: "flex-end" }}>
                    <img
                      src={featureBanner2}
                      alt="Interview Practice illustration"
                      style={{ width: "100%", maxHeight: "100px", objectFit: "contain", objectPosition: "bottom left" }}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Applications Section */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--spacing-m)" }}>
              <h2 style={{
                fontSize: "var(--font-size-titles-l)",
                fontWeight: "var(--font-weight-strong)",
                color: "var(--color-text-default)",
              }}>
                Applications
              </h2>
              <Button variant="primary" size="M" shape="rounded" onClick={handleCreate}>
                <Plus style={{ height: "16px", width: "16px" }} />
                New application
              </Button>
            </div>

            {/* Tabs */}
            <div style={{ marginBottom: "var(--spacing-l)" }}>
              <Tabs value={activeTabIndex} onChange={(_, idx) => setActiveTabIndex(idx)}>
                {tabLabels.map((tab) => {
                  const count = counts[tab as keyof typeof counts];
                  return (
                    <Tab
                      key={tab}
                      label={count > 0 ? `${tab} (${count})` : tab}
                    />
                  );
                })}
              </Tabs>
            </div>

            {/* Cards Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, 336px)",
              gap: "var(--size-20)",
            }}>
              {filtered.map((app, i) => (
                <div key={app.id} ref={i === 0 ? firstCardRef : undefined}>
                  <ApplicationCard
                    id={app.id}
                    onClick={() => navigate(`/application/${app.id}`)}
                  />
                </div>
              ))}
            </div>

            {filtered.length > 0 && (
              <GuideTourModal
                anchorRef={firstCardRef}
                title="Everything for the job, in one place"
                description="Link your resume, cover letter and job details to keep your documents organized, access career tools and track your application status."
                ctaLabel="Got it"
                storageKey="guide_tour_first_card"
              />
            )}

            {filtered.length === 0 && (
              <EmptyState
                title="No applications yet"
                subtitle="Start tracking your job search — add your first application."
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
