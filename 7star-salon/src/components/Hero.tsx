"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import HairstyleCatalogue from "./HaitstyleCatalogue";

const BG_IMAGES = [
  "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1920&q=85",
  "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=1920&q=85",
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&q=85",
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1920&q=85",
  "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=1920&q=85",
];

const INTERVAL = 4500;

const stats = [
  { value: "15+", label: "Years" },
  { value: "12K+", label: "Clients" },
  { value: "4.9★", label: "Rating" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [catalogueOpen, setCatalogueOpen] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  // Rotate background every INTERVAL ms
  useEffect(() => {
    const t = setInterval(() => setImgIdx((i) => (i + 1) % BG_IMAGES.length), INTERVAL);
    return () => clearInterval(t);
  }, []);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" ref={ref} className="relative h-screen min-h-205 overflow-hidden">
      {/* Background images — crossfade */}
      <div className="absolute inset-0 z-0">
        {BG_IMAGES.map((src, i) => (
          <AnimatePresence key={src}>
            {i === imgIdx && (
              <motion.div
                key={src + i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover scale-105"
                  priority={i === 0}
                  sizes="100vw"
                />
              </motion.div>
            )}
          </AnimatePresence>
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/75 z-10" />
      </div>

      {/* Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6"
      >
        {false && (
          <>
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 40 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="mb-12"
            >
              <Image
                src="/white_logo.svg"
                alt="7Star Salon"
                width={104}
                height={83}
                className="mx-auto drop-shadow-2xl"
                priority
                loading="eager"
              />
            </motion.div>

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 10 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="label mb-8 tracking-[0.28em]"
            >
              Family Salon
            </motion.p>
          </>
        )}


        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-white font-heading font-bold leading-[1.12] tracking-tight mb-10"
          style={{ fontSize: "clamp(2.75rem, 5.5vw, 4.75rem)" }}
        >
          Your Style.
          {/* <br /> */}
          <em className="not-italic" style={{ color: "#C6A15B" }}> Our Passion.</em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-white/70 font-body text-base sm:text-lg max-w-2xl leading-relaxed mb-16 mx-auto"
        >
          Expert haircuts, colour, bridal &amp; grooming — for men and women.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 w-full sm:w-auto mb-20"
        >
          <button
            onClick={() => setCatalogueOpen(true)}
            className="btn group rounded-xl px-10 py-4 text-base w-full sm:w-auto justify-center shadow-[0_12px_32px_rgba(35,78,112,0.45)]"
          >
            View Hairstyles
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => go("services")}
            className="btn-ghost rounded-xl px-10 py-4 text-base w-full sm:w-auto justify-center text-white border-white/40 backdrop-blur-md bg-white/10 hover:bg-white/20 hover:text-white"
          >
            Our Services
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.8 }}
          className="flex items-center justify-center gap-12 sm:gap-16"
        >
          {stats.map((s, i) => (
            <div key={s.label} className="relative text-center">
              {i > 0 && (
                <div className="absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2 w-px h-10 bg-white/15" />
              )}
              <p className="font-heading font-bold text-white text-2xl sm:text-3xl leading-none">{s.value}</p>
              <p className="text-white/50 font-body text-xs mt-3 tracking-wider uppercase">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Carousel dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-14 flex gap-2.5"
        >
          {BG_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setImgIdx(i)}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-500 ${
                i === imgIdx ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/35 hover:bg-white/60"
              }`}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
      >
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown className="w-4 h-4 text-white/40" />
        </motion.div>
      </motion.div>

      <HairstyleCatalogue isOpen={catalogueOpen} onClose={() => setCatalogueOpen(false)} />
    </section>
  );
}
