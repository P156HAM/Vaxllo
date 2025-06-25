import Loading from "@/components/Loading";
import { supabase } from "@/lib/supabase";
import { colors, spacing, typography } from "@/styles";
import { Call, CallType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const metricWidth = (width - spacing.lg * 3) / 2;

interface DashboardStats {
  todaysCalls: number;
  missedCalls: number;
  aiResponseRate: number;
  priorityAlerts: number;
  weeklyTrend: number[];
  callTypes: { [key in CallType]: number };
  avgResponseTime: number;
  avgCallDuration: number;
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [calls, setCalls] = useState<Call[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    todaysCalls: 0,
    missedCalls: 0,
    aiResponseRate: 0,
    priorityAlerts: 0,
    weeklyTrend: [12, 8, 15, 22, 18, 25, 19],
    callTypes: {
      viktigt: 0,
      leads: 0,
      spam: 0,
      normal: 0,
      säljare: 0,
      support: 0,
      annat: 0,
    },
    avgResponseTime: 0,
    avgCallDuration: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch recent calls
      const { data: callsData, error: callsError } = await supabase
        .from("calls")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (callsError) throw callsError;
      const recentCalls = callsData || [];
      setCalls(recentCalls);

      // Calculate stats from all calls
      const { data: allCallsData, error: statsError } = await supabase
        .from("calls")
        .select("*");

      if (statsError) throw statsError;
      const allCalls = allCallsData || [];

      // Calculate dashboard statistics
      const today = new Date().toDateString();
      const todaysCalls = allCalls.filter(
        (call) => new Date(call.created_at).toDateString() === today
      ).length;

      const missedCalls = allCalls.filter(
        (call) => call.priority === "high" && !call.is_responded
      ).length;

      const priorityAlerts = allCalls.filter(
        (call) => call.call_type === "viktigt" || call.priority === "high"
      ).length;

      // Calculate call types distribution
      const callTypes = allCalls.reduce((acc, call) => {
        acc[call.call_type as CallType] =
          (acc[call.call_type as CallType] || 0) + 1;
        return acc;
      }, {} as { [key in CallType]: number });

      // Calculate averages
      const totalDuration = allCalls.reduce(
        (sum, call) => sum + call.duration,
        0
      );
      const avgCallDuration =
        allCalls.length > 0 ? totalDuration / allCalls.length : 0;

      setStats({
        todaysCalls,
        missedCalls,
        aiResponseRate: 94, // Mock data - would be calculated from AI responses
        priorityAlerts,
        weeklyTrend: [12, 8, 15, 22, 18, 25, 19], // Mock weekly data
        callTypes: {
          viktigt: 0,
          leads: 0,
          spam: 0,
          normal: 0,
          säljare: 0,
          support: 0,
          annat: 0,
          ...callTypes,
        },
        avgResponseTime: 2.3, // Mock data
        avgCallDuration: Math.round(avgCallDuration / 60), // Convert to minutes
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCallPress = (call: Call) => {
    console.log("Call pressed:", call.id);
  };

  const handleCallUpdate = (updatedCall: Call) => {
    setCalls(calls.map((c) => (c.id === updatedCall.id ? updatedCall : c)));
  };

  const handleCallDelete = (id: string) => {
    setCalls(calls.filter((c) => c.id !== id));
  };

  const handleSeeAllCalls = () => {
    console.log("Navigate to all calls");
    // router.push("/(tabs)/calls");
  };

  if (loading) return <Loading />;

  const urgentCalls = calls.filter(
    (call) => call.call_type === "viktigt"
  ).length;
  const newLeads = calls.filter((call) => call.call_type === "leads").length;
  const spamCalls = calls.filter((call) => call.call_type === "spam").length;
  const supportCalls = calls.filter(
    (call) => call.call_type === "support"
  ).length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Översikt</Text>
          <Text style={styles.subtitle}>AI Samtalshantering</Text>
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsSection}>
          <View style={styles.metricsGrid}>
            <View style={[styles.metric, { width: metricWidth }]}>
              <View style={styles.metricIcon}>
                <Ionicons name="call" size={20} color={colors.primary} />
              </View>
              <Text style={styles.metricValue}>{stats.todaysCalls}</Text>
              <Text style={styles.metricLabel}>Dagens samtal</Text>
            </View>

            <View style={[styles.metric, { width: metricWidth }]}>
              <View style={styles.metricIcon}>
                <Ionicons
                  name="call-outline"
                  size={20}
                  color={colors.warning}
                />
              </View>
              <Text style={styles.metricValue}>{stats.missedCalls}</Text>
              <Text style={styles.metricLabel}>Missade samtal</Text>
            </View>

            <View style={[styles.metric, { width: metricWidth }]}>
              <View style={styles.metricIcon}>
                <Ionicons
                  name="chatbubble-ellipses"
                  size={20}
                  color={colors.success}
                />
              </View>
              <Text style={styles.metricValue}>{stats.aiResponseRate}%</Text>
              <Text style={styles.metricLabel}>AI svarstakt</Text>
              <Text style={styles.metricSubtext}>Automatiska svar</Text>
            </View>

            <View style={[styles.metric, { width: metricWidth }]}>
              <View style={styles.metricIcon}>
                <Ionicons name="alert-circle" size={20} color={colors.error} />
              </View>
              <Text style={styles.metricValue}>{stats.priorityAlerts}</Text>
              <Text style={styles.metricLabel}>Prioritetsvarningar</Text>
            </View>
          </View>
        </View>

        {/* Priority Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prioriterade åtgärder</Text>

          <View style={styles.actionsList}>
            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => console.log("Urgent calls")}
            >
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: colors.error + "15" },
                ]}
              >
                <Ionicons name="call" size={18} color={colors.error} />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Brådskande återsamtal</Text>
                <Text style={styles.actionCount}>{urgentCalls} st</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.muted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => console.log("New leads")}
            >
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: colors.success + "15" },
                ]}
              >
                <Ionicons name="trending-up" size={18} color={colors.success} />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Nya leads</Text>
                <Text style={styles.actionCount}>{newLeads} st</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.muted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => console.log("Support calls")}
            >
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: colors.primary + "15" },
                ]}
              >
                <Ionicons name="help-circle" size={18} color={colors.primary} />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Support ärenden</Text>
                <Text style={styles.actionCount}>{supportCalls} st</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.muted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => console.log("Blocked calls")}
            >
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: colors.muted + "15" },
                ]}
              >
                <Ionicons name="shield" size={18} color={colors.muted} />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Blockerade samtal</Text>
                <Text style={styles.actionCount}>{spamCalls} st</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.muted} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: "800",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    fontWeight: "500",
  },
  metricsSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.lg,
  },
  metric: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  metricValue: {
    fontSize: typography.sizes.xxl,
    fontWeight: "800",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  metricLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
  },
  metricSubtext: {
    fontSize: typography.sizes.xs,
    color: colors.muted,
    textAlign: "center",
    marginTop: spacing.xs,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.lg,
  },
  actionsList: {
    gap: spacing.sm,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  actionCount: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    fontWeight: "500",
  },
  bottomSpace: {
    height: spacing.xl,
  },
});
