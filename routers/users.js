import e from "express";
import { addUsers, checkUsers, getUsers, Mailer, Users } from "../controllers/users.js";

export const usersRouters = e.Router()

usersRouters.post('/signup', addUsers)
usersRouters.post('/login', getUsers)
usersRouters.get('/:id', Users)
usersRouters.get('/', checkUsers)

usersRouters.post('/mailer', Mailer)