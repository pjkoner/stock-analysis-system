#!/bin/bash

echo "股票分析系统部署脚本"

echo "1. 检查GitHub登录状态..."
gh auth status || {
    echo "GitHub未登录，请先登录："
    echo "运行: gh auth login"
    exit 1
}

echo "2. 创建GitHub仓库..."
gh repo create stock-analysis-system --public --description "股票分析系统" || {
    echo "创建仓库失败，可能是仓库已存在或权限不足"
    echo "请手动创建仓库"
    exit 1
}

echo "3. 添加远程仓库..."
git remote add origin https://github.com/<username>/stock-analysis-system.git || {
    echo "添加远程仓库失败"
    echo "请手动添加：git remote add origin https://github.com/<username>/stock-analysis-system.git"
    exit 1
}

echo "4. 推送代码..."
git push -u origin main || {
    echo "推送失败"
    echo "请手动推送：git push -u origin main"
    exit 1
}

echo "5. 启动本地服务..."
echo "后端服务启动..."
cd backend
python3 app.py &
BACKEND_PID=$!
echo "后端PID: $BACKEND_PID"

echo "前端服务启动..."
cd frontend
npm install
npm start &
FRONTEND_PID=$!
echo "前端PID: $FRONTEND_PID"

echo "部署完成！"
echo "GitHub仓库：https://github.com/<username>/stock-analysis-system"
echo "后端API：http://localhost:5000"
echo "前端界面：http://localhost:3000"
echo "API测试：curl http://localhost:5000/api/stock/daily"