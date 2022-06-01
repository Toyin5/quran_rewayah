import mongoose from "mongoose"

const quran_ayah = new mongoose.Schema({
  text: {
    type: Object,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  ayah: {
    type: Number,
    required: true
  },
  surah: {
    type: Number,
    required: true
  },
  juz: {
    type: Number,
    required: true
  },
  page: {
    type: Number,
    required: true
  },
  audio: {
    type: String,
    required: true
  },
  rewayah: {
    type: Array
  }
})

export default mongoose.model('quran-ayah', quran_ayah)