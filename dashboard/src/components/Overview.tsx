import React from 'react';
import { overviewAnalysis } from "../types/analysis"
import { Box, Text, Flex, Center, StatGroup, Stat, StatLabel, StatNumber } from '@chakra-ui/react';

type props = {
    overview: overviewAnalysis,
}

const Overview: React.FC<props> = ({ overview }) => {

    // Data for overview widget.
    const data = [
        {
            name: "Total Views",
            value: overview.total_sessions
        },
        {
            name: "Unique Views",
            value: overview.unique_sessions
        },
        {
            name: "Average Duration",
            value: overview.average_duration
        },

    ]

    return (
        <>
            <StatGroup pl={10} mt={2}>

                {
                    data.map(item => (

                        <Stat>
                            <StatLabel>{item.name}</StatLabel>
                            <StatNumber>{item.value}</StatNumber>
                        </Stat>

                    ))
                }

            </StatGroup>
        </>
    )

};


export default Overview;