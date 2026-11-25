import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "WAPromo",
    short_name: "WAPromo",
    description: "Aplikasi WhatsApp blast, broadcast pesan promo massal, dan inbox tim CS.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8fdfb",
    theme_color: "#0fa97f",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    related_applications: [
      {
        platform: "webapp",
        url: "/manifest.webmanifest",
      },
    ],
  };
}
