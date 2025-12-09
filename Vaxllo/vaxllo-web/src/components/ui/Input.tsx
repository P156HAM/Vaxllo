import { colors } from "../../styles";
import { IoEyeOutline, IoEyeOffOutline, IoAlertCircleOutline } from "react-icons/io5";
import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
  isPassword?: boolean;
}

export default function Input({
  icon,
  error,
  isPassword,
  className = "",
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.container} ${error ? styles.containerError : ""}`}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          className={`${styles.input} ${className}`}
          type={isPassword && !showPassword ? "password" : "text"}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.eyeIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <IoEyeOffOutline size={20} color={colors.text} />
            ) : (
              <IoEyeOutline size={20} color={colors.text} />
            )}
          </button>
        )}
      </div>
      {error && (
        <div className={styles.errorContainer}>
          <IoAlertCircleOutline size={16} color={colors.error} />
          <span className={styles.error}>{error}</span>
        </div>
      )}
    </div>
  );
}

