"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import HairstyleCard from "./HairstyleCard";
import HairstyleLightbox from "./HairstyleLightbox";
import { mensHairstyles, type Hairstyle } from "@/data/hairstyles";

const TAGS = ["All", "Fade", "Mullet", "Short", "Long", "Crop", "Styled"];

export default function MensHairstyles() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<Hairstyle | null>(null);

  const filtered =
    filter === "All"
      ? mensHairstyles
      : mensHairstyles.filter((h) => h.tags.includes(filter));


  return (
    <>
      <section className="section bg-[#FAF7F0]">

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
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                duration: 0.6,
              }}
            >

              <p className="label mb-2.5">
                Men's Collection
              </p>


              <h2
                className="h-lg"
                style={{
                  color: "#234E70",
                }}
              >
                Men's Hairstyles
              </h2>


              <div className="rule rule-left mt-4" />

            </motion.div>




            {/* Filters */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={
                inView
                  ? {
                      opacity: 1,
                    }
                  : {}
              }
              transition={{
                delay: 0.18,
                duration: 0.55,
              }}
              className="
                flex
                flex-wrap
                gap-2
              "
            >

              {
                TAGS.map((tag) => (

                  <button

                    key={tag}

                    onClick={() =>
                      setFilter(tag)
                    }

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
                        ?
                        {
                          background: "#234E70",
                          color: "#FFFFFF",
                          borderColor: "#234E70",
                        }
                        :
                        {
                          background: "transparent",
                          color: "#6B7280",
                          borderColor: "#E5E7EB",
                        }
                    }

                  >

                    {tag}

                  </button>

                ))
              }


            </motion.div>


          </div>





          {/* Hairstyle Cards */}

          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-3
              lg:grid-cols-4
              gap-x-6
              gap-y-10
            "
          >

            {
              filtered.map((h, i) => (

                <HairstyleCard

                  key={h.id}

                  hairstyle={h}

                  index={i}

                  onClick={setActive}

                />

              ))
            }


          </div>




          {/* Empty State */}

          {
            filtered.length === 0 && (

              <p
                className="
                  text-center
                  text-sm
                  font-body
                  py-16
                "
                style={{
                  color: "#9CA3AF",
                }}
              >
                No styles found for this filter.
              </p>

            )
          }


        </div>

      </section>





      {/* Hairstyle Popup */}

      <HairstyleLightbox

        hairstyle={active}

        all={filtered}

        onClose={() =>
          setActive(null)
        }

        onNavigate={setActive}

      />


    </>
  );
}