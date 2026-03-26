import { Icon } from "components/Icon/Icon";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

const EmptyState = ({
  title = "No applications yet",
  subtitle = "Start tracking your job search — add your first application.",
}: EmptyStateProps) => {
  return (
    <div style={{
      textAlign: "center",
      padding: "var(--spacing-xxxl) 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "var(--spacing-m)",
    }}>
      <Icon name="document" size={48} color="var(--color-icons-disabled)" />
      <p style={{
        fontSize: "var(--font-size-body-m-default)",
        fontWeight: "var(--font-weight-strong)",
        color: "var(--color-text-default)",
        margin: 0,
      }}>
        {title}
      </p>
      <p style={{
        fontSize: "var(--font-size-body-s)",
        color: "var(--color-text-secondary)",
        margin: 0,
      }}>
        {subtitle}
      </p>
    </div>
  );
};

export default EmptyState;
