import React from 'react';
import { overviewAnalysis } from "../types/analysis"
import { Box, Text, Flex, Center } from '@chakra-ui/react';

type props = {
    overview: overviewAnalysis,
}

const Overview: React.FC<props> = ({ overview }) => {

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
            <>
                <Flex gridGap="20" ml={10}>

                    {
                        data.map(item => (

                            <Box>
                                <Text fontSize="3xl" fontWeight="thin">{item.value}</Text>
                                <Text fontSize="lg" fontWeight="medium">{item.name}</Text>
                            </Box>

                        ))
                    }

                </Flex>
            </>

        </>
    )

};


export default Overview;