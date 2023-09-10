import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#EEFFEF', light: '#99FFA0', dark: '#7EDD83' },
    red: { main: '#AF3631', light: '#D77370', dark: '#501816' },
    green: { main: '#1C8750', light: '#46D88A', dark: '#0A331E' },
    blue: { main: '#233C6C', light: '#32569A', dark: '#0F1A2E' },
    orange: { main: '#975A20', light: '#D88C46', dark: '#44280E' },
    white: { main: '#FFF', light: '#FFFFFF', dark: '#FFFFFF' },
  },

  typography: {
    fontFamily: ['Roboto Mono'],
    fontSize: 10,
  },
})

export default theme
