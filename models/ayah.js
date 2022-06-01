import mongoose from "mongoose"

const quran_ayah = new mongoose.Schema({
  text: {
    type: Object,
    required: true
  },
  place_in: {
    type: Object,
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