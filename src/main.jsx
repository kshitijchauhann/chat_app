import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import App from './App';
import SignUp from './components/SignUp.jsx';
import Dashboard from "./components/Dashboard.jsx";
import FindNearby from "./components/FindNearby.jsx";

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <Dashboard />
    </ChakraProvider>
  </React.StrictMode>,
)
