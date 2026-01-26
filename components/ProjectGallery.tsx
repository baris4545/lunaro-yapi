import React, { useMemo } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";

type Item = { id: string; image: any };

export function ProjectGallery({
  items,
  onPressItem,
}: {
  items: Item[];
  onPressItem?: (index: number) => void;
}) {
  const { width } = useWindowDimensions();

  // Kart boyutu (premium görünsün)
  const cardW = Math.min(360, Math.max(260, Math.floor(width * 0.78)));
  const cardH = Math.round(cardW * 0.62);
  const gap = 14;

  const snap = useMemo(() => cardW + gap, [cardW]);

  return (
    <View style={styles.wrap}>
      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(x) => x.id}
        contentContainerStyle={[styles.list, { gap }]}
        snapToInterval={snap}
        snapToAlignment="start"
        decelerationRate="fast"
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => onPressItem?.(index)}
            style={[styles.card, { width: cardW, height: cardH }]}
          >
            <Image source={item.image} style={styles.img} resizeMode="cover" />
            <View style={styles.gloss} pointerEvents="none" />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingTop: 10, paddingBottom: 10 },
  list: { paddingHorizontal: 16 },

  card: {
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  img: { width: "100%", height: "100%" },

  gloss: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 70,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
});
