import fs from "fs";
import path from "path";
import React from "react";
import Section, { SectionHeader } from "@/components/Section";

export default async function CapabilitiesPage() {
  // 读取 markdown 内容
  const filePath = path.join(process.cwd(), "src/app/capabilities/page.md");
  const content = fs.readFileSync(filePath, "utf-8");

  // 简单 markdown 渲染（如需更好效果可引入 react-markdown）
  return (
    <Section>
      <SectionHeader title="能力规划" subtitle="本站已实现与推荐能力清单" />
      <article className="prose max-w-3xl mx-auto mt-8">
        {content.split("\n").map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </article>
    </Section>
  );
}
