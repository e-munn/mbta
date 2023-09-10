// const { prepStream } = require('./utils')
import axios, { AxiosError } from 'axios'
import * as express from 'express'
let router = express.Router()
import { prepStream } from './utils'

import { Readable } from 'stream'
router.get('/api', (req, res) => {
  res.send('Home')
})

router.get(
  '/api/vehicles',
  async (req: express.Request, res: express.Response) => {
    prepStream(res)

    const response = await axios.get(
      'https://api-v3.mbta.com/vehicles?filter[route]=Red,Orange,Blue,Green-B,Green-C,Green-D,Green-E',
      {
        headers: {
          'X-API-Key': '488fd0453fbd42299dfd42666230f022',
          Accept: 'text/event-stream',
        },
        responseType: 'stream',
      }
    )
    response.data.pipe(res)
  }
)

router.get(
  '/api/predictions',
  async (req: express.Request, res: express.Response) => {
    prepStream(res)

    const response = await axios.get(
      'https://api-v3.mbta.com/predictions?filter[route]=Red,Orange,Blue,Green-B,Green-C,Green-D,Green-E',
      {
        headers: {
          'X-API-Key': '488fd0453fbd42299dfd42666230f022',
          Accept: 'text/event-stream',
        },
        responseType: 'stream',
      }
    )
    response.data.pipe(res)
  }
)

export default router
