import { NextResponse } from "next/server";

// 该 API 路由已废弃，因 @vercel/blob 版本不支持 createUploadUrl，保留空实现防止构建报错
export async function POST() {
  return NextResponse.json({ error: "Not supported in current @vercel/blob version" }, { status: 400 });
}
