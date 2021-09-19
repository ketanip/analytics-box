import React, { useState, useEffect } from 'react';
import { filter } from '../types/analysis';
import axios from 'axios';
import { Box, Grid, Text } from '@chakra-ui/react';
import MainChart from '../components/MainChart';
import BaseAnalysisSmall from '../components/analysis/BaseAnalysisSmall';
import DashboardWorldMap from '../components/WorldMap';

const Dashboard = () => {

    const [filter, setFilter] = useState<filter>();

    useEffect(() => {

        axios.get("http://localhost:8000", {

            params: {
                start: "2021-08-26",
                end: "2021-09-30",
                event: "page_view",
                domain: "localhost",
            }

        })
            .then(resp => {
                console.log("DATA", resp.data);
                setFilter(resp.data)
                console.log("REPORT", filter)
            })
            .catch(err => {
                console.log(err)
            });

    }, []);


    return (
        <>
            <Box px={12} pt={5} bg="gray.50" minH="container.md" pb={10}>

                <Text align="left" fontWeight="semibold" fontSize="2xl">Analytics Box</Text>

                {
                    filter &&

                    <>

                        {/* Main Chart */}
                        <MainChart filter={filter} />


                        <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={5} pb={6}>

                            {/* Routes */}
                            <BaseAnalysisSmall table_title="Top Pages" data={filter.data.page_views} />


                            {/* Reefers */}
                            <BaseAnalysisSmall table_title="Top Sources" data={filter.data.referers} />


                            {/* Browsers */}
                            <BaseAnalysisSmall table_title="Top Browsers" data={filter.data.browsers} />

                            {/* Operating Systems */}
                            <BaseAnalysisSmall table_title="Top Operating Systems" data={filter.data.operating_systems} />

                            {/* Countries */}
                            <DashboardWorldMap data={filter.data.countries} />

                        </Grid>


                    </>

                }

            </Box>
        </>
    );



};

export default Dashboard;