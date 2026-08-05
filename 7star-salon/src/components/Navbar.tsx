"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const links = [
  { label: "Hairstyles", href: "#hairstyles" },
  { label: "Services",   href: "#services" },
  { label: "Bridal",     href: "#bridal" },
  { label: "Branches",   href: "#branches" },
  { label: "About",      href: "#about" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const ids = ["hero", ...links.map((l) => l.href.slice(1))];
    const update = () => {
      const probe = window.scrollY + window.innerHeight * 0.4;
      let current = "#hero";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) current = `#${id}`;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/97 backdrop-blur-md border-b border-[#E5E7EB] shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="wrap flex items-center justify-between h-[72px]">
          {/* Logo + brand title */}
          <button
            onClick={() => go("#hero")}
            aria-label="7Star Salon — Family Salon Home"
            className="flex items-center gap-3 shrink-0"
          >
            <Image
              src={scrolled ? "/logo.svg" : "/white_logo.svg"}
              alt="7Star Salon"
              width={46}
              height={37}
              className="drop-shadow-sm"
              priority
            />
            <span
              className={`font-heading font-bold text-xl tracking-tight leading-none transition-colors ${
                scrolled ? "text-[#234E70]" : "text-white"
              }`}
            >
              Family Salon
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  aria-current={isActive ? "true" : undefined}
                  className={`text-[0.9rem] px-2 font-body font-medium tracking-wide transition-colors relative group ${
                    scrolled
                      ? isActive
                        ? "text-[#234E70]"
                        : "text-[#6B7280] hover:text-[#234E70]"
                      : isActive
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-[#C6A15B] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Book Now */}
          <div className="hidden lg:block">
            <button
              onClick={() => go("#contact")}
              className={`text-[0.75rem] font-body font-medium tracking-[0.1em] uppercase px-5 py-2.5 border transition-all duration-300 ${
                scrolled
                  ? "border-[#234E70] text-[#234E70] hover:bg-[#234E70] hover:text-white"
                  : "border-white/50 text-white hover:bg-white hover:text-[#234E70]"
              }`}
            >
              Book Now
            </button>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden p-2 ${scrolled ? "text-[#234E70]" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="fixed top-[72px] inset-x-0 z-40 bg-white border-b border-[#E5E7EB] shadow-lg lg:hidden"
          >
            <div className="wrap py-7 flex flex-col gap-5">
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className="text-left text-[#1F2937] font-body text-sm font-medium hover:text-[#234E70] transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <div className="pt-2 border-t border-[#E5E7EB]">
                <button
                  onClick={() => go("#contact")}
                  className="btn w-full justify-center text-sm mt-1"
                >
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
