import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#355C7D",
};

export const metadata: Metadata = {
  title: "7Star Salon | Premium Hair Studio — Bangalore",
  description:
    "7Star Salon is Bangalore's premier luxury hair studio offering expert haircuts, colour, bridal makeup, keratin treatments and grooming for men and women across 4 branches.",
  keywords: [
    "premium salon bangalore",
    "luxury hair studio",
    "bridal makeup bangalore",
    "haircut koramangala",
    "hair colour bangalore",
    "keratin treatment",
    "men grooming",
    "women haircut",
    "balayage bangalore",
    "7star salon",
  ],
  openGraph: {
    title: "7Star Salon | Premium Hair Studio",
    description:
      "Your Style. Our Passion. Experience luxury grooming at 7Star Salon — premium haircuts, bridal makeup, colour and more across 4 Bangalore branches.",
    type: "website",
    locale: "en_IN",
    siteName: "7Star Salon",
    images: [
      {
        url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "7Star Salon — Premium Hair Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "7Star Salon | Premium Hair Studio",
    description: "Your Style. Our Passion. Premium Hair Studio for Men & Women across Bangalore.",
    images: ["https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://7starsalon.in" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HairSalon",
              name: "7Star Salon",
              description: "Premium luxury hair studio for men, women and bridal services",
              url: "https://7starsalon.in",
              logo: "https://7starsalon.in/logo.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Main Street, Near City Mall",
                addressLocality: "Koramangala, Bangalore",
                addressRegion: "Karnataka",
                postalCode: "560034",
                addressCountry: "IN",
              },
              telephone: "+919876543210",
              email: "hello@7starsalon.in",
              openingHours: ["Mo-Fr 09:00-21:00", "Sa 09:00-22:00", "Su 10:00-20:00"],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "500",
                bestRating: "5",
              },
              priceRange: "₹₹",
              servesCuisine: [],
              hasMap: "https://maps.google.com",
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
