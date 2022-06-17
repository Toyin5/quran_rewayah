import e from "express";
import { addQari, delQari, getOneQari, Quraa } from "../controllers/quraa.js";
import { verifyToken } from "../controllers/token.js";

export const quraaRouters = e.Router()

quraaRouters.post('/qari', verifyToken, addQari)
quraaRouters.delete('/qari/:id', verifyToken, delQari)
quraaRouters.get('/qari/:no', verifyToken, getOneQari)
quraaRouters.get('/qari', verifyToken, Quraa)