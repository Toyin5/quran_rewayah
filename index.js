import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { quranRouters } from "./routers/quran.js"
import database from "./utils/db.js"
import path from 'path'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 3300

database()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join('public')))

app.get('/', (req, res) => {
  res.sendFile(path.join('./index.html'))
})

app.use('/api/quran-rewayah', quranRouters)

app.use('/:any', (req, res) => {
  res.status(404).json({
    code: 404,
    message: req.params.any.toUpperCase() + ' Page Not Found',
    github: 'https://github.com/saifuddien/quran_rewayah',
    docs: [
      {
        desc: 'Getting One Juz Of Quran.',
        url: {
          endpoint: '/api/quran-rewayah/juz/{number of juz}',
          example: 'https://quran-rewayah-api.vercel.app/api/quran-rewayah/juz/2'
        }
      },
      {
        desc: 'Getting All Surah Of Quran.',
        url: {
          endpoint: '/api/quran-rewayah/surah',
          example: 'https://quran-rewayah-api.vercel.app/api/quran-rewayah/surah'
        }
      },
      {
        desc: 'Getting One Surah Of Quran.',
        url: {
          endpoint: '/api/quran-rewayah/surah/{number of surah}',
          example: 'https://quran-rewayah-api.vercel.app/api/quran-rewayah/surah/5'
        }
      },
      {
        desc: 'Getting One Ayah Of Surah in Quran.',
        url: {
          endpoint: '/api/quran-rewayah/ayah/{number of ayah}?surah={number of surah}',
          example: 'https://quran-rewayah-api.vercel.app/api/quran-rewayah/ayah/5?surah=12'
        }
      }
    ]
  })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})