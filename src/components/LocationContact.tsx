"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Leaflet must be loaded client-side only — no SSR
const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

const hours = [
  { day: "Monday", time: "Closed", closed: true },
  { day: "Tuesday – Friday", time: "9:00 AM – 8:00 PM" },
  { day: "Saturday", time: "8:00 AM – 6:00 PM" },
  { day: "Sunday", time: "10:00 AM – 4:00 PM" },
];

export default function LocationContact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.service) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0a0a]">
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
            <span className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-medium">Find Us</span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-[#f5f5f5] uppercase">
            Location &<br />Booking
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Map + Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Leaflet Map */}
            <div className="border border-[#222] overflow-hidden" style={{ height: "320px" }}>
              <MapComponent />
            </div>

            {/* Address + Hours */}
            <div className="border border-[#222] p-6">
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-[#1a1a1a]">
                <svg className="w-5 h-5 text-[#c9a84c] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-[#f5f5f5] font-medium">347 Atlantic Ave</p>
                  <p className="text-[#888] text-sm">Brooklyn, NY 11217</p>
                </div>
              </div>
              <div className="space-y-3">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between items-center">
                    <span className="text-[#888] text-sm">{h.day}</span>
                    <span className={`text-sm font-medium ${h.closed ? "text-[#555]" : "text-[#f5f5f5]"}`}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="border border-[#c9a84c] p-10 text-center">
                <div className="font-display text-5xl text-[#c9a84c] mb-4">✓</div>
                <h3 className="font-display text-2xl text-[#f5f5f5] uppercase mb-3">Request Received</h3>
                <p className="text-[#888] text-sm">
                  We&apos;ll confirm your appointment within 2 hours. See you at the shop.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[#888] text-xs tracking-widest uppercase mb-2">
                      Name <span className="text-[#c9a84c]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-[#141414] border border-[#222] text-[#f5f5f5] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors placeholder:text-[#444]"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[#888] text-xs tracking-widest uppercase mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-[#141414] border border-[#222] text-[#f5f5f5] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors placeholder:text-[#444]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#888] text-xs tracking-widest uppercase mb-2">
                    Email <span className="text-[#c9a84c]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="john@email.com"
                    className="w-full bg-[#141414] border border-[#222] text-[#f5f5f5] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors placeholder:text-[#444]"
                  />
                </div>
                <div>
                  <label className="block text-[#888] text-xs tracking-widest uppercase mb-2">
                    Service <span className="text-[#c9a84c]">*</span>
                  </label>
                  <select
                    name="service"
                    value={formState.service}
                    onChange={handleChange}
                    className="w-full bg-[#141414] border border-[#222] text-[#f5f5f5] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select a service...</option>
                    <option value="Classic Haircut">Classic Haircut — $35</option>
                    <option value="Skin Fade">Skin Fade — $40</option>
                    <option value="Beard Trim">Beard Trim — $25</option>
                    <option value="Full Grooming">Full Grooming — $60</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#888] text-xs tracking-widest uppercase mb-2">
                    Message / Preferred time
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Any notes or preferred appointment times..."
                    className="w-full bg-[#141414] border border-[#222] text-[#f5f5f5] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors placeholder:text-[#444] resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full bg-[#c9a84c] text-[#0a0a0a] py-4 font-bold text-sm tracking-widest uppercase hover:bg-[#e2c47a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending..." : "Request Appointment →"}
                </button>

                <p className="text-[#555] text-xs text-center">
                  We confirm within 2 hours during business hours
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
