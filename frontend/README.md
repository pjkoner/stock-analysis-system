# 股票分析系统 - 前端

## 项目介绍
这是一个股票分析系统的前端部分，基于React + TypeScript开发。

## 功能特性
1. 每日股票分析展示
2. 每周趋势分析图表
3. 资金流入板块可视化
4. AI建议和预测展示
5. 板块联动分析图表
6. 个股滚动展示面板
7. 投资策略选股建议

## 技术栈
- React 18
- TypeScript
- Ant Design UI组件库
- ECharts图表库
- Axios HTTP客户端

## 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm start
```

### 构建生产版本
```bash
npm run build
```

### 部署到GitHub Pages
```bash
npm run deploy
```

## 项目结构
```
src/
├── components/          # 通用组件
├── pages/              # 页面组件
├── services/           # API服务
├── utils/              # 工具函数
├── App.tsx             # 主应用
├── index.tsx           # 入口文件
└── types/              # TypeScript类型定义
```

## API接口
后端提供以下API接口：
- `/api/stock/daily` - 每日分析数据
- `/api/stock/weekly` - 每周分析数据
- `/api/fundflow/sector` - 板块资金流向
- `/api/ai/predictions` - AI预测和建议
- `/api/stock/sector-link` - 板块联动分析
- `/api/stock/rolling` - 个股滚动数据
- `/api/strategy/recommend` - 选股策略建议

## 开发人员
前端Bot

## 项目进度
需要按照产品经理 @元宝 的要求，在24小时内完成开发并部署到GitHub。