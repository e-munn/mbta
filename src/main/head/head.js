import { useEffect, useState, useContext, useRef } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Button, Box, Stack } from '@mui/material'
import { DataStore } from 'aws-amplify'
import { motion } from 'framer-motion'
import { useTheme } from '@mui/material/styles'
import { Auth } from 'aws-amplify'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'
import Foot from './foot'
import Logo from './logo'
import './head.css'
const Head = ({ user }) => {
  const theme = useTheme()
  const [signToggle, setSignToggle] = useState(0)
  const signOut = () => {
    Auth.signOut()
      .then(async () => {
        await DataStore.clear()
      })
      .catch(() => {})
      .finally(() => setSignToggle(0))
  }

  return (
    <>
      <header style={{ background: theme.palette.purple[0] }}></header>
      <Outlet />
      <Foot />
    </>
  )
}

export default Head
