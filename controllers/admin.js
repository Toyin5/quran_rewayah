import admin from "../models/admin.js";
import bcrypt from 'bcrypt'
import jsonwebtoken from "jsonwebtoken";

export const addAdmin = async (req, res) => {
  const { adminname, email } = req.body
  const pass = req.body.password

  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(pass, salt)

  const add = new admin({
    adminname, email, password
  })

  return await admin.find({ email }).then(result => {
    if (result[0]) {
      return res.status(400).json({
        code: 400,
        message: 'Admin is Exist!',
      })

      // return admin.findByIdAndDelete({ _id: result[0]._id }).then(ok => {
      //   res.status(400).json({
      //     code: 400,
      //     message: 'Admin is Deleted!',
      //   })
      // })

    } else if (!result[0]) {
      return add.save().then(results => {
        res.status(201).json({
          code: 201,
          message: 'Admin Creating Success!',
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

export const getAdmin = async (req, res) => {
  const { email, password } = req.body

  const adminLog = await admin.findOne({ email })
  if (adminLog && password) {
    const login = await bcrypt.compare(password, adminLog.password)
    const token = jsonwebtoken.sign({ _id: adminLog._id }, process.env.SECRET_KEY)

    if (login) {
      return await admin.findOne({ email: adminLog.email }).then(result => {

        res.status(200).header('auth-token', token).json({
          status: 'Login Success!',
          code: 200,
          data: result,
          token
        })
      }).catch(err => res.json({
        message: 'Login Failed',
        error: err.message
      }))
    } else {
      return res.status(400).json({
        status: 'Login Failed!',
        code: 400,
        message: 'Email/Password not found'
      })
    }
  } else {
    return res.status(400).json({
      status: 'Login Failed!',
      code: 400,
      message: 'Email/Password not found'
    })
  }
}