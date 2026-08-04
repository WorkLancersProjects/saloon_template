export interface ServiceItem {
  name: string;
  price: number;
  oldPrice?: number;
  offer?: string;
  duration?: string;
}

export interface ServiceCategory {
  id: string;
  gender: "men" | "women" | "kids";
  icon: string;
  title: string;
  description: string;
  services: ServiceItem[];
}

export const servicesData: ServiceCategory[] = [
  // MEN
  {
    id: "men-haircut",
    gender: "men",
    icon: "✂️",
    title: "Hair Cut",
    description: "Precision cuts tailored to your face shape and style preference",
    services: [
      { name: "Basic Hair Cut", price: 150, duration: "30 min" },
      { name: "Designer Hair Cut", price: 250, oldPrice: 350, offer: "29% OFF", duration: "45 min" },
      { name: "Hair Cut + Wash", price: 200, duration: "40 min" },
      { name: "Beard Trim", price: 100, duration: "20 min" },
      { name: "Hair Cut + Beard Trim", price: 300, oldPrice: 400, offer: "25% OFF", duration: "50 min" },
      { name: "Kids Hair Cut (Below 10)", price: 120, duration: "25 min" },
    ],
  },
  {
    id: "men-colour",
    gender: "men",
    icon: "🎨",
    title: "Hair Colouring",
    description: "Premium hair colour services using international brands",
    services: [
      { name: "Global Hair Colour (Schwarzkopf)", price: 800, oldPrice: 1000, offer: "20% OFF", duration: "90 min" },
      { name: "Global Hair Colour (Loreal)", price: 700, duration: "90 min" },
      { name: "Highlights (Partial)", price: 600, duration: "60 min" },
      { name: "Highlights (Full)", price: 1200, oldPrice: 1500, offer: "20% OFF", duration: "120 min" },
      { name: "Beard Colour", price: 200, duration: "30 min" },
      { name: "Ammonia-Free Colour", price: 900, duration: "90 min" },
    ],
  },
  {
    id: "men-facial",
    gender: "men",
    icon: "💆",
    title: "Facial",
    description: "Deep cleansing and rejuvenating facial treatments for men",
    services: [
      { name: "Basic Facial", price: 299, duration: "40 min" },
      { name: "Premium Facial", price: 499, oldPrice: 699, offer: "29% OFF", duration: "60 min" },
      { name: "Anti-Aging Facial", price: 799, duration: "75 min" },
      { name: "D-Tan Facial", price: 399, duration: "50 min" },
      { name: "Gold Facial", price: 899, oldPrice: 1199, offer: "25% OFF", duration: "75 min" },
    ],
  },
  {
    id: "men-massage",
    gender: "men",
    icon: "🧴",
    title: "Oil Massage",
    description: "Relaxing head and body massage with premium oils",
    services: [
      { name: "Head Massage (15 min)", price: 150, duration: "15 min" },
      { name: "Head Massage (30 min)", price: 250, duration: "30 min" },
      { name: "Shoulder + Head Massage", price: 350, oldPrice: 499, offer: "30% OFF", duration: "45 min" },
      { name: "Full Body Massage (60 min)", price: 799, duration: "60 min" },
      { name: "Premium Oil Massage (90 min)", price: 1199, duration: "90 min" },
    ],
  },
  {
    id: "men-bleach",
    gender: "men",
    icon: "✨",
    title: "Bleach",
    description: "Professional bleaching services for a brighter, even tone",
    services: [
      { name: "Face Bleach", price: 199, duration: "30 min" },
      { name: "Full Arms Bleach", price: 299, duration: "40 min" },
      { name: "Full Back Bleach", price: 399, duration: "45 min" },
      { name: "Full Body Bleach", price: 999, oldPrice: 1299, offer: "23% OFF", duration: "90 min" },
    ],
  },
  {
    id: "men-cleanup",
    gender: "men",
    icon: "🧼",
    title: "Cleanup",
    description: "Quick and refreshing skin cleanup sessions",
    services: [
      { name: "Basic Cleanup", price: 199, duration: "25 min" },
      { name: "Premium Cleanup", price: 349, oldPrice: 499, offer: "30% OFF", duration: "40 min" },
      { name: "D-Tan Cleanup", price: 299, duration: "35 min" },
    ],
  },
  {
    id: "men-spa",
    gender: "men",
    icon: "🌿",
    title: "Hair Spa",
    description: "Nourishing hair spa treatments for healthy, shiny hair",
    services: [
      { name: "Basic Hair Spa", price: 399, duration: "45 min" },
      { name: "Premium Hair Spa", price: 699, oldPrice: 899, offer: "22% OFF", duration: "60 min" },
      { name: "Keratin Treatment", price: 1499, duration: "120 min" },
      { name: "Protein Treatment", price: 999, duration: "90 min" },
    ],
  },
  {
    id: "men-packages",
    gender: "men",
    icon: "🎁",
    title: "Packages",
    description: "Value combo packages for complete grooming",
    services: [
      { name: "Grooming Starter (Haircut + Beard + Cleanup)", price: 499, oldPrice: 699, offer: "29% OFF", duration: "75 min" },
      { name: "Premium Groom (Haircut + Facial + Head Massage)", price: 799, oldPrice: 1099, offer: "27% OFF", duration: "105 min" },
      { name: "Royal Groom (Haircut + Beard + Facial + Spa)", price: 1299, oldPrice: 1899, offer: "32% OFF", duration: "150 min" },
    ],
  },
  // WOMEN
  {
    id: "women-haircut",
    gender: "women",
    icon: "✂️",
    title: "Hair Cut",
    description: "Expert cuts for every hair length and texture",
    services: [
      { name: "Basic Hair Trim", price: 199, duration: "30 min" },
      { name: "Layer Cut", price: 499, duration: "45 min" },
      { name: "U-Cut / V-Cut", price: 399, duration: "40 min" },
      { name: "Bob Cut", price: 599, oldPrice: 799, offer: "25% OFF", duration: "50 min" },
      { name: "Pixie Cut", price: 699, duration: "50 min" },
      { name: "Designer Cut (Senior Stylist)", price: 999, duration: "60 min" },
    ],
  },
  {
    id: "women-colour",
    gender: "women",
    icon: "🎨",
    title: "Hair Colour",
    description: "Full spectrum of colouring services from natural to bold",
    services: [
      { name: "Global Colour (Short Hair)", price: 999, duration: "90 min" },
      { name: "Global Colour (Medium Hair)", price: 1499, duration: "100 min" },
      { name: "Global Colour (Long Hair)", price: 1999, oldPrice: 2499, offer: "20% OFF", duration: "120 min" },
      { name: "Balayage", price: 2999, oldPrice: 3999, offer: "25% OFF", duration: "150 min" },
      { name: "Ombre / Sombre", price: 2499, duration: "140 min" },
      { name: "Highlights (Partial)", price: 1299, duration: "90 min" },
      { name: "Highlights (Full)", price: 2299, duration: "120 min" },
    ],
  },
  {
    id: "women-spa",
    gender: "women",
    icon: "🌿",
    title: "Hair Spa",
    description: "Luxurious spa treatments to restore and nourish your hair",
    services: [
      { name: "Basic Hair Spa", price: 499, duration: "45 min" },
      { name: "Loreal Hair Spa", price: 799, oldPrice: 999, offer: "20% OFF", duration: "60 min" },
      { name: "Keratin Treatment (Short)", price: 1999, duration: "150 min" },
      { name: "Keratin Treatment (Long)", price: 2999, duration: "180 min" },
      { name: "Cysteine Treatment", price: 2499, duration: "160 min" },
      { name: "Botox Treatment", price: 3499, oldPrice: 4499, offer: "22% OFF", duration: "180 min" },
    ],
  },
  {
    id: "women-straightening",
    gender: "women",
    icon: "〰️",
    title: "Straightening",
    description: "Advanced smoothening and straightening solutions",
    services: [
      { name: "Smoothening (Short Hair)", price: 2499, duration: "120 min" },
      { name: "Smoothening (Medium Hair)", price: 3499, duration: "150 min" },
      { name: "Smoothening (Long Hair)", price: 4499, oldPrice: 5999, offer: "25% OFF", duration: "180 min" },
      { name: "Rebonding (Short Hair)", price: 2999, duration: "150 min" },
      { name: "Rebonding (Long Hair)", price: 4999, oldPrice: 6499, offer: "23% OFF", duration: "210 min" },
    ],
  },
  {
    id: "women-makeup",
    gender: "women",
    icon: "💄",
    title: "Makeup",
    description: "Professional makeup for every occasion",
    services: [
      { name: "Party Makeup", price: 1499, duration: "60 min" },
      { name: "Engagement Makeup", price: 3499, duration: "90 min" },
      { name: "Reception Makeup", price: 4499, oldPrice: 5999, offer: "25% OFF", duration: "120 min" },
      { name: "Bridal Makeup (HD)", price: 6999, oldPrice: 8999, offer: "22% OFF", duration: "180 min" },
      { name: "Airbrush Makeup", price: 7999, duration: "180 min" },
      { name: "Simple Makeup", price: 799, duration: "45 min" },
    ],
  },
  {
    id: "women-waxing",
    gender: "women",
    icon: "🌸",
    title: "Waxing",
    description: "Smooth, gentle waxing for flawless skin",
    services: [
      { name: "Full Arms Wax", price: 199, duration: "30 min" },
      { name: "Full Legs Wax", price: 299, duration: "40 min" },
      { name: "Underarms Wax", price: 99, duration: "15 min" },
      { name: "Full Body Wax", price: 999, oldPrice: 1299, offer: "23% OFF", duration: "90 min" },
      { name: "Rica Wax (Arms)", price: 299, duration: "30 min" },
      { name: "Rica Wax (Legs)", price: 399, duration: "40 min" },
    ],
  },
  {
    id: "women-threading",
    gender: "women",
    icon: "🧵",
    title: "Threading",
    description: "Precise threading for perfect brows and face shaping",
    services: [
      { name: "Eyebrow Threading", price: 50, duration: "10 min" },
      { name: "Upper Lip Threading", price: 30, duration: "5 min" },
      { name: "Full Face Threading", price: 150, duration: "25 min" },
      { name: "Forehead Threading", price: 40, duration: "8 min" },
    ],
  },
  {
    id: "women-bleach",
    gender: "women",
    icon: "✨",
    title: "Bleach",
    description: "Brightening bleach treatments for an even, radiant complexion",
    services: [
      { name: "Face Bleach", price: 199, duration: "30 min" },
      { name: "Full Arms Bleach", price: 299, duration: "40 min" },
      { name: "Full Body Bleach", price: 1299, oldPrice: 1699, offer: "24% OFF", duration: "90 min" },
      { name: "O3+ Bleach (Face)", price: 399, duration: "40 min" },
    ],
  },
  {
    id: "women-cleanup",
    gender: "women",
    icon: "🧼",
    title: "Cleanup",
    description: "Refreshing facial cleanup for fresh glowing skin",
    services: [
      { name: "Basic Cleanup", price: 249, duration: "30 min" },
      { name: "Premium Cleanup", price: 449, oldPrice: 599, offer: "25% OFF", duration: "45 min" },
      { name: "Peel-Off Cleanup", price: 349, duration: "40 min" },
      { name: "De-Tan Cleanup", price: 399, duration: "45 min" },
    ],
  },
  {
    id: "women-detan",
    gender: "women",
    icon: "☀️",
    title: "De-Tan",
    description: "Sun tan removal for brighter, even-toned skin",
    services: [
      { name: "Face De-Tan", price: 299, duration: "35 min" },
      { name: "Arms De-Tan", price: 399, duration: "40 min" },
      { name: "Back De-Tan", price: 499, duration: "45 min" },
      { name: "Full Body De-Tan", price: 1499, oldPrice: 1999, offer: "25% OFF", duration: "90 min" },
    ],
  },
  {
    id: "women-manicure",
    gender: "women",
    icon: "💅",
    title: "Manicure",
    description: "Luxurious hand and nail care treatments",
    services: [
      { name: "Basic Manicure", price: 299, duration: "40 min" },
      { name: "Premium Manicure", price: 499, oldPrice: 699, offer: "29% OFF", duration: "55 min" },
      { name: "Gel Manicure", price: 699, duration: "60 min" },
      { name: "Spa Manicure", price: 799, duration: "70 min" },
      { name: "Nail Art (Per Nail)", price: 50, duration: "5 min per nail" },
    ],
  },
  {
    id: "women-pedicure",
    gender: "women",
    icon: "👣",
    title: "Pedicure",
    description: "Relaxing foot and nail care for healthy, beautiful feet",
    services: [
      { name: "Basic Pedicure", price: 349, duration: "45 min" },
      { name: "Premium Pedicure", price: 549, oldPrice: 749, offer: "27% OFF", duration: "60 min" },
      { name: "Gel Pedicure", price: 749, duration: "65 min" },
      { name: "Spa Pedicure", price: 899, duration: "75 min" },
      { name: "Crystal Pedicure", price: 999, duration: "80 min" },
    ],
  },
  {
    id: "women-massage",
    gender: "women",
    icon: "🧴",
    title: "Body Massage",
    description: "Therapeutic and relaxation massages with premium oils",
    services: [
      { name: "Head + Shoulder Massage", price: 499, duration: "45 min" },
      { name: "Swedish Massage (60 min)", price: 999, duration: "60 min" },
      { name: "Deep Tissue Massage", price: 1299, duration: "75 min" },
      { name: "Aromatherapy Massage", price: 1499, oldPrice: 1999, offer: "25% OFF", duration: "90 min" },
      { name: "Full Body Massage (90 min)", price: 1799, duration: "90 min" },
    ],
  },
  {
    id: "kids-haircut",
    gender: "kids",
    icon: "👶",
    title: "Kids Hair Cut",
    description: "Gentle, fun haircuts for children in a comfortable environment",
    services: [
      { name: "Boys Hair Cut (Below 5)", price: 99, duration: "20 min" },
      { name: "Boys Hair Cut (5–10 yrs)", price: 120, duration: "25 min" },
      { name: "Girls Hair Cut (Below 5)", price: 120, duration: "25 min" },
      { name: "Girls Hair Cut (5–10 yrs)", price: 150, duration: "30 min" },
      { name: "Hair Wash + Blow Dry (Kids)", price: 199, duration: "35 min" },
    ],
  },
];
