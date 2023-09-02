import MBTA from 'mbta-client'
import { useEffect, useState, useRef } from 'react'
import { Map } from './map'
import { Box, Button } from '@mui/material'
import _ from 'lodash'

const KEY = '488fd0453fbd42299dfd42666230f022'

const A = () => {
  const mbta = new MBTA(KEY)

  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <Map mbta={mbta} />
    </Box>
  )
}

export default A
