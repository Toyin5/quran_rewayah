import 'dotenv/config'
import path from "path"
import cors from "cors"
import multer from 'multer'
import express from "express"
import database from "./utils/db.js"
import { quranRouters } from "./routers/quran.js"
import { adminRouters } from './routers/admin.js'
import { usersRouters } from './routers/users.js'
import { quraaRouters } from './routers/quraa.js'
import { fileFilter, pdf } from './utils/multer.js'

const app = express()
const port = process.env.PORT || 3300

database()
app.use(cors())
app.use(express.json())
app.use('/public', express.static(path.join('public')))

app.use(multer({ storage: pdf, fileFilter }).any())

app.use('/api/quran-rewayah', quranRouters)
app.use('/api/admin', adminRouters)
app.use('/api/users', usersRouters)
app.use('/api/quraa', quraaRouters)

app.use('/', (req, res) => {
  res.status(200).json({
    code: 200,
    message: 'Wrong Endpoint, Try the endpoints below!',
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

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))