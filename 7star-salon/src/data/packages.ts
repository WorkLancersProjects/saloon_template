export interface Package {
  id: string;
  title: string;
  image: string;
  description: string;
  includes: string[];
  oldPrice: number;
  newPrice: number;
  savings: number;
  tag?: string;
  popular?: boolean;
  gender: "men" | "women" | "couple" | "bridal";
}

export const packagesData: Package[] = [
  {
    id: "pkg-groom",
    title: "Royal Grooming Package",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&q=80",
    description: "Complete grooming transformation for the modern gentleman",
    includes: ["Designer Haircut", "Beard Trim & Shape", "Premium Facial", "Head Massage", "Cleanup"],
    oldPrice: 1899,
    newPrice: 1299,
    savings: 600,
    tag: "Most Popular",
    popular: true,
    gender: "men",
  },
  {
    id: "pkg-basic-men",
    title: "Classic Gentleman Package",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&q=80",
    description: "Essential grooming for every man's routine",
    includes: ["Haircut", "Beard Trim", "Face Cleanup", "Head Massage"],
    oldPrice: 999,
    newPrice: 699,
    savings: 300,
    gender: "men",
  },
  {
    id: "pkg-bridal",
    title: "Dream Bridal Package",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&q=80",
    description: "Look your absolute best on your most special day",
    includes: [
      "HD Bridal Makeup",
      "Bridal Hairstyle",
      "Pre-Bridal Facial",
      "Manicure & Pedicure",
      "Saree Draping",
      "Engagement Makeup (Free)",
    ],
    oldPrice: 14999,
    newPrice: 9999,
    savings: 5000,
    tag: "Best Value",
    popular: true,
    gender: "bridal",
  },
  {
    id: "pkg-pre-bridal",
    title: "Pre-Bridal Glow Package",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=500&q=80",
    description: "4-session pre-bridal treatment for radiant wedding day skin",
    includes: [
      "4x Premium Facials",
      "2x Full Body Bleach",
      "2x D-Tan Treatment",
      "Eyebrow Shaping",
      "Threading (3 sessions)",
    ],
    oldPrice: 8999,
    newPrice: 5999,
    savings: 3000,
    gender: "bridal",
  },
  {
    id: "pkg-women-glow",
    title: "Queen's Glow Package",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80",
    description: "Head-to-toe pampering for the modern queen",
    includes: ["Hair Spa", "Premium Facial", "Manicure", "Pedicure", "Threading", "Waxing (Arms + Legs)"],
    oldPrice: 3999,
    newPrice: 2799,
    savings: 1200,
    tag: "Fan Favourite",
    popular: true,
    gender: "women",
  },
  {
    id: "pkg-couple",
    title: "Couple's Luxury Package",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&q=80",
    description: "A premium pampering experience for two",
    includes: [
      "2x Hair Cut (His & Hers)",
      "2x Premium Facial",
      "2x Head Massage",
      "Complimentary Tea & Refreshments",
    ],
    oldPrice: 4999,
    newPrice: 3499,
    savings: 1500,
    gender: "couple",
  },
];
