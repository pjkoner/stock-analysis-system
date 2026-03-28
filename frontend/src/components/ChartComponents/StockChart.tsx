import ReactECharts from 'echarts-for-react';
import React from 'react';

interface StockChartProps {
  data: {
    time: string;
    price: number;
  }[];
  title?: string;
}

const StockChart: React.FC<StockChartProps> = ({ data, title }) => {
  const option = {
    title: {
      text: title || '股票走势图',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any[]) => {
        const param = params[0];
        return `${param.name}<br/>价格: ¥${param.value}`;
      }
    },
    legend: {
      data: ['价格'],
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
      boundaryGap: false,
      data: data.map(d => d.time)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '价格',
        type: 'line',
        smooth: true,
        data: data.map(d => d.price),
        itemStyle: {
          color: '#1890ff'
        },
        lineStyle: {
          width: 3
        },
        areaStyle: {
          opacity: 0.1,
          color: '#1890ff'
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

export default StockChart;