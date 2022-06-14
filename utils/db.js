import mongoose from 'mongoose'
import 'dotenv/config'

const database = async () => {
  return await mongoose.connect(process.env.MONGODB)
    .then((res) => console.log('connection success : connected!', res.options.autoIndex))
    .catch(err => console.log('connection failed : not connected! = ', err.code))
}

export default database;