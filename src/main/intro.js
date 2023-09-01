import MBTA from 'mbta-client'
import { decode, encode } from '@googlemaps/polyline-codec'

import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Map } from './map'
import { Box, Button } from '@mui/material'
import _ from 'lodash'
import mapboxgl from 'mapbox-gl'
import { interpolateReds } from 'd3-scale-chromatic'
import { useEffectOnce } from 'usehooks-ts'
import { RED, ORANGE } from './data/shapes'
const KEY = '488fd0453fbd42299dfd42666230f022'

const A = () => {
  const mbta = new MBTA(KEY)
  const [shapes, setShapes] = useState(null)
  const [vehicles, setVehicles] = useState([])
  const [stops, setStops] = useState([])
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
    // map.current.on('load', () => {
    //   map.current.addSource('red', {
    //     type: 'geojson',
    //     data: {
    //       type: 'Feature',
    //       geometry: {
    //         type: 'MultiLineString',
    //         coordinates: [RED],
    //       },
    //     },
    //   })

    //   map.current.addLayer({
    //     id: 'outline',
    //     type: 'line',
    //     source: 'red',
    //     layout: {},
    //     paint: {
    //       'line-color': 'red',
    //       'line-width': 3,
    //     },
    //   })
    // })
  })

  useEffect(() => {
    fetch('https://api-v3.mbta.com/routes')
      .then((r) => r.json())
      .then((r) => {
        console.log(r)
      })
    fetch(
      'https://api-v3.mbta.com/shapes?filter[route]=Red,Orange,Blue,Green-B,Green-C,Green-D,Green-E'
    )
      .then((r) => r.json())
      .then((r) => {
        console.log(r.data)
        let p = r.data.map((d) => ({
          ...d,
          polyline: decode(d.attributes.polyline).map((d) => d.reverse()),
        }))

        map.current.on('load', () => {
          p.map((d, i) => {
            map.current.addSource(`${d.id}-${i}`, {
              type: 'geojson',
              data: {
                type: 'Feature',
                geometry: {
                  type: 'MultiLineString',
                  coordinates: [d.polyline],
                },
              },
            })

            map.current.addLayer({
              id: 'outline',
              type: 'line',
              source: `${d.id}-${i}`,
              layout: {},
              paint: {
                'line-color': interpolateReds(i * 0.1),
                'line-width': 3,
              },
            })
          })
        })
      })
  }, [])

  console.log(shapes)

  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <Map
        vehicles={vehicles}
        stops={stops}
        map={map}
        shapes={shapes}
        mapContainer={mapContainer}
      />
    </Box>
  )
}

export default A
