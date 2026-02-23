"use client";

import Section, { SectionHeader } from "@/components/Section";
import { galleryData } from "@/data/config";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface BlobFile {
  url: string;
  category: string;
  filename: string;
  type: "image" | "video";
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [blobPhotos, setBlobPhotos] = useState<BlobFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/files?type=image")
      .then((res) => res.json())
      .then((data) => {
        if (data.files) setBlobPhotos(data.files);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Merge static placeholder photos + cloud Blob photos
  const allPhotos = [
    ...blobPhotos.map((p) => ({
      src: p.url,
      alt: p.filename.replace(/^\d+-/, ""),
      category: p.category,
      isBlob: true,
    })),
    ...galleryData.photos.map((p) => ({
      src: p.src,
      alt: p.alt,
      category: p.category,
      isBlob: false,
    })),
  ];

  const allCategories = [
    "全部",
    ...Array.from(new Set(allPhotos.map((p) => p.category))),
  ];

  const filteredPhotos =
    activeCategory === "全部"
      ? allPhotos
      : allPhotos.filter((p) => p.category === activeCategory);

  return (
    <>
      <Section>
        <SectionHeader
          title={galleryData.title}
          subtitle={galleryData.subtitle}
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {allCategories.map((cat) => (
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

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-8">
            <Loader2 size={28} className="text-primary animate-spin" />
          </div>
        )}

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
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border border-border hover:border-primary transition-all"
                onClick={() => setSelectedPhoto(photo.src)}
              >
                {photo.isBlob ? (
                  <span style={{position: "relative", display: "block", width: "100%", height: "100%"}}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={e => {
                        e.currentTarget.style.display = "none";
                        const fallback = e.currentTarget.nextElementSibling;
                        if (fallback) fallback.style.display = "flex";
                        // 控制台输出详细错误
                        // @ts-ignore
                        console.error("图片加载失败:", photo.src, photo.alt);
                      }}
                    />
                    <div style={{display: "none", position: "absolute", inset: 0}} className="flex flex-col items-center justify-center bg-gradient-to-br from-red-200/30 to-accent/10">
                      <Camera size={32} className="text-red-400/60" />
                      <span className="text-xs text-red-400 mt-2">加载失败</span>
                    </div>
                  </span>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                    <Camera
                      size={32}
                      className="text-primary/30 group-hover:scale-110 transition-transform"
                    />
                    <span className="text-xs text-muted mt-2">{photo.alt}</span>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end">
                  <div className="w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs px-2 py-1 rounded-full bg-card-bg/80 backdrop-blur-sm text-foreground">
                      {photo.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Upload hint when no blob photos */}
        {!loading && blobPhotos.length === 0 && (
          <div className="text-center mt-12 p-6 rounded-2xl bg-card-bg border border-border">
            <Camera size={24} className="mx-auto mb-3 text-primary" />
            <p className="text-muted text-sm">
              前往{" "}
              <a href="/admin" className="text-primary hover:underline font-medium">
                管理后台
              </a>{" "}
              上传照片，或直接将图片放入{" "}
              <code className="px-2 py-0.5 bg-section-alt rounded text-xs">
                public/images/gallery/
              </code>{" "}
              文件夹。
            </p>
          </div>
        )}
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2 z-10"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-5xl max-h-[85vh] w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedPhoto.startsWith("http") ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={selectedPhoto}
                  alt="Preview"
                  className="max-w-full max-h-[85vh] rounded-xl object-contain"
                />
              ) : (
                <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center aspect-video w-full max-w-4xl">
                  <Camera size={64} className="text-white/30" />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
