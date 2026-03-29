#!/bin/bash

# 简单部署脚本 - 股票分析系统

echo "=== 股票分析系统部署脚本 ==="
echo "1. 检查系统依赖..."
echo "2. 启动后端服务..."
echo "3. 启动前端服务..."
echo "4. 验证API..."
echo "5. 创建GitHub仓库..."

# 检查Python依赖
cd backend
if [ ! -f "venv" ]; then
    echo "正在安装Python依赖..."
    pip install flask pandas numpy requests -q
else
    echo "Python依赖已安装"
fi

# 启动后端
echo "启动后端服务..."
python3 app.py &

# 检查Node依赖
cd frontend
if [ ! -f "package-lock.json" ]; then
    echo "正在安装Node依赖..."
    npm install -q
else
    echo "Node依赖已安装"
fi

# 启动前端
echo "启动前端服务..."
npm start &

echo "部署完成！"
echo "后端API: http://localhost:5000"
echo "前端界面: http://localhost:3000"
echo "GitHub仓库创建命令: gh repo create stock-analysis-dashboard --public"

echo "=== API测试 ==="
sleep 2
curl -s http://localhost:5000/api/stock/daily | head -20

echo ""
echo "=== 项目状态 ==="
echo "代码提交数: $(git log --oneline | wc -l)"
echo "文件总数: $(find . -type f | wc -l)"
echo "准备GitHub推送..."