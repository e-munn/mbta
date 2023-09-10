import { useEffect, useState, useRef } from 'react'
import { useTheme } from '@mui/material/styles'
import { useWindowSize } from 'usehooks-ts'
import { Box } from '@mui/material'
import { Stops } from './stops'
import { Routes } from './routes'

import { Map, useMap } from 'react-map-gl'
import _ from 'lodash'
import DeckGL from '@deck.gl/react'
import { useCounter, useInterval } from 'usehooks-ts'
import { Vehicles } from './vehicles'
const initial = {
  longitude: -71.09,
  latitude: 42.3601,
  zoom: 12,
}

export const MapBox = ({ setCard }) => {
  const { width, height } = useWindowSize()
  const [viewState, setViewState] = useState(initial)
  const [vehicles, setVehicles] = useState([])
  const [stops, setStops] = useState([])
  const [routes, setRoutes] = useState([])

  const layers = [stops, routes, ..._.flatten(vehicles)]

  const handleViewStateChange = ({ viewState }) => setViewState(viewState)

  const { current: map } = useMap()
  console.log(map)

  return (
    <>
      <DeckGL
        initialViewState={initial}
        controller={{ doubleClickZoom: false }}
        layers={layers}
        onViewStateChange={handleViewStateChange}
        getCursor={() => 'crosshair'}
      >
        <Map
          mapboxAccessToken={
            'pk.eyJ1IjoiZW11bm4iLCJhIjoiY2w2bWoxNWp6MGx6ajNicnVqM3YyZ2M0NiJ9.8CG8a8G7qY6mrF3Yk-Kx1g'
          }
          // projection={'albers'}
          style={{ width: width, height: height }}
          mapStyle="mapbox://styles/emunn/clm2nc5i7025m01qx0ooe977f"
        />
      </DeckGL>
      <Vehicles
        vehicles={vehicles}
        setVehicles={setVehicles}
        viewState={viewState}
      />
      <Stops
        stops={stops}
        setStops={setStops}
        viewState={viewState}
        setCard={setCard}
      />
      <Routes routes={routes} setRoutes={setRoutes} viewState={viewState} />
    </>
  )
}
