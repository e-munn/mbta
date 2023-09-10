import MBTA from 'mbta-client'
import { useEffect, useState, useRef } from 'react'
import { MapBox } from './map'
import { Box, Button } from '@mui/material'
import _ from 'lodash'
import { Card } from './card'
import { Controls } from './control/controls'
import { useClickAnyWhere } from 'usehooks-ts'

const KEY = '488fd0453fbd42299dfd42666230f022'

export const Main = () => {
  const [card, setCard] = useState(false)
  // useClickAnyWhere(() => {
  //   setCard(true)
  // })
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      {card && <Card card={card} setCard={setCard} />}
      <MapBox setCard={setCard} />
      <Controls />
      {/* <Search /> */}
    </Box>
  )
}
