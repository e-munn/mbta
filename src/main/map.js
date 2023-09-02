import { useEffect, useState, useRef } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useTheme } from '@mui/material/styles'
import { randomInt } from 'd3-random'
import { color } from 'd3-color'
import { useWindowSize } from 'usehooks-ts'
import mapboxgl from 'mapbox-gl'
import { decode, encode } from '@googlemaps/polyline-codec'
import { motion } from 'framer-motion'
import { Box, Button } from '@mui/material'
import _ from 'lodash'
import { Stops } from './stops'

export const Map = ({ mbta }) => {
  const { width, height } = useWindowSize()
  const theme = useTheme()

  const mapContainer = useRef(null)
  const map = useRef(null)

  mapboxgl.accessToken =
    'pk.eyJ1IjoiZW11bm4iLCJhIjoiY2w2bWoxNWp6MGx6ajNicnVqM3YyZ2M0NiJ9.8CG8a8G7qY6mrF3Yk-Kx1g'

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/emunn/cleqdxw1m003s01ne3dw9xc9t',
      center: [-71.058, 42.3601],
      zoom: 10,
      projection: {
        name: 'albers',
      },
    })
  })

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
      {map.current && <Stops map={map} />}
    </Box>
  )
}
