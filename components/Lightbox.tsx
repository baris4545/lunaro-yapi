import React, { useMemo, useRef, useState } from "react";
import {
    FlatList,
    Image,
    Modal,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ViewToken,
    useWindowDimensions,
} from "react-native";

type Item = { id: string; image: any };

export function Lightbox({
  open,
  onClose,
  data,
  initialIndex,
}: {
  open: boolean;
  onClose: () => void;
  data: Item[];
  initialIndex: number;
}) {
  const { width, height } = useWindowDimensions();
  const topBarHeight = 64;

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const listRef = useRef<FlatList<Item>>(null);

  React.useEffect(() => {
    if (!open) return;
    setActiveIndex(initialIndex);
    requestAnimationFrame(() => {
      listRef.current?.scrollToIndex({ index: initialIndex, animated: false });
    });
  }, [open, initialIndex]);

  const viewabilityConfig = useMemo(
    () => ({ itemVisiblePercentThreshold: 60, minimumViewTime: 50 }),
    []
  );

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      const v = viewableItems.find((x) => x.isViewable);
      if (!v) return;
      const i = v.index ?? 0;
      if (typeof i === "number") setActiveIndex(i);
    }
  ).current;

  const sliderHeight = Math.max(320, height - topBarHeight);

  return (
    <Modal visible={open} animationType="fade" onRequestClose={onClose}>
      <SafeAreaView style={styles.modal}>
        <View style={[styles.modalTop, { height: topBarHeight }]}>
          <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={8}>
            <Text style={styles.closeText}>Kapat</Text>
          </Pressable>

          <View style={styles.counterPill}>
            <Text style={styles.counterText}>
              {activeIndex + 1} / {data.length}
            </Text>
          </View>
        </View>

        <FlatList
          ref={listRef}
          data={data}
          horizontal
          pagingEnabled
          snapToInterval={width}
          snapToAlignment="start"
          decelerationRate="fast"
          keyExtractor={(x) => x.id}
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1 }}
          renderItem={({ item }) => (
            <View style={{ width, height: sliderHeight }}>
              <Image source={item.image} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
            </View>
          )}
          getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
          onScrollToIndexFailed={({ index }) => {
            setTimeout(() => listRef.current?.scrollToIndex({ index, animated: false }), 50);
          }}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewableItemsChanged}
        />

        <View style={styles.modalBottom} pointerEvents="none">
          <View style={styles.dotsPill}>
            {data.map((_, i) => (
              <View key={i} style={[styles.dot, i === activeIndex ? styles.dotActive : null]} />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: { flex: 1, backgroundColor: "#0b0f14" },

  modalTop: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeBtn: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  closeText: { color: "rgba(255,255,255,0.90)", fontWeight: "900" },

  counterPill: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  counterText: { color: "rgba(255,255,255,0.90)", fontWeight: "900", letterSpacing: 0.4 },

  modalBottom: { position: "absolute", left: 0, right: 0, bottom: 14, alignItems: "center" },
  dotsPill: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  dot: { width: 8, height: 8, borderRadius: 99, backgroundColor: "rgba(255,255,255,0.25)", marginRight: 8 },
  dotActive: { backgroundColor: "white", width: 20 },
});
