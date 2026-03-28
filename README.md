# 智能股票分析系统

## 项目概述
这是一个完整的股票分析系统，包含前端可视化界面和后端数据分析服务。

## 功能特性
### 前端功能：
- 每日股票分析展示
- 每周趋势分析图表
- 资金流向板块分析
- AI建议和预测展示
- 板块联动分析图表
- 个股滚动展示面板
- 投资策略选股建议

### 后端功能：
- 股票数据API接口
- 技术分析算法
- AI预测模型
- 板块联动分析
- 选股策略算法

## 技术架构
### 前端技术栈：
- React + TypeScript
- Ant Design UI组件库
- ECharts图表库
- Axios HTTP客户端

### 后端技术栈：
- Python Flask框架
- RESTful API设计
- 数据分析算法
- 模拟数据服务

## 项目结构
```
stock-analysis-system/
├── frontend/           # 前端React项目
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.tsx
│   ├── package.json
│   └── README.md
├── backend/            # 后端Flask项目
│   ├── app.py
│   ├── requirements.txt
│   ├── services/
│   └── README.md
├── docs/               # 项目文档
└── README.md
```

## API接口
### 后端提供以下API：
1. `/api/stock/daily` - 每日股票分析数据
2. `/api/stock/weekly` - 每周分析数据
3. `/api/fundflow/sector` - 板块资金流向
4. `/api/ai/predictions` - AI预测和建议
5. `/api/stock/sector-link` - 板块联动分析
6. `/api/strategy/recommend` - 选股策略建议
7. `/api/stock/rolling` - 个股滚动数据

## 快速启动

### 后端启动：
```bash
cd backend
python3 app.py
```

### 前端启动：
```bash
cd frontend
npm install
npm start
```

## 访问系统
- 后端API：http://localhost:5000
- 前端界面：http://localhost:3000

## 项目状态
**启动时间**：2026年3月29日 01:33:38
**截止时间**：2026年3月30日 01:33:38
**当前进度**：后端API完成，前端框架完成
**剩余时间**：约22小时

## 下一步开发
1. 完善前端UI界面
2. 优化图表展示
3. 集成真实股票数据
4. 部署到GitHub

## 团队成员
- 项目经理：元宝
- 前端开发：前端Bot
- 后端开发：后端Bot

## GitHub部署
项目已初始化GitHub仓库，代码已提交。下一步将部署到GitHub Pages或服务器。