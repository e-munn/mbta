import { useEffect, useState, useRef } from 'react'
import { useTheme } from '@mui/material/styles'
import { useTimeout, useWindowSize } from 'usehooks-ts'
import { motion } from 'framer-motion'
import { ScatterplotLayer } from '@deck.gl/layers'
import _ from 'lodash'
import { NETWORK } from '../data/shapes'
import * as d3 from 'd3'

export const Stops = ({ stops, setStops, viewState, setCard }) => {
  const theme = useTheme()
  const [radius, setRadius] = useState(20)

  const data = NETWORK.map((d) =>
    d.stops.map((s) => ({
      color: d.color,
      code: s.id,
      coordinates: [s.attributes.longitude, s.attributes.latitude],
    }))
  )

  useEffect(() => {
    setStops([
      new ScatterplotLayer({
        id: 'stops',
        data: _.flatten(data),
        stroked: false,
        pickable: true,
        filled: true,
        sizeUnits: 1,
        lineWidthMinPixels: 1,
        getPosition: (d) => d.coordinates,
        getCursor: (d) => 'grab',
        getRadius: (d) => 20,
        getFillColor: (d) => [
          ..._.values(d3.color(theme.palette[d.color].main)).splice(0, 3),
          255,
        ],
      }),
      // new ScatterplotLayer({
      //   id: 'stops-pad',
      //   data: _.flatten(data),
      //   stroked: false,
      //   pickable: true,
      //   filled: true,
      //   lineWidthMinPixels: 1,
      //   getPosition: (d) => d.coordinates,
      //   getRadius: (d) => 100,
      //   getFillColor: (d) => [..._.values(d3.color(d.color)).splice(0, 3), 0],
      //   onClick: (d, e) => {
      //     setCard({ d: d, e: e })
      //   },
      // }),
    ])
  }, [])

  return <></>
}
