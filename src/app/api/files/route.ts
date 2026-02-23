import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "all"; // image, video, all
  const category = searchParams.get("category") || "";

  try {
    // List all blobs with prefix filter
    let prefix = "";
    if (type === "image") prefix = "images/";
    else if (type === "video") prefix = "videos/";

    if (category && type !== "all") {
      prefix = `${prefix}${category}/`;
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const { blobs } = await list({ prefix: prefix || undefined, token });

    const files = blobs.map((blob) => {
      const isVideo = blob.pathname.startsWith("videos/");
      const parts = blob.pathname.split("/");
      const fileCategory = parts.length > 2 ? parts[1] : "uncategorized";

      return {
        url: blob.url,
        pathname: blob.pathname,
        size: blob.size,
        uploadedAt: blob.uploadedAt,
        type: isVideo ? "video" : "image",
        category: fileCategory,
        filename: parts[parts.length - 1],
      };
    });

    // Filter by category if specified and type is "all"
    const filtered = category
      ? files.filter((f) => f.category === category)
      : files;

    // Sort by upload time, newest first
    filtered.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

    return NextResponse.json({ files: filtered });
  } catch (error) {
    console.error("List error:", error);
    return NextResponse.json({ error: "获取文件列表失败" }, { status: 500 });
  }
}
