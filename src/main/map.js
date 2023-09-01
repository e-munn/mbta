import { useEffect, useState, useRef } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useTheme } from '@mui/material/styles'
import { randomInt } from 'd3-random'
import { color } from 'd3-color'
import { useWindowSize } from 'usehooks-ts'

import { motion } from 'framer-motion'
import _ from 'lodash'
import { Box, Button } from '@mui/material'

export const Map = ({ vehicles, stops, map, shapes, mapContainer }) => {
  const { width, height } = useWindowSize()
  const theme = useTheme()

  console.log(map)

  useEffect(() => {}, [])

  return (
    <Box sx={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          cursor: 'default',
        }}
        ref={mapContainer}
        className="map-container"
      />
      <motion.svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vw',
          pointerEvents: 'none',
        }}
      >
        {shapes?.map((d, i) => (
          <motion.path
            key={'stop-' + d.id}
            animate={{
              d: `M` + d.polyline.map((d) => `${d.x},${d.y}`).join(`L`),
            }}
            stroke={'red'}
            fill={'none'}
            strokeWidth={2}
          />
        ))}
      </motion.svg>
    </Box>
  )
}
