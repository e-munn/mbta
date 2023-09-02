import express from 'express'
const app = express()
import router from './api'

app.use('/', router)

const port = 8000
app.listen(port, () => {
  console.log(`server started at port ${port}`)
})
