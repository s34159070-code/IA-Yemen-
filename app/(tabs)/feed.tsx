import { ScrollView, Text, View, TouchableOpacity, Pressable, FlatList } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
}

const POSTS: Post[] = [
  {
    id: "1",
    author: "محمد علي",
    avatar: "👨",
    content: "صباح الخير يا أصدقائي! كيف حالكم اليوم؟ 🌅",
    timestamp: "منذ ساعة",
    likes: 124,
    comments: 23,
    shares: 5,
    liked: false,
  },
  {
    id: "2",
    author: "فاطمة أحمد",
    avatar: "👩",
    content: "تم إطلاق مشروع جديد اليوم! شكراً لكل من ساعدني 🎉",
    timestamp: "منذ ساعتين",
    likes: 256,
    comments: 45,
    shares: 12,
    liked: false,
  },
  {
    id: "3",
    author: "علي محمود",
    avatar: "👨",
    content: "الطقس جميل جداً اليوم، هل تستمتعون به؟ ☀️",
    timestamp: "منذ 3 ساعات",
    likes: 89,
    comments: 15,
    shares: 3,
    liked: false,
  },
];

export default function FeedScreen() {
  const colors = useColors();
  const [posts, setPosts] = useState(POSTS);
  const [newPost, setNewPost] = useState("");

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const renderPost = ({ item }: { item: Post }) => (
    <View
      style={{
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingVertical: 12,
        paddingHorizontal: 16,
      }}
    >
      {/* Post Header */}
      <View className="flex-row items-center gap-3 mb-3">
        <Text className="text-3xl">{item.avatar}</Text>
        <View className="flex-1">
          <Text className="text-base font-semibold text-foreground">{item.author}</Text>
          <Text className="text-xs text-muted">{item.timestamp}</Text>
        </View>
        <Pressable>
          <Text className="text-xl">⋮</Text>
        </Pressable>
      </View>

      {/* Post Content */}
      <Text className="text-sm text-foreground mb-3 leading-relaxed">{item.content}</Text>

      {/* Post Actions */}
      <View
        className="flex-row justify-between border-t border-b"
        style={{
          borderTopColor: colors.border,
          borderBottomColor: colors.border,
          paddingVertical: 8,
        }}
      >
        <Pressable
          onPress={() => handleLike(item.id)}
          style={{ flex: 1, alignItems: "center", paddingVertical: 8 }}
        >
          <View className="flex-row items-center gap-2">
            <Text className="text-lg">{item.liked ? "❤️" : "🤍"}</Text>
            <Text className={`text-xs font-medium ${item.liked ? "text-error" : "text-muted"}`}>
              {item.likes}
            </Text>
          </View>
        </Pressable>

        <Pressable style={{ flex: 1, alignItems: "center", paddingVertical: 8 }}>
          <View className="flex-row items-center gap-2">
            <Text className="text-lg">💬</Text>
            <Text className="text-xs font-medium text-muted">{item.comments}</Text>
          </View>
        </Pressable>

        <Pressable style={{ flex: 1, alignItems: "center", paddingVertical: 8 }}>
          <View className="flex-row items-center gap-2">
            <Text className="text-lg">↗️</Text>
            <Text className="text-xs font-medium text-muted">{item.shares}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-gradient-to-r from-primary to-cyan-500 px-4 py-4">
          <Text className="text-2xl font-bold text-white">التغذية</Text>
        </View>

        {/* Create Post Section */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            padding: 16,
          }}
        >
          <View className="flex-row items-center gap-3 mb-3">
            <Text className="text-3xl">👤</Text>
            <Pressable
              style={{
                flex: 1,
                backgroundColor: colors.background,
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text className="text-sm text-muted">ماذا في بالك؟</Text>
            </Pressable>
          </View>
          <View className="flex-row gap-2 justify-end">
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
              }}
            >
              <Text className="text-white text-xs font-semibold">نشر</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Posts Feed */}
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ListEmptyComponent={
            <View className="items-center justify-center py-12">
              <Text className="text-3xl mb-2">📝</Text>
              <Text className="text-base font-semibold text-foreground">لا توجد منشورات</Text>
              <Text className="text-sm text-muted mt-1">كن أول من ينشر</Text>
            </View>
          }
        />
      </ScrollView>
    </ScreenContainer>
  );
}
