import { useEffect, useState, useRef } from 'react'
import { Box, Stack } from '@mui/material'
import { motion } from 'framer-motion'
import _ from 'lodash'

export const Card = ({ card }) => {
  return (
    <Stack
      sx={{
        width: 250,
        height: 400,
        position: 'absolute',
        top: 0,
        left: 0,
        background: 'rgba( 49, 49, 49, 0.5 )',
        backdropFilter: 'blur(7.5px)',
        zIndex: 2,
        margin: 1,
        borderRadius: 4,
      }}
    >
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        sx={{
          width: '80%',
          height: 40,
          margin: '20px auto',
        }}
      >
        {card.attributes.bearing}
        {card.attributes.carriages?.map((d, i) => (
          <Stack
            justifyContent={'flex-end'}
            sx={{
              height: '100%',
              width: 80 / card.attributes.carriages?.length + '%',
              background: 'rgba( 30, 30, 30, 0.3 )',
              backdropFilter: 'blur(7.5px)',
            }}
          >
            <motion.div
              style={{
                height: d.occupancy_percentage + '%',
                width: '100%',
                background: 'red',
              }}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}
