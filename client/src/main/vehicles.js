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
  const [vehicles, setVehicles] = useState([])
  const { count, increment, decrement } = useCounter(0)

  const source = new EventSource('http://localhost:8000/api/vehicles')

  source.addEventListener('reset', (event) => {
    const data = JSON.parse(event.data)
    setVehicles(data)
  })
  source.addEventListener('update', (event) => {
    const data = JSON.parse(event.data)
    // const ALL = _.unionBy(vehicles, [data], 'id')
    // console.log(data)
    // setVehicles((current) => [...current, data])
    setVehicles((current) => _.unionBy([data], current, 'id'))
  })
  // console.log('vehicles', vehicles)

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
      >
        {count}
      </div>
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vw',
          pointerEvents: 'none',
        }}
      >
        {vehicles.map((d, i) => {
          const { latitude, longitude } = d.attributes
          const { x, y } = map.current.project([longitude, latitude])
          // console.log(d.attributes.bearing)
          return (
            <>
              <motion.circle r={10} cx={x} cy={y} fill={'white'} />
              <motion.path
                key={d.id}
                d={`M ${x} ${y} L ${x} ${y + 20}`}
                stroke={'white'}
                strokeWidth={5}
              />
            </>
          )
        })}
      </svg>
    </>
  )
}

const a = {
  attributes: {
    bearing: 199,
    carriages: [],
    current_status: 'IN_TRANSIT_TO',
    current_stop_sequence: 16,
    direction_id: 0,
    label: '1660',
    latitude: 42.25060868,
    longitude: -71.12597773,
    occupancy_status: null,
    speed: null,
    updated_at: '2023-09-02T14:32:28-04:00',
  },
  id: 'y1660',
  links: {
    self: '/vehicles/y1660',
  },
  relationships: {
    route: {
      data: {
        id: '33',
        type: 'route',
      },
    },
    stop: {
      data: {
        id: '22819',
        type: 'stop',
      },
    },
    trip: {
      data: {
        id: '58713617',
        type: 'trip',
      },
    },
  },
  type: 'vehicle',
}
