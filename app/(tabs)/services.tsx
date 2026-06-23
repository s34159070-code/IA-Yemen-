import { ScrollView, Text, View, TextInput, Pressable, FlatList } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  rating: number;
  price: string;
}

const ALL_SERVICES: Service[] = [
  {
    id: "1",
    name: "معالج النصوص",
    description: "معالجة وتحليل النصوص باستخدام الذكاء الاصطناعي",
    icon: "📝",
    category: "معالجة اللغات",
    rating: 4.8,
    price: "مجاني",
  },
  {
    id: "2",
    name: "محلل الصور",
    description: "تحليل وفهم محتوى الصور تلقائياً",
    icon: "🖼️",
    category: "الرؤية الحاسوبية",
    rating: 4.6,
    price: "مجاني",
  },
  {
    id: "3",
    name: "مساعد الكتابة",
    description: "تحسين وتصحيح النصوص والمحتوى",
    icon: "✍️",
    category: "كتابة المحتوى",
    rating: 4.9,
    price: "9.99 ريال",
  },
  {
    id: "4",
    name: "مترجم ذكي",
    description: "ترجمة فورية بين لغات متعددة",
    icon: "🌐",
    category: "الترجمة",
    rating: 4.7,
    price: "مجاني",
  },
  {
    id: "5",
    name: "محلل البيانات",
    description: "تحليل متقدم للبيانات والإحصائيات",
    icon: "📊",
    category: "معالجة اللغات",
    rating: 4.5,
    price: "19.99 ريال",
  },
  {
    id: "6",
    name: "منشئ المحتوى",
    description: "إنشاء محتوى فريد وجذاب تلقائياً",
    icon: "🎨",
    category: "كتابة المحتوى",
    rating: 4.8,
    price: "14.99 ريال",
  },
];

const CATEGORIES = ["الكل", "معالجة اللغات", "الرؤية الحاسوبية", "كتابة المحتوى", "الترجمة"];

export default function ServicesScreen() {
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  const filteredServices = ALL_SERVICES.filter((service) => {
    const matchesSearch =
      service.name.includes(searchQuery) || service.description.includes(searchQuery);
    const matchesCategory =
      selectedCategory === "الكل" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderServiceCard = ({ item }: { item: Service }) => (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: colors.surface,
          borderRadius: 16,
          padding: 16,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: colors.border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View className="flex-row items-start gap-3 mb-3">
        <Text className="text-3xl">{item.icon}</Text>
        <View className="flex-1">
          <Text className="text-base font-semibold text-foreground">{item.name}</Text>
          <Text className="text-xs text-primary font-medium mt-1">{item.category}</Text>
        </View>
      </View>
      <Text className="text-sm text-muted mb-3">{item.description}</Text>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1">
          <Text className="text-yellow-500">⭐</Text>
          <Text className="text-sm font-semibold text-foreground">{item.rating}</Text>
        </View>
        <Text className="text-sm font-bold text-primary">{item.price}</Text>
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer className="p-0">
      <View className="flex-1">
        {/* Header */}
        <View className="bg-gradient-to-r from-primary to-cyan-500 px-6 pt-6 pb-4">
          <Text className="text-2xl font-bold text-white mb-4">جميع الخدمات</Text>

          {/* Search Bar */}
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 8,
              marginBottom: 12,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text className="text-lg mr-2">🔍</Text>
            <TextInput
              placeholder="ابحث عن خدمة..."
              placeholderTextColor="rgba(255,255,255,0.6)"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{
                flex: 1,
                color: "white",
                fontSize: 14,
              }}
            />
          </View>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12, gap: 8 }}
          style={{ borderBottomWidth: 1, borderBottomColor: colors.border }}
        >
          {CATEGORIES.map((category) => (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={({ pressed }) => [
                {
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  backgroundColor:
                    selectedCategory === category ? colors.primary : colors.surface,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text
                className={
                  selectedCategory === category
                    ? "text-white font-semibold"
                    : "text-foreground font-medium"
                }
              >
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Services List */}
        <FlatList
          data={filteredServices}
          renderItem={renderServiceCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          scrollEnabled={false}
          ListEmptyComponent={
            <View className="items-center justify-center py-12">
              <Text className="text-3xl mb-2">🔍</Text>
              <Text className="text-base font-semibold text-foreground">لا توجد خدمات</Text>
              <Text className="text-sm text-muted mt-1">حاول البحث عن شيء آخر</Text>
            </View>
          }
        />
      </View>
    </ScreenContainer>
  );
}
