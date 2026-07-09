# 数字时钟 + 虚拟宠物 应用开发计划

## 概述

构建一个基于 React + TypeScript + Vite 的浏览器数字时钟应用，集成像素风虚拟宠物功能。包含可自定义背景、宠物互动系统和持久化存储。

## 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: CSS (BEM 命名 + CSS 变量主题系统)
- **存储**: localStorage 持久化
- **字体**: Google Fonts - Press Start 2P (像素风) + Orbitron (数字时钟)
- **无外部 UI 库**，所有组件手写以保持轻量

## 项目结构

```
Tomato clock/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.tsx                    # 入口
│   ├── App.tsx                     # 主布局，组合所有组件
│   ├── App.css                     # 全局样式
│   ├── index.css                   # CSS Reset + 变量
│   ├── components/
│   │   ├── DigitalClock/
│   │   │   ├── DigitalClock.tsx    # 数字时钟组件
│   │   │   └── DigitalClock.css
│   │   ├── VirtualPet/
│   │   │   ├── VirtualPet.tsx      # 宠物显示组件
│   │   │   ├── VirtualPet.css
│   │   │   └── petSprites.ts       # 像素精灵图数据 (CSS box-shadow)
│   │   ├── PetPanel/
│   │   │   ├── PetPanel.tsx        # 宠物状态面板 + 操作按钮
│   │   │   └── PetPanel.css
│   │   ├── Background/
│   │   │   ├── Background.tsx      # 背景切换组件
│   │   │   └── Background.css
│   │   └── BackgroundPicker/
│   │       ├── BackgroundPicker.tsx # 背景选择器 UI
│   │       └── BackgroundPicker.css
│   ├── hooks/
│   │   ├── useClock.ts             # 时钟逻辑 hook
│   │   ├── usePet.ts               # 宠物状态管理 hook
│   │   └── useLocalStorage.ts      # 持久化 hook
│   ├── types/
│   │   └── index.ts                # TypeScript 类型定义
│   └── constants/
│       ├── backgrounds.ts          # 预设背景配置
│       └── petConfig.ts            # 宠物配置常量
```

## 详细实现方案

### 1. 数字时钟组件 (DigitalClock)

**功能:**
- 实时显示 HH:MM:SS，每秒更新
- 日期显示 (YYYY年MM月DD日 星期X)
- 24小时/12小时制切换
- 数字翻页动画效果 (CSS transform transition)

**实现细节:**
- `useClock` hook: 使用 `setInterval` + `useState` 管理时间状态
- 每个数字位独立渲染，变化时触发 CSS 翻转动画
- 数字使用 Orbitron 字体，加 text-shadow 发光效果营造科技感
- 布局: 时钟居上半部分，字号大 (clamp 响应式)

### 2. 像素宠物组件 (VirtualPet)

**像素精灵方案:**
- 使用 CSS `box-shadow` 技术绘制像素艺术 (无外部图片依赖)
- 每个像素 = 1px box-shadow 偏移，放大后用 `image-rendering: pixelated`
- 精灵尺寸: 16x16 像素网格

**宠物状态系统 (usePet hook):**

| 属性 | 初始值 | 衰减速率 | 描述 |
|------|--------|----------|------|
| hunger (饱腹) | 100 | -2/分钟 | 喂食恢复 |
| happiness (心情) | 100 | -1.5/分钟 | 玩耍恢复 |
| energy (精力) | 100 | -1/分钟 | 睡觉恢复 |
| cleanliness (清洁) | 100 | -0.5/分钟 | 清洁恢复 |
| health (健康) | 100 | 综合计算 | 由其他属性决定 |

**宠物视觉状态:**
- `happy`: 大眼睛，微笑，微微弹跳动画
- `hungry`: 嘴巴张开，肚子小，轻微抖动
- `tired`: 眯眼，打哈欠动画
- `bored`: 歪头，叹气泡泡
- `sick`: 脸色发绿，卧床姿态
- `eating`: 嘴巴咀嚼动画
- `playing`: 跳跃 + 笑脸
- `sleeping`: 闭眼 + Zzz 浮动文字

**交互按钮:**
- 🍖 喂食 (Feed) → 恢复 hunger +15，播放咀嚼动画
- 🎮 玩耍 (Play) → 恢复 happiness +20，消耗 energy -10
- 😴 睡觉 (Sleep) → 恢复 energy +30，持续10秒
- 🧹 清洁 (Clean) → 恢复 cleanliness +25

### 3. 背景系统 (Background)

**预设背景类型:**

1. **渐变背景 (Gradient)**
   - 日出渐变 (橙→粉→紫)
   - 深海渐变 (深蓝→靛蓝→青)
   - 极光渐变 (绿→蓝→紫，CSS animation 循环)
   - 暖阳渐变 (金黄→橙)
   - 暗夜渐变 (深灰→黑)

2. **动画背景 (Animated)**
   - 星空 (CSS 随机定位的白色小圆点 + 闪烁动画)
   - 浮动粒子 (半透明圆点上下浮动)
   - 波浪 (CSS wave animation)
   - 下雨 (CSS 动画雨滴)

3. **纯色背景 (Solid)**
   - 纯黑、深灰、深蓝

**实现:**
- Background 组件根据当前选择渲染对应 CSS class
- BackgroundPicker 组件提供底部缩略图选择条
- 每种背景有小缩略预览，点击切换
- 背景选择保存到 localStorage

### 4. 持久化存储

**保存内容:**
- 宠物状态 (hunger, happiness, energy, cleanliness)
- 当前背景选择
- 时钟格式偏好 (12h/24h)
- 上次在线时间 (用于计算离线衰减)

**离线衰减计算:**
- 重新打开应用时，计算 `当前时间 - 上次保存时间`
- 按衰减速率扣减宠物属性（设上限为当前值，不低于0）

### 5. 布局设计

```
┌──────────────────────────────────────────┐
│                                          │
│              [背景层]                      │
│                                          │
│   ┌──────────────────────────────┐       │
│   │                              │       │
│   │        24 : 35 : 07          │       │  ← 大号数字时钟 (居中偏上)
│   │      2026年07月07日 星期一     │       │
│   │                              │       │
│   └──────────────────────────────┘       │
│                                          │
│   ┌──────────────────────────────┐       │
│   │                              │       │
│   │          🐱 [像素宠物]        │       │  ← 宠物区域 (居中)
│   │         ❤️❤️❤️❤️❤️            │       │
│   │                              │       │
│   └──────────────────────────────┘       │
│                                          │
│   ┌──────────────────────────────┐       │
│   │  🍖 喂食  🎮 玩耍  😴 睡觉  🧹 清洁  │  ← 操作按钮栏
│   └──────────────────────────────┘       │
│                                          │
│   ┌──────────────────────────────┐       │
│   │ 饱腹 ████░░ 80%  心情 ███░░ 65%    │  ← 宠物状态条
│   │ 精力 ████░ 75%  清洁 █████ 95%    │
│   └──────────────────────────────┘       │
│                                          │
│   ── ● ● ● ● ● ● ──                     │  ← 背景选择器 (底部小圆点)
│                                          │
│   [设置齿轮] [12H/24H]                   │  ← 右下角设置
└──────────────────────────────────────────┘
```

### 6. 响应式设计

- **桌面 (>768px)**: 经典布局，时钟大字居中，宠物在下方
- **平板 (768px)**: 缩放间距，保持布局
- **手机 (<480px)**: 时钟缩小，宠物和按钮纵向堆叠，状态栏可折叠
- 使用 CSS `clamp()` 和 `vw/vh` 单位实现流式缩放
- `@media` 查询处理断点

## 实现步骤

### Step 1: 项目初始化
- 使用 Vite 创建 React + TypeScript 项目
- 安装依赖（无额外库，仅 React）
- 清理默认文件，建立目录结构
- 配置 TypeScript, Vite

### Step 2: 基础样式和主题
- 编写 `index.css` (CSS Reset + CSS 变量)
- 引入 Google Fonts (Press Start 2P + Orbitron)
- 设置全局字体和颜色变量

### Step 3: 时钟组件
- 实现 `useClock` hook
- 实现 `DigitalClock` 组件 + 翻页动画
- 实现日期显示

### Step 4: 宠物精灵和状态
- 实现 `petSprites.ts` (CSS box-shadow 像素精灵)
- 实现 `useLocalStorage` hook
- 实现 `usePet` hook (状态管理 + 离线衰减)
- 实现 `VirtualPet` 组件 (渲染精灵 + 状态动画)
- 实现 `PetPanel` 组件 (状态条 + 操作按钮)

### Step 5: 背景系统
- 实现 `Background` 组件
- 配置所有预设背景 (渐变/动画/纯色)
- 实现 `BackgroundPicker` 组件
- 背景持久化

### Step 6: 组装和优化
- 在 `App.tsx` 中组装所有组件
- 响应式适配
- 动画性能优化 (使用 CSS transform/opacity, will-change)
- 整体布局微调

### Step 7: 验证和打磨
- 测试时钟准确性
- 测试宠物状态衰减和交互
- 测试背景切换
- 测试刷新页面后数据恢复
- 测试不同屏幕尺寸
- 检查动画流畅度

## 假设和决策

1. **无后端**: 纯前端应用，所有数据存 localStorage
2. **无外部图片**: 像素宠物完全用 CSS box-shadow 实现，背景用 CSS 实现
3. **无额外依赖**: 保持极简，不引入 animation library 或 UI library
4. **宠物无品种**: 单一宠物角色，通过像素精灵不同帧表现不同状态
5. **单宠物**: 不涉及多宠物管理

## 验证方案

1. `npm run dev` 启动开发服务器，浏览器打开验证
2. 检查时钟每秒更新，数字切换有动画
3. 宠物像素精灵清晰可见，交互按钮正常响应
4. 宠物属性随时间衰减，喂食/玩耍/睡觉/清洁能正确恢复
5. 刷新页面后，宠物状态和背景偏好保留
6. 切换背景正常，动画流畅
7. 缩小浏览器窗口验证响应式布局
