import React from 'react'
import type { Preview } from '@storybook/react'
import { ChakraProvider } from '@chakra-ui/react';
import { Formik } from 'formik'
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import { BrowserRouter } from 'react-router-dom';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (Story) => (
      <ChakraProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Formik initialValues={{}} onSubmit={() => {}}>
              <Story />
            </Formik>
          </BrowserRouter>
        </Provider>
      </ChakraProvider>
    )
  ]
}

export default preview
