import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import expressLayouts from "express-ejs-layouts"
import { quranRouters } from "./routers/quran.js"
import database from "./utils/db.js"

const app = express()
const port = 3300

database()
app.use(cors())
app.use(expressLayouts)
app.use(bodyParser.json())
app.use('/public', express.static('public'))
app.set('view engine', 'ejs')

app.use('/api-quran-rewayah', quranRouters)

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Home',
    layout: './layout/layout',
    data: 'Home Page'
  })
})

app.use('/', (req, res) => {
  res.render('404', {
    title: '404',
    layout: './404',
    data: '404 Page'
  })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})