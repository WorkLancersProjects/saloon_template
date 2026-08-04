"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonialsData } from "@/data/testimonials";

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-3.5 h-3.5"
          viewBox="0 0 20 20"
          fill={i < n ? "#C6A15B" : "#E5E7EB"}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref    = useRef(null);
  const inView  = useInView(ref, { once: true });
  const [idx, setIdx] = useState(0);
  const max = testimonialsData.length - 1;

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i >= max ? 0 : i + 1)), 5500);
    return () => clearInterval(t);
  }, [max]);

  const t = testimonialsData[idx];

  return (
    <section className="section bg-white">
      <div className="wrap">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="label mb-3">Client Love</p>
          <h2 className="h-lg" style={{ color: "#234E70" }}>What They Say</h2>
          <div className="rule rule-center" style={{ margin: "16px auto 0" }} />
        </motion.div>

        {/* Google badge */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex items-center gap-3 border px-6 py-3"
            style={{ borderColor: "#E5E7EB", borderRadius: "100px" }}>
            <Stars />
            <span className="font-heading font-bold text-lg" style={{ color: "#234E70" }}>4.9</span>
            <span className="text-sm font-body" style={{ color: "#6B7280" }}>on Google · 500+ reviews</span>
          </div>
        </div>

        {/* Carousel */}
        <div className="max-w-2xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1,  y: 0  }}
              exit={{   opacity: 0,  y: -10 }}
              transition={{ duration: 0.42 }}
            >
              {/* Quote */}
              <div className="mb-8">
                <svg className="w-8 h-8 mx-auto mb-5 opacity-20" viewBox="0 0 40 40" fill="#234E70">
                  <path d="M0 20C0 8.954 8.954 0 20 0v8c-6.627 0-12 5.373-12 12v2h12v18H0V20zm20 0c0-11.046 8.954-20 20-20v8c-6.627 0-12 5.373-12 12v2h12v18H20V20z" />
                </svg>
                <blockquote className="font-heading italic leading-relaxed" style={{ fontSize: "clamp(1.1rem,2.5vw,1.4rem)", color: "#1F2937" }}>
                  &ldquo;{t.text.slice(0, 180)}{t.text.length > 180 ? "…" : ""}&rdquo;
                </blockquote>
              </div>

              {/* Author */}
              <div className="flex items-center justify-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2" style={{ borderColor: "#C6A15B" }}>
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="44px" />
                </div>
                <div className="text-left">
                  <p className="font-body font-semibold text-sm" style={{ color: "#1F2937" }}>{t.name}</p>
                  <p className="font-body text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{t.service}</p>
                </div>
                <div className="ml-2">
                  <Stars n={t.rating} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              disabled={idx === 0}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors disabled:opacity-30"
              style={{ borderColor: "#E5E7EB", color: "#6B7280" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#234E70"; e.currentTarget.style.color = "#234E70"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.color = "#6B7280"; }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-1.5">
              {testimonialsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className="rounded-full transition-all duration-300"
                  style={{ width: i === idx ? 24 : 6, height: 6, background: i === idx ? "#234E70" : "#E5E7EB" }}
                />
              ))}
            </div>

            <button
              onClick={() => setIdx((i) => Math.min(max, i + 1))}
              disabled={idx === max}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors disabled:opacity-30"
              style={{ borderColor: "#E5E7EB", color: "#6B7280" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#234E70"; e.currentTarget.style.color = "#234E70"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.color = "#6B7280"; }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
