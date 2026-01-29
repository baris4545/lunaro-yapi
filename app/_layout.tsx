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

  useEffect(() => {
    if (Platform.OS === "android") {
      setBackgroundColorAsync("#0b0f14").catch(() => {});
      setButtonStyleAsync("light").catch(() => {});
    }
  }, []);

  // ✅ WEB: Android sağa kayma + iOS zoom sonrası bozulma fix
  useEffect(() => {
    if (Platform.OS !== "web") return;

    try {
      // 1) Viewport meta (zoom serbest)
      const content = "width=device-width, initial-scale=1, viewport-fit=cover";
      const existing = document.querySelector('meta[name="viewport"]');
      if (existing) existing.setAttribute("content", content);
      else {
        const meta = document.createElement("meta");
        meta.setAttribute("name", "viewport");
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }

      // 2) CSS fixes (overflow-x: clip = sticky bozma ihtimali hidden’dan daha düşük)
      if (!document.getElementById("lunaro-web-fixes")) {
        const style = document.createElement("style");
        style.id = "lunaro-web-fixes";
        style.innerHTML = `
          :root {
            --vvw: 100vw;
            --vvh: 100vh;
          }

          html, body {
            width: 100%;
            margin: 0;
            padding: 0;
            background: #0b0f14;

            /* YATAY TAŞMA KES */
            overflow-x: clip;
          }

          /* iOS font reflow azalt */
          html { -webkit-text-size-adjust: 100%; }
          body { -webkit-text-size-adjust: 100%; }

          /* Expo root */
          #root {
            width: 100%;
            max-width: 100vw;
            background: #0b0f14;

            /* iOS zoom/addressbar sonrası yükseklik bozulmasını azalt */
            min-height: var(--vvh);
          }

          /* Taşma yapan medya elemanlarını kıs */
          img, video, canvas, svg, iframe {
            max-width: 100%;
            height: auto;
          }

          /* Bazı iframe’ler width taşırır */
          iframe { display: block; }

          /* Kutu modeli */
          * { box-sizing: border-box; }
        `;
        document.head.appendChild(style);
      }

      // 3) VisualViewport: iOS pinch-zoom + address bar değişiminde gerçek ölçüyü yakala
      const setVV = () => {
        const vv = (window as any).visualViewport;
        const w = vv?.width ?? window.innerWidth;
        const h = vv?.height ?? window.innerHeight;
        document.documentElement.style.setProperty("--vvw", `${w}px`);
        document.documentElement.style.setProperty("--vvh", `${h}px`);

        // ekstra güvenlik: root maxWidth sabit kalsın
        const root = document.getElementById("root");
        if (root) {
          root.style.maxWidth = "100vw";
        }
      };

      setVV();

      const vv = (window as any).visualViewport;
      if (vv?.addEventListener) {
        vv.addEventListener("resize", setVV);
        vv.addEventListener("scroll", setVV);
      }
      window.addEventListener("resize", setVV);
      window.addEventListener("orientationchange", setVV);

      return () => {
        if (vv?.removeEventListener) {
          vv.removeEventListener("resize", setVV);
          vv.removeEventListener("scroll", setVV);
        }
        window.removeEventListener("resize", setVV);
        window.removeEventListener("orientationchange", setVV);
      };
    } catch {
      // sessiz geç
    }
  }, []);

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" translucent />
      <View style={{ flex: 1, backgroundColor: "#0b0f14" }}>
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
