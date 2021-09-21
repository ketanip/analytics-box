import React, { useState } from 'react';
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { response } from "../types/analysis";
import { SettingsIcon } from '@chakra-ui/icons';

type props = {
    filter: response;
    filter_data: any;
}

// FilterWidget contains filter GUI for data.
const FilterWidget: React.FC<props> = ({ filter, filter_data }) => {

    // Modal hooks.
    const { isOpen, onOpen, onClose } = useDisclosure()

    // Filter parameters.
    const [event, setEvent] = useState(filter.event);
    const [domain, setDomain] = useState(filter.domain)
    const [startDate, setStartDate] = useState(filter.start_date)
    const [endDate, setEndDate] = useState(filter.end_date)
    const [countryCode, setCountryCode] = useState(filter.country_code)
    const [referer, setReferer] = useState(filter.referer)
    const [pageRoute, setPageRoute] = useState(filter.page_route)
    const [os, setOS] = useState(filter.operating_system)
    const [browser, setBrowser] = useState(filter.browser)

    // Form handler
    const HandleChangeDataFilter = (e: any) => {

        let new_filter = {
            event: event,
            domain: domain,
            start: startDate,
            end: endDate,
            country_code: countryCode,
            referer: referer,
            page_route: pageRoute,
            operating_system: os,
            browser: browser,
        };

        filter_data(new_filter)

    }


    return (
        <>
            <Button mt={5} colorScheme="teal" onClick={onOpen} leftIcon={<SettingsIcon />} >Filter Data </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Filter Data</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>


                        <FormControl id="event" isRequired>
                            <FormLabel>Event</FormLabel>
                            <Input placeholder="page_view" onChange={(e) => { setEvent(e.target.value) }} defaultValue={event} />
                        </FormControl>

                        <FormControl id="domain" isRequired>
                            <FormLabel>Domain</FormLabel>
                            <Input placeholder="localhost" onChange={(e) => { setDomain(e.target.value) }} defaultValue={domain} />
                        </FormControl>

                        <FormControl id="start-date" isRequired>
                            <FormLabel>Start Date</FormLabel>
                            <Input type="date" onChange={(e) => { setStartDate(e.target.value) }} defaultValue={startDate} />
                        </FormControl>

                        <FormControl id="end-name" isRequired>
                            <FormLabel>End Date</FormLabel>
                            <Input type="date" onChange={(e) => { setEndDate(e.target.value) }} defaultValue={endDate} />
                        </FormControl>

                        <FormControl id="country_code">
                            <FormLabel>Country Code</FormLabel>
                            <Input placeholder="IN" onChange={(e) => { setCountryCode(e.target.value) }} defaultValue={countryCode} />
                        </FormControl>

                        <FormControl id="referer">
                            <FormLabel>Referer</FormLabel>
                            <Input placeholder="https://t.co/" onChange={(e) => { setReferer(e.target.value) }} defaultValue={referer} />
                        </FormControl>

                        <FormControl id="page_route">
                            <FormLabel>Page Route</FormLabel>
                            <Input placeholder="/" onChange={(e) => { setPageRoute(e.target.value) }} defaultValue={pageRoute} />
                        </FormControl>

                        <FormControl id="os">
                            <FormLabel>OS</FormLabel>
                            <Input placeholder="Windows" onChange={(e) => { setOS(e.target.value) }} defaultValue={os} />
                        </FormControl>

                        <FormControl id="browser">
                            <FormLabel>Browser</FormLabel>
                            <Input placeholder="Chrome" onChange={(e) => { setBrowser(e.target.value) }} defaultValue={browser} />
                        </FormControl>

                    </ModalBody>
                    <ModalFooter>
                        
                        <Button variant="ghost" mr={3} colorScheme="teal" onClick={onClose}>
                            Cancel
                        </Button>

                        <Button colorScheme="teal" onClick={HandleChangeDataFilter}>Filter Data</Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>

    )
}

export default FilterWidget;