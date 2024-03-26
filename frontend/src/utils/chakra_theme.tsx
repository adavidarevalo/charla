import { extendTheme } from '@chakra-ui/react'

const chakraTheme = {
  colors: {
    purple: {
      50: '#eff2fe',
      100: '#e1e8fe',
      200: '#c9d3fc',
      300: '#a8b6f9',
      400: '#8690f3',
      500: '#7578ed',
      600: '#544cdf',
      700: '#473ec4',
      800: '#3b359e',
      900: '#34317e',
      950: '#201d49'
    },
    black: {
      50: '#f6f6f6',
      100: '#efefef',
      200: '#dcdcdc',
      300: '#bdbdbd',
      400: '#989898',
      500: '#7c7c7c',
      600: '#656565',
      700: '#525252',
      800: '#464646',
      900: '#3d3d3d',
      950: '#292929'
    },
    green: {
      500: '#24c522'
    }
  }
}

export const customTheme = extendTheme({
  ...chakraTheme
})
