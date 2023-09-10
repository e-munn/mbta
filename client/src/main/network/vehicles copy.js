import { useEffect, useState, useMemo } from 'react'
import { useTheme } from '@mui/material/styles'
import _ from 'lodash'
import * as d3 from 'd3'
import { IconLayer, TextLayer } from '@deck.gl/layers'
import { colormap } from '../data/tools'

export const Vehicles = ({ vehicles, setVehicles, viewState }) => {
  const theme = useTheme()
  const [data, setData] = useState([])
  const vsource = new EventSource('http://localhost:8000/api/vehicles')
  vsource.addEventListener('reset', (event) => {
    const d = JSON.parse(event.data)
    setData(d)
  })
  vsource.addEventListener('update', (event) => {
    const d = JSON.parse(event.data)
    setData((current) => _.unionBy([d], current, 'id'))
  })

  useEffect(() => {
    setVehicles(
      data.map((v) => {
        return [
          new IconLayer({
            id: v.id,
            data: [v],
            iconAtlas:
              'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
            iconMapping: {
              marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
            },
            billboard: false,
            pickable: false,
            sizeScale: 1,
            sizeUnits: 'meters',
            getSize: (d) => d3.scaleLinear([10, 20], [150, 30])(viewState.zoom),
            getIcon: (d) => 'marker',
            getPosition: (d) => [v.attributes.longitude, v.attributes.latitude],
            getColor: (d) =>
              _.values(
                d3.color(
                  theme.palette[colormap[v.relationships.route.data.id]].light
                )
              ).splice(0, 3),
            getAngle: (d) => 180 - d.attributes.bearing,
            transitions: {
              getPosition: {
                duration: 2000,
                easing: d3.easeSin,
              },
              getAngle: {
                duration: 2000,
                easing: d3.easeSin,
              },
            },
          }),
        ]
      })
    )
  }, [data])

  return <></>
}
