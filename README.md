# 辛忠志 - 个人网站

一个使用 Next.js + TypeScript + Tailwind CSS 构建的现代个人网站。

## 🚀 技术栈

- **框架**: [Next.js 16](https://nextjs.org/) (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS 4
- **动画**: Framer Motion
- **图标**: Lucide React
- **部署**: Vercel

## 📋 功能模块

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | `/` | Hero + 快速简介 + 精选项目 |
| 关于我 | `/about` | 个人自传 + 技能树 + 兴趣爱好 |
| 经历 | `/timeline` | 工作和教育经历时间线 |
| 项目展示 | `/projects` | 作品集展示 |
| 照片墙 | `/gallery` | 图片画廊（支持分类筛选） |
| 联系我 | `/contact` | 联系表单 + 社交媒体链接 |

## 🛠️ 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## ✏️ 自定义内容

所有网站内容都集中在 `src/data/config.ts` 文件中，修改该文件即可更新：
- 个人信息（姓名、头衔、简介）
- 社交媒体链接
- 关于我的文字内容
- 工作和教育经历
- 项目展示
- 照片墙

## 📸 添加图片

1. 将头像放入 `public/images/avatar.jpg`
2. 将项目截图放入 `public/images/projects/`
3. 将照片放入 `public/images/gallery/`
4. 在 `src/data/config.ts` 中更新对应路径

## 🌐 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 登录并导入该 GitHub 仓库
3. Vercel 会自动检测 Next.js 项目并完成部署
4. 获得 `https://your-project.vercel.app` 访问链接

每次推送代码到 `main` 分支，Vercel 会自动重新部署。

## 📄 License

MIT
