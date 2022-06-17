import mongoose from "mongoose"

const quraa = new mongoose.Schema({
  no: {
    type: String,
    required: true
  },
  qari: {
    type: Object,
    required: true,
  },
  birth: {
    type: String,
    required: true
  },
  death: {
    type: String,
    required: true,
  },
  his_shekh: {
    type: String,
    required: true,
  },
  his_students: {
    type: String,
    required: true,
  },
  rowi: {
    type: Array,
    required: true,
  },
  usul_pdf: {
    type: String,
    required: false,
  }
}, { timestamps: true })

export default mongoose.model('quraa', quraa)