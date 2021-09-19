import React from 'react';
import { baseAnalysis } from '../../types/analysis';
import {  Text, Table, Thead, Tr, Th, Tbody, Td, Tfoot, Box } from '@chakra-ui/react';
import BaseAnalysisComplete from './BaseAnalysisComplete';

type props = {
    data: baseAnalysis[];
    table_title: string;
}

const BaseAnalysisSmall: React.FC<props> = ({ data, table_title }) => {

    // Getting top 10 for preview.
    data = data.slice(0, 10);

    return (
        <>
            <Box bg="white" p={5} rounded="lg" shadow="md">
                <Text fontSize="lg" fontWeight="semibold">{table_title}</Text>
                <Table variant="striped" size="sm" colorScheme="gray">
                    <Thead>
                        <Tr>
                            <Th></Th>
                            <Th>Unique Sessions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>

                        {
                            data.map(item => (
                                <>
                                    <Tr>
                                        <Td>{item.value}</Td>
                                        <Td>{item.unique_sessions}</Td>
                                    </Tr>
                                </>
                            ))
                        }

                    </Tbody>
                </Table>
                <BaseAnalysisComplete data={data} table_title={table_title} />
            </Box>
        </>
    );
};

export default BaseAnalysisSmall;