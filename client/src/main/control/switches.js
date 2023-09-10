import { useEffect, useState, useRef } from 'react'
import { Stack, Button, Autocomplete, TextField } from '@mui/material'
import { motion } from 'framer-motion'
import _ from 'lodash'
import TextFieldsIcon from '@mui/icons-material/TextFields'
export const Switches = () => {
  useEffect(() => {
    // fetch('http://localhost:8000/api/stops')
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res)
    //   })
  }, [])
  const LIST = [
    { name: 'text', icon: (s) => <TextFieldsIcon sx={{ fontSize: s }} /> },
  ]
  return (
    <Stack
      sx={{ height: '100%', flexGrow: 1, px: 4 }}
      direction={'row'}
      alignItems={'center'}
    >
      {LIST.map((d, i) => (
        <motion.div
          style={{
            border: '1px solid white',
            borderRadius: 5,
            height: 40,
            width: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.05 }}
        >
          {d.icon('30px')}
        </motion.div>
      ))}
    </Stack>
  )
}
