"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { branchesData, type Branch } from "@/data/branches";

/* ── Full Lightbox ──────────────────────────────────────────────────────── */
function Lightbox({ branch, idx, onClose, onNav }: {
  branch: Branch; idx: number; onClose: () => void; onNav: (i: number) => void;
}) {
  const img = branch.images[idx];

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape")      onClose();
    if (e.key === "ArrowLeft")   onNav(Math.max(0, idx - 1));
    if (e.key === "ArrowRight")  onNav(Math.min(branch.images.length - 1, idx + 1));
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
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/92 p-4"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors" aria-label="Close">
        <X className="w-4 h-4" />
      </button>

      <motion.div
        key={idx}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1,    opacity: 1 }}
        transition={{ duration: 0.28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-xl overflow-hidden"
        style={{ maxHeight: "86vh" }}
      >
        <div className="relative" style={{ aspectRatio: "16/10" }}>
          <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="100vw" priority />
        </div>

        <div className="absolute bottom-0 inset-x-0 px-6 py-5"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
          <p className="text-white text-sm font-body">{img.alt}</p>
          <p className="text-white/50 text-xs font-body mt-0.5">{branch.name} Branch</p>
        </div>

        {/* Progress dots */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {branch.images.map((_, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); onNav(i); }}
              className="rounded-full transition-all"
              style={{ width: i === idx ? 20 : 6, height: 6, background: i === idx ? "#fff" : "rgba(255,255,255,0.35)" }}
            />
          ))}
        </div>

        {idx > 0 && (
          <button onClick={(e) => { e.stopPropagation(); onNav(idx - 1); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors" aria-label="Prev">
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {idx < branch.images.length - 1 && (
          <button onClick={(e) => { e.stopPropagation(); onNav(idx + 1); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors" aria-label="Next">
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ── Branch gallery modal ───────────────────────────────────────────────── */
function BranchModal({ branch, onClose }: { branch: Branch | null; onClose: () => void }) {
  const [lbIdx, setLbIdx] = useState<number | null>(null);

  return (
    <AnimatePresence>
      {branch && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
            onClick={onClose}
          >
            <div className="absolute inset-0 backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.55)" }} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 14 }}
              animate={{ scale: 1,    opacity: 1, y: 0  }}
              exit={{   scale: 0.96,  opacity: 0        }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white w-full max-w-xl overflow-hidden shadow-2xl"
              style={{ borderRadius: "16px" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-7 py-5 border-b" style={{ borderColor: "#E5E7EB" }}>
                <div>
                  <h3 className="font-heading font-semibold text-lg" style={{ color: "#234E70" }}>{branch.name}</h3>
                  <p className="text-xs font-body mt-0.5 flex items-center gap-1" style={{ color: "#9CA3AF" }}>
                    <MapPin className="w-3 h-3" /> {branch.location}
                  </p>
                </div>
                <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                  style={{ background: "#FAF7F0" }} aria-label="Close">
                  <X className="w-4 h-4" style={{ color: "#6B7280" }} />
                </button>
              </div>

              {/* 2×2 grid */}
              <div className="p-5 grid grid-cols-2 gap-3">
                {branch.images.map((img, i) => (
                  <motion.button
                    key={img.src}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => setLbIdx(i)}
                    className="relative overflow-hidden group bg-[#E8E4DE]"
                    style={{ aspectRatio: "4/3", borderRadius: "8px" }}
                  >
                    <Image src={img.src} alt={img.alt} fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width:640px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "rgba(35,78,112,0.35)" }}>
                      <span className="text-white text-[10px] font-body border border-white/60 px-3 py-1.5 tracking-widest uppercase">View</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {lbIdx !== null && (
              <Lightbox branch={branch} idx={lbIdx} onClose={() => setLbIdx(null)} onNav={setLbIdx} />
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Branch card ───────────────────────────────────────────────────────── */
function BranchCard({ branch, index, onClick }: { branch: Branch; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group overflow-hidden"
      style={{ borderRadius: "12px" }}
    >
      <div className="relative overflow-hidden bg-[#E8E4DE]" style={{ aspectRatio: "4/3" }}>
        <Image
          src={branch.cover} alt={`${branch.name} branch`} fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.52), transparent)" }} />
        <h3 className="absolute bottom-4 left-4 font-heading font-semibold text-xl text-white">{branch.name}</h3>
      </div>
      <div className="p-5 flex items-center justify-between gap-4">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "#C6A15B" }} />
          <p className="text-xs font-body leading-relaxed line-clamp-2" style={{ color: "#6B7280" }}>{branch.location}</p>
        </div>
        <button
          onClick={onClick}
          className="text-xs font-body font-medium px-4 py-2 border shrink-0 transition-all duration-200"
          style={{ color: "#234E70", borderColor: "#234E70" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#234E70"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#234E70"; }}
        >
          View Gallery
        </button>
      </div>
    </motion.div>
  );
}

/* ── Main section ───────────────────────────────────────────────────────── */
export default function Gallery() {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true });
  const [selected, setSelected] = useState<Branch | null>(null);

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
            Four premium branches across Bangalore — each carrying the same commitment to craft and luxury.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {branchesData.map((b, i) => (
            <BranchCard key={b.id} branch={b} index={i} onClick={() => setSelected(b)} />
          ))}
        </div>
      </div>

      <BranchModal branch={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
