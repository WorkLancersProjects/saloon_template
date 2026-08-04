"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import HairstyleCard from "./HairstyleCard";
import HairstyleLightbox from "./HairstyleLightbox";
import { womensHairstyles, type Hairstyle } from "@/data/hairstyles";

const TAGS = ["All", "Layer", "Short", "Long", "Wedding", "Styled"];

export default function WomensHairstyles() {
  const ref    = useRef(null);
  const inView  = useInView(ref, { once: true });
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<Hairstyle | null>(null);

  const filtered = filter === "All"
    ? womensHairstyles
    : womensHairstyles.filter((h) => h.tags.includes(filter));

  return (
    <>
      <section className="section bg-white">
        <div className="wrap">
          <div ref={ref} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-7 mb-14">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="label mb-2.5">Women's Collection</p>
              <h2 className="h-lg" style={{ color: "#234E70" }}>Women's Hairstyles</h2>
              <div className="rule rule-left mt-4" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.18, duration: 0.55 }}
              className="flex flex-wrap gap-2"
            >
              {TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className="px-4 py-1.5 text-xs font-body font-medium tracking-wide border transition-all duration-200"
                  style={
                    filter === t
                      ? { background: "#234E70", color: "#fff", borderColor: "#234E70" }
                      : { background: "transparent", color: "#6B7280", borderColor: "#E5E7EB" }
                  }
                >
                  {t}
                </button>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {filtered.map((h, i) => (
              <HairstyleCard key={h.id} hairstyle={h} index={i} onClick={setActive} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-sm font-body py-16" style={{ color: "#9CA3AF" }}>
              No styles found for this filter.
            </p>
          )}
        </div>
      </section>

      <HairstyleLightbox
        hairstyle={active}
        all={filtered}
        onClose={() => setActive(null)}
        onNavigate={setActive}
      />
    </>
  );
}
