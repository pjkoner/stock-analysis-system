import ReactECharts from 'echarts-for-react';
import React from 'react';

interface SectorFlowData {
  name: string;
  inflow: number;
  outflow: number;
  net: number;
}

interface SectorFlowChartProps {
  data: SectorFlowData[];
  title?: string;
}

const SectorFlowChart: React.FC<SectorFlowChartProps> = ({ data, title }) => {
  const option = {
    title: {
      text: title || '板块资金流向',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['流入资金', '流出资金', '净流入'],
      top: '30'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.map(d => d.name)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '流入资金',
        type: 'bar',
        data: data.map(d => d.inflow),
        itemStyle: {
          color: '#52c41a'
        }
      },
      {
        name: '流出资金',
        type: 'bar',
        data: data.map(d => d.outflow),
        itemStyle: {
          color: '#ff4d4f'
        }
      },
      {
        name: '净流入',
        type: 'line',
        data: data.map(d => d.net),
        itemStyle: {
          color: '#1890ff'
        },
        lineStyle: {
          width: 2
        }
      }
    ]
  };

  return (
    <ReactECharts 
      option={option}
      style={{ height: '300px', width: '100%' }}
    />
  );
};

export default SectorFlowChart;