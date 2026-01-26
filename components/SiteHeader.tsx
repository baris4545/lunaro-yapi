import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

type NavItem = { href: "/" | "/projeler" | "/iletisim"; label: string; icon: any };

export function SiteHeader({ elevated = false }: { elevated?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();

  const { width } = useWindowDimensions();
  const isWide = width >= 980;
  const padX = isWide ? 48 : 16;

  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<NavItem["href"] | null>(null);

  const nav = useMemo<NavItem[]>(
    () => [
      { href: "/", label: "Ana Sayfa", icon: "home-outline" },
      { href: "/projeler", label: "Projeler", icon: "images-outline" },
      { href: "/iletisim", label: "İletişim", icon: "call-outline" },
    ],
    []
  );

  const go = (href: NavItem["href"]) => {
    setMenuOpen(false);
    router.push(href);
  };

  const active = (href: NavItem["href"]) => pathname === href;

  // Mobile menu animation
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, {
      toValue: menuOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [menuOpen]);

  const menuTranslateY = anim.interpolate({ inputRange: [0, 1], outputRange: [-8, 0] });
  const menuOpacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  const webBlurStyle =
    Platform.OS === "web"
      ? // @ts-ignore web only
        { backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }
      : undefined;

  return (
    <View style={[styles.wrap, elevated && styles.wrapElevated]}>
      {/* Glass layer */}
      <View style={[styles.glass, elevated && styles.glassElevated, webBlurStyle]} />

      {/* Hairline */}
      <View style={[styles.hairline, elevated && styles.hairlineOn]} />

      <View style={[styles.inner, { paddingHorizontal: padX }]}>
        {/* Brand */}
        <Pressable onPress={() => go("/")} style={styles.brandBtn}>
          <View style={styles.brandMark} />
          <View>
            <Text style={styles.brand}>LUNARO</Text>
            <Text style={styles.brandSub}>Yapı</Text>
          </View>
        </Pressable>

        {/* Desktop Nav */}
        {isWide ? (
          <View style={styles.navRow}>
            {nav.map((x) => {
              const isA = active(x.href);
              const isH = Platform.OS === "web" && hoveredHref === x.href;

              return (
                <Pressable
                  key={x.href}
                  onPress={() => go(x.href)}
                  onHoverIn={Platform.OS === "web" ? () => setHoveredHref(x.href) : undefined}
                  onHoverOut={Platform.OS === "web" ? () => setHoveredHref(null) : undefined}
                  style={[
                    styles.navItem,
                    isA && styles.navItemActive,
                    isH && !isA && styles.navItemHover,
                  ]}
                >
                  <Ionicons
                    name={x.icon}
                    size={16}
                    color={isA ? "#e5e7eb" : "rgba(229,231,235,0.65)"}
                  />
                  <Text style={[styles.navText, isA && styles.navTextActive]}>
                    {x.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ) : (
          <Pressable
            onPress={() => setMenuOpen((s) => !s)}
            style={[styles.menuBtn, menuOpen && styles.menuBtnActive]}
          >
            <Ionicons
              name={menuOpen ? "close-outline" : "menu-outline"}
              size={22}
              color="#e5e7eb"
            />
          </Pressable>
        )}
      </View>

      {/* Mobile Menu */}
      {!isWide && menuOpen && (
        <Animated.View
          style={[
            styles.mobileMenu,
            { paddingHorizontal: padX, opacity: menuOpacity, transform: [{ translateY: menuTranslateY }] },
          ]}
        >
          {nav.map((x) => {
            const isA = active(x.href);
            return (
              <Pressable
                key={x.href}
                onPress={() => go(x.href)}
                style={[styles.mobileItem, isA && styles.mobileItemActive]}
              >
                <Ionicons name={x.icon} size={18} color="#e5e7eb" />
                <Text style={styles.mobileText}>{x.label}</Text>
              </Pressable>
            );
          })}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  wrapElevated: {},

  glass: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(11,15,20,0.65)",
  },
  glassElevated: { backgroundColor: "rgba(11,15,20,0.92)" },

  hairline: { height: 1 },
  hairlineOn: { backgroundColor: "rgba(255,255,255,0.08)" },

  inner: {
    height: 68,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  brandBtn: { flexDirection: "row", alignItems: "center", gap: 10 },
  brandMark: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#e5e7eb",
  },
  brand: { color: "#e5e7eb", fontWeight: "900", letterSpacing: 3 },
  brandSub: { color: "rgba(229,231,235,0.55)" },

  navRow: { flexDirection: "row", gap: 10 },
  navItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  navItemHover: { backgroundColor: "rgba(255,255,255,0.06)" },
  navItemActive: { backgroundColor: "rgba(255,255,255,0.10)" },

  navText: { color: "rgba(229,231,235,0.70)", fontWeight: "900" },
  navTextActive: { color: "#e5e7eb" },

  menuBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
  menuBtnActive: { backgroundColor: "rgba(255,255,255,0.10)" },

  mobileMenu: {
    paddingTop: 10,
    paddingBottom: 14,
    backgroundColor: "rgba(11,15,20,0.92)",
  },
  mobileItem: {
    paddingVertical: 14,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  mobileItemActive: {},
  mobileText: { color: "#e5e7eb", fontWeight: "900" },
});
