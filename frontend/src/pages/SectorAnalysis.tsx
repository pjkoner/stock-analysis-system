import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table } from 'antd';
import { stockAPI } from '../services/api';

const SectorAnalysis: React.FC = () => {
  const [fundFlowData, setFundFlowData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await stockAPI.getFundFlow();
      setFundFlowData(response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  // 板块联动数据示例
  const sectorLinkageData = [
    {
      sector_a: '科技',
      sector_b: '通信',
      correlation: 0.85,
      impact: '高度联动',
      analysis: '技术革新推动'
    },
    {
      sector_a: '金融',
      sector_b: '房地产',
      correlation: 0.75,
      impact: '中度联动',
      analysis: '信贷政策影响'
    },
    {
      sector_a: '医药',
      sector_b: '生物技术',
      correlation: 0.70,
      impact: '中度联动',
      analysis: '技术研发联动'
    },
    {
      sector_a: '能源',
      sector_b: '化工',
      correlation: 0.65,
      impact: '中度联动',
      analysis: '原材料供应'
    },
    {
      sector_a: '制造业',
      sector_b: '工业',
      correlation: 0.60,
      impact: '低度联动',
      analysis: '产业链联动'
    },
  ];

  // 资金流向数据示例
  const fundFlowDataExample = [
    {
      sector: '科技',
      inflow: 50000000,
      outflow: 30000000,
      net: 20000000,
      change: '+5.1%',
      analysis: '技术革新推动资金流入'
    },
    {
      sector: '金融',
      inflow: 40000000,
      outflow: 25000000,
      net: 15000000,
      change: '+3.2%',
      analysis: '信贷政策利好'
    },
    {
      sector: '医药',
      inflow: 30000000,
      outflow: 20000000,
      net: 10000000,
      change: '+2.3%',
      analysis: '医药创新驱动'
    },
    {
      sector: '房地产',
      inflow: 20000000,
      outflow: 18000000,
      net: 2000000,
      change: '+1.5%',
      analysis: '市场政策支持'
    },
    {
      sector: '制造业',
      inflow: 15000000,
      outflow: 12000000,
      net: 3000000,
      change: '+0.8%',
      analysis: '智能制造升级'
    },
  ];

  const sectorColumns = [
    {
      title: '板块',
      dataIndex: 'sector',
      key: 'sector',
    },
    {
      title: '资金流入',
      dataIndex: 'inflow',
      key: 'inflow',
      render: (inflow: number) => `${(inflow / 10000).toFixed(0)}万`
    },
    {
      title: '资金流出',
      dataIndex: 'outflow',
      key: 'outflow',
      render: (outflow: number) => `${(outflow / 10000).toFixed(0)}万`
    },
    {
      title: '净流入',
      dataIndex: 'net',
      key: 'net',
      render: (net: number) => (
        <span style={{ color: net > 0 ? '#ff4d4f' : '#52c41a' }}>
          {net > 0 ? '+' : ''}{(net / 10000).toFixed(0)}万
        </span>
      )
    },
    {
      title: '涨幅',
      dataIndex: 'change',
      key: 'change',
      render: (change: string) => (
        <span style={{ color: change.includes('+') ? '#ff4d4f' : '#52c41a' }}>
          {change}
        </span>
      )
    },
    {
      title: '分析',
      dataIndex: 'analysis',
      key: 'analysis',
    },
  ];

  const linkageColumns = [
    {
      title: '板块A',
      dataIndex: 'sector_a',
      key: 'sector_a',
    },
    {
      title: '板块B',
      dataIndex: 'sector_b',
      key: 'sector_b',
    },
    {
      title: '联动系数',
      dataIndex: 'correlation',
      key: 'correlation',
      render: (correlation: number) => (
        <span style={{
          color: correlation > 0.8 ? '#ff4d4f' : 
                 correlation > 0.6 ? '#1890ff' : '#52c41a'
        }}>
          {correlation}
        </span>
      )
    },
    {
      title: '联动程度',
      dataIndex: 'impact',
      key: 'impact',
    },
    {
      title: '分析',
      dataIndex: 'analysis',
      key: 'analysis',
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      <Row gutter={16}>
        <Col span={24}>
          <Card title="板块资金流向分析">
            {loading ? (
              <div>加载中...</div>
            ) : (
              <Table 
                dataSource={fundFlowDataExample}
                columns={sectorColumns}
                pagination={false}
                rowKey="sector"
              />
            )}
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="板块联动关系">
            <Table 
              dataSource={sectorLinkageData}
              columns={linkageColumns}
              pagination={false}
              rowKey="sector_a"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="AI板块分析">
            <div style={{ padding: 16 }}>
              <h3>板块联动分析</h3>
              <p>📊 <strong>科技-通信联动</strong>: 高度联动（0.85），技术革新推动</p>
              <p>🏦 <strong>金融-房地产联动</strong>: 中度联动（0.75），信贷政策影响</p>
              <p>💊 <strong>医药-生物技术联动</strong>: 中度联动（0.70），技术研发联动</p>
              <p>🔋 <strong>能源-化工联动</strong>: 中度联动（0.65），原材料供应</p>
              <p>🏭 <strong>制造业-工业联动</strong>: 低度联动（0.60），产业链联动</p>
            
              <h3>投资建议</3>
              <p>🎯 <strong>重点关注</strong>: 科技板块（资金流入最多）</p>
              <p>⚠️ <strong>风险提示</strong>: 制造业板块相对较弱</p>
              <p>💡 <strong>操作策略</strong>: 关注联动较强的板块组合</p>
              <p>🧮 <strong>仓位建议</strong>: 科技板块仓位40%，金融板块30%</p>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="个股滚动展示及预测">
            <Row gutter={16}>
              <Col span={6}>
                <Card size="small">
                  <h3>贵州茅台</h3>
                  <p>当前价格: ¥1500.50</p>
                  <p>涨跌幅: +2.5%</p>
                  <p>预测: 上涨</p>
                  <p>建议: 买入</p>
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small">
                  <h3>中国平安</h3>
                  <p>当前价格: ¥70.30</p>
                  <p>涨跌幅: +1.2%</p>
                  <p>预测: 上涨</p>
                  <p>建议: 买入</p>
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small">
                  <h3>招商银行</h3>
                  <p>当前价格: ¥45.80</p>
                  <p>涨跌幅: +0.8%</p>
                  <p>预测: 震荡</p>
                  <p>建议: 持有</p>
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small">
                  <h3>宁德时代</h3>
                  <p>当前价格: ¥200.50</p>
                  <p>涨跌幅: +3.1%</p>
                  <p>预测: 上涨</p>
                  <p>建议: 买入</p>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="选股策略建议">
            <div style={{ padding: 16 }}>
              <h3>趋势交易策略</h3>
              <p>📈 <strong>策略描述</strong>: 基于MA指标的趋势跟踪策略</p>
              <p>🎯 <strong>适用板块</strong>: 科技、金融</p>
              <p>💼 <strong>推荐个股</strong>: 贵州茅台、中国平安</p>
              <p>📊 <strong>策略评分</strong>: 80分</p>
            
              <h3>价值投资策略</h3>
              <p>📈 <strong>策略描述</strong>: 基于基本面分析的价值投资策略</p>
              <p>🎯 <strong>适用板块</strong>: 医药、制造业</p>
              <p>💼 <strong>推荐个股</strong>: 招商银行、宁德时代</p>
              <p>📊 <strong>策略评分</strong>: 85分</p>
            
              <h3>AI综合推荐</h3>
              <p>🎯 <strong>首选股票</strong>: 贵州茅台（600519）</p>
              <p>📈 <strong>原因分析</strong>: 技术面良好，基本面稳健</p>
              <p>💡 <strong>操作建议</strong>: 适当买入，控制仓位</p>
              <p>⚠️ <strong>风险控制</strong>: 设置止损位¥1450</p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SectorAnalysis;