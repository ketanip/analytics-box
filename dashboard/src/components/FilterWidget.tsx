import React, { useState } from 'react';
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Badge, Flex, Stack } from '@chakra-ui/react';
import { response } from "../types/analysis";
import { SettingsIcon } from '@chakra-ui/icons';
import { useForm } from "react-hook-form";
import type { filter } from "../types/analysis";

type props = {
    response: response;
    filter_data: any;
};

// FilterWidget contains filter GUI for data.
const FilterWidget: React.FC<props> = ({ filter_data, response }) => {

    // Modal hooks.
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [activeFilters, SetActiveFilters] = useState<any>([]);

    const { register, handleSubmit } = useForm<response>({
        defaultValues: response,
    });

    const onSubmit = handleSubmit(data => {
        delete data.data;
        filter_data(data);

        delete data.start_date
        delete data.end_date
        SetActiveFilters(Object.entries(data));
    });


    return (
        <>

            <Button mt={5} colorScheme="teal" onClick={onOpen} leftIcon={<SettingsIcon />} >Filter Data </Button>

            <Stack direction="row" gap="1" mt={5}>
                {
                    activeFilters.map((item: any) => {
                        if (item[1]) {

                            return (
                                <Badge variant="solid" colorScheme="gray" p={1.5} rounded="md">{item[0]}: {item[1]}</Badge>
                            )

                        }
                        return (
                            <>
                            </>
                        )
                    })
                }
            </Stack>



            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>

                    <ModalHeader>Filter Data</ModalHeader>
                    <ModalCloseButton />

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>

                            <FormControl id="event" isRequired>
                                <FormLabel>Event</FormLabel>
                                <Input {...register('event')} placeholder="page_view" />
                            </FormControl>

                            <FormControl id="domain" isRequired>
                                <FormLabel>Domain</FormLabel>
                                <Input {...register('domain')} placeholder="localhost" />
                            </FormControl>

                            <FormControl id="start-date" isRequired>
                                <FormLabel>Start Date</FormLabel>
                                <Input {...register('start')} type="date" />
                            </FormControl>

                            <FormControl id="end-name" isRequired>
                                <FormLabel>End Date</FormLabel>
                                <Input {...register('end')} type="date" />
                            </FormControl>

                            <FormControl id="country_code">
                                <FormLabel>Country Code</FormLabel>
                                <Input {...register('country_code')} placeholder="IN" />
                            </FormControl>

                            <FormControl id="referer">
                                <FormLabel>Referer</FormLabel>
                                <Input {...register('referer')} placeholder="https://t.co/" />
                            </FormControl>

                            <FormControl id="page_route">
                                <FormLabel>Page Route</FormLabel>
                                <Input {...register('page_route')} placeholder="/" />
                            </FormControl>

                            <FormControl id="os">
                                <FormLabel>OS</FormLabel>
                                <Input {...register('os')} placeholder="Windows" />
                            </FormControl>

                            <FormControl id="browser">
                                <FormLabel>Browser</FormLabel>
                                <Input {...register('browser')} placeholder="Chrome" />
                            </FormControl>

                        </ModalBody>
                        <ModalFooter>

                            <Button variant="ghost" mr={3} colorScheme="teal" onClick={onClose}>
                                Cancel
                            </Button>

                            <Button colorScheme="teal" type="submit">Filter Data</Button>

                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>

        </>

    )
}

export default FilterWidget;