"use client";

import Section, { SectionHeader } from "@/components/Section";
import { timelineData } from "@/data/config";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

export default function TimelinePage() {
  return (
    <Section>
      <SectionHeader title={timelineData.title} subtitle={timelineData.subtitle} />

      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

        {timelineData.events.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative flex items-start mb-12 last:mb-0 ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Icon */}
            <div className="absolute left-8 md:left-1/2 w-8 h-8 -translate-x-1/2 rounded-full bg-primary flex items-center justify-center z-10 shadow-lg shadow-primary/25">
              {event.type === "education" ? (
                <GraduationCap size={16} className="text-white" />
              ) : (
                <Briefcase size={16} className="text-white" />
              )}
            </div>

            {/* Content card */}
            <div
              className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${
                i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
              }`}
            >
              <div className="p-6 rounded-2xl bg-card-bg border border-border hover:border-primary transition-all duration-300">
                <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary/10 text-primary mb-3">
                  {event.year}
                </span>
                <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                <p className="text-sm text-primary-light mb-3">{event.company}</p>
                <p className="text-sm text-muted leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
