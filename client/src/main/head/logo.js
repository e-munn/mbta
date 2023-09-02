import { motion } from 'framer-motion'
import { randomUniform, randomExponential, randomLogNormal } from 'd3-random'
import { scaleLinear } from 'd3-scale'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
const Logo = ({ radius }) => {
  const theme = useTheme()

  const s = 0
  const clamp = scaleLinear([0, 1], [2, 0.2]).clamp(true)
  return (
    <motion.div
      style={{
        width: radius * 2,
        height: radius * 2,
        borderWidth: 3.9,
        borderRadius: radius,
      }}
      // animate={{ rotate: 360 }}
      // transition={{ ease: 'linear', duration: 24, repeat: Infinity }}
    >
      {[...Array(220).keys()].map((d, i) => {
        let xO = radius - s / 2 - s
        let yO = radius - s / 2 - s
        const rLN = randomExponential(8)()
        const rR = radius + rLN * radius
        const rT = randomUniform(0, 2 * Math.PI)()
        let xR = xO + rR * Math.cos(rT)
        let yR = yO + rR * Math.sin(rT)
        const float = clamp(8 * rLN)
        const variants = {
          zero: { x: xO, y: yO },
          one: { x: xR, y: yR },
        }

        return (
          <motion.div
            key={i}
            style={{
              width: float,
              height: float,
              borderRadius: float,
              position: 'absolute',
              background: theme.palette.success.light,
            }}
            variants={variants}
            initial={'one'}
            animate={'one'}
            transition={{ ease: 'circOut', duration: 1.5 }}
          ></motion.div>
        )
      })}
    </motion.div>
  )
}

export default Logo
