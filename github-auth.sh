#!/bin/bash

# GitHub 认证配置脚本

echo "🔐 GitHub 认证设置"
echo ""

# 检查是否已安装 gh CLI
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI 已安装"
    echo "运行 'gh auth login' 进行登录"
    gh auth login
else
    echo "⚠️ GitHub CLI 未安装"
    echo ""
    echo "请选择以下方式之一进行认证："
    echo ""
    echo "方式1：使用 Personal Access Token"
    echo "1. 访问 https://github.com/settings/tokens"
    echo "2. 点击 'Generate new token (classic)'"
    echo "3. 设置 Token 名称，选择 'repo' 权限"
    echo "4. 点击 'Generate token' 并复制 Token"
    echo "5. 运行以下命令："
    echo ""
    echo "   git remote set-url origin https://YOUR_TOKEN@github.com/wasedchildren/link-game.git"
    echo "   git push -u origin main"
    echo ""
    echo "方式2：安装 GitHub CLI"
    echo "   # macOS"
    echo "   brew install gh"
    echo ""
    echo "   # Linux"
    echo "   sudo apt install gh"
    echo ""
    echo "   # 然后运行"
    echo "   gh auth login"
    echo ""
fi
