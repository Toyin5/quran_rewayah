import mongoose from "mongoose"

const user = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8
  }
}, { timestamps: true })

export default mongoose.model('user', user)