import * as process from 'process'
window.global ||= window
window.process = process
// window.Buffer = []
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import {Provider} from "react-redux"
import { store } from './redux/store'
import MainRoutes from './routes'
import { customTheme } from './utils/chakra_theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <ChakraProvider theme={customTheme}>
      <Provider store={store}>
        <MainRoutes />
      </Provider>
    </ChakraProvider>
  </>
)
