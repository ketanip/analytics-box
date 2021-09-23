import React from 'react';
import { baseAnalysis } from '../../types/analysis';
import { Text, Box, Table, Thead, Tr, Th, Tbody, Td, Button, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Center, Divider } from '@chakra-ui/react';

type props = {
    data: baseAnalysis[];
    table_title: string;
}

// BaseAnalysisTable creates contains a table with details of base analysis object
// including value, total_sessions, unique_sessions, and duration_seconds.
const BaseAnalysisTable: React.FC<props> = ({ data, table_title }) => {

    table_title = table_title.replace("Top ", "");

    return (
        <>
            <Box pt={5}>

                <Text fontSize="xl" fontWeight="semibold" py={3}>{table_title}</Text>
                <Divider mb={5}/>

                <Table variant="striped" size="md" colorScheme="gray">
                    <Thead >
                        <Tr>
                            <Th>{table_title}</Th>
                            <Th>Total Sessions</Th>
                            <Th>Unique Sessions</Th>
                            <Th>Average Duration</Th>
                        </Tr>
                    </Thead>
                    <Tbody>

                        {
                            data.map(item => (

                                <Tr>
                                    <Td>{item.value}</Td>
                                    <Td>{item.total_sessions}</Td>
                                    <Td>{item.unique_sessions}</Td>
                                    <Td>{item.duration_seconds}</Td>
                                </Tr>
                            ))
                        }

                    </Tbody>

                </Table>
            </Box>
        </>
    );
};

// A modal to show BaseAnalysisTable in.
const BaseAnalysisComplete: React.FC<props> = ({ data, table_title }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>

            <Box mt={5}>

                <Center>
                    <Button variant="ghost" colorScheme="teal" onClick={onOpen}>Show More</Button>
                </Center>

                <Modal size="6xl" isOpen={isOpen} onClose={onClose} p={5}>

                    <ModalOverlay />

                    <ModalContent>

                        <ModalCloseButton />

                        <ModalBody>
                            <BaseAnalysisTable data={data} table_title={table_title} />
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="teal" mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>

                    </ModalContent>
                </Modal>
            </Box>

        </>
    )
}

export default BaseAnalysisComplete;