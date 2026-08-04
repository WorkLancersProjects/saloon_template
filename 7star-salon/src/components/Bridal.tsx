"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronDown } from "lucide-react";
import { bridalCategories } from "@/data/bridalServices";

// ── Bridal Services Modal ────────────────────────────────────────────────────
function BridalModal({ onClose }: { onClose: () => void }) {
  const [activeId, setActiveId] = useState(bridalCategories[0].id);
  const active = bridalCategories.find((c) => c.id === activeId)!;

  // lock scroll
  useState(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[85vh] rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-[#E5E7EB] shrink-0">
          <div>
            <h2 className="font-heading font-bold text-[#234E70] text-xl">Bridal Collection</h2>
            <p className="text-[#9CA3AF] text-xs font-body mt-0.5">Complete bridal service menu</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#FAF7F0] hover:bg-[#E5E7EB] flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-[#1F2937]" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar — category tabs */}
          <div className="w-40 sm:w-48 bg-[#FAF7F0] border-r border-[#E5E7EB] overflow-y-auto shrink-0 no-scrollbar">
            {bridalCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveId(cat.id)}
                className={`w-full text-left px-4 py-3.5 text-xs font-body font-medium transition-all border-l-2 ${
                  activeId === cat.id
                    ? "border-[#234E70] bg-white text-[#234E70]"
                    : "border-transparent text-[#6B7280] hover:text-[#234E70] hover:bg-white/60"
                }`}
              >
                <span className="block text-base mb-0.5">{cat.icon}</span>
                {cat.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="p-6"
              >
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-2xl">{active.icon}</span>
                  <h3 className="font-heading font-semibold text-[#234E70] text-lg">{active.title}</h3>
                </div>

                {/* Standard services list */}
                {active.services.length > 0 && (
                  <div className="mb-6">
                    {/* Table header */}
                    <div className="flex items-center justify-between px-4 py-2 bg-[#EEF5FA] rounded-t-lg">
                      <span className="text-[#234E70] text-[10px] font-body font-semibold uppercase tracking-wider">Service</span>
                      <span className="text-[#234E70] text-[10px] font-body font-semibold uppercase tracking-wider">Price</span>
                    </div>
                    <div className="border border-[#E5E7EB] border-t-0 rounded-b-lg overflow-hidden">
                      {active.services.map((s, i) => (
                        <div
                          key={s.name}
                          className={`flex items-center justify-between px-4 py-3.5 ${
                            i % 2 === 0 ? "bg-white" : "bg-[#FAF7F0]"
                          } border-b border-[#F3F4F6] last:border-0`}
                        >
                          <span className="text-sm font-body text-[#1F2937]">{s.name}</span>
                          <span className="text-sm font-semibold font-body text-[#234E70] ml-4 text-right">{s.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sub-categories (Bleach / Waxing) */}
                {active.subCategories && active.subCategories.map((sub, si) => (
                  <div key={si} className="mb-5">
                    {sub.title && (
                      <p className="text-[#234E70] text-xs font-body font-semibold uppercase tracking-widest mb-2 mt-4">
                        {sub.title}
                      </p>
                    )}
                    {/* Waxing has 2 price columns */}
                    {sub.rows[0]?.price2 ? (
                      <>
                        <div className="flex items-center px-4 py-2 bg-[#EEF5FA] rounded-t-lg">
                          <span className="flex-1 text-[#234E70] text-[10px] font-body font-semibold uppercase tracking-wider">Service</span>
                          <span className="w-24 text-right text-[#234E70] text-[10px] font-body font-semibold uppercase tracking-wider">Honey Wax</span>
                          <span className="w-24 text-right text-[#234E70] text-[10px] font-body font-semibold uppercase tracking-wider">Rice Wax</span>
                        </div>
                        <div className="border border-[#E5E7EB] border-t-0 rounded-b-lg overflow-hidden">
                          {sub.rows.map((r, ri) => (
                            <div
                              key={r.label}
                              className={`flex items-center px-4 py-3 ${
                                ri % 2 === 0 ? "bg-white" : "bg-[#FAF7F0]"
                              } border-b border-[#F3F4F6] last:border-0`}
                            >
                              <span className="flex-1 text-sm font-body text-[#1F2937]">{r.label}</span>
                              <span className="w-24 text-right text-sm font-semibold font-body text-[#234E70]">{r.price}</span>
                              <span className="w-24 text-right text-sm font-semibold font-body text-[#234E70]">{r.price2}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        {sub.title && (
                          <div className="flex items-center justify-between px-4 py-2 bg-[#EEF5FA] rounded-t-lg">
                            <span className="text-[#234E70] text-[10px] font-body font-semibold uppercase tracking-wider">Type</span>
                            <span className="text-[#234E70] text-[10px] font-body font-semibold uppercase tracking-wider">Price</span>
                          </div>
                        )}
                        <div className={`border border-[#E5E7EB] ${sub.title ? "border-t-0 rounded-b-lg" : "rounded-lg"} overflow-hidden`}>
                          {sub.rows.map((r, ri) => (
                            <div
                              key={r.label}
                              className={`flex items-center justify-between px-4 py-3 ${
                                ri % 2 === 0 ? "bg-white" : "bg-[#FAF7F0]"
                              } border-b border-[#F3F4F6] last:border-0`}
                            >
                              <span className="text-sm font-body text-[#1F2937]">{r.label}</span>
                              <span className="text-sm font-semibold font-body text-[#234E70]">{r.price}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="px-7 py-4 border-t border-[#E5E7EB] bg-[#FAF7F0] shrink-0">
          <p className="text-[#9CA3AF] text-xs font-body text-center">
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
      <section id="bridal" className="section bg-[#FAF7F0]">
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
              <h2 className="h-lg text-[#1F2937] mb-3 leading-snug">
                Look Perfect<br />On Your Day
              </h2>
              <div className="rule rule-left mb-7" />
              <p className="text-[#6B7280] text-sm font-body leading-[1.9] mb-8 max-w-sm">
                From hair to hemline — our dedicated bridal team crafts every detail ensuring you look and feel extraordinary on the most important day of your life.
              </p>

              {/* Service highlights */}
              <ul className="space-y-3 mb-10">
                {[
                  "Bridal Makeup (HD & Airbrush)",
                  "Reception & Engagement Makeup",
                  "Bridal Hair Styling & Updos",
                  "Saree Draping",
                  "Pre-Bridal Package",
                  "Body Care & Beauty Services",
                ].map((s) => (
                  <li key={s} className="flex items-center gap-3 text-sm font-body text-[#1F2937]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] shrink-0" />
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
