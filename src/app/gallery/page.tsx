"use client";

import Section, { SectionHeader } from "@/components/Section";
import { galleryData } from "@/data/config";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X } from "lucide-react";
import { useState } from "react";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const filteredPhotos =
    activeCategory === "全部"
      ? galleryData.photos
      : galleryData.photos.filter((p) => p.category === activeCategory);

  return (
    <>
      <Section>
        <SectionHeader
          title={galleryData.title}
          subtitle={galleryData.subtitle}
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {galleryData.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-card-bg border border-border text-muted hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, i) => (
              <motion.div
                key={photo.src}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br from-primary/10 to-accent/10 border border-border hover:border-primary transition-all"
                onClick={() => setSelectedPhoto(photo.src)}
              >
                {/* Placeholder for actual images */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Camera
                    size={32}
                    className="text-primary/30 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-xs text-muted mt-2">{photo.alt}</span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300 flex items-end">
                  <div className="w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs px-2 py-1 rounded-full bg-card-bg/80 backdrop-blur-sm">
                      {photo.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Info text */}
        <div className="text-center mt-12 p-6 rounded-2xl bg-card-bg border border-border">
          <Camera size={24} className="mx-auto mb-3 text-primary" />
          <p className="text-muted text-sm">
            将你的照片放入{" "}
            <code className="px-2 py-0.5 bg-section-alt rounded text-xs">
              public/images/gallery/
            </code>{" "}
            文件夹，然后在{" "}
            <code className="px-2 py-0.5 bg-section-alt rounded text-xs">
              src/data/config.ts
            </code>{" "}
            中更新图片路径即可展示。
          </p>
        </div>
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-4xl max-h-[80vh] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center aspect-video w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Camera size={64} className="text-white/30" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
