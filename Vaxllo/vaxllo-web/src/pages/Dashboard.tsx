import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../styles";
import {
  IoCall,
  IoCallOutline,
  IoChatbubbleEllipses,
  IoAlertCircle,
  IoChevronForward,
  IoTrendingUp,
  IoHelpCircle,
  IoShield,
} from "react-icons/io5";
import { mockCalls, getMockDashboardStats } from "../lib/mockData";
import type { CallType } from "@/types";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [calls] = useState(mockCalls);
  const [stats] = useState(getMockDashboardStats());

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleActionClick = (type: CallType) => {
    navigate(`/calls?type=${type}`);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Laddar...</p>
      </div>
    );
  }

  const urgentCalls = calls.filter((call) => call.call_type === "viktigt").length;
  const newLeads = calls.filter((call) => call.call_type === "leads").length;
  const spamCalls = calls.filter((call) => call.call_type === "spam").length;
  const supportCalls = calls.filter((call) => call.call_type === "support").length;

  return (
    <div className={styles.container}>
      <div className={styles.scrollContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>Översikt</h1>
          <p className={styles.subtitle}>AI Samtalshantering</p>
        </div>

        <div className={styles.metricsSection}>
          <div className={styles.metricsGrid}>
            <div className={styles.metric}>
              <div className={styles.metricIcon}>
                <IoCall size={20} color={colors.primary} />
              </div>
              <div className={styles.metricValue}>{stats.todaysCalls}</div>
              <div className={styles.metricLabel}>Dagens samtal</div>
            </div>

            <div className={styles.metric}>
              <div className={styles.metricIcon}>
                <IoCallOutline size={20} color={colors.warning} />
              </div>
              <div className={styles.metricValue}>{stats.missedCalls}</div>
              <div className={styles.metricLabel}>Missade samtal</div>
            </div>

            <div className={styles.metric}>
              <div className={styles.metricIcon}>
                <IoChatbubbleEllipses size={20} color={colors.success} />
              </div>
              <div className={styles.metricValue}>{stats.aiResponseRate}%</div>
              <div className={styles.metricLabel}>AI svarstakt</div>
              <div className={styles.metricSubtext}>Automatiska svar</div>
            </div>

            <div className={styles.metric}>
              <div className={styles.metricIcon}>
                <IoAlertCircle size={20} color={colors.error} />
              </div>
              <div className={styles.metricValue}>{stats.priorityAlerts}</div>
              <div className={styles.metricLabel}>Prioritetsvarningar</div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Prioriterade åtgärder</h2>

          <div className={styles.actionsList}>
            <button
              className={styles.actionItem}
              onClick={() => handleActionClick("viktigt")}
            >
              <div
                className={styles.actionIcon}
                style={{ backgroundColor: colors.error + "15" }}
              >
                <IoCall size={18} color={colors.error} />
              </div>
              <div className={styles.actionContent}>
                <div className={styles.actionTitle}>Brådskande återsamtal</div>
                <div className={styles.actionCount}>{urgentCalls} st</div>
              </div>
              <IoChevronForward size={16} color={colors.muted} />
            </button>

            <button
              className={styles.actionItem}
              onClick={() => handleActionClick("leads")}
            >
              <div
                className={styles.actionIcon}
                style={{ backgroundColor: colors.success + "15" }}
              >
                <IoTrendingUp size={18} color={colors.success} />
              </div>
              <div className={styles.actionContent}>
                <div className={styles.actionTitle}>Nya leads</div>
                <div className={styles.actionCount}>{newLeads} st</div>
              </div>
              <IoChevronForward size={16} color={colors.muted} />
            </button>

            <button
              className={styles.actionItem}
              onClick={() => handleActionClick("support")}
            >
              <div
                className={styles.actionIcon}
                style={{ backgroundColor: colors.primary + "15" }}
              >
                <IoHelpCircle size={18} color={colors.primary} />
              </div>
              <div className={styles.actionContent}>
                <div className={styles.actionTitle}>Support ärenden</div>
                <div className={styles.actionCount}>{supportCalls} st</div>
              </div>
              <IoChevronForward size={16} color={colors.muted} />
            </button>

            <button
              className={styles.actionItem}
              onClick={() => handleActionClick("spam")}
            >
              <div
                className={styles.actionIcon}
                style={{ backgroundColor: colors.muted + "15" }}
              >
                <IoShield size={18} color={colors.muted} />
              </div>
              <div className={styles.actionContent}>
                <div className={styles.actionTitle}>Blockerade samtal</div>
                <div className={styles.actionCount}>{spamCalls} st</div>
              </div>
              <IoChevronForward size={16} color={colors.muted} />
            </button>
          </div>
        </div>

        <div className={styles.bottomSpace} />
      </div>
    </div>
  );
}
