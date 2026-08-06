"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, MapPin, ArrowRight } from "lucide-react";
import { branchesData, type Branch } from "@/data/branches";

/* ── Image lightbox (direct, chevron nav) ─────────────────────────────── */
function Lightbox({ branch, idx, onClose, onNav }: {
  branch: Branch; idx: number; onClose: () => void; onNav: (i: number) => void;
}) {
  const img = branch.images[idx];

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft")  onNav((idx - 1 + branch.images.length) % branch.images.length);
    if (e.key === "ArrowRight") onNav((idx + 1) % branch.images.length);
  }, [onClose, onNav, idx, branch.images.length]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [handleKey]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-300 flex items-center justify-center bg-black/92 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button onClick={onClose}
        className="absolute top-5 right-5 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        aria-label="Close">
        <X className="w-4 h-4" />
      </button>

      <motion.div
        key={idx}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1,    opacity: 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ maxHeight: "88vh" }}
      >
        <div className="relative bg-black" style={{ aspectRatio: "16/10" }}>
          <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="100vw" priority />
        </div>

        {/* Caption strip: address prominent */}
        <div className="absolute bottom-0 inset-x-0 px-6 py-5"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78), transparent)" }}>
          <p className="text-white text-sm font-body font-medium leading-snug">
            {branch.name}
          </p>
          <p className="text-white/70 text-xs font-body mt-1 flex items-start gap-1.5">
            <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
            <span>{branch.location}</span>
          </p>
        </div>

        {/* Progress dots */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {branch.images.map((_, i) => (
            <button key={i}
              onClick={(e) => { e.stopPropagation(); onNav(i); }}
              className="rounded-full transition-all"
              style={{ width: i === idx ? 22 : 6, height: 6, background: i === idx ? "#fff" : "rgba(255,255,255,0.4)" }}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>

        <button onClick={(e) => { e.stopPropagation(); onNav((idx - 1 + branch.images.length) % branch.images.length); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/15 hover:bg-white/30 backdrop-blur rounded-full flex items-center justify-center text-white transition-colors"
          aria-label="Previous image">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={(e) => { e.stopPropagation(); onNav((idx + 1) % branch.images.length); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/15 hover:bg-white/30 backdrop-blur rounded-full flex items-center justify-center text-white transition-colors"
          aria-label="Next image">
          <ChevronRight className="w-5 h-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ── Branch card ───────────────────────────────────────────────────────── */
function BranchCard({ branch, index, total, onClick }: {
  branch: Branch; index: number; total: number; onClick: () => void;
}) {
  const padded = String(index + 1).padStart(2, "0");
  const paddedTotal = String(total).padStart(2, "0");

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group text-left bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
      style={{ borderRadius: "14px" }}
    >
      {/* Cover image — primary visual anchor */}
      <div className="relative overflow-hidden bg-[#E8E4DE]" style={{ aspectRatio: "5/4" }}>
        <Image
          src={branch.cover} alt={`${branch.name} branch`} fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
        />
        {/* Top-left index chip */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full backdrop-blur"
          style={{ background: "rgba(255,255,255,0.85)" }}>
          <span className="text-[10px] font-body font-semibold tracking-widest" style={{ color: "#234E70" }}>
            {padded} <span style={{ color: "#C6A15B" }}>/</span> {paddedTotal}
          </span>
        </div>
      </div>

      {/* Content block — hierarchy: name → address → CTA */}
      <div className="p-5">
        <h3 className="font-heading font-semibold text-xl leading-tight" style={{ color: "#234E70" }}>
          {branch.name}
        </h3>

        <div className="mt-3 flex items-start gap-2">
          <MapPin className="w-3.5 h-3.5 mt-1 shrink-0" style={{ color: "#C6A15B" }} />
          <p className="text-[13px] font-body leading-relaxed" style={{ color: "#4B5563" }}>
            {branch.location}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t flex items-center justify-between"
          style={{ borderColor: "#F3F4F6" }}>
          <span className="text-xs font-body font-semibold tracking-wider uppercase" style={{ color: "#234E70" }}>
            View Gallery
          </span>
          <span className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1"
            style={{ background: "#234E70" }}>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}

/* ── Main section ───────────────────────────────────────────────────────── */
export default function Gallery() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  const [open, setOpen]       = useState<{ branch: Branch; idx: number } | null>(null);

  return (
    <section id="branches" className="section" style={{ background: "#EEF5FA" }}>
      <div className="wrap">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="label mb-2.5">Locations</p>
          <h2 className="h-lg" style={{ color: "#234E70" }}>Our Branches</h2>
          <div className="rule rule-left mt-4" />
          <p className="text-sm font-body mt-4 max-w-md" style={{ color: "#6B7280" }}>
            Four premium branches across Chennai — each carrying the same commitment to craft and luxury.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {branchesData.map((b, i) => (
            <BranchCard
              key={b.id}
              branch={b}
              index={i}
              total={branchesData.length}
              onClick={() => setOpen({ branch: b, idx: 0 })}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <Lightbox
            branch={open.branch}
            idx={open.idx}
            onClose={() => setOpen(null)}
            onNav={(i) => setOpen({ branch: open.branch, idx: i })}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
