import e from "express";
import { addUsers, getUsers, Mailer, Users } from "../controllers/users.js";

export const usersRouters = e.Router()

usersRouters.post('/signup', addUsers)
usersRouters.post('/login', getUsers)
usersRouters.get('/:id', Users)

usersRouters.post('/mailer', Mailer)