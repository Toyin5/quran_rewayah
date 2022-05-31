import express from "express"
import { deleteAllAyah, deleteAyah, getAyah, postAyah } from "../controllers/quran.js"

export const quranRouters = express.Router()

quranRouters.get('/ayah', getAyah)
quranRouters.post('/ayah', postAyah)
quranRouters.delete('/ayah/:id', deleteAyah)
quranRouters.delete('/ayah_all/:v', deleteAllAyah) 