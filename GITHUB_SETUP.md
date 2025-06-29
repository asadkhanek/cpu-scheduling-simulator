# 🚀 GitHub Upload and Deployment Guide

Follow these steps to upload your CPU Scheduling Simulator to GitHub and deploy it with GitHub Pages.

## 📋 Prerequisites

1. **GitHub Account**: Make sure you have a GitHub account
2. **Git Installed**: Ensure Git is installed on your system
3. **Project Built**: The project should build successfully (`npm run build`)

## 🔧 Step 1: Prepare Your Repository

### Option A: Create New Repository on GitHub
1. Go to [GitHub](https://github.com)
2. Click the "+" icon → "New repository"
3. Repository name: `cpu-scheduling-simulator`
4. Description: "Interactive CPU scheduling simulator with React"
5. Make it **Public** (required for free GitHub Pages)
6. **Don't** initialize with README, .gitignore, or license (we have them)
7. Click "Create repository"

### Option B: Use GitHub CLI (if installed)
```bash
gh repo create cpu-scheduling-simulator --public --description "Interactive CPU scheduling simulator with React"
```

## 📤 Step 2: Upload to GitHub

### Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit: CPU Scheduling Simulator with interactive features"
```

### Add Remote and Push
```bash
# Replace 'your-username' with your actual GitHub username
git remote add origin https://github.com/your-username/cpu-scheduling-simulator.git
git branch -M main
git push -u origin main
```

## 🌐 Step 3: Enable GitHub Pages

### Method 1: Through GitHub Website
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "GitHub Actions"
5. The deployment will automatically start

### Method 2: Using the Automated Workflow
The project includes a GitHub Actions workflow that will automatically:
- Build the project on every push to main
- Deploy to GitHub Pages
- Make it available at: `https://your-username.github.io/cpu-scheduling-simulator/`

## 🔄 Step 4: Update Configuration

After uploading, update these files with your actual GitHub username:

### 1. Update `vite.config.js`
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/cpu-scheduling-simulator/', // ✅ Keep this as is
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
```

### 2. Update `package.json`
```json
{
  "homepage": "https://YOUR-USERNAME.github.io/cpu-scheduling-simulator/",
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR-USERNAME/cpu-scheduling-simulator.git"
  }
}
```

### 3. Update GitHub link in `EnhancedHeader.jsx`
In the GitHub button onClick:
```javascript
onClick={() => window.open('https://github.com/YOUR-USERNAME/cpu-scheduling-simulator', '_blank')}
```

## 🚀 Step 5: Deploy

### Automatic Deployment
Once you push to the main branch, GitHub Actions will automatically:
1. Install dependencies
2. Build the project
3. Deploy to GitHub Pages

### Manual Deployment (Alternative)
If you prefer manual deployment:
```bash
npm run deploy
```

## 🎉 Step 6: Access Your Live Site

After deployment (usually takes 5-10 minutes), your site will be available at:
```
https://your-username.github.io/cpu-scheduling-simulator/
```

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. Build Fails
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### 2. GitHub Pages Not Working
- Ensure repository is **public**
- Check GitHub Actions tab for error messages
- Verify GitHub Pages is enabled in repository settings

#### 3. Blank Page After Deployment
- Check that `base` in `vite.config.js` matches your repository name
- Ensure all file paths are relative

#### 4. 404 Errors for Assets
- Verify the `base` configuration in `vite.config.js`
- Check that the build process completed successfully

## ✨ Features Included

Your deployed simulator includes:

- **🎓 Interactive Tutorial**: Built-in help system
- **📊 Real-time Animations**: Smooth Gantt chart animations
- **📱 Responsive Design**: Works on all devices
- **💾 Data Import/Export**: Save and load configurations
- **📈 Advanced Analytics**: Animated statistics dashboard
- **🔄 Algorithm Comparison**: Side-by-side performance analysis

## 🎯 Next Steps

After deployment:

1. **📝 Update README**: Replace placeholder links with your actual GitHub username
2. **🎨 Customize**: Add your own touches and improvements
3. **📢 Share**: Share your project with others
4. **⭐ Get Stars**: Ask friends to star your repository
5. **📚 Learn**: Continue learning about algorithms and web development

## 📞 Need Help?

If you encounter issues:

1. **📖 Check GitHub Docs**: [GitHub Pages Documentation](https://docs.github.com/en/pages)
2. **🔍 Search Issues**: Look for similar problems in GitHub
3. **💬 Ask Community**: Use Stack Overflow or GitHub Discussions
4. **📧 Contact**: Reach out for help

---

🎉 **Congratulations! Your CPU Scheduling Simulator is now live on GitHub!** 🎉
