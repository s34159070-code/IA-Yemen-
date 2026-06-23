import { ScrollView, Text, View, TouchableOpacity, Pressable, FlatList } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  relevance: number;
  reason: string;
}

const RECOMMENDATIONS: Recommendation[] = [
  {
    id: "1",
    title: "أفضل الكتاب الجديدة عن التراث اليمني",
    description: "مجموعة من أفضل الكتب التي تتحدث عن الثقافة والتراث اليمني",
    category: "كتب",
    icon: "📚",
    relevance: 95,
    reason: "بناءً على اهتمامك بالثقافة اليمنية",
  },
  {
    id: "2",
    title: "مستخدمون قد تهتم بمتابعتهم",
    description: "أشخاص يشاركون نفس اهتماماتك",
    category: "متابعة",
    icon: "👥",
    relevance: 88,
    reason: "بناءً على الأشخاص الذين تتابعهم",
  },
  {
    id: "3",
    title: "تحديات جديدة في مجال الفن",
    description: "تحديات فنية مثيرة قد تعجبك",
    category: "تحديات",
    icon: "🎨",
    relevance: 82,
    reason: "بناءً على مشاركتك السابقة في التحديات",
  },
  {
    id: "4",
    title: "منتجات يمنية حصرية",
    description: "منتجات تقليدية يمنية عالية الجودة",
    category: "متجر",
    icon: "🛍️",
    relevance: 90,
    reason: "بناءً على عمليات الشراء السابقة",
  },
  {
    id: "5",
    title: "مجموعات اهتمام جديدة",
    description: "انضم إلى مجموعات تشاركك نفس الاهتمامات",
    category: "مجموعات",
    icon: "👫",
    relevance: 75,
    reason: "بناءً على المنشورات التي تعجبك",
  },
];

export default function DiscoverScreen() {
  const colors = useColors();
  const [recommendations, setRecommendations] = useState(RECOMMENDATIONS);

  const renderRecommendation = ({ item }: { item: Recommendation }) => (
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
        {/* Icon */}
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

        {/* Content */}
        <View className="flex-1">
          <View className="flex-row items-start justify-between mb-1">
            <Text className="text-base font-semibold text-foreground flex-1">{item.title}</Text>
            <View
              style={{
                backgroundColor: colors.primary,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              <Text className="text-white text-xs font-bold">{item.relevance}%</Text>
            </View>
          </View>

          <Text className="text-xs text-muted mb-2">{item.description}</Text>

          <View className="flex-row items-center justify-between">
            <Text className="text-xs text-muted italic">💡 {item.reason}</Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 6,
              }}
            >
              <Text className="text-white text-xs font-semibold">اكتشف</Text>
            </TouchableOpacity>
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
          <Text className="text-2xl font-bold text-white mb-2">اكتشف</Text>
          <Text className="text-sm text-white opacity-90">
            توصيات ذكية مخصصة لك بناءً على اهتماماتك
          </Text>
        </View>

        {/* AI Info Section */}
        <View className="px-4 py-4 border-b" style={{ borderBottomColor: colors.border }}>
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              padding: 12,
              borderWidth: 1,
              borderColor: colors.primary,
            }}
          >
            <View className="flex-row items-start gap-2">
              <Text className="text-2xl">🤖</Text>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground mb-1">
                  توصيات مدعومة بـ AI
                </Text>
                <Text className="text-xs text-muted">
                  نستخدم تقنيات الذكاء الاصطناعي لتقديم توصيات شخصية تناسب اهتماماتك
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recommendations List */}
        <View className="p-4">
          <FlatList
            data={recommendations}
            renderItem={renderRecommendation}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ListEmptyComponent={
              <View className="items-center justify-center py-12">
                <Text className="text-3xl mb-2">🔍</Text>
                <Text className="text-base font-semibold text-foreground">لا توجد توصيات</Text>
                <Text className="text-sm text-muted mt-1">ستظهر التوصيات قريباً</Text>
              </View>
            }
          />
        </View>

        {/* Refresh Button */}
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
            <Text className="text-lg">🔄</Text>
            <Text className="text-white font-semibold">تحديث التوصيات</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
