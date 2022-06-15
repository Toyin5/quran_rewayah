import users from "../models/users.js";
import bcrypt from 'bcrypt'
import jsonwebtoken from "jsonwebtoken";
import nodemailer from 'nodemailer'
import 'dotenv/config'

export const addUsers = async (req, res) => {
  const { username, email } = req.body
  const pass = req.body.password

  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(pass, salt)

  const add = new users({
    username, email, password
  })

  return await users.find({ email }).then(result => {
    if (result[0]) {
      return res.status(400).json({
        code: 400,
        message: 'User is Exist!',
      })

    } else if (!result[0]) {
      return add.save().then(results => {
        res.status(201).json({
          code: 201,
          message: 'User Creating Success!',
          data: results
        })
      }).catch(err => {
        res.status(402).json({
          code: 402,
          message: err
        })
      })
    }
  })
}

export const getUsers = async (req, res) => {
  const { email, password } = req.body

  const usersLog = await users.findOne({ email })
  if (usersLog && password) {
    const login = await bcrypt.compare(password, usersLog.password)
    const token = jsonwebtoken.sign({ _id: usersLog._id }, process.env.SECRET_KEY)

    if (login) {
      return await users.findOne({ email: usersLog.email }).then(result => {

        res.status(200).header('auth-token', token).json({
          message: 'User Login Success!',
          code: 200,
          data: result,
          token
        })
      }).catch(err => res.json({
        message: 'User Login Failed',
        error: err.message
      }))
    } else {
      return res.status(400).json({
        status: 'User Login Failed!',
        code: 400,
        message: 'Email/Password not found'
      })
    }
  } else {
    return res.status(400).json({
      status: 'User Login Failed!',
      code: 400,
      message: 'Email/Password not found'
    })
  }
}

export const Users = async (req, res) => {

  return await users.findOne({ _id: req.params.id }).then(result => {
    const token = jsonwebtoken.sign({ _id: result._id }, process.env.SECRET_KEY)

    res.status(200).header('auth-token', token).json({
      message: 'User Login Success!',
      code: 200,
      data: result,
      token
    })
  }).catch(err => res.json({
    message: 'Login Failed',
    error: err.message
  }))
}


export const Mailer = async (req, res) => {

  const { email, subject, text } = req.body

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: "quranrewayah@gmail.com, ariefsaifuddien01@gmail.com, toyinmuhammed50@gmail.com",
    subject,
    text,
  };

  await new Promise((resolve, reject) => {
    return transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(400).json({
          message: 'Send Mail Failed!',
          code: 400,
          data: reject(err)
        })
      } else {
        return res.status(200).json({
          message: 'Send Mail Success!',
          code: 200,
          data: resolve(info.envelope)
        })
      }
    });
  })
}

export const checkUsers = async (req, res) => {
  return await users.find().then(result => {
    res.status(200).json({
      message: 'Checking Success!',
      code: 200,
      data: result,
    })
  }).catch(err => res.json({
    message: 'Checking Failed',
    error: err.message
  }))
}