"use client";

import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon, TwitterIcon } from "./SocialIcons";
import { contactData } from "@/data/contact";

const quickLinks = [
  { label: "Services",   href: "#services"   },
  { label: "Hairstyles", href: "#hairstyles"  },
  { label: "Bridal",     href: "#bridal"      },
  { label: "Branches",   href: "#branches"    },
  { label: "About",      href: "#about"       },
  { label: "Contact",    href: "#contact"     },
];

const socials = [
  { icon: InstagramIcon, href: contactData.social.instagram, label: "Instagram" },
  { icon: FacebookIcon,  href: contactData.social.facebook,  label: "Facebook"  },
  { icon: YoutubeIcon,   href: contactData.social.youtube,   label: "YouTube"   },
  { icon: TwitterIcon,   href: contactData.social.twitter,   label: "Twitter"   },
];

const hours = [
  { day: "Mon – Fri", time: "9:00 AM – 9:00 PM"  },
  { day: "Saturday",  time: "9:00 AM – 10:00 PM" },
  { day: "Sunday",    time: "10:00 AM – 8:00 PM"  },
];

export default function Footer() {
  const go = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer style={{ background: "#0F1E2D", color: "#fff" }}>
      {/* top accent line */}
      <div style={{ height: 2, background: "linear-gradient(90deg,transparent,#C6A15B,transparent)" }} />

      <div className="wrap py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* ── Brand ── */}
          <div>
            <div className="mb-5">
              <Image
                src="/white_logo.svg"
                alt="7Star Salon"
                width={64}
                height={52}
                className="mb-3"
              />
              <p className="font-heading font-bold text-lg text-white leading-none">7Star</p>
              <p className="font-body text-[10px] tracking-[0.3em] uppercase mt-0.5"
                style={{ color: "#C6A15B" }}>Salon</p>
            </div>
            <p className="text-xs font-body leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>
              Premium Hair Studio for Men &amp; Women across four branches in Bangalore.
            </p>
            <div className="flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded flex items-center justify-center border transition-all duration-200"
                  style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.35)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#C6A15B";
                    e.currentTarget.style.color = "#C6A15B";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.35)";
                  }}
                >
                  <s.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 className="font-body font-semibold text-xs uppercase tracking-widest mb-5"
              style={{ color: "rgba(255,255,255,0.55)" }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => go(l.href)}
                    className="text-xs font-body transition-colors"
                    style={{ color: "rgba(255,255,255,0.38)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4 className="font-body font-semibold text-xs uppercase tracking-widest mb-5"
              style={{ color: "rgba(255,255,255,0.55)" }}>
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "#C6A15B" }} />
                <span className="text-xs font-body leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {contactData.address.full}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: "#C6A15B" }} />
                <a href={`tel:${contactData.phone.primary}`}
                  className="text-xs font-body transition-colors"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                >
                  {contactData.phone.primary}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: "#C6A15B" }} />
                <a href={`mailto:${contactData.email}`}
                  className="text-xs font-body transition-colors"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                >
                  {contactData.email}
                </a>
              </li>
              {/* Franchise email */}
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: "#C6A15B" }} />
                <a href={`mailto:${contactData.franchise.email}`}
                  className="text-xs font-body transition-colors"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                >
                  {contactData.franchise.email}
                </a>
              </li>
            </ul>
          </div>

          {/* ── Hours ── */}
          <div>
            <h4 className="font-body font-semibold text-xs uppercase tracking-widest mb-5"
              style={{ color: "rgba(255,255,255,0.55)" }}>
              Business Hours
            </h4>
            <div className="space-y-3">
              {hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4">
                  <span className="text-xs font-body" style={{ color: "rgba(255,255,255,0.35)" }}>{h.day}</span>
                  <span className="text-xs font-body" style={{ color: "rgba(255,255,255,0.6)" }}>{h.time}</span>
                </div>
              ))}
            </div>

            {/* Open indicator */}
            <div className="mt-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: "#22C55E" }} />
              <span className="text-xs font-body" style={{ color: "rgba(255,255,255,0.4)" }}>
                Open today until 9:00 PM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="wrap py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-body" style={{ color: "rgba(255,255,255,0.22)" }}>
            © {new Date().getFullYear()} 7Star Salon. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service"].map((t) => (
              <a key={t} href="#"
                className="text-xs font-body transition-colors"
                style={{ color: "rgba(255,255,255,0.22)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.22)")}
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
