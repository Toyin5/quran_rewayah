import mongoose from "mongoose";

const quran_surah = new mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  total_ayah: {
    type: Number,
    required: true
  },
  name: {
    type: Object,
    required: true
  },
  translation: {
    type: Object,
    required: true
  },
  revelation: {
    type: Object,
    required: true
  },
  basmalah_surah: {
    type: Object,
    required: true
  }
})

export default mongoose.model('quran_surah', quran_surah)