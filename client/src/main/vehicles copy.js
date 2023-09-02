import { useEffect, useState, useRef } from 'react'
import { useTheme } from '@mui/material/styles'
import { randomInt } from 'd3-random'
import { useWindowSize } from 'usehooks-ts'
import { decode, encode } from '@googlemaps/polyline-codec'
import { motion } from 'framer-motion'
import _ from 'lodash'

import { useCounter, useInterval } from 'usehooks-ts'
import { Box, Button } from '@mui/material'
import { NETWORK } from './data/shapes'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import axios from 'axios'
export const Vehicles = ({ map }) => {
  const { width, height } = useWindowSize()
  const theme = useTheme()
  const { count, setCount, increment, decrement, reset } = useCounter(0)
  const [zoom, setZoom] = useState(null)
  map.current.on('zoom', () => setZoom(map.current.getZoom()))
  useEffect(() => {
    axios
      .get('https://api-v3.mbta.com/vehicles', {
        headers: {
          'X-API-Key': '488fd0453fbd42299dfd42666230f022',
          Connection: 'keep-alive',
        },
        responseType: 'stream',
      })
      .then((res) => {
        console.log(res.data)
      })
  })

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          padding: '10px',
          fontSize: 20,
        }}
      ></div>
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vw',
          pointerEvents: 'none',
        }}
      ></svg>
    </>
  )
}
