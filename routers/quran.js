import express from "express"
import {
  deleteAyah,
  deleteEverything,
  getAllSurah,
  getAyah,
  getJuz,
  getSurah,
  postAyah,
  updateAyah
} from "../controllers/quran.js"
import { verifyToken } from "../controllers/token.js"

export const quranRouters = express.Router()

quranRouters.get('/juz/:no', verifyToken, getJuz)

quranRouters.get('/surah', verifyToken, getAllSurah)
quranRouters.get('/surah/:no', verifyToken, getSurah)

quranRouters.get('/ayah/:no/?', verifyToken, getAyah)
quranRouters.post('/ayah/:no/?', verifyToken, postAyah)
quranRouters.put('/ayah/:no/?', verifyToken, updateAyah)
quranRouters.delete('/ayah/:no/?', verifyToken, deleteAyah)
quranRouters.delete('/all_ayah/:v', verifyToken, deleteEverything)