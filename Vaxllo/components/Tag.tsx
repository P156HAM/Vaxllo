import { colors, spacing, typography } from "@/styles";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

interface TagProps {
  label: string;
  variant?: "success" | "error" | "warning" | "default";
}

export default function Tag({ label, variant = "default" }: TagProps) {
  const getBackgroundColor = () => {
    switch (variant) {
      case "success":
        return colors.success;
      case "error":
        return colors.error;
      case "warning":
        return colors.warning;
      default:
        return colors.primary;
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor() } as ViewStyle,
      ]}
    >
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.sm,
    alignSelf: "flex-start",
  },
  text: {
    color: colors.background,
    fontSize: typography.sizes.xs,
    fontWeight: "500",
  },
});
