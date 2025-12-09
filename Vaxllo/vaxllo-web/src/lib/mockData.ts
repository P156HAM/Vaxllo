import type { Call, User } from "@/types";

export const mockUser: User = {
  id: "1",
  email: "demo@vaxllo.se",
  full_name: "Demo Användare",
  created_at: new Date().toISOString(),
};

// Generate recent dates (within last 7 days)
const now = new Date();
const getRecentDate = (daysAgo: number, hour: number = 10, minute: number = 0, second: number = 0) => {
  const date = new Date(now);
  date.setDate(date.getDate() - daysAgo);
  date.setHours(hour, minute, second, 0);
  return date;
};

export const mockCalls: Call[] = [
  {
    id: "1",
    phone_number: "+46701234567",
    caller_name: "Johan Andersson",
    duration: 120,
    transcript:
      "Hej, jag ringer angående den nya produktlanseringen. Vi behöver diskutera marknadsföringsstrategin för Q2.",
    conversation: [
      {
        role: "caller",
        content: "Hej, det är Johan från marknadsavdelningen.",
        timestamp: getRecentDate(1, 10, 0, 0).toISOString(),
      },
      {
        role: "ai",
        content: "Hej Johan! Hur kan jag hjälpa dig idag?",
        timestamp: getRecentDate(1, 10, 0, 2).toISOString(),
      },
      {
        role: "caller",
        content: "Jag ringer angående den nya produktlanseringen.",
        timestamp: getRecentDate(1, 10, 0, 5).toISOString(),
      },
      {
        role: "ai",
        content:
          "Jag förstår. Jag ska vidarebefordra detta till rätt person. Kan du berätta mer om vad du behöver hjälp med?",
        timestamp: getRecentDate(1, 10, 0, 8).toISOString(),
      },
    ],
    priority: "high",
    call_type: "viktigt",
    is_blocked: false,
    created_at: getRecentDate(1, 10, 0).toISOString(),
  },
  {
    id: "2",
    phone_number: "+46739876543",
    duration: 45,
    transcript:
      "Hej, jag är intresserad av era tjänster. Kan du berätta mer om era prisplaner?",
    conversation: [
      {
        role: "caller",
        content: "Hej, jag är intresserad av era tjänster.",
        timestamp: getRecentDate(2, 14, 30, 0).toISOString(),
      },
      {
        role: "ai",
        content:
          "Välkommen! Jag hjälper dig gärna med information om våra tjänster.",
        timestamp: getRecentDate(2, 14, 30, 3).toISOString(),
      },
      {
        role: "caller",
        content: "Kan du berätta mer om era prisplaner?",
        timestamp: getRecentDate(2, 14, 30, 6).toISOString(),
      },
      {
        role: "ai",
        content:
          "Absolut! Jag ska skicka dig information om våra prisplaner via e-post.",
        timestamp: getRecentDate(2, 14, 30, 9).toISOString(),
      },
    ],
    priority: "medium",
    call_type: "leads",
    is_blocked: false,
    created_at: getRecentDate(2, 14, 30).toISOString(),
  },
  {
    id: "3",
    phone_number: "+46762345678",
    caller_name: "Elvo",
    duration: 60,
    transcript:
      "Hej, det är Johan från Elvo. Vi vill höra om du är intresserad av våra tjänster.",
    conversation: [
      {
        role: "caller",
        content:
          "Hej, det är Johan från Elvo. Vi vill höra om du är intresserad av våra tjänster.",
        timestamp: getRecentDate(3, 15, 0, 0).toISOString(),
      },
      {
        role: "ai",
        content: "Hej Johan! Hur kan jag hjälpa dig idag?",
        timestamp: getRecentDate(3, 15, 0, 2).toISOString(),
      },
    ],
    priority: "low",
    call_type: "säljare",
    is_blocked: false,
    created_at: getRecentDate(3, 15, 0).toISOString(),
  },
  {
    id: "4",
    phone_number: "+46755666777",
    duration: 15,
    transcript: "Grattis! Du har vunnit en gratis semesterresa...",
    conversation: [
      {
        role: "caller",
        content: "Grattis! Du har vunnit en gratis semesterresa!",
        timestamp: getRecentDate(4, 9, 15, 0).toISOString(),
      },
      {
        role: "ai",
        content:
          "Detta verkar vara ett oönskat samtal. Jag markerar det som skräppost.",
        timestamp: getRecentDate(4, 9, 15, 2).toISOString(),
      },
    ],
    priority: "low",
    call_type: "spam",
    is_blocked: true,
    created_at: getRecentDate(4, 9, 15).toISOString(),
  },
  {
    id: "5",
    phone_number: "+46799888777",
    caller_name: "Supportteam",
    duration: 180,
    transcript:
      "Kritisk systemuppdatering krävs. Vänligen granska och godkänn ändringarna innan dagens slut.",
    conversation: [
      {
        role: "caller",
        content:
          "Hej, det gäller en kritisk systemuppdatering som behöver granskas.",
        timestamp: getRecentDate(0, 14, 0, 0).toISOString(),
      },
      {
        role: "ai",
        content:
          "Jag förstår. Jag ska vidarebefordra detta till systemadministratören omedelbart.",
        timestamp: getRecentDate(0, 14, 0, 3).toISOString(),
      },
      {
        role: "caller",
        content: "Tack, det är viktigt att detta görs innan dagens slut.",
        timestamp: getRecentDate(0, 14, 0, 6).toISOString(),
      },
      {
        role: "ai",
        content: "Absolut, jag markerar detta som brådskande.",
        timestamp: getRecentDate(0, 14, 0, 9).toISOString(),
      },
    ],
    priority: "high",
    call_type: "viktigt",
    is_blocked: false,
    created_at: getRecentDate(0, 14, 0).toISOString(),
  },
  {
    id: "6",
    phone_number: "+46701112233",
    caller_name: "Maria Larsson",
    duration: 95,
    transcript:
      "Jag behöver hjälp med min beställning. Den har inte kommit fram ännu.",
    conversation: [
      {
        role: "caller",
        content: "Hej, jag behöver hjälp med min beställning.",
        timestamp: getRecentDate(1, 11, 30, 0).toISOString(),
      },
      {
        role: "ai",
        content: "Hej! Jag hjälper dig gärna. Vad gäller det?",
        timestamp: getRecentDate(1, 11, 30, 2).toISOString(),
      },
      {
        role: "caller",
        content: "Min beställning har inte kommit fram ännu.",
        timestamp: getRecentDate(1, 11, 30, 5).toISOString(),
      },
      {
        role: "ai",
        content:
          "Jag ska kolla upp det åt dig. Kan du ge mig ditt ordernummer?",
        timestamp: getRecentDate(1, 11, 30, 8).toISOString(),
      },
    ],
    priority: "medium",
    call_type: "support",
    is_blocked: false,
    created_at: getRecentDate(1, 11, 30).toISOString(),
  },
  {
    id: "7",
    phone_number: "+46704445566",
    duration: 30,
    transcript: "Hej, jag undrar om ni har öppet på lördag?",
    conversation: [
      {
        role: "caller",
        content: "Hej, jag undrar om ni har öppet på lördag?",
        timestamp: getRecentDate(2, 9, 0, 0).toISOString(),
      },
      {
        role: "ai",
        content:
          "Hej! Ja, vi har öppet på lördag mellan 10:00 och 14:00. Kan jag hjälpa dig med något annat?",
        timestamp: getRecentDate(2, 9, 0, 3).toISOString(),
      },
    ],
    priority: "low",
    call_type: "normal",
    is_blocked: false,
    created_at: getRecentDate(2, 9, 0).toISOString(),
  },
  {
    id: "8",
    phone_number: "+46707778899",
    caller_name: "Tech Solutions AB",
    duration: 200,
    transcript:
      "Vi vill diskutera ett potentiellt samarbete gällande er IT-infrastruktur.",
    conversation: [
      {
        role: "caller",
        content:
          "Hej, vi vill diskutera ett potentiellt samarbete gällande er IT-infrastruktur.",
        timestamp: getRecentDate(3, 13, 0, 0).toISOString(),
      },
      {
        role: "ai",
        content:
          "Hej! Det låter intressant. Jag ska vidarebefordra detta till vår affärsutveckling.",
        timestamp: getRecentDate(3, 13, 0, 3).toISOString(),
      },
      {
        role: "caller",
        content:
          "Perfekt! Vi kan skicka över mer information via e-post om det passar.",
        timestamp: getRecentDate(3, 13, 0, 6).toISOString(),
      },
    ],
    priority: "medium",
    call_type: "leads",
    is_blocked: false,
    created_at: getRecentDate(3, 13, 0).toISOString(),
  },
  {
    id: "9",
    phone_number: "+46703334455",
    duration: 20,
    transcript: "Ring mig tillbaka så snart som möjligt!",
    conversation: [
      {
        role: "caller",
        content: "Ring mig tillbaka så snart som möjligt!",
        timestamp: getRecentDate(0, 8, 30, 0).toISOString(),
      },
      {
        role: "ai",
        content:
          "Jag har tagit emot ditt meddelande. Någon kommer att ringa dig tillbaka inom kort.",
        timestamp: getRecentDate(0, 8, 30, 2).toISOString(),
      },
    ],
    priority: "high",
    call_type: "viktigt",
    is_blocked: false,
    created_at: getRecentDate(0, 8, 30).toISOString(),
  },
  {
    id: "10",
    phone_number: "+46708889900",
    duration: 10,
    transcript: "Vill du köpa billiga lån? Ring nu!",
    conversation: [
      {
        role: "caller",
        content: "Vill du köpa billiga lån? Ring nu!",
        timestamp: getRecentDate(5, 16, 0, 0).toISOString(),
      },
      {
        role: "ai",
        content:
          "Detta verkar vara ett oönskat samtal. Jag markerar det som skräppost.",
        timestamp: getRecentDate(5, 16, 0, 2).toISOString(),
      },
    ],
    priority: "low",
    call_type: "spam",
    is_blocked: true,
    created_at: getRecentDate(5, 16, 0).toISOString(),
  },
];

export const getMockDashboardStats = () => {
  const today = new Date().toDateString();
  const todaysCalls = mockCalls.filter(
    (call) => new Date(call.created_at).toDateString() === today
  ).length;

  const missedCalls = mockCalls.filter(
    (call) => call.priority === "high" && !call.is_blocked
  ).length;

  const priorityAlerts = mockCalls.filter(
    (call) => call.call_type === "viktigt" || call.priority === "high"
  ).length;

  const callTypes = mockCalls.reduce(
    (acc, call) => {
      acc[call.call_type] = (acc[call.call_type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const totalDuration = mockCalls.reduce(
    (sum, call) => sum + call.duration,
    0
  );
  const avgCallDuration =
    mockCalls.length > 0 ? Math.round(totalDuration / mockCalls.length / 60) : 0;

  return {
    todaysCalls,
    missedCalls,
    aiResponseRate: 94,
    priorityAlerts,
    weeklyTrend: [12, 8, 15, 22, 18, 25, 19],
    callTypes,
    avgResponseTime: 2.3,
    avgCallDuration,
  };
};
