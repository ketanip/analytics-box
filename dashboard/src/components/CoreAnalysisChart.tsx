import React from 'react';
import { filter } from "../types/analysis";
import ReactECharts from 'echarts-for-react';
import DashboardOverview from './DashboardOverview';

type props = {
  filter: filter
}

const CoreAnalysisChart: React.FC<props> = ({ filter }) => {

  const data = {
    total_sessions: filter.data.analysis.map(item => item.total_sessions),
    unique_sessions: filter.data.analysis.map(item => item.unique_sessions),
    durations: filter.data.analysis.map(item => item.duration_seconds),
    dates: filter.data.analysis.map(item => item.value.slice(0, 10))
  }

  const options = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Total Sessions', 'Unique Sessions',]
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.dates,
      axisLabel: {
        interval: 0,
        rotate: 30, //If the label names are too long you can manage this by rotating the label.
      }
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Total sessions',
        data: data.total_sessions,
        stack: '1',
        type: 'bar',
        smooth: true,
      },
      {
        name: 'Unique sessions',
        data: data.unique_sessions,
        stack: '1',
        type: 'bar',
        smooth: true,
      },
    ],

  };

  return (
    <>
      <div className="pt-5 pb-10">
        <div className=" bg-white py-3 pt-1 rounded-lg shadow-md">

          {/* Main Chart */}
          <ReactECharts option={options} style={{ height: 500 }} />

        </div>
      </div>
    </>
  )

}

export default CoreAnalysisChart;