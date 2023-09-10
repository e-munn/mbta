import { useState, useEffect } from 'react'
import './App.css'
import '@aws-amplify/ui-react/styles.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Head from './main/head/head'
import { Main } from './main/main'

import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import theme from './theme'
import { Auth, Hub } from 'aws-amplify'
import { AnimatePresence } from 'framer-motion'
import { LicenseInfo } from '@mui/x-license-pro'
// LicenseInfo.setLicenseKey(process.env.REACT_APP_MUI_KEY)

const App = ({}) => {
  const location = useLocation()

  return (
    <>
      <ThemeProvider theme={theme}>
        <AnimatePresence>
          <CssBaseline />
          <Routes location={location} key={location.pathname}>
            <Route path={'/'} element={<Head />}>
              <Route index element={<Main />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </ThemeProvider>
    </>
  )
}

export default App
