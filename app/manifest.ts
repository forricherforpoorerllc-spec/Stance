import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Stance Marketing",
    short_name: "Stance",
    description: "Innovative marketing solutions for major brands in Cable, Internet, Lifeline, and Energy sectors.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#e11d48",
    icons: [
      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
