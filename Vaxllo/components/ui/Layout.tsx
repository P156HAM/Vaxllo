import { colors, spacing } from "@/styles";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { Title } from "./Typography";

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
  keyboardAvoiding?: boolean;
}

interface SectionProps extends ViewProps {
  title?: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Container({
  children,
  style,
  scrollable = true,
  keyboardAvoiding = true,
  ...props
}: ContainerProps) {
  const content = scrollable ? (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    children
  );

  const container = (
    <SafeAreaView style={[styles.container, style]} {...props}>
      {content}
    </SafeAreaView>
  );

  if (keyboardAvoiding) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        {container}
      </KeyboardAvoidingView>
    );
  }

  return container;
}

export function Section({ title, children, style, ...props }: SectionProps) {
  return (
    <View style={[styles.section, style]} {...props}>
      {title && <Title style={styles.sectionTitle}>{title}</Title>}
      {children}
    </View>
  );
}

export function Row({
  children,
  style,
  ...props
}: {
  children: React.ReactNode;
  style?: ViewStyle;
} & ViewProps) {
  return (
    <View style={[styles.row, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  section: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
});
