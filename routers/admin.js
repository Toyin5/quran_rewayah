import express from "express";
import { addAdmin, getAdmin } from "../controllers/admin.js";

export const adminRouters = express.Router()

adminRouters.post('/signup', addAdmin)
adminRouters.post('/login', getAdmin)