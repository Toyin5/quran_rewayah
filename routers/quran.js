import express from "express"
import { deleteAyah, deleteEverything, getAllSurah, getAyah, getJuz, getSurah, postAyah, updateAyah } from "../controllers/quran.js"

export const quranRouters = express.Router()

quranRouters.get('/juz/:no', getJuz)

quranRouters.get('/surah', getAllSurah)
quranRouters.get('/surah/:no', getSurah)

quranRouters.get('/ayah/:no/?', getAyah)
quranRouters.post('/ayah/:no/?', postAyah)
quranRouters.put('/ayah/:no/?', updateAyah)
quranRouters.delete('/ayah/:no/?', deleteAyah)
quranRouters.delete('/ayah/:v', deleteEverything)