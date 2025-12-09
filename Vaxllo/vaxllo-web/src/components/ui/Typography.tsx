import { colors, typography } from "../../styles";
import type { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Title({ children, color, className = "", style }: TypographyProps) {
  return (
    <h1
      className={className}
      style={{
        fontSize: typography.sizes.xxl,
        fontWeight: typography.weights.bold,
        color: color || colors.text,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </h1>
  );
}

export function Subtitle({
  children,
  color,
  className = "",
  style,
}: TypographyProps) {
  return (
    <p
      className={className}
      style={{
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.medium,
        color: color || colors.muted,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

export function Body({
  children,
  color,
  className = "",
  style,
}: TypographyProps) {
  return (
    <span
      className={className}
      style={{
        fontSize: typography.sizes.md,
        fontWeight: typography.weights.regular,
        color: color || colors.text,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function ErrorText({
  children,
  className = "",
  style,
}: TypographyProps) {
  return (
    <span
      className={className}
      style={{
        fontSize: typography.sizes.sm,
        color: colors.error,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

