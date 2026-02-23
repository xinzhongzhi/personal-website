import { NextResponse } from "next/server";
import { createUploadUrl } from "@vercel/blob";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const category = (formData.get("category") as string) || "uncategorized";
  const type = (formData.get("type") as string) || "image";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const allowedImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
  const allowedVideoTypes = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"];
  const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "不支持的文件格式。支持: JPG, PNG, GIF, WebP, SVG, MP4, WebM, OGG" }, { status: 400 });
  }

  const isVideo = allowedVideoTypes.includes(file.type);
  const folder = isVideo ? "videos" : "images";
  const pathname = `${folder}/${category}/${Date.now()}-${file.name}`;

  try {
    const { url, fields } = await createUploadUrl({
      pathname,
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return NextResponse.json({ url, fields, pathname });
  } catch (error) {
    return NextResponse.json({ error: "生成直传URL失败" }, { status: 500 });
  }
}
