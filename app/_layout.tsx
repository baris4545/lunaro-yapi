import { Ionicons } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { setBackgroundColorAsync, setButtonStyleAsync } from "expo-navigation-bar";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo } from "react";
import { Platform, SafeAreaView, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // ✅ React Query client (tek instance)
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 60_000,
            gcTime: 10 * 60_000,
            refetchOnReconnect: true,
          },
        },
      }),
    []
  );

  // ✅ ICON FIX: Ionicons font preload (web + android dahil)
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });

  // ✅ Android navigation bar rengi
  useEffect(() => {
    if (Platform.OS === "android") {
      setBackgroundColorAsync("#0b0f14").catch(() => {});
      setButtonStyleAsync("light").catch(() => {});
    }
  }, []);

  // Inject fonts.css and preload fonts on web so the browser uses our copied fonts under /fonts
  useEffect(() => {
    if (Platform.OS !== "web") return;
    try {
      if (!document.querySelector('link[data-lunaro-fonts]')) {
        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = '/fonts.css';
        css.setAttribute('data-lunaro-fonts', '1');
        document.head.appendChild(css);
      }
      if (!document.querySelector('link[data-lunaro-preload-ion]')) {
        const p = document.createElement('link');
        p.rel = 'preload';
        p.as = 'font';
        p.type = 'font/ttf';
        p.href = '/fonts/Ionicons.ttf';
        p.crossOrigin = 'anonymous';
        p.setAttribute('data-lunaro-preload-ion', '1');
        document.head.appendChild(p);
      }
    } catch (e) {}
  }, []);

  // ✅ Splash hide only after fonts loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" translucent />

      {/* ✅ Global premium background */}
      <View style={{ flex: 1, backgroundColor: "#0b0f14" }}>
        {/* Subtle glows */}
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: -160,
            left: -120,
            width: 420,
            height: 420,
            borderRadius: 420,
            backgroundColor: "rgba(56,189,248,0.10)",
          }}
        />
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            bottom: -220,
            right: -160,
            width: 520,
            height: 520,
            borderRadius: 520,
            backgroundColor: "rgba(167,139,250,0.09)",
          }}
        />

        <SafeAreaView style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: Platform.OS === "web" ? "none" : "fade",
              contentStyle: { backgroundColor: "transparent" },
            }}
          />
        </SafeAreaView>
      </View>
    </QueryClientProvider>
  );
}
