import { Response } from 'express'

const KEY = '488fd0453fbd42299dfd42666230f022'

export function prepStream(res: Response) {
  res.setHeader('Content-type', 'text/event-stream; charset=utf-8')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('X-Accel-Buffering', 'no')
  // res.setHeader('X-API-Key', KEY)
  res.flushHeaders()
  res.on('close', () => {
    res.end()
  })
}
