"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";
import { packagesData } from "@/data/packages";

function PackageCard({ pkg, delay }: { pkg: (typeof packagesData)[0]; delay: number }) {
  const pct = Math.round(((pkg.oldPrice - pkg.newPrice) / pkg.oldPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      className="card overflow-hidden"
      style={{ borderRadius: "12px", outline: pkg.popular ? "2px solid #234E70" : "none" }}
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
          className="absolute top-3 right-3 text-white text-[10px] font-bold px-2.5 py-1 rounded-full font-body"
          style={{ background: "#7e1d1dff" }}
        >
          {pct}% off
        </div>
        {pkg.tag && (
          <div
            className="absolute top-3 left-3 text-white text-[10px] font-medium px-2.5 py-1 rounded-full font-body"
            style={{ background: "#234E70" }}
          >
            {pkg.tag}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-7">
        <h3 className="font-heading font-semibold text-lg mb-1.5" style={{ color: "#234E70" }}>
          {pkg.title}
        </h3>
        <p className="text-xs font-body mb-5" style={{ color: "#9CA3AF" }}>{pkg.description}</p>

        <ul className="space-y-2 mb-6">
          {pkg.includes.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-xs font-body" style={{ color: "#6B7280" }}>
              <Check className="w-3.5 h-3.5 shrink-0" style={{ color: "#C6A15B" }} />
              {item}
            </li>
          ))}
        </ul>

        <div className="flex items-end justify-between pt-5 border-t" style={{ borderColor: "#E5E7EB" }}>
          <div>
            <span className="text-xs line-through font-body" style={{ color: "#9CA3AF" }}>
              ₹{pkg.oldPrice.toLocaleString()}
            </span>
            <p className="font-heading font-bold text-2xl" style={{ color: "#234E70" }}>
              ₹{pkg.newPrice.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-body block" style={{ color: "#9CA3AF" }}>You save</span>
            <span className="font-bold text-sm font-body" style={{ color: "#059669" }}>
              ₹{(pkg.oldPrice - pkg.newPrice).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Packages() {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="packages" className="section bg-white">
      <div className="wrap">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="label mb-2.5">Value Deals</p>
          <h2 className="h-lg" style={{ color: "#234E70" }}>Package Offers</h2>
          <div className="rule rule-left mt-4" />
          <p className="text-sm font-body mt-4 max-w-md" style={{ color: "#6B7280" }}>
            Premium combo packages crafted for complete transformations at exceptional value.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {packagesData.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
