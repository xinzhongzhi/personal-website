"use client";

import Section, { SectionHeader } from "@/components/Section";
import { projectsData } from "@/data/config";
import { motion } from "framer-motion";
import { Code, ExternalLink, Github } from "lucide-react";

export default function ProjectsPage() {
  return (
    <Section>
      <SectionHeader
        title={projectsData.title}
        subtitle={projectsData.subtitle}
      />

      <div className="grid md:grid-cols-2 gap-8">
        {projectsData.projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group rounded-2xl bg-card-bg border border-border hover:border-primary transition-all duration-300 overflow-hidden hover:-translate-y-1"
          >
            {/* Project image placeholder */}
            <div className="w-full h-56 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
              <Code
                size={64}
                className="text-primary/30 group-hover:scale-110 transition-transform duration-300"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-300" />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3">
                <a
                  href={project.link}
                  className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors"
                >
                  <ExternalLink size={14} />
                  在线预览
                </a>
                <a
                  href={project.github}
                  className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors"
                >
                  <Github size={14} />
                  源代码
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
