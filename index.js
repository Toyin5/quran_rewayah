import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { quranRouters } from "./routers/quran.js"
import database from "./utils/db.js"

const app = express()
const port = 3300

database()
app.use(cors())
app.use(bodyParser.json())

app.use('/api/quran_rewayah', quranRouters)

app.use('/', (req, res) => {
  res.status(200).json({
    code: 200,
    message: 'Wellcome to our API'
  })
})

app.use('/:any', (req, res) => {
  res.status(404).json({
    code: 404,
    message: req.params.any + ' Page Not Found'
  })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

