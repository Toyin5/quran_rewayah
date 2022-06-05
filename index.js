import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { quranRouters } from "./routers/quran.js"
import database from "./utils/db.js"
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 3300

database()
app.use(cors())
app.use(bodyParser.json())

app.use('/api/quran-rewayah', quranRouters)

app.get('/', (req, res) => {
  res.status(200).json({
    code: 200,
    message: 'Home Page API'
  })
})

app.use('/:any', (req, res) => {
  res.status(404).json({
    code: 404,
    message: req.params.any.toUpperCase() + ' Page Not Found'
  })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})