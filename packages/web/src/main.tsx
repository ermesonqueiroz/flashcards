import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloProvider} from '@apollo/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import App from './App'
import theme from './styles/theme'
import { client } from './lib/apollo'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import '@fontsource/poppins'
import { Provider } from 'react-redux'
import { store } from './lib/store'

const router = createBrowserRouter([
  {
    path: "*",
    element: <App />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
          <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode="system" />
            <RouterProvider router={router} />
          </ChakraProvider>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
)
