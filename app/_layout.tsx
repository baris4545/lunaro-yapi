import { Ionicons } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setBackgroundColorAsync, setButtonStyleAsync } from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo } from "react";
import { Platform, SafeAreaView, View } from "react-native";

export default function RootLayout() {
  // ✅ React Query client (tek instance)
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 60_000, // 1 dk
            gcTime: 10 * 60_000, // 10 dk
            refetchOnReconnect: true,
          },
        },
      }),
    []
  );

  // ✅ Android navigation bar rengi
  React.useEffect(() => {
    try {
      // ensure icon fonts are loaded (web & browser hosts)
      // @ts-ignore
      if (Ionicons && Ionicons.loadFont) Ionicons.loadFont();
    } catch {}
    if (Platform.OS === "android") {
      setBackgroundColorAsync("#0b0f14").catch(() => {});
      setButtonStyleAsync("light").catch(() => {});
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" translucent />

      {/* ✅ Global premium background */}
      <View style={{ flex: 1, backgroundColor: "#0b0f14" }}>
        {/* Hafif “glow” efekti (tasarımı güzelleştirir) */}
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: -160,
            left: -120,
            width: 420,
            height: 420,
            borderRadius: 420,
            backgroundColor: "rgba(56,189,248,0.12)", // sky glow
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
            backgroundColor: "rgba(167,139,250,0.10)", // violet glow
          }}
        />

        {/* ✅ Safe area + Stack */}
        <SafeAreaView style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: Platform.OS === "web" ? "none" : "fade",
              contentStyle: {
                backgroundColor: "transparent", // arka planı View taşıyor
              },
            }}
          />
        </SafeAreaView>
      </View>
    </QueryClientProvider>
  );
}
