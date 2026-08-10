"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import HairstyleCard from "./HairstyleCard";
import HairstyleLightbox from "./HairstyleLightbox";
import { mensHairstyles, womensHairstyles, type Hairstyle } from "@/data/hairstyles";

const MEN_TAGS = ["All", "Fade", "Mullet", "Short", "Long", "Crop", "Styled"];
const WOMEN_TAGS = ["All", "Layer", "Short", "Long", "Wedding", "Styled"];

type Gender = "men" | "women";

export default function Hairstyles() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const [gender, setGender] = useState<Gender>("men");
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState<Hairstyle | null>(null);

  const tags = gender === "men" ? MEN_TAGS : WOMEN_TAGS;
  const dataSource = gender === "men" ? mensHairstyles : womensHairstyles;

  const filtered =
    filter === "All"
      ? dataSource
      : dataSource.filter((h) => h.tags.includes(filter));

  const visible = showAll ? filtered : filtered.slice(0, 8);

  return (
    <>
      <section id="hairstyles" className="section bg-background">
        <div className="wrap">
          <div
            ref={ref}
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-end
              sm:justify-between
              gap-7
              mb-14
            "
          >
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="h-lg" style={{ color: "#234E70" }}>
                Hairstyles
              </h2>
              <div className="rule rule-left mt-4" />
            </motion.div>

            {/* Gender pill selector */}
            <div
              className="
                inline-flex
                rounded-full
                border
                p-1
                gap-0
                self-start
                sm:self-auto
              "
              style={{ borderColor: "#E5E7EB" }}
            >
              {(["men", "women"] as Gender[]).map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    setGender(g);
                    setFilter("All");
                  }}
                  className="
                    px-5
                    py-1.5
                    text-xs
                    font-body
                    font-medium
                    tracking-wide
                    rounded-full
                    transition-all
                    duration-200
                  "
                  style={
                    gender === g
                      ? {
                          background: "#234E70",
                          color: "#FFFFFF",
                        }
                      : {
                          background: "transparent",
                          color: "#6B7280",
                        }
                  }
                >
                  {g === "men" ? "Men" : "Women"}
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.18, duration: 0.55 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className="
                  px-4
                  py-1.5
                  text-xs
                  font-body
                  font-medium
                  tracking-wide
                  border
                  transition-all
                  duration-200
                "
                style={
                  filter === tag
                    ? {
                        background: "#234E70",
                        color: "#FFFFFF",
                        borderColor: "#234E70",
                      }
                    : {
                        background: "transparent",
                        color: "#6B7280",
                        borderColor: "#E5E7EB",
                      }
                }
              >
                {tag}
              </button>
            ))}
          </motion.div>

          {/* Hairstyle Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {visible.map((h, i) => (
              <HairstyleCard
                key={h.id}
                hairstyle={h}
                index={i}
                onClick={setActive}
              />
            ))}
          </div>

          {/* Show more / Show less */}
          {filtered.length > 8 && (
            <div className="mt-12 flex justify-center">
              <button
                ref={btnRef}
                onClick={() => {
                  if (showAll) {
                    setShowAll(false);
                    requestAnimationFrame(() => {
                      btnRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                      });
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
                  style={{
                    transform: showAll ? "rotate(180deg)" : "none",
                    transition: "transform 0.3s ease",
                  }}
                />
              </button>
            </div>
          )}

          {/* Empty State */}
          {filtered.length === 0 && (
            <p
              className="text-center text-sm font-body py-16"
              style={{ color: "#9CA3AF" }}
            >
              No styles found for this filter.
            </p>
          )}
        </div>
      </section>

      <HairstyleLightbox
        hairstyle={active}
        all={visible}
        onClose={() => setActive(null)}
        onNavigate={setActive}
      />
    </>
  );
}
