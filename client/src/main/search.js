import { useEffect, useState, useRef } from 'react'
import { Stack, Button, Autocomplete, TextField } from '@mui/material'
import _ from 'lodash'

export const Search = () => {
  useEffect(() => {
    // fetch('http://localhost:8000/api/stops')
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res)
    //   })
  }, [])
  return (
    <Stack sx={{ m: 1, position: 'absolute', top: 0, left: 0 }}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={[]}
        sx={{ width: 300 }}
        onInputChange={(e, v) => console.log(v)}
        renderInput={(params) => <TextField {...params} label={'Search'} />}
      />
    </Stack>
  )
}
