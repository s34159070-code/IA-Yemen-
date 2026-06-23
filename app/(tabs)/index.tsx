import { ScrollView, Text, View, TouchableOpacity, Pressable } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface User {
  name: string;
  username: string;
  followers: number;
  following: number;
  posts: number;
}

const CURRENT_USER: User = {
  name: "محمد أحمد",
  username: "@mohammedahmed",
  followers: 1250,
  following: 340,
  posts: 45,
};

export default function HomeScreen() {
  const colors = useColors();

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="bg-gradient-to-r from-primary to-cyan-500 px-6 pt-6 pb-8">
          <Text className="text-3xl font-bold text-white mb-2">Friendly Robot</Text>
          <Text className="text-base text-white opacity-90">
            تطبيق التواصل الاجتماعي اليمني
          </Text>
        </View>

        {/* Quick Stats */}
        <View className="px-6 py-6 gap-4">
          <Text className="text-lg font-semibold text-foreground">إحصائياتك</Text>
          <View className="flex-row gap-3">
            <View className="flex-1 bg-surface rounded-2xl p-4 border border-border">
              <Text className="text-sm text-muted mb-1">المتابعون</Text>
              <Text className="text-2xl font-bold text-foreground">{CURRENT_USER.followers}</Text>
            </View>
            <View className="flex-1 bg-surface rounded-2xl p-4 border border-border">
              <Text className="text-sm text-muted mb-1">المتابعة</Text>
              <Text className="text-2xl font-bold text-foreground">{CURRENT_USER.following}</Text>
            </View>
            <View className="flex-1 bg-surface rounded-2xl p-4 border border-border">
              <Text className="text-sm text-muted mb-1">المنشورات</Text>
              <Text className="text-2xl font-bold text-foreground">{CURRENT_USER.posts}</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 py-4 gap-3">
          <Text className="text-lg font-semibold text-foreground">الإجراءات السريعة</Text>
          <View className="flex-row gap-3">
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: colors.primary,
                borderRadius: 12,
                paddingVertical: 12,
                alignItems: "center",
              }}
            >
              <Text className="text-white font-semibold">📝 منشور جديد</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: colors.surface,
                borderRadius: 12,
                paddingVertical: 12,
                alignItems: "center",
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text className="text-foreground font-semibold">👥 اكتشف</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Trending Section */}
        <View className="px-6 py-6 border-t" style={{ borderTopColor: colors.border }}>
          <Text className="text-lg font-semibold text-foreground mb-3">التريندات</Text>
          <View className="gap-2">
            {["#اليمن", "#تقنية", "#ثقافة"].map((trend, idx) => (
              <Pressable
                key={idx}
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: 12,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text className="text-base font-semibold text-foreground">{trend}</Text>
                <Text className="text-xs text-muted mt-1">12.5K منشور</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View className="px-6 py-6 border-t" style={{ borderTopColor: colors.border }}>
          <Text className="text-xs text-muted text-center">
            Friendly Robot © 2026{"\n"}تطبيق التواصل الاجتماعي اليمني
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
