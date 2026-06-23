import { ScrollView, Text, View, TextInput, Pressable, FlatList } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

const CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    name: "محمد علي",
    avatar: "👨",
    lastMessage: "كيف حالك؟",
    timestamp: "منذ 5 دقائق",
    unread: 2,
  },
  {
    id: "2",
    name: "فاطمة أحمد",
    avatar: "👩",
    lastMessage: "شكراً على المساعدة",
    timestamp: "منذ ساعة",
    unread: 0,
  },
  {
    id: "3",
    name: "علي محمود",
    avatar: "👨",
    lastMessage: "هل تريد أن نلتقي غداً؟",
    timestamp: "منذ ساعتين",
    unread: 1,
  },
  {
    id: "4",
    name: "سارة عمر",
    avatar: "👩",
    lastMessage: "رائع! شكراً لك",
    timestamp: "منذ 3 ساعات",
    unread: 0,
  },
];

export default function MessagesScreen() {
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState(CONVERSATIONS);

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.includes(searchQuery) || conv.lastMessage.includes(searchQuery)
  );

  const renderConversation = ({ item }: { item: Conversation }) => (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          paddingVertical: 12,
          paddingHorizontal: 16,
          opacity: pressed ? 0.7 : 1,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        },
      ]}
    >
      {/* Avatar */}
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: colors.primary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text className="text-2xl">{item.avatar}</Text>
      </View>

      {/* Message Info */}
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-base font-semibold text-foreground">{item.name}</Text>
          <Text className="text-xs text-muted">{item.timestamp}</Text>
        </View>
        <Text className="text-sm text-muted" numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>

      {/* Unread Badge */}
      {item.unread > 0 && (
        <View
          style={{
            backgroundColor: colors.primary,
            borderRadius: 12,
            width: 24,
            height: 24,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text className="text-white text-xs font-bold">{item.unread}</Text>
        </View>
      )}
    </Pressable>
  );

  return (
    <ScreenContainer className="p-0">
      <View className="flex-1">
        {/* Header */}
        <View className="bg-gradient-to-r from-primary to-cyan-500 px-4 py-4">
          <Text className="text-2xl font-bold text-white mb-4">الرسائل</Text>

          {/* Search Bar */}
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 8,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text className="text-lg mr-2">🔍</Text>
            <TextInput
              placeholder="ابحث عن محادثة..."
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

        {/* Conversations List */}
        <FlatList
          data={filteredConversations}
          renderItem={renderConversation}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ListEmptyComponent={
            <View className="items-center justify-center py-12">
              <Text className="text-3xl mb-2">💬</Text>
              <Text className="text-base font-semibold text-foreground">لا توجد محادثات</Text>
              <Text className="text-sm text-muted mt-1">ابدأ محادثة جديدة</Text>
            </View>
          }
        />

        {/* Floating Action Button */}
        <Pressable
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text className="text-2xl">✏️</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}
