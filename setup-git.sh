#!/bin/bash

# CPU Scheduling Simulator - Git Setup Script
# This script initializes Git and prepares the project for GitHub upload

echo "🚀 Setting up CPU Scheduling Simulator for GitHub..."

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
else
    echo "✅ Git repository already initialized"
fi

# Add all files
echo "📄 Adding files to Git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "🎉 Initial commit: CPU Scheduling Simulator with interactive features

Features included:
- Interactive process management
- Real-time Gantt chart visualization
- Algorithm comparison (FCFS, SJF, Priority, RR)
- Animated performance metrics
- Responsive design
- Data import/export
- Built-in tutorial system"

# Check if remote origin exists
if git remote | grep -q "origin"; then
    echo "✅ Remote origin already configured"
else
    echo "🔗 Please set up your GitHub repository and run:"
    echo "git remote add origin https://github.com/YOUR-USERNAME/cpu-scheduling-simulator.git"
    echo "git branch -M main"
    echo "git push -u origin main"
fi

echo ""
echo "✨ Setup complete! Next steps:"
echo "1. Create a GitHub repository named 'cpu-scheduling-simulator'"
echo "2. Add the remote origin (see command above)"
echo "3. Push to GitHub"
echo "4. Enable GitHub Pages in repository settings"
echo ""
echo "📖 For detailed instructions, see GITHUB_SETUP.md"
