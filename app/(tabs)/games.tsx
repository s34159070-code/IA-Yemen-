import { ScrollView, Text, View, TouchableOpacity, Pressable, FlatList } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface Game {
  id: string;
  name: string;
  description: string;
  icon: string;
  players: number;
  reward: number;
  difficulty: "سهل" | "متوسط" | "صعب";
  duration: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  participants: number;
  reward: number;
  deadline: string;
  progress: number;
}

const GAMES: Game[] = [
  {
    id: "1",
    name: "كويز الثقافة اليمنية",
    description: "اختبر معلوماتك عن التراث والثقافة اليمنية",
    icon: "🧠",
    players: 1250,
    reward: 100,
    difficulty: "متوسط",
    duration: "10 دقائق",
  },
  {
    id: "2",
    name: "تحدي الكلمات",
    description: "اجمع أكبر عدد من الكلمات العربية",
    icon: "📝",
    players: 2340,
    reward: 150,
    difficulty: "سهل",
    duration: "5 دقائق",
  },
  {
    id: "3",
    name: "لعبة الذاكرة",
    description: "تذكر مواقع الصور المختلفة",
    icon: "🎮",
    players: 890,
    reward: 200,
    difficulty: "صعب",
    duration: "15 دقائق",
  },
  {
    id: "4",
    name: "تحدي الرياضيات",
    description: "حل المسائل الرياضية بسرعة",
    icon: "🔢",
    players: 1560,
    reward: 120,
    difficulty: "متوسط",
    duration: "8 دقائق",
  },
];

const CHALLENGES: Challenge[] = [
  {
    id: "1",
    title: "تحدي الرقص اليمني",
    description: "شارك فيديو لك وأنت ترقص الرقصة اليمنية التقليدية",
    icon: "💃",
    participants: 3450,
    reward: 500,
    deadline: "ينتهي في 3 أيام",
    progress: 65,
  },
  {
    id: "2",
    title: "تحدي الطبخ",
    description: "اطبخ أشهر الأكلات اليمنية وشارك الصورة",
    icon: "👨‍🍳",
    participants: 2890,
    reward: 400,
    deadline: "ينتهي في 5 أيام",
    progress: 45,
  },
  {
    id: "3",
    title: "تحدي الفن والرسم",
    description: "ارسم شيء يعكس الهوية اليمنية",
    icon: "🎨",
    participants: 1200,
    reward: 300,
    deadline: "ينتهي في 7 أيام",
    progress: 30,
  },
];

export default function GamesScreen() {
  const colors = useColors();
  const [selectedTab, setSelectedTab] = useState<"games" | "challenges">("games");

  const renderGame = ({ item }: { item: Game }) => (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: colors.surface,
          borderRadius: 12,
          marginBottom: 12,
          padding: 12,
          opacity: pressed ? 0.7 : 1,
          borderWidth: 1,
          borderColor: colors.border,
        },
      ]}
    >
      <View className="flex-row items-start gap-3">
        {/* Game Icon */}
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 8,
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text className="text-3xl">{item.icon}</Text>
        </View>

        {/* Game Info */}
        <View className="flex-1">
          <Text className="text-base font-semibold text-foreground mb-1">{item.name}</Text>
          <Text className="text-xs text-muted mb-2">{item.description}</Text>

          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center gap-2">
              <Text className="text-xs">👥 {item.players}</Text>
              <Text className="text-xs">⏱️ {item.duration}</Text>
            </View>
            <View
              style={{
                backgroundColor:
                  item.difficulty === "سهل"
                    ? colors.success
                    : item.difficulty === "متوسط"
                      ? colors.warning
                      : colors.error,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              <Text className="text-white text-xs font-semibold">{item.difficulty}</Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-1">
              <Text className="text-lg">🏆</Text>
              <Text className="text-sm font-bold text-primary">{item.reward} نقطة</Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 6,
              }}
            >
              <Text className="text-white text-xs font-semibold">العب الآن</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Pressable>
  );

  const renderChallenge = ({ item }: { item: Challenge }) => (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: colors.surface,
          borderRadius: 12,
          marginBottom: 12,
          padding: 12,
          opacity: pressed ? 0.7 : 1,
          borderWidth: 1,
          borderColor: colors.border,
        },
      ]}
    >
      <View className="flex-row items-start gap-3">
        {/* Challenge Icon */}
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 8,
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text className="text-3xl">{item.icon}</Text>
        </View>

        {/* Challenge Info */}
        <View className="flex-1">
          <Text className="text-base font-semibold text-foreground mb-1">{item.title}</Text>
          <Text className="text-xs text-muted mb-2">{item.description}</Text>

          {/* Progress Bar */}
          <View
            style={{
              height: 6,
              backgroundColor: colors.border,
              borderRadius: 3,
              marginBottom: 8,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: "100%",
                width: `${item.progress}%`,
                backgroundColor: colors.primary,
              }}
            />
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Text className="text-xs">👥 {item.participants}</Text>
              <Text className="text-xs text-muted">{item.deadline}</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Text className="text-lg">🏆</Text>
              <Text className="text-sm font-bold text-primary">{item.reward}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-gradient-to-r from-primary to-cyan-500 px-4 py-4">
          <Text className="text-2xl font-bold text-white mb-4">الألعاب والتحديات</Text>

          {/* Tab Selector */}
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => setSelectedTab("games")}
              style={{
                flex: 1,
                backgroundColor:
                  selectedTab === "games" ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
                paddingVertical: 8,
                borderRadius: 8,
                alignItems: "center",
                borderWidth: selectedTab === "games" ? 1 : 0,
                borderColor: "white",
              }}
            >
              <Text className="text-white font-semibold">🎮 الألعاب</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTab("challenges")}
              style={{
                flex: 1,
                backgroundColor:
                  selectedTab === "challenges" ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
                paddingVertical: 8,
                borderRadius: 8,
                alignItems: "center",
                borderWidth: selectedTab === "challenges" ? 1 : 0,
                borderColor: "white",
              }}
            >
              <Text className="text-white font-semibold">🏆 التحديات</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View className="p-4">
          {selectedTab === "games" ? (
            <FlatList
              data={GAMES}
              renderItem={renderGame}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          ) : (
            <FlatList
              data={CHALLENGES}
              renderItem={renderChallenge}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          )}
        </View>

        {/* Leaderboard Button */}
        <View className="px-4 pb-6">
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              paddingVertical: 12,
              borderRadius: 12,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Text className="text-lg">🥇</Text>
            <Text className="text-white font-semibold">عرض لوحة الصدارة</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
