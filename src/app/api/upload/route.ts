import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const category = formData.get("category") as string || "uncategorized";
  const type = formData.get("type") as string || "image"; // image or video

  if (!file) {
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

  try {
    const blob = await put(pathname, file, {
      access: "public",
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
    return NextResponse.json({ error: "上传失败" }, { status: 500 });
  }
}
