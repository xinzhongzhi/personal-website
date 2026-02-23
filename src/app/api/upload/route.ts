import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

// 允许最大 50MB 的请求体（视频文件需要）
export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const category = (formData.get("category") as string) || "uncategorized";

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    const allowedVideoTypes = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"];
    const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "不支持的文件格式。支持: JPG, PNG, GIF, WebP, SVG, MP4, WebM, OGG" },
        { status: 400 }
      );
    }

    // Max size: 50MB for videos, 10MB for images
    const maxSize = allowedVideoTypes.includes(file.type) ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      const maxMB = maxSize / (1024 * 1024);
      return NextResponse.json(
        { error: `文件太大。最大 ${maxMB}MB` },
        { status: 400 }
      );
    }

    const isVideo = allowedVideoTypes.includes(file.type);
    const folder = isVideo ? "videos" : "images";
    const pathname = `${folder}/${category}/${Date.now()}-${file.name}`;

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      console.error("BLOB_READ_WRITE_TOKEN is not set");
      return NextResponse.json(
        { error: "服务器未配置存储 Token，请检查环境变量" },
        { status: 500 }
      );
    }

    const blob = await put(pathname, file, {
      token,
    });

    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      size: file.size,
      type: isVideo ? "video" : "image",
      category,
    });
  } catch (error) {
    console.error("Upload error:", error);
    const message = error instanceof Error ? error.message : "未知错误";
    return NextResponse.json({ error: `上传失败: ${message}` }, { status: 500 });
  }
}
