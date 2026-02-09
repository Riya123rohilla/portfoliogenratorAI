#!/bin/bash

# AI Portfolio Generator - Quick Start Script
# This script helps you get started quickly

echo "🚀 AI Portfolio Generator - Quick Start"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js detected: $(node --version)"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp .env.example .env
    echo "✅ .env file created!"
    echo ""
    echo "⚠️  IMPORTANT: You need to add your OpenAI API key to the .env file"
    echo "   1. Get your API key from: https://platform.openai.com/api-keys"
    echo "   2. Open .env file"
    echo "   3. Replace 'your_openai_api_key_here' with your actual key"
    echo ""
    read -p "Press Enter after you've added your API key..."
fi

# Verify API key is set
if grep -q "your_openai_api_key_here" .env; then
    echo "⚠️  Warning: Default API key detected in .env file"
    echo "   Please update it with your actual OpenAI API key"
    echo ""
fi

echo "🎨 Starting development server..."
echo ""
echo "The app will open at: http://localhost:3000"
echo ""
echo "Features:"
echo "  • Multi-step portfolio builder"
echo "  • AI-powered content refinement"
echo "  • Live preview with 3 themes"
echo "  • Export to HTML, React, and PDF"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
