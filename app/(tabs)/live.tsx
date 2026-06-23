import { ScrollView, Text, View, TouchableOpacity, Pressable, FlatList, Image } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface LiveStream {
  id: string;
  title: string;
  streamer: string;
  avatar: string;
  viewers: number;
  thumbnail: string;
  category: string;
  isLive: boolean;
}

const LIVE_STREAMS: LiveStream[] = [
  {
    id: "1",
    title: "جلسة نقاش حول التكنولوجيا والابتكار",
    streamer: "محمد علي",
    avatar: "👨",
    viewers: 2450,
    thumbnail: "🎥",
    category: "تقنية",
    isLive: true,
  },
  {
    id: "2",
    title: "حفل موسيقي يمني تقليدي",
    streamer: "فاطمة أحمد",
    avatar: "👩",
    viewers: 1820,
    thumbnail: "🎵",
    category: "موسيقى",
    isLive: true,
  },
  {
    id: "3",
    title: "طبخ يمني تقليدي - الفطيرة",
    streamer: "سارة محمود",
    avatar: "👩",
    viewers: 3200,
    thumbnail: "🍳",
    category: "طبخ",
    isLive: true,
  },
  {
    id: "4",
    title: "ورشة عمل تصوير احترافي",
    streamer: "علي محمد",
    avatar: "👨",
    viewers: 1050,
    thumbnail: "📸",
    category: "تصوير",
    isLive: false,
  },
];

export default function LiveScreen() {
  const colors = useColors();
  const [streams, setStreams] = useState(LIVE_STREAMS);
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  const categories = ["الكل", "تقنية", "موسيقى", "طبخ", "تصوير", "رياضة", "تعليم"];

  const filteredStreams =
    selectedCategory === "الكل"
      ? streams
      : streams.filter((stream) => stream.category === selectedCategory);

  const renderStream = ({ item }: { item: LiveStream }) => (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: colors.surface,
          borderRadius: 12,
          marginBottom: 12,
          overflow: "hidden",
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      {/* Thumbnail */}
      <View
        style={{
          backgroundColor: colors.primary,
          height: 180,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Text className="text-6xl">{item.thumbnail}</Text>

        {/* Live Badge */}
        {item.isLive && (
          <View
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "#EF4444",
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 4,
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: "white",
              }}
            />
            <Text className="text-white text-xs font-bold">مباشر</Text>
          </View>
        )}

        {/* Viewers Count */}
        <View
          style={{
            position: "absolute",
            bottom: 8,
            left: 8,
            backgroundColor: "rgba(0,0,0,0.6)",
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 4,
          }}
        >
          <Text className="text-white text-xs font-semibold">
            👁️ {item.viewers.toLocaleString("ar")} مشاهد
          </Text>
        </View>
      </View>

      {/* Stream Info */}
      <View className="p-3">
        <Text className="text-base font-semibold text-foreground mb-2" numberOfLines={2}>
          {item.title}
        </Text>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Text className="text-2xl">{item.avatar}</Text>
            <View>
              <Text className="text-sm font-semibold text-foreground">{item.streamer}</Text>
              <Text className="text-xs text-muted">{item.category}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 6,
            }}
          >
            <Text className="text-white text-xs font-semibold">مشاهدة</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-gradient-to-r from-primary to-cyan-500 px-4 py-4">
          <Text className="text-2xl font-bold text-white mb-4">البث المباشر</Text>

          {/* Category Filter */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={{
                  backgroundColor:
                    selectedCategory === cat ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 20,
                  borderWidth: selectedCategory === cat ? 1 : 0,
                  borderColor: "white",
                }}
              >
                <Text className="text-white text-xs font-semibold">{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Streams List */}
        <View className="p-4">
          <FlatList
            data={filteredStreams}
            renderItem={renderStream}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ListEmptyComponent={
              <View className="items-center justify-center py-12">
                <Text className="text-3xl mb-2">📡</Text>
                <Text className="text-base font-semibold text-foreground">لا توجد بثوث مباشرة</Text>
                <Text className="text-sm text-muted mt-1">عد لاحقاً لمشاهدة البثوث الحية</Text>
              </View>
            }
          />
        </View>

        {/* Start Live Button */}
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
            <Text className="text-xl">🔴</Text>
            <Text className="text-white font-semibold">ابدأ بث مباشر</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
