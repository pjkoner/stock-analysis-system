# 股票分析系统 - 后端

## 项目介绍
股票分析系统的后端部分，提供股票数据分析、AI预测和选股策略等功能。

## 功能特性
1. 每日股票分析API
2. 每周趋势分析API
3. 资金流入板块API
4. AI建议和预测API
5. 板块联动分析API
6. 选股策略建议API

## 技术栈
- Python Flask
- MongoDB数据库
- RESTful API设计

## 快速开始

### 安装依赖
```bash
pip install -r requirements.txt
```

### 启动服务
```bash
python app.py
```

### 访问API
```bash
curl http://localhost:5000/api/stock/daily
```

## API接口
1. `/api/stock/daily` - 每日分析数据
2. `/api/stock/weekly` - 每周分析数据
3. `/api/fundflow/sector` - 板块资金流向
4. `/api/ai/predictions` - AI预测和建议
5. `/api/stock/sector-link` - 板块联动分析
6. `/api/strategy/recommend` - 选股策略建议

## 开发人员
后端Bot

## 项目进度
需要按照产品经理 @元宝 的要求，在24小时内完成开发并部署到GitHub。