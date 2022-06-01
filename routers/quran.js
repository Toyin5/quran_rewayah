import express from "express"
import { deleteAyah, getAllSurah, getAyah, getJuz, getSurah, postAyah } from "../controllers/quran.js"

export const quranRouters = express.Router()

quranRouters.get('/juz/:no', getJuz)

quranRouters.get('/surah', getAllSurah)
quranRouters.get('/surah/:no', getSurah)

quranRouters.get('/ayah', getAyah)
quranRouters.post('/ayah', postAyah)
quranRouters.delete('/ayah/:id', deleteAyah)