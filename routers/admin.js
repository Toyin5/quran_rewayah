import express from "express";
import { addAdmin, Admin, checkAdmin, getAdmin } from "../controllers/admin.js";

export const adminRouters = express.Router()

adminRouters.post('/signup', addAdmin)
adminRouters.post('/login', getAdmin)
adminRouters.get('/:id', Admin)
adminRouters.get('/', checkAdmin)