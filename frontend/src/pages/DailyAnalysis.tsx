import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Table } from 'antd';
import StockChart from '../components/ChartComponents/StockChart';
import { stockAPI } from '../services/api';

const DailyAnalysis: React.FC = () => {
  const [stockData, setStockData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await stockAPI.getDailyAnalysis();
      setStockData(response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  // 图表数据示例
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

  // 表格数据示例
  const tableData = [
    {
      key: '1',
      stock: '贵州茅台',
      code: '600519',
      price: 1500.50,
      change: '+2.5%',
      volume: '100万',
      maTrend: '多头排列',
      signal: '买入'
    },
    {
      key: '2',
      stock: '中国平安',
      code: '601318',
      price: 70.30,
      change: '+1.2%',
      volume: '80万',
      maTrend: '多头排列',
      signal: '买入'
    },
    {
      key: '3',
      stock: '招商银行',
      code: '600036',
      price: 45.80,
      change: '+0.8%',
      volume: '60万',
      maTrend: '震荡',
      signal: '持有'
    },
  ];

  const columns = [
    {
      title: '股票名称',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: '代码',
      dataIndex: 'code',
     1),
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `¥${price.toFixed(2)}`
    },
    {
      title: '涨跌幅',
      dataIndex: 'change',
      key: 'change',
      render: (change: string) => (
        <span style={{ color: change.includes('+') ? '#ff4d4f' : '#52c41a' }}>
          {change}
        </span>
      )
    },
    {
      title: '成交量',
      dataIndex: 'volume',
      key: 'volume',
    },
    {
      title: 'MA趋势',
      dataIndex: 'maTrend',
      key: 'maTrend',
    },
    {
      title: '信号',
      dataIndex: 'signal',
      key: 'signal',
      render: (signal: string) => (
        <span style={{
          color: signal === '买入' ? '#ff4d4f' : signal === '卖出' ? '#52c41a' : '#1890ff'
        }}>
          {signal}
        </span>
      )
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      <Row gutter={16}>
        <Col span={24}>
          <Card title="今日大盘走势">
            {loading ? (
              <div>加载中...</div>
            ) : (
              <StockChart data={chartData} title="上证指数走势" />
            )}
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="热门个股分析">
            <Table 
              dataSource={tableData}
              columns={columns}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="技术指标分析">
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="上证指数"
                  value={3200}
                  precision={2}
                  prefix="¥"
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="涨跌幅"
                  value={0.5}
                  precision={2}
                  suffix="%"
                  valueStyle={{ color: '#3f8600' }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="成交量"
                  value={1000000000}
                  precision={0}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="成交额"
                  value={2000000000}
                  precision={0}
                  prefix="¥"
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="AI分析建议">
            <div style={{ padding: 16 }}>
              <p>🎯 <strong>市场分析</strong>: 今日市场整体上涨，科技板块表现强劲</p>
              <p>📈 <strong>建议操作</strong>: 建议关注科技板块，寻找回调买入机会</p>
              <p>⚠️ <strong>风险提示</strong>: 注意市场波动风险，控制仓位</p>
              <p>💡 <strong>个股建议</strong>: 贵州茅台、中国平安技术面良好</p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DailyAnalysis;