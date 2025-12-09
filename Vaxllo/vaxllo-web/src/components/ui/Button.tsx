import { colors, spacing, typography } from "../../styles";
import type { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "link";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  loading = false,
  onClick,
  disabled = false,
  className = "",
  type = "button",
}: ButtonProps) {
  const getBackgroundColor = () => {
    if (disabled) return colors.muted;
    switch (variant) {
      case "primary":
        return colors.primary;
      case "secondary":
        return colors.secondary;
      case "outline":
      case "link":
        return "transparent";
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.background;
    switch (variant) {
      case "primary":
      case "secondary":
        return colors.background;
      case "outline":
      case "link":
        return colors.primary;
      default:
        return colors.background;
    }
  };

  const getPadding = () => {
    switch (size) {
      case "small":
        return spacing.sm;
      case "large":
        return spacing.lg;
      default:
        return spacing.md;
    }
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: getBackgroundColor(),
    padding: getPadding(),
    borderWidth: variant === "outline" ? 1 : 0,
    borderColor: variant === "outline" ? colors.primary : undefined,
    borderStyle: variant === "outline" ? "solid" : "none",
    color: getTextColor(),
    fontSize:
      size === "small"
        ? typography.sizes.sm
        : size === "large"
        ? typography.sizes.lg
        : typography.sizes.md,
    cursor: disabled || loading ? "not-allowed" : "pointer",
    opacity: disabled ? 0.7 : 1,
  };

  return (
    <button
      type={type}
      className={`${styles.button} ${className}`}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <span>Laddar...</span> : <span className={styles.content}>{children}</span>}
    </button>
  );
}

