import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#EEFFEF', light: '#99FFA0', dark: '#7EDD83' },
    purple: ['#222', '#1C1C20', '#26262F', '#26262F', '#49495A'],
    white: ['#FFF', '#F4F4F6', '#DDDDE3', '#C7C7D1', '#9A9AAC'],
  },

  typography: {
    fontFamily: ['Roboto Mono'],
    fontSize: 10,
  },
})

export default theme
