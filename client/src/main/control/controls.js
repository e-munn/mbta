import { useEffect, useState, useRef } from 'react'
import { Box, Stack } from '@mui/material'
import { motion } from 'framer-motion'
import _ from 'lodash'
import { Search } from './search'
import { Switches } from './switches'

export const Controls = ({}) => {
  return (
    <Stack
      sx={{
        width: 'calc(100vw - 32px)',
        height: 66,
        position: 'absolute',
        top: 0,
        left: 0,
        background: 'rgba( 49, 49, 49, 0.5 )',
        backdropFilter: 'blur(7.5px)',
        borderRadius: 4,
        m: 2,
        p: 1,
      }}
      direction={'row'}
    >
      <Search />
      <Switches />
    </Stack>
  )
}
