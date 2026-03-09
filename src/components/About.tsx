"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 md:order-1"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=900&q=85"
                alt="Blackstone Barbers interior"
                fill
                className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
              />
              {/* Gold frame offset */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#c9a84c] -z-10" />
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 md:-right-8 bg-[#c9a84c] p-5 text-center">
              <div className="font-display text-4xl text-[#0a0a0a] leading-none">6+</div>
              <div className="text-[#0a0a0a]/70 text-[10px] tracking-widest uppercase mt-1">Years</div>
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 md:order-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-medium">Our Story</span>
            </div>

            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-[#f5f5f5] uppercase mb-8">
              Craft Over<br />Everything
            </h2>

            <p className="text-[#888] leading-relaxed mb-6">
              Blackstone Barbers was built on one belief: a great haircut changes how you carry yourself. Since 2018, we've been the go-to shop for men who value precision, atmosphere, and consistency.
            </p>
            <p className="text-[#888] leading-relaxed mb-10">
              No gimmicks. No rush. Every client gets the chair, the conversation, and the cut they deserve. We specialize in fades, classic cuts, and beard work — and we've spent six years perfecting every detail.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 border border-[#222]">
              {[
                { value: "5K+", label: "Clients" },
                { value: "3", label: "Barbers" },
                { value: "4.9", label: "Rating" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`py-6 text-center ${i > 0 ? "border-l border-[#222]" : ""}`}
                >
                  <div className="font-display text-3xl text-[#c9a84c]">{stat.value}</div>
                  <div className="text-[#555] text-xs tracking-wider uppercase mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
