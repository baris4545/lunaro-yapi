import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { AppIcon } from "../components/AppIcon";
import { Lightbox } from "../components/Lightbox";
import { ProjectGallery } from "../components/ProjectGallery";
import { SiteHeader } from "../components/SiteHeader";

const EVRENOS_IMAGES = [
  { id: "1", image: require("../assets/evrenos/evrenos-1.jpg") },
  { id: "2", image: require("../assets/evrenos/evrenos-2.jpg") },
  { id: "3", image: require("../assets/evrenos/evrenos-3.jpg") },
  { id: "4", image: require("../assets/evrenos/evrenos-4.jpg") },
];

export default function Home() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const isWide = width >= 980;
  const isTablet = width >= 720;
  const isVeryWide = width >= 1600;

  const padX = isWide ? 48 : 16;
  const maxW = isVeryWide ? 1600 : 1120;

  const responsiveStyles = useMemo(() => {
    return {
      h1: { fontSize: isVeryWide ? 56 : isWide ? 44 : isTablet ? 36 : 28 },
      lead: { maxWidth: isVeryWide ? 1100 : isWide ? 860 : isTablet ? 560 : 360 },
      aboutTextMaxWidth: isVeryWide ? 1100 : isWide ? 860 : 680,
    } as const;
  }, [isWide, isTablet, isVeryWide]);

  const [elevated, setElevated] = useState(false);

  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);

  const openGallery = (index = 0) => {
    setLbIndex(index);
    setLbOpen(true);
  };

  return (
    <>
      <ScrollView
        style={styles.page}
        stickyHeaderIndices={[0]}
        onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          const y = e.nativeEvent.contentOffset.y;
          setElevated(y > 8);
        }}
        scrollEventThrottle={16}
      >
        <SiteHeader elevated={elevated} />

        {/* HERO */}
        <View style={[styles.section, { paddingHorizontal: padX }]}>
          <View style={[styles.container, { maxWidth: maxW }]}>
            <View style={styles.heroCard}>
              <View pointerEvents="none" style={styles.heroGlowA} />
              <View pointerEvents="none" style={styles.heroGlowB} />
              <View pointerEvents="none" style={styles.heroTopHighlight} />

              <View style={styles.heroTopRow}>
                <View style={styles.kickerPill}>
                  <View style={styles.kickerDot} />
                  <Text style={styles.kicker}>VİLLA PROJESİ</Text>
                </View>

                <View style={styles.heroBadges}>
                  <View style={[styles.badge, styles.mr8, styles.mb8]}>
                    <AppIcon name="sparkles" size={14} color="rgba(229,231,235,0.82)" />
                    <Text style={styles.badgeText}>Modern Mimari</Text>
                  </View>

                  <View style={[styles.badge, styles.mb8]}>
                    <AppIcon name="shield" size={14} color="rgba(229,231,235,0.82)" />
                    <Text style={styles.badgeText}>Premium İşçilik</Text>
                  </View>
                </View>
              </View>

              <Text style={[styles.h1, responsiveStyles.h1]}>Lunaro Evrenos</Text>
              <Text style={[styles.lead, responsiveStyles.lead]}>
                Ferah yaşam alanları ve güçlü teknik altyapıyla; modern, güvenli ve değerli bir yaşam
                deneyimi.
              </Text>

              <View style={styles.ctaRow}>
                <Pressable onPress={() => router.push("/projeler")} style={styles.primaryBtn}>
                  <AppIcon name="images" size={18} color="#0b0f14" />
                  <Text style={styles.primaryText}>Projeleri İncele</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/* GALLERY HEAD */}
        <View style={[styles.sectionTight, { paddingHorizontal: padX }]}>
          <View style={[styles.container, { maxWidth: maxW }]}>
            <View style={styles.sectionHead}>
              <View style={{ flex: 1, minWidth: 220 }}>
                <View style={styles.sectionCapRow}>
                  <View style={styles.sectionChip}>
                    <AppIcon name="images" size={14} color="rgba(229,231,235,0.72)" />
                    <Text style={styles.sectionChipText}>GALERİ</Text>
                  </View>
                </View>

                <Text style={styles.sectionTitle}>Öne Çıkan Görseller</Text>
              </View>

              <Pressable onPress={() => router.push("/projeler")} style={styles.linkBtn}>
                <Text style={styles.linkText}>Tüm Galeri</Text>
                <AppIcon name="chevron-right" size={16} color="rgba(229,231,235,0.7)" />
              </Pressable>
            </View>
          </View>
        </View>

        <ProjectGallery items={EVRENOS_IMAGES} onPressItem={(i) => openGallery(i)} />

        {/* ABOUT */}
        <View style={[styles.section, { paddingHorizontal: padX }]}>
          <View style={[styles.container, { maxWidth: maxW }]}>
            <View style={styles.aboutCard}>
              <View pointerEvents="none" style={styles.aboutGlow} />

              <View style={styles.aboutHead}>
                <View style={styles.rule} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.aboutTitle}>Lunaro Yapı</Text>
                  <Text style={[styles.aboutLead, { maxWidth: responsiveStyles.aboutTextMaxWidth }]}>
                    Güvenilir yapılar, doğru lokasyonlar ve modern yaşam anlayışıyla geleceğe değer katan projeler.
                  </Text>
                </View>
              </View>

              <View style={{ marginTop: 14 }}>
                <Text style={[styles.aboutText, { maxWidth: responsiveStyles.aboutTextMaxWidth }]}>
                  Yıllara dayanan sektör tecrübesiyle konut üretimi alanında faaliyet gösteren firmamız, modern mimari
                  anlayışı ve kaliteli yapı standartlarını temel alarak projeler geliştirmektedir. Amacımız; sadece konut
                  değil, uzun yıllar güvenle yaşanabilecek, değerini koruyan yaşam alanları üretmektir.
                </Text>

                <Text style={[styles.aboutText, { maxWidth: responsiveStyles.aboutTextMaxWidth }]}>
                  Projelerimizde fonksiyonel planlama, kaliteli malzeme kullanımı ve güçlü teknik altyapı önceliğimizdir.
                  Yüksek tavanlı, ferah yaşam alanları; akıllı ev sistemleri, yerden ısıtma ve çağdaş mühendislik
                  çözümleriyle desteklenmektedir.
                </Text>

                <Text style={[styles.aboutText, { maxWidth: responsiveStyles.aboutTextMaxWidth }]}>
                  Her projede aile yaşamına uygun, konforlu ve güvenli mekânlar oluşturmayı hedeflerken; yatırım açısından
                  da sürdürülebilir ve değer kazanan yapılar inşa etmeye özen gösteriyoruz. Planlama aşamasından teslim
                  sürecine kadar şeffaf, ulaşılabilir ve çözüm odaklı bir yaklaşım benimsiyoruz.
                </Text>

                <Text
                  style={[
                    styles.aboutText,
                    styles.aboutTextLast,
                    { maxWidth: responsiveStyles.aboutTextMaxWidth },
                  ]}
                >
                  Güvenilir yapılar, doğru lokasyonlar ve modern yaşam anlayışıyla geleceğe değer katan projeler üretmeye
                  devam ediyoruz.
                </Text>
              </View>

              <View style={styles.aboutCtaRow}>
                <Pressable onPress={() => router.push("/iletisim")} style={styles.aboutCta}>
                  <Text style={styles.aboutCtaText}>İletişime Geç</Text>
                  <AppIcon name="arrow-right" size={16} color="#0b0f14" />
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/* FOOTER */}
        <View style={[styles.footer, { paddingHorizontal: padX }]}>
          <View style={[styles.container, { maxWidth: maxW }]}>
            <View style={styles.footerTop}>
              <View>
                <Text style={styles.footerBrand}>LUNARO</Text>
                <Text style={styles.footerSub}>Yapı</Text>
              </View>

              <View style={styles.footerLinks}>
                <Pressable onPress={() => router.push("/projeler")} style={styles.footerLinkBtn}>
                  <Text style={styles.footerLink}>Projeler</Text>
                </Pressable>
                <Pressable onPress={() => router.push("/iletisim")} style={styles.footerLinkBtn}>
                  <Text style={styles.footerLink}>İletişim</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.footerDivider} />

            <Text style={styles.footerText}>
              © {new Date().getFullYear()} Lunaro Yapı • Tüm hakları saklıdır.
            </Text>
          </View>
        </View>

        <View style={{ height: 26 }} />
      </ScrollView>

      <Lightbox
        open={lbOpen}
        onClose={() => setLbOpen(false)}
        data={EVRENOS_IMAGES}
        initialIndex={lbIndex}
      />
    </>
  );
}

const styles = StyleSheet.create({
  page: { backgroundColor: "#0b0f14" },

  section: { paddingTop: 20 },
  sectionTight: { paddingTop: 10 },
  container: { width: "100%", alignSelf: "center" },

  /* HERO */
  heroCard: {
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    backgroundColor: "rgba(255,255,255,0.035)",
    padding: 18,
    overflow: "hidden",
  },
  heroGlowA: {
    position: "absolute",
    top: -140,
    right: -140,
    width: 320,
    height: 320,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  heroGlowB: {
    position: "absolute",
    bottom: -160,
    left: -160,
    width: 360,
    height: 360,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  heroTopHighlight: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 90,
    backgroundColor: "rgba(255,255,255,0.02)",
  },

  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  kickerPill: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
    marginBottom: 8,
  },
  kickerDot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    backgroundColor: "rgba(229,231,235,0.92)",
    marginRight: 8,
  },
  kicker: {
    color: "rgba(229,231,235,0.78)",
    fontWeight: "900",
    letterSpacing: 2.2,
    fontSize: 11,
  },

  heroBadges: { flexDirection: "row", flexWrap: "wrap", alignItems: "center" },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  badgeText: {
    marginLeft: 6,
    color: "rgba(229,231,235,0.80)",
    fontWeight: "900",
    fontSize: 12,
  },

  h1: {
    marginTop: 16,
    fontSize: 40,
    lineHeight: 44,
    letterSpacing: -0.8,
    fontWeight: "900",
    color: "#e5e7eb",
  },
  lead: {
    marginTop: 10,
    color: "rgba(229,231,235,0.72)",
    fontSize: 15.5,
    lineHeight: 28,
    maxWidth: 860,
  },

  ctaRow: { marginTop: 16, flexDirection: "row", flexWrap: "wrap" },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: "#e5e7eb",
  },
  primaryText: { marginLeft: 8, color: "#0b0f14", fontWeight: "900" },

  /* Section head */
  sectionHead: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  sectionCapRow: { flexDirection: "row", alignItems: "center" },
  sectionChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  sectionChipText: {
    marginLeft: 8,
    color: "rgba(229,231,235,0.70)",
    fontWeight: "900",
    letterSpacing: 2.0,
    fontSize: 11,
  },

  sectionTitle: {
    marginTop: 10,
    color: "#e5e7eb",
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 0.2,
  },

  linkBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginTop: 10,
  },
  linkText: {
    color: "rgba(229,231,235,0.72)",
    fontWeight: "900",
    marginRight: 4,
  },

  /* About */
  aboutCard: {
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    backgroundColor: "rgba(255,255,255,0.035)",
    padding: 18,
    overflow: "hidden",
  },
  aboutGlow: {
    position: "absolute",
    top: -140,
    left: -160,
    width: 360,
    height: 360,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  aboutHead: { flexDirection: "row", alignItems: "flex-start" },
  rule: {
    width: 3,
    height: 52,
    borderRadius: 99,
    backgroundColor: "rgba(229,231,235,0.22)",
    marginTop: 2,
    marginRight: 14,
  },

  aboutTitle: { color: "#e5e7eb", fontWeight: "900", letterSpacing: 2.0, fontSize: 12 },
  aboutLead: { marginTop: 8, color: "rgba(229,231,235,0.65)", lineHeight: 22, maxWidth: 820 },

  aboutText: {
    color: "rgba(229,231,235,0.72)",
    lineHeight: 30,
    fontSize: 15.5,
    marginBottom: 12,
    maxWidth: 860,
  },
  aboutTextLast: { marginBottom: 0 },

  aboutCtaRow: { marginTop: 16 },
  aboutCta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "#e5e7eb",
  },
  aboutCtaText: { color: "#0b0f14", fontWeight: "900", marginRight: 8 },

  /* Footer */
  footer: {
    marginTop: 24,
    paddingTop: 18,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
  },
  footerTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" },
  footerBrand: { color: "#e5e7eb", fontWeight: "900", letterSpacing: 3.2, fontSize: 12 },
  footerSub: { marginTop: 2, color: "rgba(229,231,235,0.55)", fontWeight: "900", letterSpacing: 1.2, fontSize: 11 },

  footerLinks: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
  footerLinkBtn: { paddingVertical: 8, paddingHorizontal: 8, marginRight: 6 },
  footerLink: { color: "rgba(229,231,235,0.72)", fontWeight: "900" },

  footerDivider: { marginTop: 12, height: 1, backgroundColor: "rgba(255,255,255,0.06)" },
  footerText: { marginTop: 10, color: "rgba(229,231,235,0.50)" },

  /* helpers */
  mr8: { marginRight: 8 },
  mb8: { marginBottom: 8 },
});
