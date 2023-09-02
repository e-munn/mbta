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
export const Stops = ({ map }) => {
  const { width, height } = useWindowSize()
  const theme = useTheme()
  const { count, setCount, increment, decrement, reset } = useCounter(0)
  const [network, setNetwork] = useState(null)
  const update = (NETWORK) => {
    return NETWORK.slice(0, 1).map((route, i) => ({
      ...route,
      shapes: route.shapes.map((shape, i) => ({
        ...shape,
        current: shape.polyline.map((d) => map.current.project(d)),
      })),
    }))
  }
  map.current.on('drag', () => {
    setNetwork(update(NETWORK))
  })
  map.current.on('zoom', () => {
    setNetwork(update(NETWORK))
  })

  useEffect(() => {}, [])

  //   useInterval(() => {
  //     increment()
  //     fetch('https://api-v3.mbta.com/routes/' + shapes[count].id)
  //       .then((r) => r.json())
  //       .then((r) => {})

  //     console.log(shapes[count])
  //   }, 5000)

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
      >
        {network?.map((route, i) =>
          route.shapes.map((shape, i) => (
            <>
              <path
                key={'stop-' + shape.id}
                // animate={{
                //   d: `M` + shape.current.map((d) => `${d.x},${d.y}`).join(`L`),
                // }}
                d={`M` + shape.current.map((d) => `${d.x},${d.y}`).join(`L`)}
                stroke={
                  route.route.includes('Green')
                    ? 'green'
                    : _.lowerCase(route.route)
                }
                fill={'none'}
                strokeWidth={2}
              />
            </>
          ))
        )}
      </svg>
    </>
  )
}
