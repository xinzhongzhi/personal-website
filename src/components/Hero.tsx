"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { heroData, siteConfig } from "@/data/config";
import { useEffect, useState } from "react";

export default function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % heroData.taglines.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-primary to-accent p-1">
            <div className="w-full h-full rounded-full bg-card-bg flex items-center justify-center text-3xl font-bold gradient-text">
              {siteConfig.name.charAt(0)}
            </div>
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted text-lg mb-4"
        >
          {heroData.greeting}
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl sm:text-7xl font-bold mb-6 gradient-text"
        >
          {heroData.name}
        </motion.h1>

        {/* Rotating tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="h-10 mb-8 flex items-center justify-center"
        >
          <span className="text-xl sm:text-2xl text-primary-light font-medium">
            {heroData.taglines[taglineIndex]}
          </span>
          <span className="ml-1 inline-block w-0.5 h-6 bg-primary animate-pulse" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-muted text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {heroData.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {heroData.cta.map((btn, i) => (
            <Link
              key={btn.href}
              href={btn.href}
              className={`inline-flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all duration-200 ${
                i === 0
                  ? "bg-primary text-white hover:bg-primary-light shadow-lg shadow-primary/25 hover:shadow-primary/40"
                  : "border border-border text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {btn.text}
              <ArrowRight size={16} />
            </Link>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ArrowDown className="text-muted animate-bounce" size={20} />
        </motion.div>
      </div>
    </section>
  );
}
