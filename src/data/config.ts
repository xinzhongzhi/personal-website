// 个人信息配置 - 修改这里的内容来定制你的网站
export const siteConfig = {
  name: "辛忠志",
  title: "全栈开发者 & 创业者",
  description: "热爱技术、创新和创造的开发者，致力于用代码改变世界。",
  avatar: "/images/avatar.jpg",
  email: "xzzak0@gmail.com",
  location: "中国",
  social: {
    github: "https://github.com/xinzhongzhi",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    wechat: "your-wechat-id",
  },
  nav: [
    { name: "首页", href: "/" },
    { name: "关于我", href: "/about" },
    { name: "经历", href: "/timeline" },
    { name: "项目", href: "/projects" },
    { name: "照片墙", href: "/gallery" },
    { name: "视频", href: "/videos" },
    { name: "联系我", href: "/contact" },
    { name: "管理", href: "/admin" },
  ],
};

export const heroData = {
  greeting: "你好，我是",
  name: "辛忠志",
  taglines: [
    "全栈开发者",
    "创业者",
    "终身学习者",
    "技术爱好者",
  ],
  description:
    "我是一名热爱技术与创新的开发者，喜欢用代码构建有趣的产品。在这里，你可以了解我的故事、项目和想法。",
  cta: [
    { text: "了解更多", href: "/about" },
    { text: "查看项目", href: "/projects" },
  ],
};

export const aboutData = {
  title: "关于我",
  subtitle: "我的故事",
  paragraphs: [
    "从小就对计算机和技术充满好奇，在大学期间开始了我的编程之旅。这些年来，我一直在不断学习和成长，从前端到后端、从移动端到服务器端，积累了丰富的全栈开发经验。",
    "我相信技术的力量可以改变世界，也相信每一行代码都应该有其意义。在工作之余，我喜欢探索新技术、参与开源项目，并将我的想法转化为实际的产品。",
    "除了编程，我还热爱阅读、旅行和摄影。这些爱好让我保持对世界的好奇心，也为我的创作提供了源源不断的灵感。",
    "目前，我正在创业的道路上探索，致力于打造有价值的产品和服务。如果你对我的故事感兴趣，或者想一起合作，欢迎随时联系我！",
  ],
  skills: [
    { category: "前端", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"] },
    { category: "后端", items: ["Node.js", "Python", "Java", "Go"] },
    { category: "数据库", items: ["PostgreSQL", "MongoDB", "Redis", "MySQL"] },
    { category: "DevOps", items: ["Docker", "K8s", "CI/CD", "AWS", "Vercel"] },
    { category: "工具", items: ["Git", "VS Code", "Figma", "Linux"] },
  ],
  stats: [
    { label: "开发经验", value: "5+" , unit: "年" },
    { label: "完成项目", value: "20+" , unit: "个" },
    { label: "开源贡献", value: "100+" , unit: "次" },
    { label: "技术文章", value: "50+" , unit: "篇" },
  ],
};

export const timelineData = {
  title: "我的经历",
  subtitle: "一路走来的足迹",
  events: [
    {
      year: "2024 - 至今",
      title: "创业中",
      company: "自主创业",
      description: "踏上创业之路，致力于打造创新产品，探索技术与商业的交汇点。",
      type: "work" as const,
    },
    {
      year: "2022 - 2024",
      title: "高级全栈开发工程师",
      company: "某科技公司",
      description: "负责核心产品的架构设计和开发，带领团队完成多个重要项目。使用 React、Node.js、K8s 等技术栈。",
      type: "work" as const,
    },
    {
      year: "2020 - 2022",
      title: "全栈开发工程师",
      company: "某互联网公司",
      description: "参与公司多个核心项目的开发，积累了丰富的全栈开发经验和团队协作能力。",
      type: "work" as const,
    },
    {
      year: "2018 - 2020",
      title: "前端开发工程师",
      company: "某创业公司",
      description: "从前端开发做起，负责公司 Web 应用的开发和维护，学习了大量前沿技术。",
      type: "work" as const,
    },
    {
      year: "2014 - 2018",
      title: "计算机科学学士",
      company: "某大学",
      description: "攻读计算机科学专业，系统学习了计算机基础知识，奠定了扎实的技术功底。",
      type: "education" as const,
    },
  ],
};

export const projectsData = {
  title: "项目展示",
  subtitle: "我参与和创建的作品",
  projects: [
    {
      title: "箭头会拐弯",
      description: "一款有趣的休闲小游戏，玩家需要控制箭头避开障碍物。基于 HTML5 Canvas 开发，支持移动端操作。",
      image: "/images/projects/project1.jpg",
      tags: ["HTML5", "Canvas", "JavaScript", "游戏开发"],
      link: "#",
      github: "#",
    },
    {
      title: "个人网站",
      description: "你正在看的这个网站！使用 Next.js + Tailwind CSS 构建，部署在 Vercel 上，具备完整的 CI/CD 流程。",
      image: "/images/projects/project2.jpg",
      tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
      link: "#",
      github: "#",
    },
    {
      title: "智能助手应用",
      description: "基于 AI 技术的智能助手应用，支持自然语言对话、任务管理、日程安排等功能。",
      image: "/images/projects/project3.jpg",
      tags: ["React", "Node.js", "AI", "MongoDB"],
      link: "#",
      github: "#",
    },
    {
      title: "电商后台管理系统",
      description: "全功能的电商后台管理系统，包含商品管理、订单处理、数据分析等模块。",
      image: "/images/projects/project4.jpg",
      tags: ["Vue.js", "Python", "PostgreSQL", "Docker"],
      link: "#",
      github: "#",
    },
  ],
};

export const galleryData = {
  title: "照片墙",
  subtitle: "记录生活中的美好瞬间",
  categories: ["全部", "旅行", "生活", "工作"],
  photos: [
    { src: "/images/gallery/photo1.jpg", alt: "旅行风景", category: "旅行" },
    { src: "/images/gallery/photo2.jpg", alt: "日常生活", category: "生活" },
    { src: "/images/gallery/photo3.jpg", alt: "工作日常", category: "工作" },
    { src: "/images/gallery/photo4.jpg", alt: "城市风光", category: "旅行" },
    { src: "/images/gallery/photo5.jpg", alt: "美食记录", category: "生活" },
    { src: "/images/gallery/photo6.jpg", alt: "团队合影", category: "工作" },
  ],
};

export const contactData = {
  title: "联系我",
  subtitle: "期待与你交流",
  description: "如果你对我的项目感兴趣，或者想要合作、交流，都欢迎随时联系我。我会尽快回复你的消息。",
};
// Trigger redeploy 1771776082
