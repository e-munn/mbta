import { useEffect, useState, useRef } from 'react'
import { Box, Stack } from '@mui/material'
import { motion } from 'framer-motion'
import _ from 'lodash'
import { useTimeout } from 'usehooks-ts'
import { Map, useMap } from 'react-map-gl'
const R = 40

export const Card = ({ card, setCard }) => {
  console.log(card)
  // useTimeout(setCard(false), 1000)
  useTimeout(() => setCard(false), 1200)
  return (
    <motion.div
      style={{
        width: R,
        height: R,
        position: 'absolute',
        top: card.d?.y - R / 2,
        left: card.d?.x - R / 2,
        backdropFilter: 'blur(7.5px)',
        zIndex: 2,
        opacity: 1,
        border: '1px solid white',
        borderRadius: R / 2,
        cursor: 'crosshair',
      }}
      initial={{ scale: 0.2 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', bounce: 0.7 }}
    />
  )
}
