import Hero from "@/components/Hero";
import Section, { SectionHeader } from "@/components/Section";
import { aboutData, projectsData } from "@/data/config";
import { Code, Briefcase, Camera, Mail } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Quick About Section */}
      <Section alt>
        <SectionHeader title="关于我" subtitle="快速了解" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {aboutData.stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-card-bg border border-border hover:border-primary transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Featured Projects Preview */}
      <Section>
        <SectionHeader title="精选项目" subtitle="最近的作品" />
        <div className="grid md:grid-cols-2 gap-6">
          {projectsData.projects.slice(0, 2).map((project) => (
            <div
              key={project.title}
              className="group p-6 rounded-2xl bg-card-bg border border-border hover:border-primary transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-full h-48 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 mb-4 flex items-center justify-center">
                <Code size={48} className="text-primary/40" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted text-sm mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground hover:border-primary hover:text-primary transition-all"
          >
            查看全部项目 →
          </Link>
        </div>
      </Section>

      {/* Quick Links */}
      <Section alt>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Briefcase,
              title: "我的经历",
              desc: "从学生到开发者再到创业者的成长历程",
              href: "/timeline",
            },
            {
              icon: Camera,
              title: "照片墙",
              desc: "用镜头记录生活中的美好瞬间",
              href: "/gallery",
            },
            {
              icon: Mail,
              title: "联系我",
              desc: "期待与你交流、合作或只是聊聊天",
              href: "/contact",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group p-8 rounded-2xl bg-card-bg border border-border hover:border-primary transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <item.icon
                size={32}
                className="mx-auto mb-4 text-primary group-hover:scale-110 transition-transform"
              />
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted">{item.desc}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
