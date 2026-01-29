import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setBackgroundColorAsync, setButtonStyleAsync } from "expo-navigation-bar";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo } from "react";
import { Platform, SafeAreaView, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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

  // ✅ WEB: Zoom açık kalsın, ama taşma + scroll bozulması olmasın
  useEffect(() => {
    if (Platform.OS !== "web") return;

    try {
      // 1) Viewport meta: zoom KAPATMIYORUZ (user-scalable yok)
      const content = "width=device-width, initial-scale=1, viewport-fit=cover";
      const existing = document.querySelector('meta[name="viewport"]');
      if (existing) existing.setAttribute("content", content);
      else {
        const meta = document.createElement("meta");
        meta.setAttribute("name", "viewport");
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }

      // 2) iOS Safari pinch sonrası font reflow azalt
      // @ts-ignore
      document.documentElement.style.webkitTextSizeAdjust = "100%";
      // @ts-ignore
      document.body.style.webkitTextSizeAdjust = "100%";

      // 3) Root yüksekliği & taşma stabilizasyonu (sticky bozmasın diye overflow vermiyoruz)
      //    Bunun yerine "max-width:100vw" + media elemanları kısıt + root min-height fix
      if (!document.getElementById("lunaro-web-fixes")) {
        const style = document.createElement("style");
        style.id = "lunaro-web-fixes";
        style.innerHTML = `
          html, body {
            width: 100%;
            margin: 0;
            padding: 0;
            background: #0b0f14;
            text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
          }

          /* Expo web root */
          #root {
            width: 100%;
            max-width: 100vw;
            min-height: 100vh;
            background: #0b0f14;
          }

          /* Address bar değişiminde scroll/height bozulmasını azaltır */
          @supports (height: 100dvh) {
            #root { min-height: 100dvh; }
          }
          @supports (height: 100svh) {
            #root { min-height: 100svh; }
          }
          @supports (-webkit-touch-callout: none) {
            #root { min-height: -webkit-fill-available; }
          }

          /* Zoom sonrası yatay taşmanın %80 sebebi: genişleyen medya */
          img, video, canvas, svg {
            max-width: 100%;
            height: auto;
          }

          /* İstemeden genişleyen elemanlar */
          * { box-sizing: border-box; }
        `;
        document.head.appendChild(style);
      }
    } catch {
      // sessiz geç
    }
  }, []);

  // ✅ SplashScreen: app mount olunca kapat
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" translucent />

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
