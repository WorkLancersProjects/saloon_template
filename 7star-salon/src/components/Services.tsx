"use client";

import { useRef, useState, type ComponentType, type CSSProperties } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  X, Clock, ArrowRight, IndianRupee, ChevronDown,
  Scissors, Palette, Sparkles, Sun, Droplets, Leaf, Flower, Gift,
  Wand2, Paintbrush, Feather, Target, Hand, Footprints, Baby,
} from "lucide-react";
import { servicesData, type ServiceCategory } from "@/data/services";

type IconType = ComponentType<{ className?: string; style?: CSSProperties }>;

/* Aesthetic line icons per category — replaces the old emoji glyphs */
const CATEGORY_ICONS: Record<string, IconType> = {
  "men-haircut":      Scissors,
  "men-colour":       Palette,
  "men-facial":       Sparkles,
  "men-massage":      Leaf,
  "men-bleach":       Sun,
  "men-cleanup":      Droplets,
  "men-spa":          Flower,
  "men-packages":     Gift,
  "women-haircut":    Scissors,
  "women-colour":     Palette,
  "women-spa":        Flower,
  "women-straightening": Wand2,
  "women-makeup":     Paintbrush,
  "women-waxing":     Feather,
  "women-threading":  Target,
  "women-bleach":     Sparkles,
  "women-cleanup":    Droplets,
  "women-detan":      Sun,
  "women-manicure":   Hand,
  "women-pedicure":   Footprints,
  "women-massage":    Leaf,
  "kids-haircut":     Baby,
};

const fmt = (n: number) => n.toLocaleString("en-IN");

/* ── Service detail modal ─────────────────────────────────────────────── */
function ServiceModal({ cat, onClose }: { cat: ServiceCategory | null; onClose: () => void }) {
  const Icon = cat ? CATEGORY_ICONS[cat.id] ?? Sparkles : null;

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
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: "#EEF5FA" }}>
                  {Icon && <Icon className="h-5 w-5" style={{ color: "#234E70" }} />}
                </span>
                <div>
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
  const Icon = CATEGORY_ICONS[cat.id] ?? Sparkles;

  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay }}
      onClick={onClick}
      className="group w-full bg-white border text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary"
      style={{ borderRadius: "14px", borderColor: "#E5E7EB" }}
    >
      {/* Top row — icon + meta */}
      <div className="flex items-start justify-between gap-3 p-6 pb-0">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-primary"
          style={{ background: "#EEF5FA" }}>
          <Icon className="h-6 w-6 transition-colors duration-300 group-hover:text-white" style={{ color: "#234E70" }} />
        </span>
        <span className="text-[11px] font-body font-medium px-2.5 py-1 rounded-full" style={{ background: "#FAF7F0", color: "#6B7280" }}>
          {cat.services.length} services
        </span>
      </div>

      {/* Title + description */}
      <div className="px-6 pt-5">
        <h3 className="font-heading font-semibold text-xl" style={{ color: "#1F2937" }}>
          {cat.title}
        </h3>
        <p className="text-[13px] font-body leading-relaxed mt-1.5 line-clamp-2" style={{ color: "#6B7280" }}>
          {cat.description}
        </p>
      </div>

      {/* Footer — price leads, CTA follows */}
      <div className="flex items-end justify-between gap-3 p-6 mt-5 border-t" style={{ borderColor: "#F3F4F6" }}>
        <div>
          <p className="text-[10px] font-body font-medium uppercase tracking-wider" style={{ color: "#9CA3AF" }}>
            Starting from
          </p>
          <p className="font-heading font-bold text-2xl flex items-center mt-1 leading-none" style={{ color: "#234E70" }}>
            <IndianRupee className="w-4 h-4" />{fmt(minPrice)}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-medium transition-all duration-300 group-hover:gap-3"
          style={{ background: "#234E70", color: "#fff" }}>
          View Services
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </motion.button>
  );
}

/* ── Main section ───────────────────────────────────────────────────────── */
export default function Services() {
  const ref   = useRef(null);
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
              onClick={() => setShowAll(!showAll)}
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
