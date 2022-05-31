import mongoose from "mongoose"

const quran_ayah = new mongoose.Schema({
  ayah: {
    type: String,
    required: true
  },
  ayah_tr: {
    type: String,
    required: true
  },
  ayah_no: {
    type: String,
    required: true,
    max: 3
  },
  surah: {
    type: String,
    required: true
  },
  surah_tr: {
    type: String,
    required: true
  },
  juz: {
    type: String,
    required: true,
    max: 2
  },
  rewayah: {
    type: Array,
  }
}, { timestamps: true })

export default mongoose.model('quran-ayah', quran_ayah)