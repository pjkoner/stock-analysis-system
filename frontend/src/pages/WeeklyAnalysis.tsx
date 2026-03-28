import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import StockChart from '../components/ChartComponents/StockChart';
import SectorFlowChart from '../components/ChartComponents/SectorFlowChart';
import { stockAPI } from '../services/api';

const WeeklyAnalysis: React.FC = () => {
  const [weeklyData, setWeeklyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await stockAPI.getWeeklyAnalysis();
      setWeeklyData(response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  // 周度数据示例
  const weeklyChartData = [
    { time: '周一', price: 3200 },
    { time: '周二', price: 3210 },
    { time: '周三', price: 3220 },
    { time: '周四', price: 3190 },
    { time: '周五', price: 3205 },
  ];

  // 板块资金流向示例
  const sectorData = [
    { name: '科技', inflow: 50000000, outflow: 30000000, net: 20000000 },
    { name: '金融', inflow: 40000000, outflow: 25000000, net: 15000000 },
    { name: '医药', inflow: 30000000, outflow: 20000000, net: 10000000 },
    { name: '房地产', inflow: 20000000, outflow: 18000000, net: 2000000 },
    { name: '制造业', inflow: 15000000, outflow: 12000000, net: 3000000 },
  ];

  // 板块表现示例
  const sectorPerformance = [
    { name: '科技', performance: '+5.1%' },
    { name: '金融', performance: '+3.2%' },
    { name: '医药', performance: '+2.3%' },
    { name: '房地产', performance: '+1.5%' },
    { name: '制造业', performance: '+0.8%' },
  ];

  return (
    <div style={{ padding: 16 }}>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="本周大盘走势">
            {loading ? (
              <div>加载中...</div>
            ) : (
              <StockChart data={weeklyChartData} title="本周上证指数走势" />
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="板块资金流向">
            {loading ? (
              <div>加载中...</div>
            ) : (
              <SectorFlowChart data={sectorData} title="板块资金流向" />
            )}
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="板块表现分析">
            <Row gutter={16}>
              {sectorPerformance.map((sector, index) => (
                <Col span={4} key={index}>
                  <Card size="small">
                    <Statistic
                      title={sector.name}
                      value={parseFloat(sector.performance)}
                      precision={2}
                      suffix="%"
                      valueStyle={{ 
                        color: sector.performance.includes('+') ? '#ff4d4f' : '#52c41a'
                      }}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="本周总结">
            <div style={{ padding: 16 }}>
              <p>📈 <strong>市场总结</strong>: 本周市场整体上涨，科技板块表现强劲</p>
              <p>🔍 <strong>资金流向</strong>: 资金主要流入科技和金融板块</p>
              <p>💡 <strong>机会分析</strong>: 科技板块持续强势，金融板块稳步上涨</p>
              <p>⚠️ <strong>风险提示</strong>: 制造业板块相对较弱，需谨慎操作</p>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="趋势预测">
            <div style={{ padding: 16 }}>
              <p>🎯 <strong>下周预测</strong>: 预计市场将继续保持上涨态势</p>
              <p>📊 <strong>重点关注</strong>: 科技、金融板块</p>
              <p>💼 <strong>策略建议</strong>: 建议适当增仓科技板块优质个股</p>
              <p>🧮 <strong>风险控制</strong>: 仓位控制在60%以内，注意分散风险</p>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="AI周度分析报告">
            <div style={{ padding: 16 }}>
              <h3>本周市场回顾</h3>
              <p>本周市场呈现温和上涨态势，科技板块表现最为突出。上证指数上涨3.2%，深证成指上涨4.1%。资金流向显示，科技板块净流入资金最多，其次是金融板块。</p>
            
              <h3>技术面分析</h3>
              <p>• MA5均线向上突破MA10均线，显示多头趋势</p>
              <p>• MACD指标显示金叉信号</p>
              <p>• RSI指标处于合理区间（60-70）</p>
              <p>• 成交量较上周增加15%</p>
            
              <h3>下周展望</h3>
              <p>预计下周市场将继续保持上涨势头，重点关注科技板块的持续性。建议关注：</p>
              <p>• 贵州茅台（600519） - 白酒龙头，技术面良好</p>
              <p>• 中国平安（601318） - 保险龙头，基本面稳健</p>
              <p>• 招商银行（600036） - 银行板块，价值投资</p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default WeeklyAnalysis;