import { Link } from "expo-router";
import React, { useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";

type Item = { id: string; title: string; subtitle?: string; image: any };

export function HeroCarousel({ items }: { items: Item[] }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const height = isWide ? 520 : 420;

  const [index, setIndex] = useState(0);
  const ref = useRef<FlatList<Item>>(null);

  return (
    <View>
      <FlatList
        ref={ref}
        data={items}
        keyExtractor={(x) => x.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const i = Math.round(e.nativeEvent.contentOffset.x / width);
          setIndex(i);
        }}
        renderItem={({ item }) => (
          <View style={{ width }}>
    <View style={[styles.slideFallback, { height }]}>
      <View style={styles.overlay} />
      <View style={[styles.content, isWide && { paddingHorizontal: 48 }]}>
        <Text style={styles.kicker}>Lunaro Yapı</Text>
        <Text style={styles.title}>{item.title}</Text>
        {!!item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}

        <Link href="/projeler" asChild>
          <Pressable style={styles.btn}>
            <Text style={styles.btnText}>HEMEN İNCELE</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  </View>
        )}
      />

      {/* Basit dot indicator */}
      <View style={styles.dots}>
        {items.map((_, i) => (
          <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: { justifyContent: "flex-end" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.35)" },
  content: { padding: 16, paddingBottom: 28, gap: 8 },
  kicker: { color: "white", opacity: 0.85, letterSpacing: 2, fontSize: 12, textTransform: "uppercase" },
  title: { color: "white", fontSize: 34, fontWeight: "900", lineHeight: 40 },
  subtitle: { color: "white", opacity: 0.85, fontSize: 15, lineHeight: 22, maxWidth: 520 },
  btn: { marginTop: 10, alignSelf: "flex-start", backgroundColor: "white", paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 },
  btnText: { color: "#0b0f14", fontWeight: "900", letterSpacing: 1 },
  dots: { flexDirection: "row", gap: 8, justifyContent: "center", paddingTop: 10 },
  dot: { width: 8, height: 8, borderRadius: 99, backgroundColor: "rgba(255,255,255,0.35)" },
  dotActive: { backgroundColor: "white" },
  slideFallback: {
  justifyContent: "flex-end",
  backgroundColor: "rgba(255,255,255,0.06)",
  borderBottomWidth: 1,
  borderBottomColor: "rgba(255,255,255,0.10)",
},

});
