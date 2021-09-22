import React from 'react';
import { report } from '../types/analysis';
import { Text, Tabs, TabList, Tab, TabPanels, TabPanel, Box } from '@chakra-ui/react';
import BaseAnalysisSmall from './analysis/BaseAnalysisSmall';

type props = {
    data: report;
};

const SourceAnalysis: React.FC<props> = ({ data }) => {

    return (
        <>
            <Box bg="white" p={5} rounded="lg" shadow="md">

                <Text fontSize="lg" mb={4} fontWeight="semibold">Traffic Sources</Text>
                
                <Tabs>
                    <TabList>
                        <Tab>Referers</Tab>
                        <Tab>Sources</Tab>
                        <Tab>Medium</Tab>
                        <Tab>Campaigns</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <BaseAnalysisSmall table_title="Top Referers" data={data.referers} add_box={false} />
                        </TabPanel>
                        <TabPanel>
                            <BaseAnalysisSmall table_title="Top UTM Sources" data={data.utm_sources} add_box={false} />
                        </TabPanel>
                        <TabPanel>
                            <BaseAnalysisSmall table_title="Top UTM Medium" data={data.utm_medium} add_box={false} />
                        </TabPanel>
                        <TabPanel>
                            <BaseAnalysisSmall table_title="Top UTM Campaigns" data={data.utm_campaigns} add_box={false} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    );

};

export default SourceAnalysis;