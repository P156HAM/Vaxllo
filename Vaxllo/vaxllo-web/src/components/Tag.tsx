import { colors } from "../styles";
import styles from "./Tag.module.css";

interface TagProps {
  label: string;
  color?: string;
  className?: string;
}

export default function Tag({ label, color, className = "" }: TagProps) {
  return (
    <span
      className={`${styles.tag} ${className}`}
      style={{ backgroundColor: color || colors.primary }}
    >
      {label}
    </span>
  );
}

