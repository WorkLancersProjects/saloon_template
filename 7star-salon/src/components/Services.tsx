"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, IndianRupee } from "lucide-react";
import { servicesData, type ServiceCategory } from "@/data/services";

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
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
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
            <div className="flex items-center justify-between px-7 py-5 border-b" style={{ borderColor: "#E5E7EB" }}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <h3 className="font-heading font-semibold text-lg" style={{ color: "#234E70" }}>{cat.title}</h3>
                  <p className="text-xs font-body mt-0.5" style={{ color: "#9CA3AF" }}>{cat.services.length} services available</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center transition-colors rounded-full"
                style={{ background: "#FAF7F0" }}
                aria-label="Close"
              >
                <X className="w-4 h-4" style={{ color: "#6B7280" }} />
              </button>
            </div>

            {/* Table header */}
            <div className="flex items-center px-7 py-3" style={{ background: "#EEF5FA" }}>
              <span className="flex-1 text-[10px] font-body font-semibold uppercase tracking-wider" style={{ color: "#234E70" }}>
                Service
              </span>
              <span className="text-[10px] font-body font-semibold uppercase tracking-wider" style={{ color: "#234E70" }}>
                Price
              </span>
            </div>

            {/* Service rows */}
            <div className="overflow-y-auto flex-1 no-scrollbar">
              {cat.services.map((s, i) => (
                <div
                  key={s.name}
                  className="flex items-center px-7 py-4 border-b last:border-0"
                  style={{
                    background: i % 2 === 0 ? "#fff" : "#FAFAFA",
                    borderColor: "#F3F4F6",
                  }}
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-body font-medium" style={{ color: "#1F2937" }}>
                        {s.name}
                      </span>
                      {s.offer && (
                        <span className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full shrink-0"
                          style={{ background: "#FEF2F2", color: "#DC2626" }}>
                          {s.offer}
                        </span>
                      )}
                    </div>
                    {s.duration && (
                      <span className="text-xs font-body mt-0.5 block" style={{ color: "#9CA3AF" }}>{s.duration}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {s.oldPrice && (
                      <span className="text-xs line-through font-body" style={{ color: "#9CA3AF" }}>₹{s.oldPrice}</span>
                    )}
                    <span className="font-semibold font-body flex items-center text-sm" style={{ color: "#234E70" }}>
                      <IndianRupee className="w-3 h-3" />{s.price}
                    </span>
                  </div>
                </div>
              ))}
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
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay }}
      onClick={onClick}
      className="card p-7 text-left group cursor-pointer w-full"
      style={{ borderRadius: "12px" }}
    >
      <span className="text-3xl block mb-5">{cat.icon}</span>
      <h3 className="font-heading font-semibold text-lg mb-1.5 transition-colors group-hover:text-[#234E70]"
        style={{ color: "#1F2937" }}>
        {cat.title}
      </h3>
      <p className="text-xs font-body mb-5" style={{ color: "#9CA3AF" }}>
        {cat.services.length} services
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xs font-body" style={{ color: "#6B7280" }}>From ₹{minPrice}</span>
        <span className="text-xs font-body font-medium transition-transform group-hover:translate-x-1 inline-flex"
          style={{ color: "#234E70" }}>
          View →
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
  const [selected, setSelected] = useState<ServiceCategory | null>(null);

  const cats = servicesData.filter((c) => c.gender === gender);

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

          {/* Gender tabs */}
          <div className="flex gap-2">
            {(["men", "women", "kids"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className="px-5 py-2 text-xs font-body font-medium capitalize border transition-all duration-200"
                style={
                  gender === g
                    ? { background: "#234E70", color: "#fff", borderColor: "#234E70" }
                    : { background: "#fff", color: "#6B7280", borderColor: "#E5E7EB" }
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {cats.map((cat, i) => (
              <CategoryCard key={cat.id} cat={cat} onClick={() => setSelected(cat)} delay={i * 0.05} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <ServiceModal cat={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
