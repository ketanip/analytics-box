import React from 'react'
import { response } from '../types/analysis';
import { Box } from '@chakra-ui/react';
import ReactECharts from 'echarts-for-react';
import Overview from './Overview';
import dataStore from '../store/store';


const MainChart: React.FC = () => {

    // Getting data.
    const filter: response = dataStore.data

    // Converting data to use in charts.
    const data = {
        total_sessions: filter.data.analysis.map(item => item.total_sessions),
        unique_sessions: filter.data.analysis.map(item => item.unique_sessions),
        durations: filter.data.analysis.map(item => item.duration_seconds),
        dates: filter.data.analysis.map(item => item.value.slice(0, 10))
    }

    // Options for echart.
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
            <Box p={5} rounded="lg" bg="white" padding={5} mt={8} shadow="md">

                {/* Overview */}
                <Overview overview={filter.data.overview} />


                {/* Main Charts */}
                <ReactECharts option={options} style={{ height: 500 }} />

            </Box>
        </>
    );

};

export default MainChart;