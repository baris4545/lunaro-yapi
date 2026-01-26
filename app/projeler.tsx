import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Linking,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ViewToken,
  useWindowDimensions,
} from "react-native";
import { SiteHeader } from "../components/SiteHeader";
import { EVRENOS_DIS, EVRENOS_IC } from "../data/evrenosPhotos";

type Photo = { id: string; src: any };
type TabKey = "dis" | "ic";

const FEATURES = [
  "Modern mimari anlayışıyla tasarlanmış özel villa projesi",
  "3+1 planlama, fonksiyonel ve ferah yaşam alanları",
  "120 m² net kullanım alanı",
  "Yüksek tavan ve galeri boşluğu sayesinde aydınlık ve geniş hacimler",
  "Her villaya özel yüzme havuzu",
  "Özel bahçe alanı ve mahremiyet odaklı yerleşim",
  "Akıllı ev sistemi altyapısı",
  "VRF klima sistemi",
  "Yerden ısıtma",
  "Kaliteli malzeme ve güçlü teknik altyapı",
  "Şehrin içinde, doğayla iç içe konum",
  "Hem oturum hem yatırım için uygun yapı",
];

const THEME = {
  bg: "#0b0f14",
  card: "rgba(255,255,255,0.04)",
  card2: "rgba(255,255,255,0.035)",
  border: "rgba(255,255,255,0.10)",
  border2: "rgba(255,255,255,0.08)",
  text: "#e5e7eb",
  text2: "rgba(229,231,235,0.72)",
  text3: "rgba(229,231,235,0.55)",
  pill: "rgba(255,255,255,0.06)",
  pillBorder: "rgba(255,255,255,0.12)",
};

export default function Projeler() {
  const { width, height } = useWindowDimensions();

  const isWide = width >= 980;
  const isTablet = width >= 720;
  const padX = isWide ? 48 : 16;
  const maxW = 1120;

  const [elevated, setElevated] = useState(false);

  const [tab, setTab] = useState<TabKey>("dis");
  const data = tab === "dis" ? EVRENOS_DIS : EVRENOS_IC;

  // Grid columns
  const numColumns = useMemo(() => {
    if (width >= 1200) return 5;
    if (width >= 980) return 4;
    if (width >= 720) return 3;
    if (width >= 420) return 2;
    return 1;
  }, [width]);

  const gap = 12;

  const containerWidth = Math.min(maxW, width - padX * 2);

  const itemWidth =
    numColumns === 1
      ? containerWidth
      : Math.floor((containerWidth - gap * (numColumns - 1)) / numColumns);

  const itemHeight = numColumns === 1 ? Math.round(itemWidth * 0.68) : itemWidth;

  // Lightbox
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const lightboxRef = useRef<FlatList<Photo>>(null);

  const openAt = (i: number) => {
    setActiveIndex(i);
    setOpen(true);
    requestAnimationFrame(() => {
      lightboxRef.current?.scrollToIndex({ index: i, animated: false });
    });
  };
  const close = () => setOpen(false);

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

  const topBarHeight = 64;
  const sliderHeight = Math.max(320, height - topBarHeight);

  // Konum
  const ADDRESS =
    "Manisa / Yunusemre / Muradiye Mahallesi, Evrenos Sk. No: 44-50";
  const MAP_URL =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(ADDRESS);
  const COORD = { latitude: 38.6655, longitude: 27.2773 };

  // columnWrapperStyle only when columns > 1
  const columnWrapperStyle = useMemo(() => {
    if (numColumns <= 1) return undefined;
    return {
      paddingHorizontal: padX,
      justifyContent: "center" as const,
    };
  }, [numColumns, padX]);

  const stats = useMemo(
    () => [
      { k: "Plan", v: "3+1", icon: "grid-outline" as const },
      { k: "Net Alan", v: "120 m²", icon: "expand-outline" as const },
      { k: "Isıtma", v: "Yerden", icon: "flame-outline" as const },
      { k: "Klima", v: "VRF", icon: "snow-outline" as const },
      { k: "Havuz", v: "Özel", icon: "water-outline" as const },
      { k: "Bahçe", v: "Müstakil", icon: "leaf-outline" as const },
      { k: "Tavan", v: "Yüksek", icon: "resize-outline" as const },
      { k: "Akıllı Ev", v: "Altyapı", icon: "hardware-chip-outline" as const },
    ],
    []
  );

  return (
    <View style={styles.page}>
      <FlatList
        onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          const y = e.nativeEvent.contentOffset.y;
          setElevated(y > 8);
        }}
        scrollEventThrottle={16}
        ListHeaderComponent={
          <>
            <SiteHeader elevated={elevated} />

            {/* HERO */}
            <View style={[styles.section, { paddingHorizontal: padX }]}>
              <View style={[styles.container, { maxWidth: maxW }]}>
                <View style={styles.heroCard}>
                  <View style={styles.heroTopRow}>
                    <View style={styles.kickerPill}>
                      <View style={styles.kickerDot} />
                      <Text style={styles.kicker}>PROJE</Text>
                    </View>

                    <View style={styles.heroBadges}>
                      <View style={styles.badge}>
                        <Ionicons
                          name="sparkles-outline"
                          size={14}
                          color="rgba(229,231,235,0.80)"
                        />
                        <Text style={styles.badgeText}>Modern Mimari</Text>
                      </View>
                      <View style={styles.badge}>
                        <Ionicons
                          name="shield-checkmark-outline"
                          size={14}
                          color="rgba(229,231,235,0.80)"
                        />
                        <Text style={styles.badgeText}>Premium İşçilik</Text>
                      </View>
                    </View>
                  </View>

                  <Text style={styles.h1}>Lunaro Evrenos</Text>
                  <Text style={styles.lead}>
                    Modern mimarisi, yüksek tavanlı ferah yaşam alanları ve her villaya özel
                    havuzuyla ayrıcalıklı bir yaşam sunar.
                  </Text>

                  {/* Tabs (segmented) */}
                  <View style={styles.segmentWrap}>
                    <Pressable
                      onPress={() => setTab("dis")}
                      style={[
                        styles.segmentBtn,
                        tab === "dis" && styles.segmentBtnActive,
                      ]}
                    >
                      <Ionicons
                        name="sunny-outline"
                        size={16}
                        color={
                          tab === "dis"
                            ? "rgba(11,15,20,0.95)"
                            : "rgba(229,231,235,0.75)"
                        }
                      />
                      <Text
                        style={[
                          styles.segmentText,
                          tab === "dis" && styles.segmentTextActive,
                        ]}
                      >
                        Dış Mekan
                      </Text>
                      <View
                        style={[
                          styles.countPill,
                          tab === "dis" && styles.countPillActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.countText,
                            tab === "dis" && styles.countTextActive,
                          ]}
                        >
                          {EVRENOS_DIS.length}
                        </Text>
                      </View>
                    </Pressable>

                    <Pressable
                      onPress={() => setTab("ic")}
                      style={[
                        styles.segmentBtn,
                        tab === "ic" && styles.segmentBtnActive,
                      ]}
                    >
                      <Ionicons
                        name="bed-outline"
                        size={16}
                        color={
                          tab === "ic"
                            ? "rgba(11,15,20,0.95)"
                            : "rgba(229,231,235,0.75)"
                        }
                      />
                      <Text
                        style={[
                          styles.segmentText,
                          tab === "ic" && styles.segmentTextActive,
                        ]}
                      >
                        İç Mekan
                      </Text>
                      <View
                        style={[
                          styles.countPill,
                          tab === "ic" && styles.countPillActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.countText,
                            tab === "ic" && styles.countTextActive,
                          ]}
                        >
                          {EVRENOS_IC.length}
                        </Text>
                      </View>
                    </Pressable>
                  </View>

                  
                </View>
              </View>
            </View>

            {/* Grid head */}
            <View style={[styles.section, { paddingHorizontal: padX, paddingTop: 8 }]}>
              <View style={[styles.container, { maxWidth: maxW }]}>
                <View style={styles.sectionHead}>
                  <View>
                    <Text style={styles.sectionTitle}>
                      {tab === "dis" ? "Dış Mekan Galerisi" : "İç Mekan Galerisi"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </>
        }
        data={data}
        key={numColumns}
        numColumns={numColumns}
        keyExtractor={(x) => x.id}
        contentContainerStyle={{ paddingBottom: 18 }}
        columnWrapperStyle={columnWrapperStyle}
        renderItem={({ item, index }) => {
          const isLastInRow = numColumns > 1 ? (index + 1) % numColumns === 0 : true;
          const wrapperStyle = numColumns === 1 ? styles.singleColWrap : styles.multiColWrap;

          return (
            <View style={[wrapperStyle, numColumns === 1 ? { paddingHorizontal: padX } : null]}>
              <Pressable
                onPress={() => openAt(index)}
                style={[
                  styles.thumbCard,
                  {
                    width: itemWidth,
                    height: itemHeight,
                    marginRight: numColumns > 1 && !isLastInRow ? gap : 0,
                    marginBottom: 12,
                  },
                ]}
              >
                <Image source={item.src} style={styles.thumb} resizeMode="cover" />
                <View style={[styles.thumbOverlay, { pointerEvents: "none" }]} />
                <View style={[styles.thumbCorner, { pointerEvents: "none" }]}>
                  <Ionicons name="expand-outline" size={16} color="rgba(229,231,235,0.92)" />
                </View>
              </Pressable>
            </View>
          );
        }}
        initialNumToRender={12}
        windowSize={8}
        removeClippedSubviews={Platform.OS !== "web"}
        maxToRenderPerBatch={12}
        updateCellsBatchingPeriod={50}
        ListFooterComponent={
          <>
            {/* STATS */}
            <View style={[styles.section, { paddingHorizontal: padX, paddingTop: 8 }]}>
              <View style={[styles.container, { maxWidth: maxW }]}>
                <View style={styles.blockCard}>
                  <View style={styles.blockHead}>
                    <View style={styles.rule} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.blockTitle}>Öne Çıkan Özellikler</Text>
                      <Text style={styles.blockLead}>
                        Projenin temel detayları (özet)
                      </Text>
                    </View>
                  </View>

                  <View style={styles.statsInner}>
                    {stats.map((x) => (
                      <View
                        key={x.k}
                        style={[
                          styles.statCard,
                          { flexBasis: isWide ? "23%" : isTablet ? "31%" : "48%" },
                        ]}
                      >
                        <View style={styles.statIcon}>
                          <Ionicons name={x.icon} size={18} color="rgba(229,231,235,0.90)" />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.statK}>{x.k}</Text>
                          <Text style={styles.statV}>{x.v}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>

            {/* DETAILS */}
            <View style={[styles.section, { paddingHorizontal: padX, paddingTop: 12 }]}>
              <View style={[styles.container, { maxWidth: maxW }]}>
                <View style={styles.blockCard}>
                  <View style={styles.blockHead}>
                    <View style={styles.rule} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.blockTitle}>Proje Detayları</Text>
                      <Text style={styles.blockLead}>
                        Konfor, mahremiyet ve modern mühendislik yaklaşımı.
                      </Text>
                    </View>
                  </View>

                  <View style={styles.featureList}>
                    {FEATURES.map((x) => (
                      <View key={x} style={styles.featureItem}>
                        <View style={styles.featureDot} />
                        <Text style={styles.featureText}>{x}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={{ marginTop: 14 }}>
                    <Text style={styles.paragraph}>
                      Modern mimarisi, yüksek tavanlı ferah yaşam alanları ve her villaya özel
                      havuzuyla ayrıcalıklı bir yaşam sunar.
                    </Text>

                    <Text style={styles.paragraph}>
                      Aile yaşamı düşünülerek tasarlanan bu özel villa projesi; geniş ve ferah
                      yaşam alanları, yüksek tavanlı planlaması ve her villaya özel bahçe ile
                      konforlu bir yaşam sunar.
                    </Text>

                    <Text style={styles.paragraphLast}>
                      Çocukların güvenle oynayabileceği alanlar, ailenizle keyifli zaman
                      geçirebileceğiniz özel havuzlar ve şehrin içinde doğayla iç içe bir yaşam
                      bir arada.
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* LOCATION */}
            <View style={[styles.section, { paddingHorizontal: padX, paddingTop: 12 }]}>
              <View style={[styles.container, { maxWidth: maxW }]}>
                <View style={styles.blockCard}>
                  <View style={styles.blockHead}>
                    <View style={styles.rule} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.blockTitle}>Konum</Text>
                      <Text style={styles.blockLead}>
                        Proje adresi ve harita bağlantısı.
                      </Text>
                    </View>
                  </View>

                  <View style={styles.locationBody}>
                    <View style={styles.locationLeft}>
                      <View style={styles.addrRow}>
                        <Text style={styles.addrK}>Adres</Text>
                        <Text style={styles.addrV}>{ADDRESS}</Text>
                      </View>

                      <View style={styles.btnRow}>
                        <Pressable onPress={() => Linking.openURL(MAP_URL)} style={styles.mapBtn}>
                          <Ionicons name="navigate-outline" size={18} color={THEME.bg} />
                          <Text style={styles.mapBtnText}>Google Maps’te Aç</Text>
                        </Pressable>
                      </View>
                    </View>

                    <Pressable onPress={() => Linking.openURL(MAP_URL)} style={styles.mapPreview}>
                      {Platform.OS === "web" ? (
                        <WebGoogleMapEmbed COORD={COORD} />
                      ) : (
                        <NativeMap COORD={COORD} ADDRESS={ADDRESS} />
                      )}

                      {Platform.OS === "web" ? (
                        <Pressable
                          style={StyleSheet.absoluteFillObject}
                          onPress={() => Linking.openURL(MAP_URL)}
                        />
                      ) : null}

                      <View style={[styles.mapHintBar, { pointerEvents: "none" }]}>
                        <Ionicons name="map-outline" size={16} color={THEME.text2} />
                        <Text style={styles.mapHintText}>Haritayı açmak için dokun</Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ height: 28 }} />
          </>
        }
      />

      {/* LIGHTBOX */}
      <Modal visible={open} animationType="fade" onRequestClose={close}>
        <SafeAreaView style={styles.modal}>
          <View style={[styles.modalTop, { height: topBarHeight }]}>
            <Pressable onPress={close} style={styles.closeBtn}>
              <Text style={styles.closeText}>Kapat</Text>
            </Pressable>

            <View style={styles.counterPill}>
              <Text style={styles.counterText}>
                {activeIndex + 1} / {data.length}
              </Text>
            </View>
          </View>

          <FlatList
            ref={lightboxRef}
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
                <Image
                  source={item.src}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                />
              </View>
            )}
            getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
            onScrollToIndexFailed={({ index }) => {
              setTimeout(() => {
                lightboxRef.current?.scrollToIndex({ index, animated: false });
              }, 50);
            }}
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={onViewableItemsChanged}
          />

          <View style={[styles.modalBottom, { pointerEvents: "none" }]}>
            <View style={styles.dotsPill}>
              {data.map((_, i) => (
                <View key={i} style={[styles.dot, i === activeIndex ? styles.dotActive : null]} />
              ))}
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

function WebGoogleMapEmbed({ COORD }: { COORD: { latitude: number; longitude: number } }) {
  const src =
    `https://www.google.com/maps?` +
    `q=${COORD.latitude},${COORD.longitude}` +
    `&z=16&output=embed&hl=tr`;
  // @ts-ignore
  return (
    // @ts-ignore
    <iframe
      title="map"
      src={src}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        border: 0,
        borderRadius: 18,
      }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}

function NativeMap({
  COORD,
  ADDRESS,
}: {
  COORD: { latitude: number; longitude: number };
  ADDRESS: string;
}) {
  const Maps = require("react-native-maps");
  const MapView = Maps.default;
  const Marker = Maps.Marker;
  const PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;

  return (
    <MapView
      style={StyleSheet.absoluteFillObject}
      provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
      initialRegion={{
        latitude: COORD.latitude,
        longitude: COORD.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      scrollEnabled={false}
      zoomEnabled={false}
      rotateEnabled={false}
      pitchEnabled={false}
    >
      <Marker coordinate={COORD} title="Lunaro Evrenos" description={ADDRESS} />
    </MapView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: THEME.bg },

  section: { paddingTop: 18 },
  container: { width: "100%", alignSelf: "center" },

  /* HERO */
  heroCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: THEME.border,
    backgroundColor: THEME.card,
    padding: 18,
    overflow: "hidden",
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
  },

  kickerPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: THEME.pillBorder,
    backgroundColor: THEME.pill,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  kickerDot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    backgroundColor: "rgba(229,231,235,0.90)",
  },
  kicker: {
    color: THEME.text2,
    fontWeight: "900",
    letterSpacing: 2.2,
    fontSize: 11,
  },

  heroBadges: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: THEME.pill,
    borderWidth: 1,
    borderColor: THEME.border2,
  },
  badgeText: { color: THEME.text2, fontWeight: "900", fontSize: 12 },

  h1: {
    marginTop: 14,
    fontSize: 38,
    lineHeight: 42,
    letterSpacing: -0.7,
    fontWeight: "900",
    color: THEME.text,
  },
  lead: {
    marginTop: 10,
    color: THEME.text2,
    fontSize: 15,
    lineHeight: 26,
    maxWidth: 860,
  },

  /* Segmented tabs */
  segmentWrap: {
    marginTop: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  segmentBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: THEME.border2,
    backgroundColor: THEME.card2,
  },
  segmentBtnActive: {
    backgroundColor: THEME.text,
    borderColor: THEME.text,
  },
  segmentText: { color: THEME.text2, fontWeight: "900" },
  segmentTextActive: { color: THEME.bg },

  countPill: {
    marginLeft: 2,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: THEME.border2,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  countPillActive: {
    borderColor: "rgba(11,15,20,0.22)",
    backgroundColor: "rgba(11,15,20,0.10)",
  },
  countText: { color: THEME.text2, fontWeight: "900", fontSize: 12 },
  countTextActive: { color: THEME.bg },

  hint: { marginTop: 10, color: THEME.text3, lineHeight: 20 },

  /* Section head */
  sectionHead: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
  },
  sectionTitle: { color: THEME.text, fontWeight: "900", fontSize: 14, letterSpacing: 0.3 },
  sectionSub: { marginTop: 6, color: THEME.text3 },

  rightHintPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: THEME.border2,
    backgroundColor: THEME.card2,
  },
  rightHintText: { color: THEME.text3, fontWeight: "900" },

  /* Grid */
  singleColWrap: { alignItems: "center" },
  multiColWrap: {},

  thumbCard: {
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: THEME.border2,
    backgroundColor: "rgba(255,255,255,0.02)",
    ...(Platform.OS === "web"
      ? { boxShadow: "0px 10px 22px rgba(0,0,0,0.35)" }
      : {
          shadowColor: "#000",
          shadowOpacity: 0.22,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 10 },
          elevation: 6,
        }),
  },
  thumb: { width: "100%", height: "100%" },
  thumbOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(11,15,20,0.10)",
  },
  thumbCorner: {
    position: "absolute",
    right: 10,
    bottom: 10,
    width: 34,
    height: 34,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    backgroundColor: "rgba(11,15,20,0.40)",
  },

  /* Blocks */
  blockCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: THEME.border,
    backgroundColor: THEME.card,
    padding: 18,
  },
  blockHead: { flexDirection: "row", gap: 14, alignItems: "flex-start" },
  rule: { width: 3, height: 52, borderRadius: 99, backgroundColor: "rgba(229,231,235,0.22)", marginTop: 2 },
  blockTitle: { color: THEME.text, fontWeight: "900", letterSpacing: 2.0, fontSize: 12 },
  blockLead: { marginTop: 8, color: THEME.text3, lineHeight: 22, maxWidth: 820 },

  /* Stats */
  statsInner: { marginTop: 14, width: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  statCard: {
    borderWidth: 1,
    borderColor: THEME.border2,
    backgroundColor: THEME.card2,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: THEME.border2,
    backgroundColor: THEME.pill,
  },
  statK: { color: THEME.text3, fontWeight: "900", fontSize: 11, letterSpacing: 1.2, textTransform: "uppercase" },
  statV: { marginTop: 4, color: THEME.text, fontWeight: "900", fontSize: 16 },

  /* Feature list */
  featureList: { marginTop: 16 },
  featureItem: { flexDirection: "row", alignItems: "flex-start", marginBottom: 10 },
  featureDot: { width: 8, height: 8, borderRadius: 99, marginTop: 7, marginRight: 10, backgroundColor: "rgba(229,231,235,0.35)" },
  featureText: { flex: 1, fontSize: 14.5, lineHeight: 22, color: THEME.text2 },

  paragraph: { fontSize: 15, lineHeight: 28, color: THEME.text2, marginBottom: 12 },
  paragraphLast: { fontSize: 15, lineHeight: 28, color: THEME.text2 },

  /* Location */
  locationBody: { marginTop: 14, flexDirection: "row", flexWrap: "wrap" },
  locationLeft: { flex: 1, minWidth: 260, marginRight: 14 },

  addrRow: { marginBottom: 10 },
  addrK: { fontSize: 12, fontWeight: "900", color: THEME.text3, letterSpacing: 1.1 },
  addrV: { marginTop: 6, color: THEME.text2, lineHeight: 22, maxWidth: 520 },

  btnRow: { marginTop: 10, flexDirection: "row", flexWrap: "wrap" },
  mapBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: THEME.text,
    backgroundColor: THEME.text,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginRight: 10,
    marginBottom: 10,
  },
  mapBtnText: { color: THEME.bg, fontWeight: "900", letterSpacing: 0.2 },

  mapPreview: {
    position: "relative",
    flex: 1,
    minWidth: 260,
    height: 220,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: THEME.border2,
    backgroundColor: "rgba(255,255,255,0.02)",
    overflow: "hidden",
    justifyContent: "flex-end",
    ...(Platform.OS === "web"
      ? { boxShadow: "0px 10px 22px rgba(0,0,0,0.35)" }
      : {
          shadowColor: "#000",
          shadowOpacity: 0.20,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 10 },
          elevation: 6,
        }),
  },

  mapHintBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "rgba(11,15,20,0.72)",
    borderTopWidth: 1,
    borderTopColor: THEME.border2,
  },
  mapHintText: { color: THEME.text2, fontWeight: "900" },

  /* Modal */
  modal: { flex: 1, backgroundColor: THEME.bg },
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
