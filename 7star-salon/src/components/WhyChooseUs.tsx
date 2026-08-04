"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  { num: "01", title: "Expert Stylists",       body: "Trained at leading academies across India and abroad." },
  { num: "02", title: "Premium Products",      body: "L'Oréal, Kerastase & Schwarzkopf — exclusively." },
  { num: "03", title: "100% Hygiene",          body: "Sterilised tools and a clinically clean environment." },
  { num: "04", title: "Personalised Service",  body: "Every visit begins with a dedicated consultation." },
  { num: "05", title: "Modern Equipment",      body: "State-of-the-art styling tools for superior results." },
  { num: "06", title: "Affordable Luxury",     body: "World-class quality at transparent, honest pricing." },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section" style={{ background: "#0F172A" }}>
      <div className="wrap">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="label mb-3">Why 7Star</p>
          <h2 className="h-lg" style={{ color: "#234E70" }}>The 7Star Difference</h2>
          <div className="rule rule-left mt-5" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
          {features.map((f, i) => (
            <motion.div
              key={f.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
            >
              <span className="block font-heading font-bold text-4xl mb-4 select-none"
                style={{ color: "#E5E7EB" }}>
                {f.num}
              </span>
              <h3 className="font-heading text-lg font-semibold mb-2" style={{ color: "#234E70" }}>
                {f.title}
              </h3>
              <p className="text-sm font-body leading-relaxed" style={{ color: "#6B7280" }}>
                {f.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
