"use client";

import Section, { SectionHeader } from "@/components/Section";
import { contactData, siteConfig } from "@/data/config";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  Send,
} from "lucide-react";
import { useState, FormEvent } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 这里可以接入实际的表单提交逻辑（如 Formspree、EmailJS 等）
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Section>
      <SectionHeader
        title={contactData.title}
        subtitle={contactData.subtitle}
      />

      <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8">
        {/* Contact Info */}
        <div className="md:col-span-2 space-y-6">
          <p className="text-muted leading-relaxed">
            {contactData.description}
          </p>

          <div className="space-y-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 p-4 rounded-xl bg-card-bg border border-border hover:border-primary transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail size={18} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted">邮箱</div>
                <div className="text-sm font-medium">{siteConfig.email}</div>
              </div>
            </a>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-card-bg border border-border">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin size={18} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted">位置</div>
                <div className="text-sm font-medium">{siteConfig.location}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-card-bg border border-border">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageCircle size={18} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted">微信</div>
                <div className="text-sm font-medium">{siteConfig.social.wechat}</div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">社交媒体</h3>
            <div className="flex gap-3">
              {[
                { icon: Github, href: siteConfig.social.github, label: "GitHub" },
                { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
                { icon: Twitter, href: siteConfig.social.twitter, label: "Twitter" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-card-bg border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-3"
        >
          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl bg-card-bg border border-border space-y-5"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">姓名</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-section-alt border border-border focus:border-primary focus:outline-none transition-colors text-sm"
                  placeholder="你的名字"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">邮箱</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-section-alt border border-border focus:border-primary focus:outline-none transition-colors text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">主题</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-section-alt border border-border focus:border-primary focus:outline-none transition-colors text-sm"
                placeholder="想聊些什么？"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">消息</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-section-alt border border-border focus:border-primary focus:outline-none transition-colors text-sm resize-none"
                placeholder="在这里写下你的消息..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-light transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
            >
              {isSubmitted ? (
                "消息已发送 ✓"
              ) : (
                <>
                  <Send size={16} />
                  发送消息
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </Section>
  );
}
