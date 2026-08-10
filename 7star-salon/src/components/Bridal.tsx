"use client";

import type { BridalCategory } from "@/data/bridalServices";
import { bridalCategories } from "@/data/bridalServices";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Bath,
  Brush,
  ChevronDown,
  CircleDot,
  Droplets,
  Flower,
  Leaf,
  Scissors,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import Image from "next/image";
import type { ComponentType, CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type IconType = ComponentType<{ className?: string; style?: CSSProperties }>;

const CATEGORY_ICONS: Record<string, IconType> = {
  "hair-styling": Scissors,
  makeup: Brush,
  "body-care": Bath,
  beauty: Sparkles,
  bleach: Leaf,
  detan: Sun,
  cleanup: Droplets,
  threading: CircleDot,
  waxing: Flower,
};

function catCount(cat: BridalCategory): number {
  const services = cat.services?.length ?? 0;
  const subRows = cat.subCategories?.reduce((n, s) => n + s.rows.length, 0) ?? 0;
  return services + subRows;
}

// ── Compact menu table (used for bleach / waxing grids) ──────────────────────
function MenuTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="flex items-center px-4 sm:px-5 py-2.5 bg-background-blued-blue">
        {headers.map((h, i) => (
          <span
            key={h}
            className={`font-body text-[10px] font-semibold uppercase tracking-wider text-primary ${
              i === 0 ? "flex-1 text-left" : "w-24 sm:w-28 text-right"
            } ${i > 0 ? "pl-3" : ""}`}
          >
            {h}
          </span>
        ))}
      </div>
      {rows.map((r, ri) => (
        <div
          key={ri}
          className={`flex items-center px-4 sm:px-5 py-3 ${
            ri % 2 === 0 ? "bg-white" : "bg-backgroundd"
          } border-t border-[#F3F4F6]`}
        >
          {r.map((cell, ci) => (
            <span
              key={ci}
              className={`font-body text-sm ${
                ci === 0
                  ? "flex-1 text-left text-text"
                  : "w-24 sm:w-28 text-right font-semibold text-primary"
              } ${ci > 0 ? "pl-3" : ""}`}
            >
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Active category content ──────────────────────────────────────────────────
function CategoryContent({ cat }: { cat: BridalCategory }) {
  const Icon = CATEGORY_ICONS[cat.id] ?? Sparkles;
  const count = catCount(cat);
  const subs = cat.subCategories ?? [];
  const hasTwoPrices = subs.some((s) => s.rows.some((r) => r.price2));

  return (
    <div>
      {/* Category header */}
      <div className="flex items-center gap-3 mb-6">
        <span
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(198,161,91,0.12)" }}
        >
          <Icon className="w-5 h-5" style={{ color: "#C6A15B" }} />
        </span>
        <div>
          <h3 className="font-heading font-semibold text-xl leading-tight text-primary">{cat.title}</h3>
          <p className="font-body text-xs mt-0.5 text-[#9CA3AF]">
            {count} {count === 1 ? "service" : "services"}
          </p>
        </div>
      </div>

      {/* Standard services — dotted leader list */}
      {cat.services.length > 0 && (
        <div className="mb-7">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-2 text-[#9CA3AF]">
            Services &amp; Rates
          </p>
          <div>
            {cat.services.map((s, i) => (
              <div
                key={s.name}
                className={`flex items-baseline gap-3 py-2.5 ${i > 0 ? "border-t border-[#F3F4F6]" : ""}`}
              >
                <span className="text-[15px] font-body leading-snug text-text">{s.name}</span>
                <span className="flex-1 border-b border-dotted border-[#D3DAE2]" />
                <span className="text-[15px] font-semibold font-body whitespace-nowrap text-primary">
                  {s.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-category grids */}
      {subs.length > 0 && (
        <div>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-3 text-[#9CA3AF]">
            Services &amp; Rates
          </p>
          {hasTwoPrices ? (
            <MenuTable
              headers={["Service", "Honey Wax", "Rice Wax"]}
              rows={subs.flatMap((s) => s.rows).map((r) => [r.label, r.price, r.price2 ?? "—"])}
            />
          ) : (
            (() => {
              const brands = Array.from(new Set(subs.flatMap((s) => s.rows.map((r) => r.label))));
              return (
                <MenuTable
                  headers={["Area", ...brands]}
                  rows={subs.map((s) => [
                    s.title,
                    ...brands.map((b) => s.rows.find((r) => r.label === b)?.price ?? "—"),
                  ])}
                />
              );
            })()
          )}
        </div>
      )}
    </div>
  );
}

// ── Bridal Services Modal ────────────────────────────────────────────────────
function BridalModal({ onClose }: { onClose: () => void }) {
  const [activeId, setActiveId] = useState(bridalCategories[0].id);
  const active = bridalCategories.find((c) => c.id === activeId)!;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-200 flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full sm:max-w-4xl h-[94vh] sm:h-[88vh] rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="shrink-0 px-6 sm:px-8 py-5" style={{ background: "#234E70" }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-body text-[10px] font-semibold uppercase tracking-[0.24em] mb-1 text-accent">
                Bridal Studio
              </p>
              <h2 className="font-heading font-semibold text-white text-2xl leading-tight">Bridal Collection</h2>
              <p className="font-body text-xs mt-1 text-white/60">Complete service menu with indicative rates</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors shrink-0"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Mobile tab strip */}
        <div className="sm:hidden flex gap-2 overflow-x-auto no-scrollbar px-4 py-3 border-b border-border bg-background shrink-0">
          {bridalCategories.map((cat) => {
            const isActive = activeId === cat.id;
            const Icon = CATEGORY_ICONS[cat.id] ?? Sparkles;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveId(cat.id)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full font-body text-xs font-medium whitespace-nowrap transition-colors"
                style={{
                  background: isActive ? "#234E70" : "#fff",
                  color: isActive ? "#fff" : "#4B5A6A",
                  boxShadow: isActive ? "0 6px 14px rgba(35,78,112,0.25)" : "inset 0 0 0 1px #E5E7EB",
                }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: isActive ? "#C6A15B" : "#8A97A6" }} />
                {cat.title}
              </button>
            );
          })}
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar — desktop category nav */}
          <aside className="hidden sm:flex flex-col w-56 bg-background border-r border-border overflow-y-auto no-scrollbar p-3 gap-1 shrink-0">
            {bridalCategories.map((cat) => {
              const isActive = activeId === cat.id;
              const Icon = CATEGORY_ICONS[cat.id] ?? Sparkles;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveId(cat.id)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all hover:bg-white/70"
                  style={{
                    background: isActive ? "#234E70" : "transparent",
                    boxShadow: isActive ? "0 8px 20px rgba(35,78,112,0.22)" : "none",
                  }}
                >
                  <Icon
                    className="w-4 h-4 shrink-0"
                    style={{ color: isActive ? "#C6A15B" : "#8A97A6" }}
                  />
                  <span
                    className="flex-1 font-body text-sm font-medium"
                    style={{ color: isActive ? "#fff" : "#4B5A6A" }}
                  >
                    {cat.title}
                  </span>
                  <span
                    className="font-body text-[10px] font-semibold"
                    style={{ color: isActive ? "rgba(255,255,255,0.55)" : "#A9B4C0" }}
                  >
                    {catCount(cat)}
                  </span>
                </button>
              );
            })}
          </aside>

          {/* Content */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8"
              >
                <CategoryContent cat={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 sm:px-8 py-4 border-t border-border bg-background">
          <p className="font-body text-xs text-center text-[#9CA3AF]">
            Prices are indicative. Book a consultation for a personalised quote.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function Bridal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section id="bridal" className="section bg-background">
        <div className="wrap">
          <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-lg bg-[#E8E4DE]" style={{ aspectRatio: "3/4" }}>
                <Image
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&q=85"
                  alt="Bridal styling at 7Star Salon"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* floating badge */}
              <div
                className="absolute -bottom-5 -right-5 text-white px-6 py-4 hidden lg:block shadow-xl"
                style={{ background: "#234E70" }}
              >
                <p className="font-heading font-bold text-xl leading-tight">Dream Bridal</p>
                <p className="text-white/60 text-[10px] tracking-[0.2em] uppercase font-body mt-0.5">Complete Studio</p>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="label mb-4">Bridal Studio</p>
              <h2 className="h-lg text-text mb-3 leading-snug">
                Look Perfect<br />On Your Day
              </h2>
              <div className="rule rule-left mb-7" />
              <p className="text-muted text-sm font-body leading-[1.9] mb-8 max-w-sm">
                From hair to hemline — our dedicated bridal team crafts every detail ensuring you look and feel extraordinary on the most important day of your life.
              </p>

              {/* Service highlights */}
              <ul className="space-y-3.5 mb-10">
                {[
                  "Bridal Makeup (HD & Airbrush)",
                  "Reception & Engagement Makeup",
                  "Bridal Hair Styling & Updos",
                  "Saree Draping",
                  "Pre-Bridal Package",
                  "Body Care & Beauty Services",
                ].map((s) => (
                  <li key={s} className="flex items-center gap-3.5 font-body text-base font-medium leading-snug text-text">
                    <span className="w-2 h-2 rotate-45 shrink-0" style={{ background: "#C6A15B" }} />
                    {s}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setModalOpen(true)}
                className="btn group text-sm"
              >
                Explore Bridal Collection
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {modalOpen && <BridalModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
