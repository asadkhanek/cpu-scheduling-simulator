@echo off
echo 🚀 Setting up CPU Scheduling Simulator for GitHub...

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed. Please install Git first.
    pause
    exit /b 1
)

REM Initialize git if not already initialized
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
) else (
    echo ✅ Git repository already initialized
)

REM Add all files
echo 📄 Adding files to Git...
git add .

REM Create initial commit
echo 💾 Creating initial commit...
git commit -m "🎉 Initial commit: CPU Scheduling Simulator with interactive features"

REM Check if remote origin exists
git remote | findstr "origin" >nul
if errorlevel 1 (
    echo 🔗 Please set up your GitHub repository and run:
    echo git remote add origin https://github.com/YOUR-USERNAME/cpu-scheduling-simulator.git
    echo git branch -M main
    echo git push -u origin main
) else (
    echo ✅ Remote origin already configured
)

echo.
echo ✨ Setup complete! Next steps:
echo 1. Create a GitHub repository named 'cpu-scheduling-simulator'
echo 2. Add the remote origin (see command above)
echo 3. Push to GitHub
echo 4. Enable GitHub Pages in repository settings
echo.
echo 📖 For detailed instructions, see GITHUB_SETUP.md
pause
