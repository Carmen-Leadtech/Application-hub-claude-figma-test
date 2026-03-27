import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApplications } from "@/context/ApplicationContext";

// DS Components
import { MenuItemBlock } from "components/MenuItemBlock/MenuItemBlock";
import { LanguageSelector } from "components/LanguageSelector/LanguageSelector";
import { SelectMenu } from "components/SelectMenu/SelectMenu";
import { Button } from "components/Button/Button";
import { Icon } from "components/Icon/Icon";
import { Badge } from "components/Badge/Badge";

// Language options — label shown in LanguageSelector, full name used internally
const langOptions = [
  { value: "en", label: "EN", full: "English (US)" },
  { value: "es", label: "ES", full: "Spanish" },
  { value: "fr", label: "FR", full: "French" },
  { value: "de", label: "DE", full: "German" },
];

const navSections: Array<{
  title?: string;
  items: Array<{ label: string; iconName: string; path?: string; badge?: string; iconColor?: string }>;
}> = [
  {
    items: [
      { label: "Application Hub", iconName: "suitcase", path: "/Application-hub-premium" },
    ],
  },
  {
    title: "DOCUMENTS",
    items: [
      { label: "Resumes",       iconName: "pdf_document",  path: "/documents", badge: "2" },
      { label: "Cover Letters", iconName: "create",        path: "/documents", badge: "1" },
    ],
  },
  {
    title: "CAREER TOOLS",
    items: [
      { label: "Interview AI",      iconName: "mic" },
      { label: "LinkedIn Analyzer", iconName: "in", iconColor: "var(--color-icons-weak)" },
      { label: "Resume Review",     iconName: "document_search" },
    ],
  },
];

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userPlan } = useApplications();

  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(langOptions[0]);
  const langRef = useRef<HTMLDivElement>(null);
  const langOptionRef = useRef<(HTMLLIElement | null)[]>([]);

  const menuOptions = langOptions.map((l) => ({ label: l.full, value: l.value }));

  const handleLangChange = (option: { label: string; value: string }) => {
    const found = langOptions.find((l) => l.value === option.value);
    if (found) setSelectedLang(found);
    setLangOpen(false);
  };

  return (
    <aside style={{
      position: "fixed",
      left: 0, top: 0, bottom: 0,
      width: "220px",
      background: "var(--color-fill-common-default)",
      borderRight: "1px solid var(--color-border-weaker)",
      display: "flex",
      flexDirection: "column",
      zIndex: 10,
    }}>

      {/* ── Logo ── */}
      <div style={{ padding: "var(--spacing-l) var(--spacing-l) var(--spacing-m)" }}>
        <span style={{
          fontFamily: "var(--font-family-heading)",
          fontSize: "var(--font-size-titles-s)",
          fontWeight: "var(--font-weight-strong)",
          color: "var(--color-text-default)",
        }}>
          Resum<span style={{ fontStyle: "italic" }}>é</span>
          <span style={{ color: "var(--color-text-brand)" }}>Coach</span>
        </span>
      </div>

      {/* ── Navigation ── */}
      <nav style={{ flex: 1, overflowY: "auto" }}>
        {navSections.map((section, si) => (
          <div key={si} style={{ marginBottom: "var(--spacing-xs)" }}>
            {section.title && (
              <p style={{
                padding: "var(--spacing-xs) var(--spacing-l) var(--spacing-xxs-exception)",
                fontSize: "var(--font-size-small-details-xs-captions)",
                fontWeight: "var(--font-weight-strong)",
                color: "var(--color-text-secondary)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: 0,
              }}>
                {section.title}
              </p>
            )}
            {section.items.map((item) => {
              const isActive = item.path ? location.pathname === item.path : false;
              return (
                <MenuItemBlock
                  key={item.label}
                  sectionName={item.label}
                  iconName={!item.iconColor ? item.iconName : undefined}
                  icon={item.iconColor ? (
                    <Icon
                      name={item.iconName}
                      size={20}
                      color={isActive ? "var(--brand-500, #006dcc)" : item.iconColor}
                    />
                  ) : undefined}
                  isActive={isActive}
                  onClick={() => item.path && navigate(item.path)}
                  endContent={
                    item.badge ? (
                      <Badge variant="neutral" size="S" shape="rounded">
                        {item.badge}
                      </Badge>
                    ) : undefined
                  }
                />
              );
            })}
          </div>
        ))}
      </nav>

      {/* ── Bottom section ── */}
      <div style={{
        borderTop: "1px solid var(--color-border-weaker)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-xs)",
        padding: "var(--spacing-s-exception) 0 var(--spacing-m)",
      }}>

        {/* Language Selector + dropdown — now ABOVE user row */}
        <div
          ref={langRef}
          style={{ position: "relative", padding: "0 var(--spacing-l)" }}
        >
          <LanguageSelector
            label={selectedLang.full}
            isActive={langOpen}
            onClick={() => setLangOpen((o) => !o)}
          />
          {langOpen && (
            <div style={{
              position: "absolute",
              left: "var(--spacing-l)",
              // SelectMenu CSS has `position:absolute; top:58px` hardcoded (opens downward).
              // Offset wrapper up so SelectMenu lands just above the language button.
              top: "calc(-160px - 58px + 8px)",
              zIndex: 50,
              minWidth: "160px",
            }}>
              <SelectMenu
                name="language"
                options={menuOptions}
                value={selectedLang.value}
                optionRef={langOptionRef}
                parentRef={langRef}
                onChange={handleLangChange}
                onClose={() => setLangOpen(false)}
              />
            </div>
          )}
        </div>

        {/* Anna Smith — blue square letter avatar */}
        <MenuItemBlock
          sectionName="Anna Smith"
          isActive={false}
          icon={
            <div style={{
              height: "28px", width: "28px",
              borderRadius: "var(--corner-radius-s)",
              background: "var(--color-fill-common-brand-weak)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{
                fontSize: "var(--font-size-small-details-xs-captions)",
                fontWeight: "var(--font-weight-strong)",
                color: "var(--color-text-brand)",
                lineHeight: 1,
              }}>A</span>
            </div>
          }
          endContent={
            <span style={{
              fontSize: "var(--font-size-small-details-xxs)",
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-family-body)",
              whiteSpace: "nowrap",
            }}>
              {userPlan === "premium" ? "Premium" : "Free plan"}
            </span>
          }
          onClick={() => {}}
        />

        {/* Upgrade now — chip style: tool variant + pill border-radius */}
        <div style={{ padding: "0 var(--spacing-m)" }}>
          <Button
            variant="tool"
            shape="rounded"
            isFullWidth
            onClick={() => {}}
          >
            <Icon name="badge_awards" size={16} />
            Upgrade now
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
