#!/bin/bash

echo "启动股票分析系统..."

# 启动后端
echo "启动后端API服务器..."
cd backend
python3 app.py &
BACKEND_PID=$!
echo "后端启动成功 PID: $BACKEND_PID"

# 等待后端启动
sleep 3

# 测试后端API
echo "测试后端API..."
curl http://localhost:5000/api/stock/daily > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "后端API测试成功"
else
  echo "后端API测试失败"
fi

# 检查前端依赖
echo "检查前端依赖..."
cd ../frontend
if [ -d "node_modules" ]; then
  echo "前端依赖已安装"
  # 启动前端
  echo "启动前端开发服务器..."
  npm start &
  FRONTEND_PID=$!
  echo "前端启动成功 PID: $FRONTEND_PID"
else
  echo "前端依赖正在安装，请稍后..."
fi

echo "系统启动完成！"
echo "后端API: http://localhost:5000"
echo "前端界面: http://localhost:3000"
echo "API测试: curl http://localhost:5000/api/stock/daily"
echo "查看日志: tail -f 后端.log 前端.log"