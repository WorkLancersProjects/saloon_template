"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Navigation } from "lucide-react";
import { contactData } from "@/data/contact";

export default function Map() {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="map" className="section-sm bg-white">
      <div className="wrap">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="label mb-2.5">Find Us</p>
          <h2 className="h-lg" style={{ color: "#234E70" }}>Visit Our Salon</h2>
          <div className="rule rule-left mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="space-y-7"
          >
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "#EEF5FA" }}>
                <MapPin className="w-4 h-4" style={{ color: "#234E70" }} />
              </div>
              <div>
                <p className="font-body font-semibold text-sm mb-1" style={{ color: "#1F2937" }}>Address</p>
                <p className="text-sm font-body leading-relaxed" style={{ color: "#6B7280" }}>
                  {contactData.address.full}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "#EEF5FA" }}>
                <Phone className="w-4 h-4" style={{ color: "#234E70" }} />
              </div>
              <div>
                <p className="font-body font-semibold text-sm mb-1" style={{ color: "#1F2937" }}>Phone</p>
                <a href={`tel:${contactData.phone.primary}`}
                  className="text-sm font-body block hover:underline" style={{ color: "#6B7280" }}>
                  {contactData.phone.primary}
                </a>
                <a href={`tel:${contactData.phone.secondary}`}
                  className="text-sm font-body hover:underline" style={{ color: "#6B7280" }}>
                  {contactData.phone.secondary}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="border-t pt-6 space-y-2.5" style={{ borderColor: "#E5E7EB" }}>
              {[
                { d: "Mon – Fri",  h: "9:00 AM – 9:00 PM" },
                { d: "Saturday",   h: "9:00 AM – 10:00 PM" },
                { d: "Sunday",     h: "10:00 AM – 8:00 PM" },
              ].map((row) => (
                <div key={row.d} className="flex justify-between gap-4">
                  <span className="text-xs font-body" style={{ color: "#9CA3AF" }}>{row.d}</span>
                  <span className="text-xs font-body font-medium" style={{ color: "#1F2937" }}>{row.h}</span>
                </div>
              ))}
            </div>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contactData.address.full)}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center gap-2 text-xs"
              style={{ color: "#234E70", borderColor: "#234E70" }}
            >
              <Navigation className="w-3.5 h-3.5" />
              Get Directions
            </a>
          </motion.div>

          {/* Map embed */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 overflow-hidden border"
            style={{ height: "420px", borderRadius: "10px", borderColor: "#E5E7EB" }}
          >
            <iframe
              src={contactData.mapEmbed}
              width="100%" height="100%"
              style={{ border: 0 }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="7Star Salon Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
