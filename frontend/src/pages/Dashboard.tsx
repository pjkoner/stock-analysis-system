import React from 'react';
import { Layout, Menu } from 'antd';
import { Routes, Route } from 'react-router-dom';
import DailyAnalysis from './DailyAnalysis';
import WeeklyAnalysis from './WeeklyAnalysis';
import SectorAnalysis from './SectorAnalysis';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <Menu theme="dark" mode="vertical">
          <Menu.Item key="dashboard">Dashboard</Menu.Item>
          <Menu.Item key="daily">每日分析</Menu.Item>
          <Menu.Item key="weekly">每周分析</Menu.Item>
          <Menu.Item key="sector">板块分析</Menu.Item>
        </Menu20>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <h1 style={{ marginLeft: 20 }}>智能股票分析系统</h1>
        </Header>
        <Content style={{ margin: '16px' }}>
          <Routes>
            <Route path="/" element={<DailyAnalysis />} />
            <Route path="/daily" element={<DailyAnalysis />} />
            <Route path="/weekly" element={<WeeklyAnalysis />} />
            <Route path="/sector" element={<SectorAnalysis />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          股票分析系统 ©2025
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;