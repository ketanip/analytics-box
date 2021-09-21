import React from 'react'
import { baseAnalysis } from '../types/analysis';
import { WorldMap } from "react-svg-worldmap";
import { Box } from '@chakra-ui/react';
import BaseAnalysisComplete from './analysis/BaseAnalysisComplete';

type props = {
    data: baseAnalysis[];
}

// Map shown at bottom of the dashboard.
const DashboardWorldMap: React.FC<props> = ({ data }) => {

    // Data for map.
    const map_data = data.map(item => { return { country: item.value, value: item.unique_sessions } });

    return (
        <>
            <Box bg="white" p={5} rounded="lg" shadow="md">
                <WorldMap data={map_data} color="teal" size="xl" />
                <BaseAnalysisComplete data={data} table_title="Geo Distribution" />
            </Box>
        </>
    );
};

export default DashboardWorldMap;