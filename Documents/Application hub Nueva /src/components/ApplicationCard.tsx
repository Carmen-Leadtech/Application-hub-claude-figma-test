import { useState } from "react";
import { FileText, Plus, MoreVertical, Trash2, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReplaceDocumentModal from "@/components/ReplaceDocumentModal";
import DeleteApplicationModal from "@/components/DeleteApplicationModal";
import { useApplications, Status } from "@/context/ApplicationContext";
import { Icon } from "components/Icon/Icon";
import StatusDropdown from "@/components/StatusDropdown";

interface ApplicationCardProps {
  id: string;
  onClick?: () => void;
}

// Status top-border color uses local status tokens
const statusBorderColor: Record<Status, string> = {
  Draft: "var(--status-draft-fill)",
  Applied: "var(--status-applied-fill)",
  "Under Review": "var(--status-underreview-fill)",
  Closed: "var(--status-closed-fill)",
};

const ApplicationCard = ({ id, onClick }: ApplicationCardProps) => {
  const { getApplication, updateApplication, deleteApplication } = useApplications();
  const app = getApplication(id);
  const [kebabOpen, setKebabOpen] = useState(false);
  const [replaceModalOpen, setReplaceModalOpen] = useState(false);
  const [replaceType, setReplaceType] = useState<"cv" | "cover-letter">("cv");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  if (!app) return null;

  const handleStatusChange = (s: Status) => {
    updateApplication(id, { status: s });
  };

  const handleDocSelected = (docName: string) => {
    if (replaceType === "cv") updateApplication(id, { resumeName: docName });
    else updateApplication(id, { coverLetterName: docName });
  };

  const docSlots = [
    { label: "Job Description", filled: !!app.jobDescription, onClickFilled: () => navigate(`/application/${id}?scroll=jd`), onClickEmpty: () => navigate(`/application/${id}?scroll=jd`) },
    { label: "Resume", filled: !!app.resumeName, onClickFilled: () => navigate(`/application/${id}?scroll=resume`), onClickEmpty: () => { setReplaceType("cv"); setReplaceModalOpen(true); } },
    { label: "Cover Letter", filled: !!app.coverLetterName, onClickFilled: () => navigate(`/application/${id}?scroll=cover-letter`), onClickEmpty: () => { setReplaceType("cover-letter"); setReplaceModalOpen(true); } },
  ];

  return (
    <>
      <div
        onClick={onClick}
        style={{
          background: "var(--color-fill-common-default)",
          borderRadius: "var(--corner-radius-s)",
          border: "1px solid var(--color-border-weaker)",
          borderTop: `3px solid ${statusBorderColor[app.status]}`,
          padding: "var(--spacing-m)",
          cursor: "pointer",
          transition: "box-shadow 0.15s ease, border-color 0.15s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.10)")}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
        {/* Header: icon + title/company + status badge + kebab */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--spacing-s-exception)", marginBottom: "var(--spacing-s-exception)" }}>
          <div style={{
            height: "36px", width: "36px",
            borderRadius: "var(--corner-radius-s)",
            background: "var(--color-fill-common-weakest)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, marginTop: "2px",
          }}>
            <Building2 style={{ height: "16px", width: "16px", color: "var(--color-icons-default)" }} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{
              fontSize: "var(--font-size-body-m-default)",
              fontWeight: "var(--font-weight-strong)",
              color: "var(--color-text-default)",
              marginBottom: "var(--spacing-xxs-exception)",
            }}>
              {app.applicationName}
            </h3>
            <p style={{ fontSize: "var(--font-size-body-s)", color: "var(--color-text-secondary)" }}>
              {app.company || <span style={{ fontStyle: "italic" }}>Add company name</span>}
            </p>
          </div>

          {/* Status dropdown */}
          <div onClick={(e) => e.stopPropagation()} style={{ flexShrink: 0 }}>
            <StatusDropdown status={app.status} onChange={handleStatusChange} size="S" />
          </div>

          {/* Kebab */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <button
              onClick={(e) => { e.stopPropagation(); setKebabOpen(!kebabOpen); }}
              style={{
                color: "var(--color-icons-default)",
                background: "transparent", border: "none", cursor: "pointer",
                padding: "var(--spacing-xxs-exception)",
                borderRadius: "var(--corner-radius-xs)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <MoreVertical style={{ height: "16px", width: "16px" }} />
            </button>
            {kebabOpen && (
              <div style={{
                position: "absolute", right: 0, top: "100%", marginTop: "var(--spacing-xxs-exception)",
                background: "var(--color-fill-common-default)",
                border: "1px solid var(--color-border-weaker)",
                borderRadius: "var(--corner-radius-s)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                zIndex: 50, width: "160px",
              }}>
                <button
                  onClick={(e) => { e.stopPropagation(); setKebabOpen(false); setDeleteModalOpen(true); }}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: "var(--spacing-xs)",
                    padding: "var(--spacing-xs) var(--spacing-s-exception)",
                    fontSize: "var(--font-size-body-s)",
                    color: "var(--color-text-system-error)",
                    background: "transparent", border: "none", cursor: "pointer",
                    borderRadius: "var(--corner-radius-s)",
                  }}
                >
                  <Trash2 style={{ height: "14px", width: "14px" }} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Doc slots */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--spacing-xs)", marginBottom: "var(--spacing-s-exception)" }}>
          {docSlots.map((slot) => (
            <button
              key={slot.label}
              onClick={(e) => { e.stopPropagation(); slot.filled ? slot.onClickFilled() : slot.onClickEmpty(); }}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                gap: "var(--spacing-xxs-exception)",
                borderRadius: "var(--corner-radius-s)",
                padding: "var(--spacing-s-exception) var(--spacing-xs)",
                textAlign: "center",
                cursor: "pointer",
                border: slot.filled
                  ? "1px solid var(--color-border-brand-weak)"
                  : "1px dashed var(--color-border-weaker)",
                background: slot.filled ? "var(--color-fill-common-brand-weak)" : "transparent",
                color: slot.filled ? "var(--color-text-default)" : "var(--color-text-secondary)",
                transition: "border-color 0.15s, background 0.15s",
              }}
            >
              {slot.filled ? (
                <>
                  <FileText style={{ height: "16px", width: "16px", color: "var(--color-icons-brand)" }} />
                  <span style={{ fontSize: "var(--font-size-small-details-xxs)", fontWeight: "var(--font-weight-strong)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}>
                    {slot.label}
                  </span>
                </>
              ) : (
                <>
                  <Plus style={{ height: "16px", width: "16px" }} />
                  <span style={{ fontSize: "var(--font-size-small-details-xxs)" }}>{slot.label}</span>
                </>
              )}
            </button>
          ))}
        </div>

        {/* Footer: dates + chat icon */}
        <div style={{
          borderTop: "1px solid var(--color-border-weaker)",
          paddingTop: "var(--spacing-xs)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "var(--spacing-xs)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-xs)" }}>
            <Icon name="calendar" size={12} color="var(--color-icons-secondary)" />
            <span style={{ fontSize: "var(--font-size-small-details-xs-captions)", color: "var(--color-text-secondary)" }}>
              {app.createdDate}
            </span>
            <Icon name="calendar" size={12} color="var(--color-icons-secondary)" />
            <span style={{ fontSize: "var(--font-size-small-details-xs-captions)", color: "var(--color-text-secondary)" }}>
              Updated {app.updatedDate}
            </span>
          </div>
          <Icon name="chat" size={14} color="var(--color-icons-secondary)" />
        </div>
      </div>

      <ReplaceDocumentModal type={replaceType} open={replaceModalOpen} onOpenChange={setReplaceModalOpen} onDocSelected={handleDocSelected} />
      <DeleteApplicationModal open={deleteModalOpen} onOpenChange={setDeleteModalOpen} onConfirm={() => deleteApplication(id)} />
    </>
  );
};

export default ApplicationCard;
