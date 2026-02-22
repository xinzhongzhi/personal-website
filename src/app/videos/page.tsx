"use client";

import Section, { SectionHeader } from "@/components/Section";
import { motion, AnimatePresence } from "framer-motion";
import { Video, Play, Loader2, X, Clock, HardDrive } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface VideoFile {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
  category: string;
  filename: string;
}

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("全部");
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    fetch("/api/files?type=video")
      .then((res) => res.json())
      .then((data) => {
        if (data.files) setVideos(data.files);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    "全部",
    ...Array.from(new Set(videos.map((v) => v.category))),
  ];

  const filteredVideos =
    activeCategory === "全部"
      ? videos
      : videos.filter((v) => v.category === activeCategory);

  return (
    <>
      <Section>
        <SectionHeader title="视频集" subtitle="记录精彩片段" />

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
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
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 size={32} className="text-primary animate-spin" />
          </div>
        )}

        {/* Empty State */}
        {!loading && videos.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6">
              <Video size={36} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">暂无视频</h3>
            <p className="text-muted mb-6">
              前往{" "}
              <a href="/admin" className="text-primary hover:underline font-medium">
                管理后台
              </a>{" "}
              上传你的第一个视频吧
            </p>
            <p className="text-xs text-muted/60">
              支持 MP4、WebM、OGG 格式，最大 50MB
            </p>
          </div>
        )}

        {/* Video Grid */}
        {!loading && filteredVideos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredVideos.map((video, i) => (
                <motion.div
                  key={video.url}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="group rounded-2xl overflow-hidden border border-border hover:border-primary bg-card-bg transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
                >
                  {/* Video preview area */}
                  <div
                    className="relative aspect-video bg-gradient-to-br from-primary/5 to-accent/5 cursor-pointer"
                    onClick={() => setPlayingUrl(video.url)}
                  >
                    <video
                      src={video.url}
                      className="absolute inset-0 w-full h-full object-cover"
                      preload="metadata"
                      muted
                      playsInline
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all flex items-center justify-center shadow-lg">
                        <Play size={28} className="text-primary ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>

                  {/* Video info */}
                  <div className="p-4">
                    <h3 className="font-medium truncate text-sm mb-2">
                      {video.filename.replace(/^\d+-/, "")}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <HardDrive size={12} />
                        {formatSize(video.size)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {formatDate(video.uploadedAt)}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-section-alt text-muted">
                        {video.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </Section>

      {/* Video Player Modal */}
      <AnimatePresence>
        {playingUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setPlayingUrl(null)}
          >
            <button
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-white p-2 z-10"
              onClick={() => setPlayingUrl(null)}
            >
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={videoRef}
                src={playingUrl}
                className="w-full rounded-xl"
                controls
                autoPlay
                playsInline
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
