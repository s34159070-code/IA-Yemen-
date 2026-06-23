import { ScrollView, Text, View, TouchableOpacity, Pressable, FlatList, TextInput } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface Product {
  id: string;
  name: string;
  seller: string;
  price: number;
  rating: number;
  reviews: number;
  icon: string;
  category: string;
  inStock: boolean;
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "قهوة يمنية أصلية",
    seller: "محل القهوة اليمنية",
    price: 45,
    rating: 4.8,
    reviews: 234,
    icon: "☕",
    category: "مشروبات",
    inStock: true,
  },
  {
    id: "2",
    name: "عسل يمني نقي",
    seller: "مزرعة النحل",
    price: 120,
    rating: 4.9,
    reviews: 456,
    icon: "🍯",
    category: "غذائي",
    inStock: true,
  },
  {
    id: "3",
    name: "ملابس تقليدية يمنية",
    seller: "متجر التراث",
    price: 180,
    rating: 4.6,
    reviews: 123,
    icon: "👗",
    category: "ملابس",
    inStock: true,
  },
  {
    id: "4",
    name: "حقيبة يدوية مصنوعة يدوياً",
    seller: "الحرفيين اليمنيين",
    price: 95,
    rating: 4.7,
    reviews: 89,
    icon: "👜",
    category: "حقائب",
    inStock: false,
  },
  {
    id: "5",
    name: "كتاب عن التراث اليمني",
    seller: "دار النشر",
    price: 35,
    rating: 4.5,
    reviews: 67,
    icon: "📚",
    category: "كتب",
    inStock: true,
  },
];

const CATEGORIES = ["الكل", "مشروبات", "غذائي", "ملابس", "حقائب", "كتب", "إلكترونيات"];

export default function StoreScreen() {
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [products, setProducts] = useState(PRODUCTS);

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "الكل" || product.category === selectedCategory) &&
      (product.name.includes(searchQuery) || product.seller.includes(searchQuery))
  );

  const renderProduct = ({ item }: { item: Product }) => (
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
      <View className="flex-row gap-3">
        {/* Product Icon */}
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 8,
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text className="text-4xl">{item.icon}</Text>
        </View>

        {/* Product Info */}
        <View className="flex-1">
          <Text className="text-base font-semibold text-foreground mb-1" numberOfLines={2}>
            {item.name}
          </Text>
          <Text className="text-xs text-muted mb-2">{item.seller}</Text>

          {/* Rating */}
          <View className="flex-row items-center gap-2 mb-2">
            <Text className="text-yellow-500">⭐ {item.rating}</Text>
            <Text className="text-xs text-muted">({item.reviews})</Text>
          </View>

          {/* Price and Stock */}
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold text-primary">${item.price}</Text>
            <View
              style={{
                backgroundColor: item.inStock ? colors.success : colors.error,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              <Text className="text-white text-xs font-semibold">
                {item.inStock ? "متوفر" : "غير متوفر"}
              </Text>
            </View>
          </View>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            width: 40,
            height: 40,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text className="text-lg">🛒</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-gradient-to-r from-primary to-cyan-500 px-4 py-4">
          <Text className="text-2xl font-bold text-white mb-4">المتجر</Text>

          {/* Search Bar */}
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 8,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text className="text-lg mr-2">🔍</Text>
            <TextInput
              placeholder="ابحث عن منتج..."
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

          {/* Category Filter */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            {CATEGORIES.map((cat) => (
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

        {/* Products List */}
        <View className="p-4">
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ListEmptyComponent={
              <View className="items-center justify-center py-12">
                <Text className="text-3xl mb-2">🛍️</Text>
                <Text className="text-base font-semibold text-foreground">لا توجد منتجات</Text>
                <Text className="text-sm text-muted mt-1">جرب البحث عن منتج آخر</Text>
              </View>
            }
          />
        </View>

        {/* Cart Button */}
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
            <Text className="text-lg">🛒</Text>
            <Text className="text-white font-semibold">عرض السلة (3)</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
