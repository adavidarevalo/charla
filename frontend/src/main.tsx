import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import {Provider} from "react-redux"
import { store } from './redux/store'
import MainRoutes from './routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <ChakraProvider>
      <Provider store={store}>
        <MainRoutes/>
      </Provider>
    </ChakraProvider>
  </>
)
