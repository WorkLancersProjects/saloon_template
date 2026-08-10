"use client";

import { servicesData, type ServiceCategory } from "@/data/services";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, ChevronDown, IndianRupee, X } from "lucide-react";
import { useRef, useState } from "react";

/* Curated, close-match imagery per category — visual anchor of the card */
const CATEGORY_IMAGES: Record<string, string> = {
  "men-haircut":         "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop",
  "men-colour":          "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&auto=format&fit=crop",
  "men-facial":          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop",
  "men-massage":         "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&auto=format&fit=crop",
  "men-bleach":          "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&auto=format&fit=crop",
  "men-cleanup":         "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&auto=format&fit=crop",
  "men-spa":             "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop",
  "men-straightening":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop",
  "men-other":          "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=800&auto=format&fit=crop",
  "women-haircut":       "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop",
  "women-colour":        "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&auto=format&fit=crop",
  "women-spa":           "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop",
  "women-straightening": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop",
  "women-makeup":        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&auto=format&fit=crop",
  "women-threading":     "https://images.unsplash.com/photo-1500840216050-6ffa99d75160?w=800&auto=format&fit=crop",
  "women-cleanup":       "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&auto=format&fit=crop",
  "women-detan":         "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop",
  "women-manicure":      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&auto=format&fit=crop",
  "women-pedicure":      "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&auto=format&fit=crop",
  "women-massage":       "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&auto=format&fit=crop",
  "women-oil-massage":   "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&auto=format&fit=crop",
  "women-other":         "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=800&auto=format&fit=crop",
  "women-kids-cut":      "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&auto=format&fit=crop",
  "kids-haircut":        "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&auto=format&fit=crop",
};

const fmt = (n: number) => n.toLocaleString("en-IN");

/* ── Service detail modal ─────────────────────────────────────────────── */
function ServiceModal({ cat, onClose }: { cat: ServiceCategory | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {cat && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-200 flex items-center justify-center p-4 sm:p-8"
          onClick={onClose}
        >
          <div className="absolute inset-0 backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.5)" }} />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 14 }}
            animate={{ scale: 1,    opacity: 1, y: 0  }}
            exit={{   scale: 0.97,  opacity: 0        }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white w-full max-w-lg max-h-[82vh] flex flex-col overflow-hidden shadow-2xl"
            style={{ borderRadius: "14px" }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-7 py-6 border-b" style={{ borderColor: "#E5E7EB" }}>
              <div className="flex items-start gap-4 min-w-0">
                <img
                  src={cat.imageUrl ?? CATEGORY_IMAGES[cat.id] ?? "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop"}
                  alt={cat.title}
                  className="h-11 w-11 shrink-0 rounded-xl object-cover"
                  style={{ background: "#EEF5FA" }}
                />
                <div className="min-w-0">
                  <h3 className="font-heading font-semibold text-xl leading-tight" style={{ color: "#234E70" }}>{cat.title}</h3>
                  {cat.description && (
                    <p className="text-xs font-body mt-1" style={{ color: "#6B7280" }}>{cat.description}</p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 shrink-0 flex items-center justify-center transition-colors rounded-full"
                style={{ background: "#FAF7F0" }}
                aria-label="Close"
              >
                <X className="w-4 h-4" style={{ color: "#6B7280" }} />
              </button>
            </div>

            {/* Table header */}
            <div className="flex items-center px-7 py-3" style={{ background: "#EEF5FA" }}>
              <span className="flex-1 text-[10px] font-body font-semibold uppercase tracking-wider" style={{ color: "#234E70" }}>
                Service · {cat.services.length} options
              </span>
              <span className="text-[10px] font-body font-semibold uppercase tracking-wider" style={{ color: "#234E70" }}>
                Price
              </span>
            </div>

            {/* Service rows */}
            <div className="overflow-y-auto flex-1 no-scrollbar">
              {cat.services.map((s) => {
                const savings = s.oldPrice ? s.oldPrice - s.price : null;
                return (
                  <div
                    key={s.name}
                    className="flex items-center px-7 py-4 border-b last:border-0 font-bold"
                    style={{ borderColor: "#F3F4F6" }}
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <span className="block text-sm font-body font-medium" style={{ color: "#1F2937" }}>
                        {s.name}
                      </span>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        {s.offer && (
                          <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full"
                            style={{ background: "#FDF3E3", color: "#B4821F" }}>
                            {s.offer}
                          </span>
                        )}
                        {/*
                        {s.duration && (
                          <span className="text-xs font-body inline-flex items-center gap-1" style={{ color: "#9CA3AF" }}>
                            <Clock className="w-3 h-3" />{s.duration}
                          </span>
                        )}
                        */}
                        {savings ? (
                          <span className="text-xs font-semibold font-body" style={{ color: "#059669" }}>
                            Save ₹{fmt(savings)}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="flex items-center justify-end gap-2">
                        {s.oldPrice && (
                          <span className="text-sm line-through font-body" style={{ color: "#9CA3AF" }}>
                            ₹{fmt(s.oldPrice)}
                          </span>
                        )}
                        <span className="font-heading font-bold text-lg flex items-center justify-end leading-none"
                          style={{ color: "#234E70" }}>
                          <IndianRupee className="w-4 h-4" />{fmt(s.price)}
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-7 py-4 border-t" style={{ borderColor: "#E5E7EB", background: "#FAF7F0" }}>
              <p className="text-xs font-body text-center" style={{ color: "#9CA3AF" }}>
                Prices vary by hair length & complexity. Ask us for a personalised quote.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Category card ──────────────────────────────────────────────────────── */
function CategoryCard({ cat, onClick, delay }: { cat: ServiceCategory; onClick: () => void; delay: number }) {
  const minPrice = Math.min(...cat.services.map((s) => s.price));
  const img = cat.imageUrl ?? CATEGORY_IMAGES[cat.id] ?? "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop";

  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay }}
      onClick={onClick}
      className="group w-full bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col overflow-hidden"
      style={{ borderRadius: "14px", border: "1px solid #E5E7EB" }}
    >
      {/* 1. Image — primary visual anchor (full width, 4:3) */}
      <div className="relative w-full aspect-4/3 overflow-hidden" style={{ background: "#EEF5FA" }}>
        <img
          src={img}
          alt={cat.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* 5. Service count badge — top-right, subtle white chip */}
        <span
          className="absolute top-3 right-3 text-[10px] font-body font-semibold px-2.5 py-1 rounded-full backdrop-blur"
          style={{ background: "rgba(255,255,255,0.88)", color: "#234E70" }}
        >
          {cat.services.length} services
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* 4. Title — supporting heading (image now leads visually) */}
        <h3 className="font-heading font-semibold text-lg leading-tight" style={{ color: "#1F2937" }}>
          {cat.title}
        </h3>

        {/* 6. Tagline — most subtle, one line */}
        <p className="text-xs font-body leading-relaxed mt-1 line-clamp-1" style={{ color: "#9CA3AF" }}>
          {cat.description}
        </p>

        {/* 2. Price + 3. View Services — primary actions, anchored to bottom */}
        <div className="flex items-end justify-between gap-3 mt-auto pt-5">
          <div>
            <p className="text-[9px] font-body font-medium uppercase tracking-wider" style={{ color: "#9CA3AF" }}>
              Starting from
            </p>
            <p className="font-heading font-bold text-2xl flex items-center mt-1 leading-none" style={{ color: "#234E70" }}>
              <IndianRupee className="w-4 h-4" />{fmt(minPrice)}
            </p>
          </div>
          <span
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-300 group-hover:gap-2.5"
            style={{ background: "#234E70", color: "#fff" }}
          >
            View Services
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}

/* ── Main section ───────────────────────────────────────────────────────── */
export default function Services() {
  const ref   = useRef(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: true });
  const [gender,   setGender]   = useState<"men" | "women" | "kids">("men");
  const [showAll,  setShowAll]  = useState(false);
  const [selected, setSelected] = useState<ServiceCategory | null>(null);

  const cats = servicesData.filter((c) => c.gender === gender);
  const visible = showAll ? cats : cats.slice(0, 6);

  return (
    <section id="services" className="section" style={{ background: "#EEF5FA" }}>
      <div className="wrap">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-7 mb-14"
        >
          <div>
            <p className="label mb-2.5">Service Menu</p>
            <h2 className="h-lg" style={{ color: "#234E70" }}>Services & Pricing</h2>
            <div className="rule rule-left mt-4" />
          </div>

          {/* Gender segmented control */}
          <div className="inline-flex self-start sm:self-auto p-1 border rounded-full"
            style={{ background: "#fff", borderColor: "#E5E7EB" }}>
            {(["men", "women", "kids"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className="px-5 py-2 text-xs font-body font-medium capitalize rounded-full transition-all duration-200"
                style={
                  gender === g
                    ? { background: "#234E70", color: "#fff" }
                    : { background: "transparent", color: "#6B7280" }
                }
              >
                {g === "men" ? "Men" : g === "women" ? "Women" : "Kids"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={gender}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1,  y: 0  }}
            exit={{   opacity: 0         }}
            transition={{ duration: 0.28 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visible.map((cat, i) => (
              <CategoryCard key={cat.id} cat={cat} onClick={() => setSelected(cat)} delay={i * 0.05} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Show more / Show less */}
        {cats.length > 6 && (
          <div className="mt-12 flex justify-center">
            <button
              ref={btnRef}
              onClick={() => {
                if (showAll) {
                  setShowAll(false);
                  requestAnimationFrame(() => {
                    btnRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                  });
                } else {
                  setShowAll(true);
                }
              }}
              className="btn-ghost"
              aria-expanded={showAll}
            >
              {showAll ? "Show less" : "Show more"}
              <ChevronDown
                className="w-4 h-4"
                style={{ transform: showAll ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }}
              />
            </button>
          </div>
        )}
      </div>

      <ServiceModal cat={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
