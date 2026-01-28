import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setBackgroundColorAsync, setButtonStyleAsync } from "expo-navigation-bar";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo } from "react";
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

  // ✅ Android navigation bar rengi
  useEffect(() => {
    if (Platform.OS === "android") {
      setBackgroundColorAsync("#0b0f14").catch(() => {});
      setButtonStyleAsync("light").catch(() => {});
    }
  }, []);

  // ✅ SplashScreen: app mount olunca kapat
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

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
