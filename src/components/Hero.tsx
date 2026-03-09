"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=1800&q=85"
        alt="Barber at work"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Dark overlay - gradient from bottom */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/70 to-[#0a0a0a]/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-medium">
              Est. 2018 — Brooklyn, NY
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-[clamp(4rem,10vw,8rem)] leading-none text-[#f5f5f5] uppercase mb-2"
          >
            Sharp
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-display text-[clamp(4rem,10vw,8rem)] leading-none text-[#c9a84c] uppercase mb-6"
          >
            Cuts.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-[#888] text-lg max-w-md mb-10 leading-relaxed"
          >
            Clean fades, precise lineups, and beard work done right. Walk in sharp. Walk out sharper.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link
              href="#contact"
              className="inline-flex items-center gap-3 bg-[#c9a84c] text-[#0a0a0a] px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-[#e2c47a] transition-colors group"
            >
              Book Your Appointment
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-20 border-t border-[#222]"
      >
        <div className="grid grid-cols-3 divide-x divide-[#222]">
          {[
            { value: "6+", label: "Years in business" },
            { value: "5K+", label: "Happy clients" },
            { value: "4.9★", label: "Average rating" },
          ].map((stat) => (
            <div key={stat.label} className="py-5 px-6 bg-[#0a0a0a]/80 backdrop-blur-sm text-center">
              <div className="font-display text-2xl text-[#c9a84c]">{stat.value}</div>
              <div className="text-[#888] text-xs tracking-wider uppercase mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}