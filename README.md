# dsh-live2d-assistant

为 DeepSeek Harness Web GUI 添加一个「Live2D 助手」：每天轮换的二次元角色（来自 Brown Dust 2），渲染在画面右上角，可交互。

## 功能

- 🎭 **每日轮换**：按本地日期确定当天角色，每天 0 点自动切换（共 176 个角色）
- 🖱️ **悬停菜单**：鼠标悬停显示「动作列表」和「角色列表」，可点击切换
- 🎬 **动作切换**：单击角色循环切换动画
- 🔍 **双击放大**：双击角色放大（不超过输入框上边缘），再双击恢复
- 🧊 **透明背景**：角色直接浮在页面上，与 GUI 融为一体
- ⚡ **本地缓存**：Service Worker 缓存角色资源，切换/刷新不再走网络

## 安装

```bash
dsh plugin --profile web add ./dsh-live2d-assistant
# 或从 npm 安装（如已发布）
dsh plugin --profile web add dsh-live2d-assistant
```

安装后重启 `dsh web` 生效。

## 说明

- 角色素材来自 [BD2 L2D Viewer](https://jelosus2.github.io/BD2-L2D-Viewer/)（Brown Dust 2，MIT 友好的开源查看器），spine 模型按需加载并本地缓存。
- 渲染库为 [@esotericsoftware/spine-player](https://www.npmjs.com/package/@esotericsoftware/spine-player) 4.1.55，已随包内置（`assets/spine-player.min.js`）。

## License

MIT
