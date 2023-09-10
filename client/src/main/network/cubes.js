import { useEffect, useState, useMemo } from 'react'
import { useTheme } from '@mui/material/styles'
import _ from 'lodash'
import * as d3 from 'd3'
import { IconLayer, TextLayer } from '@deck.gl/layers'
import { colormap } from '../data/tools'
import { SimpleMeshLayer } from '@deck.gl/mesh-layers'
import { OBJLoader } from '@loaders.gl/obj'
import { CubeGeometry } from '@luma.gl/engine'

export const Vehicles = ({ vehicles, setVehicles, viewState }) => {
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
          new SimpleMeshLayer({
            id: v.id,
            data: [v],
            mesh: new CubeGeometry(),
            // loaders: [OBJLoader],
            getPosition: (d) => [
              v.attributes.longitude,
              v.attributes.latitude,
              40,
            ],
            getColor: (d) =>
              _.values(
                d3.color(colormap[v.relationships.route.data.id])
              ).splice(0, 3),
            getOrientation: (d) => [0, 180 - d.attributes.bearing, 0],
            sizeScale: 40,
            pickable: false,
            transitions: {
              getPosition: {
                duration: 2000,
                easing: d3.easeSin,
              },
              getOrientation: {
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
