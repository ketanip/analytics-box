import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import Dashboard from "./pages/Dashboard"

export const App = () => (
  <ChakraProvider theme={theme}>
      <Dashboard />
  </ChakraProvider>
)
