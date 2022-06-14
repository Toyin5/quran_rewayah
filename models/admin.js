import mongoose from "mongoose"

const admin = new mongoose.Schema({
  adminname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

export default mongoose.model('admin', admin)