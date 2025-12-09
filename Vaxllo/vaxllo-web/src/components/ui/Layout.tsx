import { colors } from "../../styles";
import type { ReactNode } from "react";
import styles from "./Layout.module.css";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`${styles.container} ${className}`}
      style={{ backgroundColor: colors.background }}
    >
      {children}
    </div>
  );
}

