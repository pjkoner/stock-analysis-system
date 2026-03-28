import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import StockChart from '../ChartComponents/StockChart';

interface StockAnalysis {
  code: string;
  name: string;
  current_price: number;
  change: string;
  technical: {
    ma5: number;
    ma10: number;
    ma20: number;
    macd: string;
    rsi: number;
    signal: string;
  };
}

interface DailyAnalysisCardProps {
  stocks: StockAnalysis[];
}

const DailyAnalysisCard: React.FC<DailyAnalysisCardProps> = ({ stocks }) => {
  // 生成图表数据（示例）
  const chartData = [
    { time: '09:30', price: 1500 },
    { time: '10:00', price: 1510 },
    { time: '10:30', price: 1520 },
    { time: '11:00', price: 1495 },
    { time: '11:30', price: 1485 },
    { time: '13:00', price: 1500 },
    { time: '13:30', price: 1515 },
    { time: '14:00', price: 1505 },
    { time: '14:30', price: 1510 },
    { time: '15:00', price: 1500 },
  ];

  return (
    <Card title="每日股票分析">
      <Row gutter={16}>
        <Col span={24}>
          <StockChart data={chartData} title="贵州茅台走势图" />
        </Col>
      </Row>
      
      <Row gutter={16} style={{ marginTop: 16 }}>
        {stocks.map(stock => (
          <Col span={6} key={stock.code}>
            <Card size="small">
              <Statistic
                title={stock.name}
                value={stock.current_price}
                precision={2}
                prefix="¥"
              />
              <div style={{ marginTop: 8 }}>
                <span style={{ color: stock.change.includes('+') ? '#ff4d4f' : '#52c41a' }}>
                  {stock.change}
                </span>
              </div>
              <div style={{ fontSize: 12, marginTop: 8 }}>
                <div>MA5: {stock.technical.ma5}</div>
                <div>MA10: {stock.technical.ma10}</div>
                <div>MA20: {stock.technical.ma20}</div>
                <div>MACD: {stock.technical.macd}</div>
                <div>RSI: {stock.technical.rsi}</div>
                <div>信号: {stock.technical.signal}</div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default DailyAnalysisCard;