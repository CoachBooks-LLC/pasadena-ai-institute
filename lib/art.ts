import type { Artwork } from "@/components/ui/art-panel";

/**
 * Public-domain (CC0) masterworks from the Art Institute of Chicago,
 * downloaded to /public/art. Alt text is curatorial, part of the voice.
 */
export const art = {
  waterLilies: {
    src: "/art/monet-water-lilies.jpg",
    artist: "Claude Monet",
    title: "Antibes",
    year: "1888",
    alt: "Claude Monet's Antibes (The Estérel Mountains): a wind-bent tree above a luminous blue Mediterranean bay.",
  },
  waterLilyPond: {
    src: "/art/monet-water-lily-pond.jpg",
    artist: "Claude Monet",
    title: "Water Lily Pond",
    year: "1917/19",
    alt: "Monet's Water Lily Pond: deep blues and greens with floating blooms catching the light.",
  },
  cliffPourville: {
    src: "/art/monet-cliff-pourville.jpg",
    artist: "Claude Monet",
    title: "Cliff Walk at Pourville",
    year: "1882",
    alt: "Monet's Cliff Walk at Pourville: figures on a wind-blown headland above a turquoise sea.",
  },
  wheatstacks: {
    src: "/art/monet-wheatstacks.jpg",
    artist: "Claude Monet",
    title: "Stacks of Wheat (End of Summer)",
    year: "1890/91",
    alt: "Monet's Stacks of Wheat at end of summer: warm gold fields under a soft sky.",
  },
  parisRain: {
    src: "/art/caillebotte-paris-rain.jpg",
    artist: "Gustave Caillebotte",
    title: "Paris Street; Rainy Day",
    year: "1877",
    alt: "Caillebotte's Paris Street; Rainy Day: figures with umbrellas on a silver, rain-slicked boulevard.",
  },
  grandeJatte: {
    src: "/art/seurat-grande-jatte.jpg",
    artist: "Georges Seurat",
    title: "A Sunday on La Grande Jatte",
    year: "1884",
    alt: "Seurat's A Sunday on La Grande Jatte: a sunlit park rendered in countless points of color.",
  },
  seuratBathers: {
    src: "/art/seurat-bathers.jpg",
    artist: "Georges Seurat",
    title: "Final Study for Bathers at Asnières",
    year: "1883",
    alt: "Seurat's study for Bathers at Asnières: figures resting on a riverbank under a bright summer sky.",
  },
  bedroom: {
    src: "/art/vangogh-bedroom.jpg",
    artist: "Vincent van Gogh",
    title: "The Bedroom",
    year: "1889",
    alt: "Van Gogh's The Bedroom: vivid blues and golds in a small, intimate room.",
  },
  vanGoghFishing: {
    src: "/art/vangogh-fishing.jpg",
    artist: "Vincent van Gogh",
    title: "Fishing in Spring, the Pont de Clichy",
    year: "1887",
    alt: "Van Gogh's Fishing in Spring: a luminous blue river and green banks under a soft spring sky.",
  },
  cezanneMarseille: {
    src: "/art/cezanne-marseille.jpg",
    artist: "Paul Cézanne",
    title: "The Bay of Marseille, Seen from L'Estaque",
    year: "1885",
    alt: "Cézanne's Bay of Marseille: warm terracotta rooftops above a deep blue Mediterranean bay.",
  },
} satisfies Record<string, Artwork>;
