# 部署到 GitHub Pages

## 🚀 部署配置已就绪！

GitHub Actions 自动部署配置已创建完成！

## 1. 在 GitHub 创建仓库

1. 访问 https://github.com/new 创建一个新仓库
2. 仓库名称建议：`linkup-game` 或 `连连看游戏`
3. 选择 Public 或 Private（Public 可以免费使用 GitHub Pages）
4. 不要添加 README、.gitignore 或 LICENSE（我们已经有了）
5. 点击 "Create repository"

## 2. 关联本地仓库到 GitHub

在项目根目录运行：

```bash
# 添加远程仓库（替换你的用户名和仓库名）
git remote add origin https://github.com/你的用户名/你的仓库名.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

## 3. 配置 GitHub Pages（自动部署）

### 方法一：使用 GitHub Actions 自动部署（推荐）

创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

然后：
1. 提交并推送这个 workflow 文件
2. 在 GitHub 仓库页面，点击 Settings -> Pages
3. 在 "Build and deployment" 部分，Source 选择 "Deploy from a branch"
4. Branch 选择 `gh-pages`，文件夹选择 `/ (root)`
5. 点击 Save

### 方法二：手动部署

修改 `vite.config.ts`，添加 base 配置：

```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/你的仓库名/',  // 注意替换
})
```

然后运行：

```bash
npm run build
npm install -g gh-pages
gh-pages -d dist
```

## 4. 访问你的游戏

部署完成后，你的游戏地址将是：

```
https://你的用户名.github.io/你的仓库名/
```

## 注意事项

- 第一次部署可能需要几分钟才能生效
- 如果使用自定义域名，需要在仓库设置中配置
