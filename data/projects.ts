export type Project = {
  id: string;
  title: string;
  location: string;
  status: "Devam Ediyor" | "Tamamlandı";
  image?: any;
};

export const PROJECTS: Project[] = [
  { id: "lunaro-adra", title: "Lunaro Adra", location: "İstanbul", status: "Devam Ediyor" },
  { id: "lunaro-aura", title: "Lunaro Aura", location: "Kocaeli", status: "Tamamlandı" },
  { id: "lunaro-spilkent", title: "Lunaro Spilkent", location: "İzmir", status: "Tamamlandı" },
];
