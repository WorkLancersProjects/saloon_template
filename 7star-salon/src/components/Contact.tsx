"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon, WhatsAppIcon } from "./SocialIcons";
import { contactData } from "@/data/contact";

export default function Contact() {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true });

  const channels = [
    { icon: Phone,         label: "Call Us",   value: contactData.phone.primary,  href: `tel:${contactData.phone.primary}` },
    { icon: MessageCircle, label: "WhatsApp",  value: "Chat with us",             href: `https://wa.me/${contactData.whatsapp}?text=${encodeURIComponent(contactData.whatsappMessage)}` },
    { icon: Mail,          label: "Email",     value: contactData.email,           href: `mailto:${contactData.email}` },
  ];

  const socials = [
    { icon: InstagramIcon, href: contactData.social.instagram, label: "Instagram" },
    { icon: FacebookIcon,  href: contactData.social.facebook,  label: "Facebook"  },
    { icon: YoutubeIcon,   href: contactData.social.youtube,   label: "YouTube"   },
    { icon: WhatsAppIcon,  href: `https://wa.me/${contactData.whatsapp}`, label: "WhatsApp" },
  ];

  return (
    <section id="contact" className="section bg-white">
      <div className="wrap">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="label mb-2.5">Get In Touch</p>
          <h2 className="h-lg" style={{ color: "#234E70" }}>Contact Us</h2>
          <div className="rule rule-left mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Left — channels + socials */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-sm font-body leading-relaxed mb-10 max-w-sm" style={{ color: "#6B7280" }}>
              Walk in or reach out — our team is always ready to help you look and feel your best.
            </p>

            <div className="space-y-6">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.label === "WhatsApp" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center border shrink-0 transition-all duration-200 group-hover:border-primary group-hover:bg-background-blue"
                    style={{ border: "1px solid #E5E7EB", background: "#FAF7F0" }}>
                    <c.icon className="w-4 h-4" style={{ color: "#234E70" }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-body uppercase tracking-wider" style={{ color: "#9CA3AF" }}>{c.label}</p>
                    <p className="text-sm font-body font-medium transition-colors group-hover:underline" style={{ color: "#1F2937" }}>
                      {c.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social icons */}
            <div className="mt-12 pt-8 border-t" style={{ borderColor: "#E5E7EB" }}>
              <p className="text-[10px] font-body uppercase tracking-wider mb-4" style={{ color: "#9CA3AF" }}>
                Follow Along
              </p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank" rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-200"
                    style={{ borderColor: "#E5E7EB", color: "#6B7280" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#234E70"; e.currentTarget.style.color = "#234E70"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.color = "#6B7280"; }}
                  >
                    <s.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — franchise */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-between p-10"
            style={{ background: "#EEF5FA", borderRadius: "12px" }}
          >
            <div>
              <p className="label mb-3">Franchise</p>
              <h3 className="h-md mb-4" style={{ color: "#234E70" }}>Start Your Own 7Star Salon</h3>
              <p className="text-sm font-body leading-relaxed mb-6" style={{ color: "#6B7280" }}>
                Join our growing network. We provide brand setup, staff training, marketing and full operational support.
              </p>
              <ul className="space-y-2.5 mb-8">
                {[
                  "Proven high-ROI business model",
                  "Complete brand & interior setup",
                  "Comprehensive staff training",
                  "Ongoing marketing & support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm font-body" style={{ color: "#6B7280" }}>
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "#C6A15B" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={`mailto:${contactData.franchise.email}`}
              className="btn self-start text-sm"
            >
              Enquire About Franchise
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
