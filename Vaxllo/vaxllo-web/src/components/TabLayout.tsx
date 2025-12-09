import { Link, useLocation } from "react-router-dom";
import { colors } from "../styles";
import { IoHomeOutline, IoCallOutline, IoSettingsOutline } from "react-icons/io5";
import type { ReactNode } from "react";
import styles from "./TabLayout.module.css";

interface TabLayoutProps {
  children: ReactNode;
}

export default function TabLayout({ children }: TabLayoutProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={styles.container}>
      <main className={styles.main}>{children}</main>
      <nav className={styles.tabBar}>
        <Link
          to="/dashboard"
          className={`${styles.tab} ${isActive("/dashboard") ? styles.active : ""}`}
        >
          <IoHomeOutline
            size={24}
            color={isActive("/dashboard") ? colors.primary : colors.muted}
          />
        </Link>
        <Link
          to="/calls"
          className={`${styles.tab} ${isActive("/calls") ? styles.active : ""}`}
        >
          <IoCallOutline
            size={24}
            color={isActive("/calls") ? colors.primary : colors.muted}
          />
        </Link>
        <Link
          to="/settings"
          className={`${styles.tab} ${isActive("/settings") ? styles.active : ""}`}
        >
          <IoSettingsOutline
            size={24}
            color={isActive("/settings") ? colors.primary : colors.muted}
          />
        </Link>
      </nav>
    </div>
  );
}

