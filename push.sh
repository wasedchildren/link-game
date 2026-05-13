#!/bin/bash

# 连连看游戏 - GitHub 推送脚本

echo "🚀 正在推送到 GitHub..."

# 推送到 main 分支
git push -u origin main

# 检查推送是否成功
if [ $? -eq 0 ]; then
    echo "✅ 推送成功！"
    echo ""
    echo "📋 下一步操作："
    echo "1. 访问 https://github.com/wasedchildren/link-game/settings/pages"
    echo "2. 在 'Build and deployment' 部分："
    echo "   - Source: 选择 'Deploy from a branch'"
    echo "   - Branch: 选择 'gh-pages' 和 '/ (root)'"
    echo "3. 点击 'Save'"
    echo ""
    echo "⏱️ 等待几分钟后，你的游戏将部署到："
    echo "   https://wasedchildren.github.io/link-game/"
else
    echo "❌ 推送失败，请检查你的 GitHub 认证"
fi
