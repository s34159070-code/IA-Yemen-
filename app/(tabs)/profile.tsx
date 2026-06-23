import { ScrollView, Text, View, TouchableOpacity, Pressable } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface UserStats {
  servicesUsed: number;
  totalRequests: number;
  savedTime: string;
}

const USER_STATS: UserStats = {
  servicesUsed: 8,
  totalRequests: 156,
  savedTime: "42 ساعة",
};

const MENU_ITEMS = [
  { id: "1", label: "الخدمات المستخدمة", icon: "📊" },
  { id: "2", label: "السجل", icon: "📜" },
  { id: "3", label: "الإعدادات", icon: "⚙️" },
  { id: "4", label: "المساعدة والدعم", icon: "💬" },
  { id: "5", label: "سياسة الخصوصية", icon: "🔒" },
  { id: "6", label: "تسجيل الخروج", icon: "🚪" },
];

export default function ProfileScreen() {
  const colors = useColors();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if (!isLoggedIn) {
    return (
      <ScreenContainer className="flex-1 justify-center items-center px-6">
        <View className="items-center gap-6">
          <Text className="text-3xl">👤</Text>
          <Text className="text-2xl font-bold text-foreground">تسجيل الدخول مطلوب</Text>
          <Text className="text-base text-muted text-center">
            يرجى تسجيل الدخول للوصول إلى ملفك الشخصي
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 32,
              paddingVertical: 12,
              borderRadius: 8,
            }}
          >
            <Text className="text-white font-semibold">تسجيل الدخول</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="bg-gradient-to-r from-primary to-cyan-500 px-6 pt-6 pb-8">
          <View className="flex-row items-center gap-4 mb-6">
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "rgba(255,255,255,0.2)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text className="text-4xl">👤</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-white">محمد أحمد</Text>
              <Text className="text-sm text-white opacity-80">user@iayemen.com</Text>
            </View>
          </View>
        </View>

        {/* Statistics */}
        <View className="px-6 py-6 gap-3">
          <Text className="text-lg font-semibold text-foreground mb-2">إحصائياتك</Text>
          <View className="flex-row gap-3">
            <View className="flex-1 bg-surface rounded-2xl p-4 border border-border">
              <Text className="text-sm text-muted mb-1">الخدمات المستخدمة</Text>
              <Text className="text-2xl font-bold text-foreground">{USER_STATS.servicesUsed}</Text>
            </View>
            <View className="flex-1 bg-surface rounded-2xl p-4 border border-border">
              <Text className="text-sm text-muted mb-1">إجمالي الطلبات</Text>
              <Text className="text-2xl font-bold text-foreground">{USER_STATS.totalRequests}</Text>
            </View>
          </View>
          <View className="bg-surface rounded-2xl p-4 border border-border">
            <Text className="text-sm text-muted mb-1">الوقت المحفوظ</Text>
            <Text className="text-2xl font-bold text-foreground">{USER_STATS.savedTime}</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-6 py-4 gap-2">
          {MENU_ITEMS.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.surface,
                  borderRadius: 12,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: colors.border,
                  opacity: pressed ? 0.7 : 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                },
              ]}
            >
              <View className="flex-row items-center gap-3">
                <Text className="text-2xl">{item.icon}</Text>
                <Text className="text-base font-medium text-foreground">{item.label}</Text>
              </View>
              <Text className="text-lg text-muted">›</Text>
            </Pressable>
          ))}
        </View>

        {/* Footer */}
        <View className="px-6 py-6 border-t border-border">
          <Text className="text-xs text-muted text-center">
            الإصدار 1.0.0{"\n"}تطبيق IA Yemen
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
