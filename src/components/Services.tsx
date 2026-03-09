"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

const services = [
  {
    name: "Classic Haircut",
    description: "Scissor or clipper cut tailored to your style. Includes wash, cut, and finish.",
    price: "$35",
    duration: "45 min",
    icon: "✂",
  },
  {
    name: "Skin Fade",
    description: "Precision fade from skin to your desired length. Our signature service.",
    price: "$40",
    duration: "60 min",
    icon: "⚡",
    featured: true,
  },
  {
    name: "Beard Trim",
    description: "Shape, line, and condition your beard. Hot towel finish included.",
    price: "$25",
    duration: "30 min",
    icon: "▲",
  },
  {
    name: "Full Grooming",
    description: "Haircut + beard trim + hot towel. The complete package.",
    price: "$60",
    duration: "90 min",
    icon: "◆",
  },
];

export default function Services() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      if (delta > 0 && current < services.length - 1) setCurrent(current + 1);
      if (delta < 0 && current > 0) setCurrent(current - 1);
    }
  };

  return (
    <section id="services" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-medium">What We Do</span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-[#f5f5f5] uppercase">
            Our Services
          </h2>
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-px bg-[#222]">
          {services.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative group p-8 flex flex-col ${
                service.featured
                  ? "bg-[#c9a84c]"
                  : "bg-[#0f0f0f] hover:bg-[#141414] transition-colors"
              }`}
            >
              {service.featured && (
                <div className="absolute top-4 right-4 bg-[#0a0a0a] text-[#c9a84c] text-[10px] tracking-widest uppercase px-2 py-1 font-bold">
                  Popular
                </div>
              )}
              <div
                className={`text-2xl mb-6 ${
                  service.featured ? "text-[#0a0a0a]" : "text-[#c9a84c]"
                }`}
              >
                {service.icon}
              </div>
              <h3
                className={`font-display text-2xl uppercase mb-3 ${
                  service.featured ? "text-[#0a0a0a]" : "text-[#f5f5f5]"
                }`}
              >
                {service.name}
              </h3>
              <p
                className={`text-sm leading-relaxed mb-8 flex-1 ${
                  service.featured ? "text-[#0a0a0a]/70" : "text-[#888]"
                }`}
              >
                {service.description}
              </p>
              <div className="flex items-end justify-between">
                <span
                  className={`font-display text-4xl leading-none ${
                    service.featured ? "text-[#0a0a0a]" : "text-[#c9a84c]"
                  }`}
                >
                  {service.price}
                </span>
                <span
                  className={`text-xs tracking-wider uppercase ${
                    service.featured ? "text-[#0a0a0a]/60" : "text-[#555]"
                  }`}
                >
                  {service.duration}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile slider */}
        <div className="md:hidden">
          <div className="overflow-x-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {services.map((service) => (
                <div
                  key={service.name}
                  className={`min-w-full p-8 flex flex-col relative ${
                    service.featured ? "bg-[#c9a84c]" : "bg-[#141414]"
                  }`}
                >
                  {service.featured && (
                    <div className="absolute top-4 right-4 bg-[#0a0a0a] text-[#c9a84c] text-[10px] tracking-widest uppercase px-2 py-1 font-bold">
                      Popular
                    </div>
                  )}
                  <div
                    className={`text-2xl mb-6 ${
                      service.featured ? "text-[#0a0a0a]" : "text-[#c9a84c]"
                    }`}
                  >
                    {service.icon}
                  </div>
                  <h3
                    className={`font-display text-3xl uppercase mb-3 ${
                      service.featured ? "text-[#0a0a0a]" : "text-[#f5f5f5]"
                    }`}
                  >
                    {service.name}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mb-8 ${
                      service.featured ? "text-[#0a0a0a]/70" : "text-[#888]"
                    }`}
                  >
                    {service.description}
                  </p>
                  <div className="flex items-end justify-between">
                    <span
                      className={`font-display text-5xl leading-none ${
                        service.featured ? "text-[#0a0a0a]" : "text-[#c9a84c]"
                      }`}
                    >
                      {service.price}
                    </span>
                    <span
                      className={`text-xs tracking-wider uppercase ${
                        service.featured ? "text-[#0a0a0a]/60" : "text-[#555]"
                      }`}
                    >
                      {service.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-[#c9a84c]" : "w-2 bg-[#333]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
