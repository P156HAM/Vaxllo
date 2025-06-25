import { colors, spacing, typography } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  variant?: "primary" | "secondary" | "outline" | "link";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: "left" | "right";
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  loading = false,
  icon,
  iconPosition = "left",
  style,
  textStyle,
  disabled,
  ...props
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

  const buttonStyles = [
    styles.button,
    {
      backgroundColor: getBackgroundColor(),
      padding: getPadding(),
      borderWidth: variant === "outline" ? 1 : 0,
      borderColor: variant === "outline" ? colors.primary : undefined,
    },
    variant === "link" && styles.linkButton,
    style,
  ];

  const textStyles = [
    styles.text,
    {
      color: getTextColor(),
      fontSize:
        size === "small"
          ? typography.sizes.sm
          : size === "large"
          ? typography.sizes.lg
          : typography.sizes.md,
    },
    textStyle,
  ];

  const iconSize = size === "small" ? 16 : size === "large" ? 24 : 20;

  const renderIcon = () => {
    if (!icon) return null;
    return (
      <Ionicons
        name={icon}
        size={iconSize}
        color={getTextColor()}
        style={[styles.icon, iconPosition === "right" && styles.iconRight]}
      />
    );
  };

  return (
    <TouchableOpacity
      style={buttonStyles}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={colors.background} />
      ) : (
        <View style={styles.content}>
          {iconPosition === "left" && renderIcon()}
          <Text style={textStyles}>{children}</Text>
          {iconPosition === "right" && renderIcon()}
        </View>
      )}
    </TouchableOpacity>
  );
}

export function IconButton({
  icon,
  color = colors.text,
  size = "medium",
  style,
  ...props
}: {
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
  size?: "small" | "medium" | "large";
  style?: ViewStyle;
} & TouchableOpacityProps) {
  const iconSize = size === "small" ? 20 : size === "large" ? 28 : 24;

  return (
    <TouchableOpacity style={[styles.iconButton, style]} {...props}>
      <Ionicons name={icon} size={iconSize} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  linkButton: {
    elevation: 0,
    shadowOpacity: 0,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "600",
    textAlign: "center",
  },
  icon: {
    marginRight: spacing.sm,
  },
  iconRight: {
    marginRight: 0,
    marginLeft: spacing.sm,
  },
  iconButton: {
    padding: spacing.sm,
  },
});
