import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
// import expressLayouts from "express-ejs-layouts"
import { quranRouters } from "./routers/quran.js"
import database from "./utils/db.js"
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 3300

database()
app.use(cors())
// app.use(expressLayouts)
app.use(bodyParser.json())
// app.use('/public', express.static('public'))
// app.set('view engine', 'ejs')

app.use('/api-quran-rewayah', quranRouters)

app.use('/:any', (req, res) => {
  res.status(404).json({
    code: 404,
    message: req.params.any + ' Not Found'
  })
})

// app.get('/', (req, res) => {
//   res.render('home', {
//     title: 'Home',
//     layout: './layout/layout',
//     data: 'Home Page'
//   })
// })

// app.use('/:any', (req, res) => {
//   res.render('404', {
//     title: '404',
//     layout: './layout/layout',
//     data: req.params.any.toUpperCase() + ' Page Not Found'
//   })
// })

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})