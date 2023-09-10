import { useEffect, useState, useRef } from 'react'
import { useTheme } from '@mui/material/styles'
import { useTimeout, useWindowSize } from 'usehooks-ts'
import { motion } from 'framer-motion'
import { TextLayer } from '@deck.gl/layers'
import _ from 'lodash'
import { NETWORK } from '../data/shapes'
import * as d3 from 'd3'

export const Stoptext = ({ stoptext, setStoptext }) => {
  const theme = useTheme()
  const [merge, setMerge] = useState([])

  const data = _.flatten(
    NETWORK.map((d) =>
      d.stops.map((s) => ({
        color: d.color,
        id: s.id,
        coordinates: [s.attributes.longitude, s.attributes.latitude],
      }))
    )
  )

  useEffect(() => {
    fetch(
      'https://api-v3.mbta.com/stops?filter[route]=Red,Orange,Blue,Green-B,Green-C,Green-D,Green-E'
    )
      .then((res) => res.json())
      .then((res) => {
        var merged = _.merge(_.keyBy(res.data, 'id'), _.keyBy(data, 'id'))
        var values = _.values(merged)
        setMerge(values)
      })
  }, [])

  useEffect(() => {
    merge &&
      setStoptext([
        new TextLayer({
          id: 'stoptext',
          data: merge,
          getText: (d) => d.attributes.name,
          getPosition: (d) => [d.coordinates[0] + 0.0005, d.coordinates[1]],
          getSize: (d) => 30,
          sizeUnits: 'meters',
          // getAngle: 45,
          getTextAnchor: 'start',
          getAlignmentBaseline: 'center',
          getColor: (d) =>
            _.values(d3.color(theme.palette[d.color].main)).splice(0, 3),
        }),
      ])
  }, [merge])

  return <></>
}
