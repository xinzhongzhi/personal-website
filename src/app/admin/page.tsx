"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Image as ImageIcon,
  Video,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  FileImage,
  FileVideo,
  FolderOpen,
} from "lucide-react";
import Section, { SectionHeader } from "@/components/Section";

interface UploadedFile {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
  type: "image" | "video";
  category: string;
  filename: string;
}

const CATEGORIES = ["旅行", "生活", "工作", "项目", "其他"];

export default function AdminPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState("其他");
  const [filterType, setFilterType] = useState<"all" | "image" | "video">("all");
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<"image" | "video">("image");

  // Fetch existing files
  const fetchFiles = useCallback(async () => {
    try {
      const res = await fetch(`/api/files?type=${filterType}`);
      const data = await res.json();
      if (data.files) setFiles(data.files);
    } catch {
      showToast("error", "获取文件列表失败");
    } finally {
      setLoading(false);
    }
  }, [filterType]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle file upload
  const handleUpload = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    // 支持格式和大小
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    const allowedVideoTypes = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"];
    const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];
    const maxImageSize = 10 * 1024 * 1024; // 10MB
    const maxVideoSize = 4.5 * 1024 * 1024; // 4.5MB

    setUploading(true);
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const isVideo = file.type.startsWith("video/");
      // 前端校验类型
      if (!allowedTypes.includes(file.type)) {
        showToast("error", `不支持的文件格式: ${file.name}`);
        failCount++;
        continue;
      }
      // 前端校验大小
      if (!isVideo && file.size > maxImageSize) {
        showToast("error", `图片过大: ${file.name}，最大10MB`);
        failCount++;
        continue;
      }
      if (isVideo && file.size > maxVideoSize) {
        showToast("error", `视频过大: ${file.name}，最大4.5MB`);
        failCount++;
        continue;
      }

      setUploadProgress(`正在上传 ${file.name} (${i + 1}/${fileList.length})`);

      // 1. 先请求直传URL和表单字段
      const metaForm = new FormData();
      metaForm.append("file", file);
      metaForm.append("category", selectedCategory);
      metaForm.append("type", isVideo ? "video" : "image");
      let uploadUrl: string | null = null;
      let uploadFields: Record<string, string> = {};
      try {
        const metaRes = await fetch("/api/upload-url", {
          method: "POST",
          body: metaForm,
        });
        if (!metaRes.ok) {
          const err = await metaRes.json();
          showToast("error", `获取直传URL失败: ${err.error}`);
          failCount++;
          continue;
        }
        const { url, fields } = await metaRes.json();
        uploadUrl = url;
        uploadFields = fields;
      } catch (err) {
        showToast("error", `获取直传URL异常: ${(err as any).message}`);
        failCount++;
        continue;
      }

      // 2. 构造直传表单并上传
      const uploadForm = new FormData();
      Object.entries(uploadFields).forEach(([k, v]) => uploadForm.append(k, v));
      uploadForm.append("file", file);
      try {
        const uploadRes = await fetch(uploadUrl!, {
          method: "POST",
          body: uploadForm,
        });
        if (uploadRes.ok) {
          successCount++;
        } else {
          showToast("error", `上传失败: ${file.name}`);
          failCount++;
        }
      } catch (err) {
        showToast("error", `上传异常: ${(err as any).message}`);
        failCount++;
      }
    }

    setUploading(false);
    setUploadProgress("");

    if (successCount > 0) {
      showToast("success", `成功上传 ${successCount} 个文件${failCount > 0 ? `，${failCount} 个失败` : ""}`);
      fetchFiles();
    } else {
      showToast("error", "上传失败");
    }
  };

  // Handle delete
  const handleDelete = async (url: string) => {
    if (!confirm("确定要删除这个文件吗？")) return;

    try {
      const res = await fetch("/api/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (res.ok) {
        showToast("success", "删除成功");
        setFiles((prev) => prev.filter((f) => f.url !== url));
      } else {
        showToast("error", "删除失败");
      }
    } catch {
      showToast("error", "删除失败");
    }
  };

  // Drag & Drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleUpload(e.dataTransfer.files);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const images = files.filter((f) => f.type === "image");
  const videos = files.filter((f) => f.type === "video");
  const displayFiles = filterType === "image" ? images : filterType === "video" ? videos : files;

  return (
    <>
      <Section>
        <SectionHeader title="资源管理" subtitle="上传和管理你的图片与视频" />

        {/* Upload Area */}
        <div className="max-w-4xl mx-auto mb-12">
          {/* Category selector */}
          <div className="flex items-center gap-3 mb-4">
            <FolderOpen size={16} className="text-muted" />
            <span className="text-sm text-muted">上传到分类：</span>
            <div className="flex gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs rounded-full transition-all ${
                    selectedCategory === cat
                      ? "bg-primary text-white"
                      : "bg-section-alt border border-border text-muted hover:border-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Drag & Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
              dragActive
                ? "border-primary bg-primary/5 scale-[1.02]"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <input
              id="file-input"
              type="file"
              multiple
              accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml,video/mp4,video/webm,video/ogg,video/quicktime"
              className="hidden"
              onChange={(e) => handleUpload(e.target.files)}
            />

            {uploading ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 size={40} className="text-primary animate-spin" />
                <p className="text-sm text-muted">{uploadProgress}</p>
              </div>
            ) : (
              <>
                <Upload size={40} className="mx-auto mb-4 text-primary/60" />
                <p className="text-lg font-medium mb-2">拖拽文件到这里，或点击上传</p>
                <p className="text-sm text-muted">
                  支持 JPG, PNG, GIF, WebP, SVG（最大 10MB）| MP4, WebM, OGG, MOV（最大 4.5MB）
                </p>
                <p className="text-xs text-muted">如需上传大视频，请先压缩或转码</p>
              </>
            )}
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-2">
            {[
              { key: "all" as const, label: "全部", icon: FolderOpen },
              { key: "image" as const, label: `图片 (${images.length})`, icon: ImageIcon },
              { key: "video" as const, label: `视频 (${videos.length})`, icon: Video },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilterType(tab.key)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterType === tab.key
                    ? "bg-primary text-white"
                    : "bg-card-bg border border-border text-muted hover:border-primary"
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
          <p className="text-sm text-muted">共 {displayFiles.length} 个文件</p>
        </div>

        {/* File Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={32} className="text-primary animate-spin" />
          </div>
        ) : displayFiles.length === 0 ? (
          <div className="text-center py-20">
            <Upload size={48} className="mx-auto mb-4 text-muted/30" />
            <p className="text-muted">还没有上传任何文件</p>
            <p className="text-sm text-muted/60 mt-2">上传你的第一张图片或视频吧！</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayFiles.map((file) => (
              <motion.div
                key={file.url}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative rounded-xl overflow-hidden border border-border hover:border-primary transition-all bg-card-bg"
              >
                {/* Preview */}
                <div
                  className="aspect-square relative cursor-pointer"
                  onClick={() => {
                    setPreviewUrl(file.url);
                    setPreviewType(file.type);
                  }}
                >
                  {file.type === "image" ? (
                    <img
                      src={file.url}
                      alt={file.filename}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex flex-col items-center justify-center">
                      <FileVideo size={32} className="text-primary/50 mb-2" />
                      <span className="text-xs text-muted truncate px-2 max-w-full">
                        {file.filename}
                      </span>
                    </div>
                  )}

                  {/* Type badge */}
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 text-[10px] rounded-full bg-black/60 text-white backdrop-blur-sm">
                      {file.type === "video" ? "视频" : "图片"}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(file.url);
                      }}
                      className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* File info */}
                <div className="p-3">
                  <p className="text-xs truncate font-medium">{file.filename}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-muted">{formatSize(file.size)}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                      {file.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Section>

      {/* Preview Lightbox */}
      <AnimatePresence>
        {previewUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setPreviewUrl(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2 z-10"
              onClick={() => setPreviewUrl(null)}
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
              {previewType === "image" ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-full max-h-[85vh] rounded-xl object-contain"
                />
              ) : (
                <video
                  src={previewUrl}
                  controls
                  autoPlay
                  className="max-w-full max-h-[85vh] rounded-xl"
                >
                  您的浏览器不支持视频播放
                </video>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-xl ${
              toast.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {toast.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
