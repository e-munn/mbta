import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#EEFFEF', light: '#99FFA0', dark: '#7EDD83' },
    red: ['#D11919'],
    green: ['#50F11E'],
    blue: ['#1E6AFF'],
    orange: ['#FFA500'],
    white: ['#FFF', '#F4F4F6', '#DDDDE3', '#C7C7D1', '#9A9AAC'],
  },

  typography: {
    fontFamily: ['Roboto Mono'],
    fontSize: 10,
  },
})

export default theme
