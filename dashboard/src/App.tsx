import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import Dashboard from "./pages/Dashboard"

export const App = () => (
  <ChakraProvider>
    <Dashboard />
  </ChakraProvider>
)
