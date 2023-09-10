import { useEffect, useState, useRef } from 'react'
import { useTheme } from '@mui/material/styles'
import { useWindowSize } from 'usehooks-ts'
import { Box } from '@mui/material'
import { Stops } from './network/stops'
import { Routes } from './network/routes'
import { Vehicles } from './network/vehicles'
import { Stoptext } from './network/stoptext'

import { Map, useMap } from 'react-map-gl'
import _ from 'lodash'
import DeckGL from '@deck.gl/react'
import { useCounter, useInterval } from 'usehooks-ts'
const initial = {
  longitude: -71.09,
  latitude: 42.3601,
  zoom: 12,
}

export const MapBox = ({ setCard }) => {
  const { width, height } = useWindowSize()
  const [viewState, setViewState] = useState(initial)
  const [vehicles, setVehicles] = useState([])
  const [stoptext, setStoptext] = useState([])
  const [stops, setStops] = useState([])

  const [routes, setRoutes] = useState([])

  const layers = [routes, stops, ..._.flatten(vehicles)]

  const handleViewStateChange = ({ viewState }) => setViewState(viewState)

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
          mapStyle="mapbox://styles/emunn/clmcxqi0p015p01rcceeu615r"
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
      <Stoptext stoptext={stoptext} setStoptext={setStoptext} />
      <Routes routes={routes} setRoutes={setRoutes} viewState={viewState} />
    </>
  )
}
