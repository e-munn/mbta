import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#EEFFEF', light: '#99FFA0', dark: '#7EDD83' },
    red: { main: '#8F2C28', light: '#D26460', dark: '#FF4C4C' },
    green: { main: '#15653B', light: '#27B96B', dark: '#FF4C4C' },
    blue: { main: '#1E345C', light: '#375FA9', dark: '#FF4C4C' },
    orange: { main: '#A86424', light: '#E2AC78', dark: '#FF4C4C' },
    white: { main: '#FFF', light: '#FFFFFF', dark: '#FFFFFF' },
  },

  typography: {
    fontFamily: ['Roboto Mono'],
    fontSize: 10,
  },
})

export default theme
