import fetch from "node-fetch"
import quran_ayah from "../models/ayah.js"
import quran_surah from "../models/surah.js"

export const getAllSurah = async (req, res) => {
  return await quran_surah.find().then(results => {
    res.status(200).json({
      code: 200,
      message: 'Getting Success!',
      data: results
    })
  }).catch(err => {
    res.status(402).json({
      code: 402,
      message: err
    })
  })
}

export const getSurah = async (req, res) => {
  return await quran_surah.find({ number: req.params.no }).then(results => {
    res.status(200).json({
      code: 200,
      message: 'Getting Success!',
      data: results
    })
  }).catch(err => {
    res.status(402).json({
      code: 402,
      message: err
    })
  })
}

export const getAyah = async (req, res) => {
  return await quran_ayah.find().then(results => {
    res.status(200).json({
      code: 200,
      message: 'Getting Success!',
      data: results
    })
  }).catch(err => {
    res.status(402).json({
      code: 402,
      message: err
    })
  })
}

export const postAyah = async (req, res) => {

  const ayah = req.query.no
  const surah = req.query.surah

  await fetch(`https://api.quran.sutanlab.id/surah/${surah}/${ayah}`)
    .then(r => r.json())
    .then(j => {

      const ayah_data = j.data

      const ayah_one = new quran_ayah({
        text: {
          ar: ayah_data.text.arab,
          en: ayah_data.translation.en,
          id: ayah_data.translation.id
        },
        place_in: {
          surah: ayah_data.surah.number,
          juz: ayah_data.meta.juz,
          page: ayah_data.meta.page
        },
        audio: ayah_data.audio.secondary[0],
        rewayah: req.body.rewayah
      })

      return ayah_one.save().then(results => {
        res.status(201).json({
          code: 201,
          message: 'Data Creating Success!',
          data: results
        })
      }).catch(err => {
        res.status(402).json({
          code: 402,
          message: err
        })
      })
    })
}

export const deleteAyah = async (req, res) => {
  return await quran_ayah.findByIdAndRemove({ _id: req.params.id })
    .then(results => {
      res.status(200).json({
        code: 200,
        message: `${results.ayah_txt} Deleted Success!`
      })
    }).catch(err => {
      res.status(402).json({
        code: 402,
        message: err
      })
    })
}