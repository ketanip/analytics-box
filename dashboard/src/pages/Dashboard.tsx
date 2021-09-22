import React from 'react';
import { Box, Grid, Text, Flex, Spacer } from '@chakra-ui/react';
import MainChart from '../components/MainChart';
import BaseAnalysisSmall from '../components/analysis/BaseAnalysisSmall';
import DashboardWorldMap from '../components/WorldMap';
import FilterWidget from '../components/FilterWidget';
import dataStore from '../store/store';
import { view } from '@risingstack/react-easy-state';
import SourceAnalysis from '../components/SourceAnalysis';

// Getting initial data.
dataStore.getInitialData();

// Exporting Dashboard page.
export default view(() => (
    <>
        <Box px="36" pt={5} bg="gray.50" minH="container.md" pb={10}>

            {
                dataStore.has_data &&
                <>

                        {/* Top Branding */}
                        <Text align="left" fontWeight="semibold" fontSize="2xl">Analytics Box</Text>

                        <br/>

                        {/* Filter Widget */}
                        <FilterWidget response={dataStore.data} filter_data={dataStore.filterData} />


                    {/* Main Chart */}
                    <MainChart />


                    <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={5} pb={6}>


                        {/* Reefers */}
                        <SourceAnalysis data={dataStore.data.data} />

                        {/* Routes */}
                        <BaseAnalysisSmall table_title="Top Pages" data={dataStore.data.data.page_views} add_box={true} />

                        {/* Browsers */}
                        <BaseAnalysisSmall table_title="Top Browsers" data={dataStore.data.data.browsers} add_box={true} />

                        {/* Operating Systems */}
                        <BaseAnalysisSmall table_title="Top Operating Systems" data={dataStore.data.data.operating_systems} add_box={true} />

                        {/* Countries */}
                        <DashboardWorldMap data={dataStore.data.data.countries} />


                    </Grid>


                </>

            }

        </Box>
    </>
));


