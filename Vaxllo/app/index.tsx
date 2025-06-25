import { colors, spacing, typography } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Onboarding() {
  const handleGetStarted = () => {
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.iconBackground}>
            <Ionicons name="call" size={72} color={colors.primary} />
          </View>
          <Text style={styles.brandName}>Vaxllo</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Välkommen till Vaxllo</Text>
          <Text style={styles.subtitle}>AI-driven samtalshantering</Text>
        </View>

        <View style={styles.features}>
          <View style={styles.featureIcon}>
            <Ionicons name="mic" size={28} color={colors.primary} />
          </View>

          <View style={styles.featureIcon}>
            <Ionicons name="flag" size={28} color={colors.primary} />
          </View>

          <View style={styles.featureIcon}>
            <Ionicons
              name="shield-checkmark"
              size={28}
              color={colors.primary}
            />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Kom igång</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xxl + spacing.lg,
  },
  logoContainer: {
    alignItems: "center",
    gap: spacing.lg,
  },
  iconBackground: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.primary + "10",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary + "20",
  },
  brandName: {
    fontSize: typography.sizes.xxl + 12,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: 2,
  },
  textContainer: {
    alignItems: "center",
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    fontWeight: "500",
    color: colors.text,
    opacity: 0.6,
    textAlign: "center",
  },
  features: {
    flexDirection: "row",
    gap: spacing.xxl,
    justifyContent: "center",
    alignItems: "center",
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary + "08",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary + "15",
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl + spacing.lg,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.lg + spacing.sm,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.background,
    fontSize: typography.sizes.lg,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
