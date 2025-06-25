import { colors, typography } from "@/styles";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

interface TypographyProps extends TextProps {
  variant?: "h1" | "h2" | "h3" | "body" | "caption" | "error";
  weight?: "regular" | "medium" | "semibold" | "bold";
  color?: string;
  style?: TextStyle;
}

const fontWeights = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export default function Typography({
  variant = "body",
  weight = "regular",
  color = colors.text,
  style,
  children,
  ...props
}: TypographyProps) {
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case "h1":
        return styles.h1;
      case "h2":
        return styles.h2;
      case "h3":
        return styles.h3;
      case "caption":
        return styles.caption;
      case "error":
        return styles.error;
      default:
        return styles.body;
    }
  };

  return (
    <Text
      style={[
        getVariantStyle(),
        {
          color,
          fontWeight: fontWeights[weight],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

export function Title(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="h1" weight="bold" {...props} />;
}

export function Subtitle(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="h2" weight="semibold" {...props} />;
}

export function Heading(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="h3" weight="semibold" {...props} />;
}

export function Body(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="body" {...props} />;
}

export function Caption(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="caption" {...props} />;
}

export function ErrorText(props: Omit<TypographyProps, "variant" | "color">) {
  return <Typography variant="error" color={colors.error} {...props} />;
}

const styles = StyleSheet.create({
  h1: {
    fontSize: typography.sizes.xxl + 4,
    lineHeight: (typography.sizes.xxl + 4) * 1.3,
  },
  h2: {
    fontSize: typography.sizes.xl,
    lineHeight: typography.sizes.xl * 1.3,
  },
  h3: {
    fontSize: typography.sizes.lg,
    lineHeight: typography.sizes.lg * 1.3,
  },
  body: {
    fontSize: typography.sizes.md,
    lineHeight: typography.sizes.md * 1.5,
  },
  caption: {
    fontSize: typography.sizes.sm,
    lineHeight: typography.sizes.sm * 1.5,
    opacity: 0.7,
  },
  error: {
    fontSize: typography.sizes.sm,
    lineHeight: typography.sizes.sm * 1.5,
  },
});
