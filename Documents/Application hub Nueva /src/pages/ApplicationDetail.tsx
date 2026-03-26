import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { toast } from "sonner";
import AppSidebar from "@/components/AppSidebar";
import ReplaceDocumentModal from "@/components/ReplaceDocumentModal";
import DeleteApplicationModal from "@/components/DeleteApplicationModal";
import { useApplications, Status } from "@/context/ApplicationContext";
import StatusDropdown from "@/components/StatusDropdown";

// DS Components
import { Button } from "components/Button/Button";
import { ButtonIcon } from "components/ButtonIcon/ButtonIcon";
import { Textfield } from "components/Textfield/Textfield";
import { Icon } from "components/Icon/Icon";
import { InfoCard } from "components/InfoCard/InfoCard";
import { Popover } from "components/Popover/Popover";

const JD_MAX = 5000;
const NOTES_MAX = 5000;

const JdPreview = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);
  const lines = text.replace(/<[^>]+>/g, "").split("\n");
  const isLong = lines.length > 6;
  const preview = expanded || !isLong ? text : lines.slice(0, 6).join("\n") + "…";

  return (
    <div style={{
      minHeight: "120px",
      border: "1px solid var(--color-border-weaker)",
      borderRadius: "var(--corner-radius-s)",
      padding: "var(--spacing-m)",
    }}>
      <p style={{
        fontSize: "var(--font-size-body-s)",
        color: "var(--color-text-default)",
        whiteSpace: "pre-wrap",
        lineHeight: "var(--line-height-body-s)",
        margin: 0,
      }}
        dangerouslySetInnerHTML={{ __html: preview }}
      />
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            fontSize: "var(--font-size-small-details-xs-captions)",
            color: "var(--color-text-interactivity-default)",
            background: "none", border: "none", cursor: "pointer",
            fontWeight: "var(--font-weight-strong)",
            marginTop: "var(--spacing-xs)",
            padding: 0,
          }}
        >
          {expanded ? "Show less" : "See full job description"}
        </button>
      )}
    </div>
  );
};

const ApplicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getApplication, updateApplication, deleteApplication, addApplication, userPlan } = useApplications();
  const app = getApplication(id || "");

  const [kebabOpen, setKebabOpen] = useState(false);
  const [replaceModalOpen, setReplaceModalOpen] = useState(false);
  const [replaceType, setReplaceType] = useState<"cv" | "cover-letter">("cv");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [resumeMenuOpen, setResumeMenuOpen] = useState(false);
  const [coverLetterMenuOpen, setCoverLetterMenuOpen] = useState(false);

  const [roleInput, setRoleInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [jdInput, setJdInput] = useState("");
  const [notesInput, setNotesInput] = useState("");
  const [notesLoaded, setNotesLoaded] = useState(false);
  const [jobInfoSaved, setJobInfoSaved] = useState(false);
  const [jobFieldsLoaded, setJobFieldsLoaded] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const jdRef = useRef<HTMLDivElement>(null);
  const notesSecRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const coverLetterRef = useRef<HTMLDivElement>(null);
  const resumeKebabRef = useRef<HTMLDivElement>(null);
  const coverLetterKebabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (app && !notesLoaded) { setNotesInput(app.notes); setNotesLoaded(true); }
  }, [app, notesLoaded]);

  useEffect(() => {
    if (app && !jobFieldsLoaded) {
      setRoleInput(app.role); setCompanyInput(app.company);
      setJdInput(app.jobDescription); setNameInput(app.applicationName);
      setJobFieldsLoaded(true);
      if (app.role && app.company && app.jobDescription) setJobInfoSaved(true);
    }
  }, [app, jobFieldsLoaded]);

  useEffect(() => {
    if (editingName && nameInputRef.current) {
      nameInputRef.current.focus(); nameInputRef.current.select();
    }
  }, [editingName]);

  useEffect(() => {
    const scrollTarget = searchParams.get("scroll");
    if (!scrollTarget) return;
    const refMap: Record<string, React.RefObject<HTMLDivElement>> = {
      role: roleRef, jd: jdRef, notes: notesSecRef, resume: resumeRef, "cover-letter": coverLetterRef,
    };
    const ref = refMap[scrollTarget];
    if (ref?.current) {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        ref.current?.classList.add("animate-pulse-highlight");
        setTimeout(() => ref.current?.classList.remove("animate-pulse-highlight"), 2000);
      }, 300);
    }
  }, [searchParams]);

  const handleStatusChange = (s: Status) => {
    if (!id) return;
    updateApplication(id, { status: s });
  };

  const handleCreateNew = () => {
    const newId = addApplication();
    toast("New application created", { duration: 2000 });
    navigate(`/application/${newId}`);
  };

  const openReplace = (type: "cv" | "cover-letter") => { setReplaceType(type); setReplaceModalOpen(true); };

  const handleDocSelected = (docName: string) => {
    if (!id) return;
    if (replaceType === "cv") updateApplication(id, { resumeName: docName });
    else updateApplication(id, { coverLetterName: docName });
  };

  const canSaveJob = roleInput.trim() && companyInput.trim() && jdInput.trim();

  const saveJobInfo = () => {
    if (!id || !canSaveJob) return;
    updateApplication(id, { role: roleInput.trim(), company: companyInput.trim(), jobDescription: jdInput.trim() });
    setJobInfoSaved(true);
    toast("Job details saved", { duration: 1500 });
  };

  const saveNotes = () => {
    if (!id) return;
    updateApplication(id, { notes: notesInput });
    toast("Notes saved", { duration: 1500 });
  };

  const saveName = () => {
    if (!id) return;
    const trimmed = nameInput.trim();
    if (trimmed) updateApplication(id, { applicationName: trimmed });
    else setNameInput(app?.applicationName || "");
    setEditingName(false);
  };

  const handleDelete = () => {
    if (!id) return;
    deleteApplication(id);
    toast("Application deleted", { duration: 2000 });
    navigate("/Application-hub-premium");
  };


  if (!app) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--color-background-default)" }}>
        <AppSidebar />
        <main style={{ marginLeft: "220px", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: "800px", padding: "var(--spacing-xl)" }}>
            <p style={{ color: "var(--color-text-secondary)" }}>Application not found.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-background-default)" }}>
      <AppSidebar />
      <main style={{ marginLeft: "220px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "1200px", padding: "var(--spacing-xl)", display: "flex", flexDirection: "column", gap: "var(--spacing-l)" }}>

          {/* ── Top bar ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button
              onClick={() => navigate("/Application-hub-premium")}
              style={{
                display: "inline-flex", alignItems: "center", gap: "var(--spacing-xs)",
                fontSize: "var(--font-size-body-s)", color: "var(--color-text-interactivity-default)",
                fontWeight: "var(--font-weight-strong)",
                background: "none", border: "none", cursor: "pointer",
              }}
            >
              <ArrowLeft style={{ height: "16px", width: "16px" }} />
              Back
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-xs)" }}>
              {/* Status dropdown — new custom component */}
              <StatusDropdown status={app.status} onChange={handleStatusChange} size="M" />

              {/* Kebab */}
              <div style={{ position: "relative" }}>
                <ButtonIcon variant="neutral" size="S" onClick={() => setKebabOpen(!kebabOpen)}>
                  <Icon name="more_vert" size={20} />
                </ButtonIcon>
                {kebabOpen && (
                  <div style={{
                    position: "absolute", right: 0, top: "100%", marginTop: "var(--spacing-xxs-exception)",
                    background: "var(--color-fill-common-default)",
                    border: "1px solid var(--color-border-weaker)",
                    borderRadius: "var(--corner-radius-s)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                    zIndex: 50, width: "208px",
                  }}>
                    <button
                      onClick={() => { setKebabOpen(false); handleCreateNew(); }}
                      style={{
                        width: "100%", display: "flex", alignItems: "center", gap: "var(--spacing-xs)",
                        padding: "var(--spacing-xs) var(--spacing-s-exception)",
                        fontSize: "var(--font-size-body-s)", color: "var(--color-text-default)",
                        background: "none", border: "none", cursor: "pointer",
                        borderRadius: `var(--corner-radius-s) var(--corner-radius-s) 0 0`,
                      }}
                    >
                      <Icon name="add_circle" size={14} />
                      Create new application
                    </button>
                    <button
                      onClick={() => { setKebabOpen(false); setDeleteModalOpen(true); }}
                      style={{
                        width: "100%", display: "flex", alignItems: "center", gap: "var(--spacing-xs)",
                        padding: "var(--spacing-xs) var(--spacing-s-exception)",
                        fontSize: "var(--font-size-body-s)", color: "var(--color-text-system-error)",
                        background: "none", border: "none", cursor: "pointer",
                        borderRadius: `0 0 var(--corner-radius-s) var(--corner-radius-s)`,
                      }}
                    >
                      <Icon name="trash" size={14} color="var(--color-icons-system-error)" />
                      Delete application
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Title row ── */}
          <div ref={roleRef} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-xs)" }}>
              {editingName ? (
                <input
                  ref={nameInputRef}
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onBlur={saveName}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveName();
                    if (e.key === "Escape") { setNameInput(app.applicationName); setEditingName(false); }
                  }}
                  style={{
                    fontSize: "var(--font-size-titles-s)",
                    fontWeight: "var(--font-weight-strong)",
                    color: "var(--color-text-default)",
                    background: "transparent",
                    borderBottom: "2px solid var(--color-border-interactivity-default)",
                    border: "none", borderBottom: "2px solid var(--color-border-interactivity-default)",
                    outline: "none", padding: "0 var(--spacing-xxs-exception)",
                  }}
                />
              ) : (
                <>
                  <h1 style={{
                    fontSize: "var(--font-size-titles-s)",
                    fontWeight: "var(--font-weight-strong)",
                    color: "var(--color-text-default)",
                    margin: 0,
                  }}>
                    {app.applicationName}
                  </h1>
                  <button
                    onClick={() => { setNameInput(app.applicationName); setEditingName(true); }}
                    style={{ color: "var(--color-icons-default)", background: "none", border: "none", cursor: "pointer", display: "flex" }}
                  >
                    <Pencil style={{ height: "16px", width: "16px" }} />
                  </button>
                </>
              )}
            </div>
            <p style={{ fontSize: "var(--font-size-small-details-xs-captions)", color: "var(--color-text-secondary)", margin: 0 }}>
              Created {app.createdDate} · Updated {app.updatedDate}
            </p>
          </div>

          {/* ── Two-column layout ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "var(--spacing-l)" }}>

            {/* ── LEFT: Job Details ── */}
            <div>
              <div
                ref={jdRef}
                style={{
                  background: "var(--color-fill-common-default)",
                  border: "1px solid var(--color-border-weaker)",
                  borderRadius: "var(--corner-radius-m)",
                  padding: "var(--spacing-l)",
                  display: "flex", flexDirection: "column", gap: "var(--spacing-m)",
                }}
              >
                <div>
                  <h3 style={{ fontSize: "var(--font-size-body-m-default)", fontWeight: "var(--font-weight-strong)", color: "var(--color-text-default)", margin: "0 0 var(--spacing-xxs-exception)" }}>
                    Job Details
                  </h3>
                  <p style={{ fontSize: "var(--font-size-body-s)", color: "var(--color-text-secondary)", margin: 0 }}>
                    Add the job details to organize and accurately track your application.
                  </p>
                </div>

                {!jobInfoSaved ? (
                  <>
                    {/* DS Textfield — Job Title (no icon) */}
                    <Textfield
                      label="Job Title"
                      value={roleInput}
                      placeholder="Example: Marketing Manager, Backend Developer…"
                      onChange={(e) => setRoleInput((e.target as HTMLInputElement).value)}
                    />

                    {/* DS Textfield — Company (no icon) */}
                    <Textfield
                      label="Company"
                      value={companyInput}
                      placeholder="Add company name…"
                      onChange={(e) => setCompanyInput((e.target as HTMLInputElement).value)}
                    />

                    {/* DS Textfield multiline — Job Description (no icon) */}
                    <Textfield
                      label="Job Description"
                      multiline
                      rows={6}
                      value={jdInput}
                      placeholder="Paste only the most relevant parts of the job description."
                      assistiveText={`${jdInput.length}/${JD_MAX}`}
                      assistiveTextAlign="right"
                      onChange={(e) => {
                        const val = (e.target as HTMLTextAreaElement).value;
                        if (val.length <= JD_MAX) setJdInput(val);
                      }}
                    />

                    {/* DS Button primary rounded — Save application */}
                    <Button
                      variant="primary"
                      shape="rounded"
                      isFullWidth
                      disabled={!canSaveJob}
                      onClick={saveJobInfo}
                    >
                      Save application
                    </Button>

                    {/* Important notice — plain text */}
                    <p style={{ fontSize: "var(--font-size-body-s)", color: "var(--color-text-default)", margin: 0 }}>
                      <strong>Important:</strong> To keep your job application experience consistent, job details are locked after saving.
                    </p>
                  </>
                ) : (
                  <div className="job-details-enter" style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-m)" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-s-exception)" }}>
                      <div>
                        <p style={{ fontSize: "var(--font-size-small-details-xs-captions)", color: "var(--color-text-secondary)", marginBottom: "var(--spacing-xxs-exception)" }}>Job Title</p>
                        <p style={{ fontSize: "var(--font-size-body-s)", fontWeight: "var(--font-weight-strong)", color: "var(--color-text-default)", margin: 0 }}>{app.role}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: "var(--font-size-small-details-xs-captions)", color: "var(--color-text-secondary)", marginBottom: "var(--spacing-xxs-exception)" }}>Company</p>
                        <p style={{ fontSize: "var(--font-size-body-s)", fontWeight: "var(--font-weight-strong)", color: "var(--color-text-default)", margin: 0 }}>{app.company}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: "var(--font-size-small-details-xs-captions)", color: "var(--color-text-secondary)", marginBottom: "var(--spacing-xxs-exception)" }}>Job Description</p>
                        <JdPreview text={app.jobDescription} />
                      </div>
                    </div>
                    <p style={{
                      fontSize: "var(--font-size-small-details-xs-captions)", color: "var(--color-text-secondary)",
                      borderTop: "1px solid var(--color-border-weaker)", paddingTop: "var(--spacing-s-exception)", margin: 0,
                    }}>
                      This job description is linked to your application and will power future features. For this reason it can't be edited once submitted.
                    </p>
                    <button
                      onClick={handleCreateNew}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "var(--spacing-xxs-exception)",
                        fontSize: "var(--font-size-body-s)", color: "var(--color-text-interactivity-default)",
                        fontWeight: "var(--font-weight-strong)", background: "none", border: "none", cursor: "pointer", padding: 0,
                      }}
                    >
                      <Icon name="add_circle" size={14} color="var(--color-icons-interactivity-default)" />
                      Want to apply to another position? Create a new application
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ── RIGHT: Documents + Notes + Interview ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-l)" }}>

              {/* Documents */}
              <div style={{
                background: "var(--color-fill-common-default)",
                border: "1px solid var(--color-border-weaker)",
                borderRadius: "var(--corner-radius-m)",
                padding: "var(--spacing-l)",
              }}>
                <h3 style={{ fontSize: "var(--font-size-body-m-default)", fontWeight: "var(--font-weight-strong)", color: "var(--color-text-default)", margin: "0 0 var(--spacing-m)" }}>
                  Documents for this application
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-s-exception)" }}>

                  {/* Resume slot */}
                  <div
                    ref={resumeRef}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      borderRadius: "var(--corner-radius-s)",
                      border: "1px solid var(--color-border-weaker)",
                      padding: "var(--spacing-s-exception) var(--spacing-m)",
                      background: "var(--color-fill-common-weakest)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-s-exception)", minWidth: 0 }}>
                      <Icon name="document" size={20} color="var(--color-icons-system-success)" />
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: "var(--font-size-body-s)", fontWeight: "var(--font-weight-strong)", color: "var(--color-text-default)", margin: 0 }}>Resume</p>
                        <p style={{ fontSize: "var(--font-size-small-details-xs-captions)", color: "var(--color-text-secondary)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {app.resumeName || "No file uploaded"}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-xs)", flexShrink: 0 }}>
                      {app.resumeName ? (
                        <>
                          {/* View — chip style */}
                          <Button
                            variant="tool"
                            size="S"
                            style={{ borderRadius: "var(--corner-radius-xl)" }}
                            onClick={() => navigate(`/application/${id}/preview-cv`)}
                          >
                            <Icon name="visibility" size={14} />
                            View
                          </Button>
                          {/* Kebab — opens Popover with Replace + Get link */}
                          <div ref={resumeKebabRef} style={{ position: "relative" }}>
                          <ButtonIcon
                            variant="neutral"
                            size="XS"
                            onClick={() => setResumeMenuOpen(true)}
                          >
                            <Icon name="more_vert" size={16} />
                          </ButtonIcon>
                          <Popover
                            anchorEl={resumeKebabRef.current}
                            open={resumeMenuOpen}
                            onClose={() => setResumeMenuOpen(false)}
                            placement="bottom-right"
                          >
                            <button
                              onClick={() => { openReplace("cv"); setResumeMenuOpen(false); }}
                              style={{
                                display: "flex", alignItems: "center", gap: "var(--spacing-xs)",
                                width: "100%", padding: "var(--spacing-xs) var(--spacing-m)",
                                background: "none", border: "none", cursor: "pointer",
                                fontSize: "var(--font-size-body-s)", color: "var(--color-text-default)",
                              }}
                            >
                              <Icon name="refresh" size={14} color="var(--color-icons-default)" />
                              Replace
                            </button>
                            <button
                              onClick={() => { window.open("/share", "_blank"); setResumeMenuOpen(false); }}
                              style={{
                                display: "flex", alignItems: "center", gap: "var(--spacing-xs)",
                                width: "100%", padding: "var(--spacing-xs) var(--spacing-m)",
                                background: "none", border: "none", cursor: "pointer",
                                fontSize: "var(--font-size-body-s)", color: "var(--color-text-default)",
                              }}
                            >
                              <Icon name="link" size={14} color="var(--color-icons-default)" />
                              Get link
                            </button>
                          </Popover>
                          </div>
                        </>
                      ) : (
                        <Button
                          variant="tool"
                          size="S"
                          style={{ borderRadius: "var(--corner-radius-xl)" }}
                          onClick={() => openReplace("cv")}
                        >
                          Add resume
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Cover Letter slot */}
                  <div
                    ref={coverLetterRef}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      borderRadius: "var(--corner-radius-s)",
                      border: "1px solid var(--color-border-weaker)",
                      padding: "var(--spacing-s-exception) var(--spacing-m)",
                      background: "var(--color-fill-common-weakest)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-s-exception)", minWidth: 0 }}>
                      <Icon name="document_bullets" size={20} color="var(--color-icons-brand)" />
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: "var(--font-size-body-s)", fontWeight: "var(--font-weight-strong)", color: "var(--color-text-default)", margin: 0 }}>Cover Letter</p>
                        <p style={{ fontSize: "var(--font-size-small-details-xs-captions)", color: "var(--color-text-secondary)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {app.coverLetterName || "No file uploaded"}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-xs)", flexShrink: 0 }}>
                      {app.coverLetterName ? (
                        <>
                          {/* View — chip style */}
                          <Button
                            variant="tool"
                            size="S"
                            style={{ borderRadius: "var(--corner-radius-xl)" }}
                            onClick={() => navigate(`/application/${id}/preview-cl`)}
                          >
                            <Icon name="visibility" size={14} />
                            View
                          </Button>
                          {/* Kebab — opens Popover with Replace + Get link */}
                          <div ref={coverLetterKebabRef} style={{ position: "relative" }}>
                          <ButtonIcon
                            variant="neutral"
                            size="XS"
                            onClick={() => setCoverLetterMenuOpen(true)}
                          >
                            <Icon name="more_vert" size={16} />
                          </ButtonIcon>
                          <Popover
                            anchorEl={coverLetterKebabRef.current}
                            open={coverLetterMenuOpen}
                            onClose={() => setCoverLetterMenuOpen(false)}
                            placement="bottom-right"
                          >
                            <button
                              onClick={() => { openReplace("cover-letter"); setCoverLetterMenuOpen(false); }}
                              style={{
                                display: "flex", alignItems: "center", gap: "var(--spacing-xs)",
                                width: "100%", padding: "var(--spacing-xs) var(--spacing-m)",
                                background: "none", border: "none", cursor: "pointer",
                                fontSize: "var(--font-size-body-s)", color: "var(--color-text-default)",
                              }}
                            >
                              <Icon name="refresh" size={14} color="var(--color-icons-default)" />
                              Replace
                            </button>
                            <button
                              onClick={() => { window.open("/share", "_blank"); setCoverLetterMenuOpen(false); }}
                              style={{
                                display: "flex", alignItems: "center", gap: "var(--spacing-xs)",
                                width: "100%", padding: "var(--spacing-xs) var(--spacing-m)",
                                background: "none", border: "none", cursor: "pointer",
                                fontSize: "var(--font-size-body-s)", color: "var(--color-text-default)",
                              }}
                            >
                              <Icon name="link" size={14} color="var(--color-icons-default)" />
                              Get link
                            </button>
                          </Popover>
                          </div>
                        </>
                      ) : (
                        <Button
                          variant="tool"
                          size="S"
                          style={{ borderRadius: "var(--corner-radius-xl)" }}
                          onClick={() => openReplace("cover-letter")}
                        >
                          Add cover letter
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div
                ref={notesSecRef}
                style={{
                  background: "var(--color-fill-common-default)",
                  border: "1px solid var(--color-border-weaker)",
                  borderRadius: "var(--corner-radius-m)",
                  padding: "var(--spacing-l)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--spacing-s-exception)" }}>
                  <h3 style={{ fontSize: "var(--font-size-body-m-default)", fontWeight: "var(--font-weight-strong)", color: "var(--color-text-default)", margin: 0 }}>
                    Notes
                  </h3>
                  {/* DS Button primary rounded — Save notes */}
                  <Button variant="primary" size="S" shape="rounded" onClick={saveNotes}>
                    Save
                  </Button>
                </div>

                {/* DS Textfield multiline — Notes */}
                <Textfield
                  label="Notes"
                  multiline
                  rows={4}
                  value={notesInput}
                  placeholder="Track interview feedback, recruiter details, or next steps."
                  assistiveText={`${notesInput.length}/${NOTES_MAX}`}
                  assistiveTextAlign="right"
                  onChange={(e) => {
                    const val = (e.target as HTMLTextAreaElement).value;
                    if (val.length <= NOTES_MAX) setNotesInput(val);
                  }}
                />
              </div>

              {/* Practice your interview — gradient-1 5% + InfoCard + rounded Button */}
              <div style={{
                borderRadius: "var(--corner-radius-m)",
                background: "linear-gradient(135deg, rgba(210,31,255,0.05), rgba(0,87,163,0.05))",
                overflow: "hidden",
                border: "1px solid var(--color-border-weaker)",
              }}>
                <InfoCard
                  title="Practice your interview"
                  content="Practice with a mock interview tailored to this job and get instant feedback."
                  iconName="ai_stars"
                  iconColor="var(--color-icons-brand)"
                />
                <div style={{ padding: "0 var(--spacing-m) var(--spacing-m)" }}>
                  <Button
                    variant="primary"
                    shape="rounded"
                    isFullWidth
                    onClick={() => navigate(userPlan === "premium" ? "/interview-practice/form" : "/interview-practice")}
                  >
                    Start practice session
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ReplaceDocumentModal type={replaceType} open={replaceModalOpen} onOpenChange={setReplaceModalOpen} onDocSelected={handleDocSelected} />
      <DeleteApplicationModal open={deleteModalOpen} onOpenChange={setDeleteModalOpen} onConfirm={handleDelete} />
    </div>
  );
};

export default ApplicationDetail;
