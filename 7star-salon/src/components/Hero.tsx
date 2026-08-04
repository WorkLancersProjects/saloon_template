"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";

const BG_IMAGES = [
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=85",
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&q=85",
  "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=1920&q=85",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=85",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&q=85",
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
  const [prev, setPrev] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  // Rotate background every INTERVAL ms
  useEffect(() => {
    const t = setInterval(() => {
      setPrev((p) => (p === null ? imgIdx : p));
      setImgIdx((i) => (i + 1) % BG_IMAGES.length);
    }, INTERVAL);
    return () => clearInterval(t);
  }, [imgIdx]);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" ref={ref} className="relative h-screen min-h-[680px] overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/70 z-10" />
      </div>

      {/* Centered content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6"
      >
        {/* Logo — centred */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8"
        >
          <Image
            src="/white_logo.svg"
            alt="7Star Salon"
            width={120}
            height={96}
            className="mx-auto drop-shadow-2xl"
            priority
            loading="eager"
          />
        </motion.div>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="label text-white/60 mb-5 tracking-[0.3em]"
        >
          Premium Hair Studio
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-white font-heading font-bold leading-[1.1] tracking-tight mb-5"
          style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)" }}
        >
          Your Style.
          <br />
          <em className="not-italic" style={{ color: "#C6A15B" }}>Our Passion.</em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="text-white/60 font-body text-sm sm:text-base max-w-md leading-relaxed mb-10 mx-auto"
        >
          Expert haircuts, colour, bridal &amp; grooming — for men and women across Bangalore.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => go("hairstyles")}
            className="btn group text-sm"
            style={{ background: "#234E70" }}
          >
            View Hairstyles
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => go("services")}
            className="btn-ghost text-sm text-white border-white/50 hover:bg-white hover:text-[#234E70]"
          >
            Our Services
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex items-center justify-center gap-10 sm:gap-16"
        >
          {stats.map((s, i) => (
            <div key={s.label} className="text-center">
              {i > 0 && <div className="hidden sm:block absolute -left-8 top-1/2 -translate-y-1/2 w-px h-8 bg-white/20" />}
              <p className="font-heading font-bold text-white text-2xl sm:text-3xl leading-none">{s.value}</p>
              <p className="text-white/45 font-body text-xs mt-1 tracking-wider uppercase">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Image indicator dots */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {BG_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setImgIdx(i)}
            className={`rounded-full transition-all duration-500 ${
              i === imgIdx ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
      >
        <span className="text-white/30 text-[10px] tracking-widest uppercase font-body">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ChevronDown className="w-4 h-4 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
