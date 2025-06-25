import { colors, spacing, typography } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";

interface BaseCardProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

interface MetricCardProps extends BaseCardProps {
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  value: string | number;
  label: string;
  subtext?: string;
}

interface ActionCardProps extends TouchableOpacityProps {
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconBackgroundColor?: string;
  title: string;
  subtitle?: string;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
}

export function Card({ style, children }: BaseCardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function MetricCard({
  icon,
  iconColor = colors.primary,
  value,
  label,
  subtext,
  style,
}: MetricCardProps) {
  return (
    <View style={[styles.card, styles.metricCard, style]}>
      {icon && (
        <View
          style={[styles.metricIcon, { backgroundColor: iconColor + "15" }]}
        >
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>
      )}
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
      {subtext && <Text style={styles.metricSubtext}>{subtext}</Text>}
    </View>
  );
}

export function ActionCard({
  icon,
  iconColor = colors.primary,
  iconBackgroundColor = colors.primary + "15",
  title,
  subtitle,
  rightIcon = "chevron-forward",
  style,
  ...props
}: ActionCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, styles.actionCard, style]}
      {...props}
    >
      <View style={styles.actionContent}>
        {icon && (
          <View
            style={[
              styles.actionIcon,
              { backgroundColor: iconBackgroundColor },
            ]}
          >
            <Ionicons name={icon} size={18} color={iconColor} />
          </View>
        )}
        <View style={styles.actionTexts}>
          <Text style={styles.actionTitle}>{title}</Text>
          {subtitle && <Text style={styles.actionSubtitle}>{subtitle}</Text>}
        </View>
        <Ionicons name={rightIcon} size={16} color={colors.muted} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    elevation: 2,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  metricCard: {
    alignItems: "center",
    gap: spacing.xs,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  metricValue: {
    fontSize: typography.sizes.xl,
    fontWeight: "700",
    color: colors.text,
  },
  metricLabel: {
    fontSize: typography.sizes.sm,
    color: colors.text,
    opacity: 0.7,
    textAlign: "center",
  },
  metricSubtext: {
    fontSize: typography.sizes.xs,
    color: colors.text,
    opacity: 0.5,
    textAlign: "center",
  },
  actionCard: {
    padding: spacing.md,
  },
  actionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  actionTexts: {
    flex: 1,
  },
  actionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: "600",
    color: colors.text,
  },
  actionSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.text,
    opacity: 0.7,
    marginTop: spacing.xs,
  },
});
