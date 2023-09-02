import { Router } from 'express'

export default function vehicles() {
  const router = Router()

  router.get('/', (req, res) => {
    res.json({ users: ['fdasfd'] })
  })

  return router
}
