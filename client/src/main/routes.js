import { useEffect, useState, useRef } from 'react'
import { useTheme } from '@mui/material/styles'
import { PathLayer } from '@deck.gl/layers'
import _ from 'lodash'
import { NETWORK } from './data/shapes'
import * as d3 from 'd3'

export const Routes = ({ routes, setRoutes, viewState }) => {
  const theme = useTheme()

  const data = NETWORK.map((d) =>
    d.shapes.map((s) => ({
      ...s,
      color: d.color,
      route: d.route,
    }))
  )

  useEffect(() => {
    setRoutes(
      new PathLayer({
        id: 'routes',
        data: _.flatten(data),
        pickable: false,
        widthScale: 1,
        getPath: (d) => d.polyline,
        getColor: (d) => [..._.values(d3.color(d.color)).splice(0, 3), 25],
        getWidth: (d) => 20,
      })
    )
  }, [])

  return <></>
}
