import {
    ArrowRight, // ✅ BUNU KULLAN
    Bed,
    ChevronRight,
    Clock,
    Cpu,
    Expand,
    Flame,
    Grid3X3,
    HelpCircle,
    Images,
    Leaf,
    Mail,
    MailOpen,
    MessageCircle,
    Navigation,
    Phone,
    Send,
    ShieldCheck,
    Snowflake,
    Sparkles,
    Sun,
} from "lucide-react-native";
import React from "react";

export const ICONS = {
  call: Phone,
  whatsapp: MessageCircle,
  mail: Mail,
  send: Send,
  gmail: Mail,
  "mail-open": MailOpen,
  time: Clock,
  chat: MessageCircle,
  "chevron-right": ChevronRight,
  "arrow-right": ArrowRight,

  // ✅ burada da Navigation’a bağla
  navigate: Navigation,

  bed: Bed,
  sun: Sun,
  images: Images,
  sparkles: Sparkles,
  shield: ShieldCheck,
  grid: Grid3X3,
  expand: Expand,
  cpu: Cpu,
  leaf: Leaf,
  flame: Flame,
  snow: Snowflake,
} as const;

export type IconName = keyof typeof ICONS;

export function AppIcon({
  name,
  size = 18,
  color = "rgba(229,231,235,0.9)",
}: {
  name: IconName | string;
  size?: number;
  color?: string;
}) {
  const Cmp = (ICONS as Record<string, React.ComponentType<any>>)[name] ?? HelpCircle;
  return <Cmp width={size} height={size} color={color} />;
}
