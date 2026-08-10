"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import { Check, BadgePercent, ChevronDown, IndianRupee } from "lucide-react";
import { packagesData } from "@/data/packages";

function PackageCard({ pkg, delay }: { pkg: (typeof packagesData)[0]; delay: number }) {
  const pct      = Math.round(((pkg.oldPrice - pkg.newPrice) / pkg.oldPrice) * 100);
  const savings  = pkg.oldPrice - pkg.newPrice;
  const featured = !!pkg.popular;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      className="card overflow-hidden"
      style={{
        borderRadius: "12px",
        background: featured ? "#234E70" : "#fff",
        border: featured ? "1px solid transparent" : "1px solid #E5E7EB",
        boxShadow: featured ? "0 24px 48px rgba(35,78,112,0.2)" : "none",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#E8E4DE]" style={{ aspectRatio: "16/9" }}>
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
        <div
          className="absolute top-3 right-3 flex items-center gap-1 rounded-full font-body text-xs font-bold px-3 py-1.5"
          style={{ background: "#C6A15B", color: "#1a3a55" }}
        >
          <BadgePercent className="w-3.5 h-3.5" />
          {pct}% OFF
        </div>
      </div>

      {/* Body — inverted palette on the featured card */}
      <div className="p-7">
        {featured && (
          <p
            className="font-body text-[11px] font-semibold uppercase tracking-[0.22em] mb-3"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {pkg.tag ?? "Most Popular"}
          </p>
        )}
        <h3 className="font-heading font-semibold text-2xl mb-2" style={{ color: featured ? "#fff" : "#234E70" }}>
          {pkg.title}
        </h3>
        <p className="text-xs font-body mb-5" style={{ color: featured ? "#C9D9E8" : "#9CA3AF" }}>
          {pkg.description}
        </p>

        <ul className="space-y-2 mb-6">
          {pkg.includes.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-xs font-body" style={{ color: featured ? "#DCE7F1" : "#6B7280" }}>
              <Check className="w-3.5 h-3.5 shrink-0" style={{ color: "#C6A15B" }} />
              {item}
            </li>
          ))}
        </ul>

        <div className="flex items-end justify-between gap-3 pt-5 border-t" style={{ borderColor: featured ? "rgba(255,255,255,0.16)" : "#E5E7EB" }}>
          <div className="min-w-0">
            <span className="block text-xs line-through font-body" style={{ color: featured ? "rgba(255,255,255,0.55)" : "#9CA3AF" }}>
              ₹{pkg.oldPrice.toLocaleString("en-IN")}
            </span>
            <p className="font-heading font-bold text-3xl leading-none mt-1 flex items-center" style={{ color: featured ? "#fff" : "#234E70" }}>
              <IndianRupee className="w-4 h-4" />{pkg.newPrice.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="shrink-0 rounded-xl px-4 py-2.5 text-right" style={{ background: featured ? "rgba(255,255,255,0.12)" : "#ECFDF5" }}>
            <p className="text-[9px] font-body font-semibold uppercase tracking-wider" style={{ color: featured ? "#A7F3D0" : "#059669" }}>
              You save
            </p>
            <p className="font-heading font-bold text-xl leading-none mt-1 flex items-center justify-end" style={{ color: featured ? "#6EE7B7" : "#059669" }}>
              <IndianRupee className="w-3.5 h-3.5" />{savings.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Packages() {
  const ref    = useRef(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: true });
  const [gender,  setGender]  = useState<"men" | "women">("men");
  const [showAll, setShowAll] = useState(false);

  const pkgs = gender === "men"
    ? packagesData.filter((p) => p.gender === "men")
    : packagesData.filter((p) => p.gender !== "men");
  const visible = showAll ? pkgs : pkgs.slice(0, 6);

  return (
    <section id="packages" className="section bg-white">
      <div className="wrap">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-7 mb-14"
        >
          <div>
            <p className="label mb-2.5">Value Deals</p>
            <h2 className="h-lg" style={{ color: "#234E70" }}>Package Offers</h2>
            <div className="rule rule-left mt-4" />
            <p className="text-sm font-body mt-4 max-w-md" style={{ color: "#6B7280" }}>
              Premium combo packages crafted for complete transformations at exceptional value.
            </p>
          </div>

          {/* Gender segmented control */}
          <div className="inline-flex self-start sm:self-auto p-1 border rounded-full"
            style={{ background: "#fff", borderColor: "#E5E7EB" }}>
            {(["men", "women"] as const).map((g) => (
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
                {g === "men" ? "Men" : "Women"}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={gender}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1,  y: 0  }}
            exit={{   opacity: 0         }}
            transition={{ duration: 0.28 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {visible.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} delay={i * 0.08} />
            ))}
          </motion.div>
        </AnimatePresence>

        {pkgs.length > 6 && (
          <div className="mt-12 flex justify-center">
            <button
              ref={btnRef}
              onClick={() => {
                if (showAll) {
                  setShowAll(false);
                  requestAnimationFrame(() => {
                    btnRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                  });
                } else {
                  setShowAll(true);
                }
              }}
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
    </section>
  );
}
