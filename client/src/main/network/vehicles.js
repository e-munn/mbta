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

  function createSVGIcon(c) {
    const line = d3.line()([
      [20, 22],
      [12, 2],
      [4, 22],
      [20, 22],
    ])

    let path = d3.path().curve(d3.curveBasis)
    path.moveTo(20, 22)
    path.lineTo(12, 2)
    path.lineTo(4, 22)
    path.closePath()
    path.toString()
    console.log(path)

    // const path = d3.path().moveTo(20, 22).lineTo(12, 2).lineTo(4, 22)
    // .closePath()
    // .toString()
    // console.log(path)

    return `<svg xmlns="http://www.w3.org/2000/svg" height="400" width="400" viewBox="0 0 24 24"><path d="${path}" stroke="#FFF" stroke-width="1px" fill="none"/></svg>`
  }

  function svgToDataURL(svg) {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  }

  useEffect(() => {
    setVehicles(
      data.map((v) => {
        return [
          new IconLayer({
            id: v.id,
            data: [v],
            // iconAtlas:
            //   'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
            // iconMapping: {
            //   marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
            // },
            billboard: false,
            pickable: false,
            sizeScale: 1,
            sizeUnits: 'meters',
            getSize: (d) =>
              d3.scaleLinear([10, 20], [150, 140])(viewState.zoom),
            getIcon: (d, { index }) => ({
              url: svgToDataURL(
                createSVGIcon(
                  theme.palette[colormap[v.relationships.route.data.id]].light
                )
              ),
              width: 100,
              height: 100,
            }),
            getPosition: (d) => [v.attributes.longitude, v.attributes.latitude],
            // getAngle: (d) => 360 - d.attributes.bearing,
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
