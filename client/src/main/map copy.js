import { useEffect, useState, useRef } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useTheme } from '@mui/material/styles'
import { useWindowSize } from './useWindowSize'
import { randomInt } from 'd3-random'
import { color } from 'd3-color'

import { motion } from 'framer-motion'
import _ from 'lodash'
import { Box, Button } from '@mui/material'

export const Map = ({ vehicles, stops, map, mapContainer }) => {
  const size = useWindowSize()
  const theme = useTheme()

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
        {stops.map((d, i) => (
          <motion.circle
            key={'stop-' + d.id}
            initial={{ cx: d.pos[0].x, cy: d.pos[0].y }}
            r={1}
            fill={'#444'}
            style={{
              pointerEvents: 'all',
            }}
          />
        ))}

        {vehicles.map((d, i) => {
          let x = d.pos[0].x
          let y = d.pos[0].y

          let deg =
            d.bearing > 90
              ? 180 - d.bearing
              : d.bearing > 270
              ? d.bearing - 180
              : d.bearing > 270
              ? d.bearing - 180
              : 360 - d.bearing

          let x2 = x + Math.sin((deg * Math.PI) / 180) * 15
          let y2 = y + Math.cos((deg * Math.PI) / 180) * 15

          let c = d.route.includes('Green')
            ? 'green'
            : d.route.includes('Blue')
            ? 'blue'
            : d.route.includes('Red')
            ? 'red'
            : 'black'

          let c1 = color(c)
          c1 = c1.brighter(2)
          return (
            <>
              <motion.path
                key={'path--' + d.id}
                animate={{
                  d: `M ${x} ${y} L ${x2} ${y2}`,
                }}
                transition={{ duration: 5, ease: 'easeInOut' }}
                stroke={c1}
                strokeWidth={3}
              />

              {/* <motion.text
                key={'text-' + d.id}
                style={{
                  fill: '#ADADAD',
                  fontSize: 9,
                  textAnchor: 'start',
                  alignmentBaseline: 'middle',
                  fontWeight: 700,
                }}
                initial={{ x: d.pos[0].x + 6, y: d.pos[0].y + 1 }}
                animate={{ x: d.pos[0].x + 6, y: d.pos[0].y + 1 }}
                transition={{ duration: 5, ease: 'easeInOut' }}
              >
                {d.id}
              </motion.text> */}
            </>
          )
        })}
      </motion.svg>
    </Box>
  )
}
