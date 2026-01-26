import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Linking,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SiteHeader } from "../components/SiteHeader";

const PHONE_1 = "05326152373";
const PHONE_2 = "05056481880";
const EMAIL = "lunaroyapi@gmail.com";

function formatPhoneTR(raw: string) {
  const s = raw.replace(/\D/g, "");
  if (s.length !== 11) return raw;
  return `${s.slice(0, 4)} ${s.slice(4, 7)} ${s.slice(7, 9)} ${s.slice(9, 11)}`;
}

function openTel(raw: string) {
  const digits = raw.replace(/\D/g, "");
  Linking.openURL(`tel:${digits}`);
}

function openWhatsapp(raw: string) {
  const digits = raw.replace(/\D/g, "");
  const withCountry = digits.startsWith("0") ? `9${digits}` : digits; // +90
  Linking.openURL(`https://wa.me/${withCountry}`);
}

function openMail(email: string) {
  const subject = encodeURIComponent("Lunaro Yapı — İletişim");
  const body = encodeURIComponent("Merhaba,\n\nBilgi almak istiyorum.\n\nTeşekkürler.");
  Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
}

export default function Iletisim() {
  const { width } = useWindowDimensions();
  const isWide = width >= 980;
  const isTablet = width >= 720;

  const padX = isWide ? 48 : 16;
  const maxW = 1120;

  // Mobile-first grid: 1 col, tablet/desktop: 2 col
  const cardBasis = isTablet ? "48%" : "100%";

  const [elevated, setElevated] = useState(false);

  return (
    <ScrollView
      style={styles.page}
      stickyHeaderIndices={[0]}
      onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
        setElevated(e.nativeEvent.contentOffset.y > 8);
      }}
      scrollEventThrottle={16}
      contentContainerStyle={{ paddingBottom: 28 }}
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
                <Text style={styles.kicker}>İLETİŞİM</Text>
              </View>
            </View>

            <Text style={styles.h1}>Bize Ulaşın</Text>
            <Text style={styles.lead}>
              Projelerimiz hakkında bilgi almak için arayabilir, WhatsApp’tan yazabilir veya e-posta gönderebilirsiniz.
            </Text>

            <View style={styles.heroDivider} />
            <Text style={styles.heroNote}>
              Tek dokunuşla işlem yapabilirsiniz: Ara • WhatsApp • Mail
            </Text>
          </View>
        </View>
      </View>

      {/* CONTACTS */}
      <View style={[styles.sectionTight, { paddingHorizontal: padX }]}>
        <View style={[styles.container, { maxWidth: maxW }]}>
          <View style={styles.sectionHead}>
            <View style={styles.sectionChip}>
              <Ionicons name="chatbubble-ellipses-outline" size={14} color="rgba(229,231,235,0.72)" />
              <Text style={styles.sectionChipText}>İLETİŞİM BİLGİLERİ</Text>
            </View>

            <Text style={styles.sectionTitle}>Telefon & E-posta</Text>
          </View>

          <View style={styles.grid}>
            {/* PHONE 1 */}
            <View style={[styles.card, { flexBasis: cardBasis }]}>
              <View pointerEvents="none" style={styles.cardGlow} />
              <View style={styles.cardHead}>
                <View style={styles.iconWrap}>
                  <Ionicons name="call-outline" size={18} color="rgba(229,231,235,0.90)" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardK}>Telefon</Text>
                  <Text style={styles.cardV}>{formatPhoneTR(PHONE_1)}</Text>
                </View>
              </View>

              <View style={styles.actionsCol}>
                <Pressable onPress={() => openTel(PHONE_1)} style={styles.primaryBtn}>
                  <Ionicons name="call-outline" size={18} color="#0b0f14" />
                  <Text style={styles.primaryText}>Ara</Text>
                </Pressable>

                <Pressable onPress={() => openWhatsapp(PHONE_1)} style={styles.ghostBtn}>
                  <Ionicons name="logo-whatsapp" size={18} color="rgba(229,231,235,0.88)" />
                  <Text style={styles.ghostText}>WhatsApp</Text>
                </Pressable>
              </View>
            </View>

            {/* PHONE 2 */}
            <View style={[styles.card, { flexBasis: cardBasis }]}>
              <View pointerEvents="none" style={styles.cardGlow} />
              <View style={styles.cardHead}>
                <View style={styles.iconWrap}>
                  <Ionicons name="call-outline" size={18} color="rgba(229,231,235,0.90)" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardK}>Telefon</Text>
                  <Text style={styles.cardV}>{formatPhoneTR(PHONE_2)}</Text>
                </View>
              </View>

              <View style={styles.actionsCol}>
                <Pressable onPress={() => openTel(PHONE_2)} style={styles.primaryBtn}>
                  <Ionicons name="call-outline" size={18} color="#0b0f14" />
                  <Text style={styles.primaryText}>Ara</Text>
                </Pressable>

                <Pressable onPress={() => openWhatsapp(PHONE_2)} style={styles.ghostBtn}>
                  <Ionicons name="logo-whatsapp" size={18} color="rgba(229,231,235,0.88)" />
                  <Text style={styles.ghostText}>WhatsApp</Text>
                </Pressable>
              </View>
            </View>

            {/* EMAIL */}
            <View style={[styles.card, { flexBasis: cardBasis }]}>
              <View pointerEvents="none" style={styles.cardGlow} />
              <View style={styles.cardHead}>
                <View style={styles.iconWrap}>
                  <Ionicons name="mail-outline" size={18} color="rgba(229,231,235,0.90)" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardK}>E-posta</Text>
                  <Text style={styles.cardV}>{EMAIL}</Text>
                </View>
              </View>

              <View style={styles.actionsCol}>
                <Pressable onPress={() => openMail(EMAIL)} style={styles.primaryBtn}>
                  <Ionicons name="paper-plane-outline" size={18} color="#0b0f14" />
                  <Text style={styles.primaryText}>Mail Gönder</Text>
                </Pressable>

                {Platform.OS === "web" ? (
                  <Pressable
                    onPress={() =>
                      Linking.openURL(
                        `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}`
                      )
                    }
                    style={styles.ghostBtn}
                  >
                    <Ionicons name="logo-google" size={18} color="rgba(229,231,235,0.88)" />
                    <Text style={styles.ghostText}>Gmail Aç</Text>
                  </Pressable>
                ) : (
                  <Pressable onPress={() => Linking.openURL(`mailto:${EMAIL}`)} style={styles.ghostBtn}>
                    <Ionicons name="mail-open-outline" size={18} color="rgba(229,231,235,0.88)" />
                    <Text style={styles.ghostText}>Mail Uygulaması</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </View>

          <View style={styles.noteCard}>
            <Ionicons name="time-outline" size={16} color="rgba(229,231,235,0.65)" />
            <Text style={styles.noteText}>Mesajlarınıza en kısa sürede dönüş sağlıyoruz.</Text>
          </View>

          {/* Small footer */}
          <View style={styles.footer}>
            <View style={styles.footerTop}>
              <View>
                <Text style={styles.footerBrand}>LUNARO</Text>
                <Text style={styles.footerSub}>Yapı</Text>
              </View>

              <View style={styles.footerLinks}>
                <Pressable onPress={() => openTel(PHONE_1)} style={styles.footerLinkBtn}>
                  <Text style={styles.footerLink}>Ara</Text>
                </Pressable>
                <Pressable onPress={() => openMail(EMAIL)} style={styles.footerLinkBtn}>
                  <Text style={styles.footerLink}>E-posta</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.footerDivider} />
            <Text style={styles.footerText}>
              © {new Date().getFullYear()} Lunaro Yapı • Tüm hakları saklıdır.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { backgroundColor: "#0b0f14" },
  section: { paddingTop: 20 },
  sectionTight: { paddingTop: 12 },
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
    gap: 12,
    flexWrap: "wrap",
  },
  kickerPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  kickerDot: { width: 8, height: 8, borderRadius: 99, backgroundColor: "rgba(229,231,235,0.92)" },
  kicker: { color: "rgba(229,231,235,0.78)", fontWeight: "900", letterSpacing: 2.2, fontSize: 11 },

  heroBadges: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  badgeText: { color: "rgba(229,231,235,0.80)", fontWeight: "900", fontSize: 12 },

  h1: { marginTop: 16, fontSize: 34, lineHeight: 38, letterSpacing: -0.6, fontWeight: "900", color: "#e5e7eb" },
  lead: { marginTop: 10, color: "rgba(229,231,235,0.72)", fontSize: 15.5, lineHeight: 28, maxWidth: 860 },

  heroDivider: { marginTop: 16, height: 1, backgroundColor: "rgba(255,255,255,0.08)" },
  heroNote: { marginTop: 12, color: "rgba(229,231,235,0.55)", lineHeight: 20 },

  /* Section */
  sectionHead: { marginTop: 10 },
  sectionChip: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  sectionChipText: { color: "rgba(229,231,235,0.70)", fontWeight: "900", letterSpacing: 2.0, fontSize: 11 },
  sectionTitle: { marginTop: 12, color: "#e5e7eb", fontWeight: "900", fontSize: 16, letterSpacing: 0.2 },
  sectionSub: { marginTop: 6, color: "rgba(229,231,235,0.55)" },

  /* Grid */
  grid: { marginTop: 14, flexDirection: "row", flexWrap: "wrap", gap: 12 },

  /* Card */
  card: {
    width: "100%",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    backgroundColor: "rgba(255,255,255,0.035)",
    padding: 16,
    overflow: "hidden",
  },
  cardGlow: {
    position: "absolute",
    top: -120,
    right: -140,
    width: 280,
    height: 280,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  cardHead: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardK: { color: "rgba(229,231,235,0.55)", fontWeight: "900", letterSpacing: 1.2, fontSize: 11 },
  cardV: { marginTop: 6, color: "#e5e7eb", fontWeight: "900", fontSize: 16 },

  /* Mobile-friendly actions: column */
  actionsCol: { marginTop: 14, gap: 10 },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: "#e5e7eb",
  },
  primaryText: { color: "#0b0f14", fontWeight: "900" },
  ghostBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  ghostText: { color: "rgba(229,231,235,0.90)", fontWeight: "900" },

  noteCard: {
    marginTop: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255,255,255,0.03)",
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  noteText: { color: "rgba(229,231,235,0.58)", lineHeight: 20 },

  /* Footer */
  footer: {
    marginTop: 18,
    paddingTop: 18,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
  },
  footerTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap" },
  footerBrand: { color: "#e5e7eb", fontWeight: "900", letterSpacing: 3.2, fontSize: 12 },
  footerSub: { marginTop: 2, color: "rgba(229,231,235,0.55)", fontWeight: "900", letterSpacing: 1.2, fontSize: 11 },

  footerLinks: { flexDirection: "row", gap: 14 },
  footerLinkBtn: { paddingVertical: 8, paddingHorizontal: 8 },
  footerLink: { color: "rgba(229,231,235,0.72)", fontWeight: "900" },

  footerDivider: { marginTop: 12, height: 1, backgroundColor: "rgba(255,255,255,0.06)" },
  footerText: { marginTop: 10, color: "rgba(229,231,235,0.50)" },
});
