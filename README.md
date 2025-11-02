<<<<<<< HEAD
# Nexoraflow_Google_GenAI_Exchange_Hackathon_2025
=======
# 🚀 NexoraFlow Dashboard

A comprehensive AI-powered career development platform built with React, TypeScript, and Node.js.

![NexoraFlow Dashboard](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)

## ✨ Features

### 🏠 Core Modules
- **Intelligent Dashboard** - Real-time metrics and AI-powered insights
- **Side Hustle Discovery Hub** - Personalized opportunity matching
- **AI Resilience Coach** - Mental health and career guidance
- **Achievement Gamification** - Progress tracking and rewards
- **Adaptive Learning Pathways** - Personalized skill development
- **Community Nexus Hub** - Professional networking and collaboration

### 🛠 Technical Features
- ⚡ **React 19** with TypeScript for type safety
- 🎨 **Tailwind CSS** for responsive, modern UI
- 🔄 **Hot Module Replacement** for fast development
- 📱 **Fully Responsive** design for all devices
- 🌐 **RESTful API** with Express.js backend
- 🔒 **Production Ready** with optimized builds

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd nexoraflow-dashboard

# Install dependencies
npm install

# Start development server
npm run dev:full
```

Visit `http://localhost:5173` to see the application.

## 📦 Deployment

### 🌐 Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### 🌊 Netlify
1. Build the project: `npm run build`
2. Deploy the `dist/` folder to Netlify

### 🐳 Docker
```bash
docker build -t nexoraflow-dashboard .
docker run -p 3002:3002 nexoraflow-dashboard
```

### ☁️ Other Platforms
- **Heroku**: Use included `Dockerfile`
- **Railway**: Connect GitHub repository
- **DigitalOcean**: Use App Platform with auto-deploy

## 🔧 Configuration

### Environment Variables
Copy `.env.example` to `.env` and configure:

```env
# Frontend
VITE_API_URL=https://your-api-url.com/api
VITE_APP_NAME=NexoraFlow Dashboard

# Backend (backend/.env)
PORT=3002
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.com
```

## 📁 Project Structure

```
nexoraflow-dashboard/
├── 📂 dist/                 # Production build
├── 📂 src/
│   ├── 📂 components/       # Reusable UI components
│   ├── 📂 pages/           # Main application pages
│   ├── 📂 contexts/        # React contexts
│   ├── 📂 hooks/           # Custom React hooks
│   ├── 📂 types/           # TypeScript definitions
│   └── 📂 services/        # API services
├── 📂 backend/             # Node.js API server
│   ├── 📂 routes/          # API routes
│   ├── 📂 middleware/      # Express middleware
│   └── server.js           # Main server file
├── 📂 public/              # Static assets
└── 📄 package.json         # Dependencies & scripts
```

## 🎨 Customization

### Styling
- **Colors**: Edit `tailwind.config.js`
- **Global Styles**: Modify `src/index.css`
- **Components**: Update individual component styles

### Features
- **New Pages**: Add to `src/pages/` and update `src/App.tsx`
- **API Endpoints**: Add to `backend/routes/`
- **Components**: Create in `src/components/`

## 📊 Available Scripts

```bash
# Development
npm run dev              # Start frontend only
npm run backend:dev      # Start backend only
npm run dev:full         # Start both frontend & backend

# Production
npm run build            # Build for production
npm run preview          # Preview production build
npm run deploy:build     # Build and install backend deps

# Utilities
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking
```

## 🌟 Key Components

### Dashboard Features
- **Real-time Metrics** - Live progress tracking
- **AI Recommendations** - Personalized suggestions
- **Activity Feed** - Recent user actions
- **Quick Actions** - One-click feature access

### Navigation
- **Responsive Sidebar** - Collapsible navigation
- **Mobile Menu** - Touch-friendly mobile navigation
- **Breadcrumbs** - Clear page hierarchy

### UI Components
- **Interactive Cards** - Hover effects and animations
- **Progress Bars** - Animated progress indicators
- **Toast Notifications** - User feedback system
- **Loading States** - Skeleton screens and spinners

## 🔗 API Integration

The application includes a full REST API with endpoints for:
- Dashboard data and metrics
- User activity tracking
- AI-powered recommendations
- Learning progress management
- Community interactions

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For deployment issues or questions:
1. Check the [Deploy Guide](deploy.md)
2. Review the [Issues](../../issues) section
3. Contact the development team

---

**Built with ❤️ by the NexoraFlow Team**

*Empowering careers through AI-driven insights and community collaboration.*
>>>>>>> 3c4984d (run-app: snapshot before push)
