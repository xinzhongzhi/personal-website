import Section, { SectionHeader } from "@/components/Section";
import { aboutData } from "@/data/config";
import { BookOpen, Code, Coffee, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于我 - 辛忠志",
  description: "了解我的故事、技能和经历",
};

const hobbyIcons = [BookOpen, Coffee, Globe, Code];

export default function AboutPage() {
  return (
    <>
      <Section>
        <SectionHeader title={aboutData.title} subtitle={aboutData.subtitle} />

        {/* About Text */}
        <div className="max-w-3xl mx-auto mb-20">
          {aboutData.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-muted text-lg leading-relaxed mb-6 last:mb-0"
            >
              {p}
            </p>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {aboutData.stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-8 rounded-2xl bg-card-bg border border-border hover:border-primary transition-all duration-300"
            >
              <div className="text-4xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted uppercase tracking-wider">
                {stat.unit}
              </div>
              <div className="text-sm text-muted mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section alt>
        <SectionHeader title="技能树" subtitle="我掌握的技术" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aboutData.skills.map((skillGroup) => (
            <div
              key={skillGroup.category}
              className="p-6 rounded-2xl bg-card-bg border border-border hover:border-primary transition-all duration-300"
            >
              <h3 className="font-bold text-lg mb-4 text-primary">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-sm rounded-lg bg-section-alt border border-border hover:border-primary hover:text-primary transition-all cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Hobbies */}
      <Section>
        <SectionHeader title="兴趣爱好" subtitle="工作之余的生活" />
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: BookOpen, name: "阅读", desc: "每年阅读 20+ 本书" },
            { icon: Coffee, name: "咖啡", desc: "一杯好咖啡开启美好一天" },
            { icon: Globe, name: "旅行", desc: "探索世界各地的文化" },
            { icon: Code, name: "开源", desc: "参与开源社区贡献代码" },
          ].map((hobby, i) => (
            <div
              key={hobby.name}
              className="text-center p-6 rounded-2xl bg-card-bg border border-border hover:border-primary transition-all duration-300 hover:-translate-y-1"
            >
              <hobby.icon
                size={32}
                className="mx-auto mb-4 text-primary"
              />
              <h3 className="font-bold mb-2">{hobby.name}</h3>
              <p className="text-sm text-muted">{hobby.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
