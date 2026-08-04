"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const links = [
  { label: "Services",   href: "#services" },
  { label: "Hairstyles", href: "#hairstyles" },
  { label: "Bridal",     href: "#bridal" },
  { label: "Branches",   href: "#branches" },
  { label: "About",      href: "#about" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
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
          {/* Logo */}
          <button
            onClick={() => go("#hero")}
            aria-label="7Star Salon Home"
            className="flex items-center gap-2.5 shrink-0"
          >
            {scrolled ? (
              <span className="font-heading font-bold text-[#234E70] text-xl tracking-tight">
                7Star <span className="text-[#C6A15B]">Salon</span>
              </span>
            ) : (
              <Image
                src="/white_logo.svg"
                alt="7Star Salon"
                width={52}
                height={42}
                className="drop-shadow-lg"
              />
            )}
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className={`text-[0.8rem] font-body font-medium tracking-wide transition-colors relative group ${
                  scrolled ? "text-[#6B7280] hover:text-[#234E70]" : "text-white/80 hover:text-white"
                }`}
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C6A15B] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
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
