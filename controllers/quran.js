import fetch from "node-fetch"
import quran_ayah from "../models/ayah.js"
import quran_surah from "../models/surah.js"

export const getJuz = async (req, res) => {
  return await quran_ayah.find({ juz: req.params.no }).sort('number').then(ayah => {

    let sort = 'th'

    switch (ayah[0].juz) {
      case 1:
        sort = 'st'
        break
      case 2:
        sort = 'nd'
        break
      default:
        break
    }

    res.status(200).json({
      code: 200,
      message: `Getting For ${ayah[0].juz}${sort} Juz of Quran Successfully`,
      data: {
        ayah: ayah
      }
    })
  }).catch(err => {
    res.status(402).json({
      code: 402,
      message: err
    })
  })
}

export const getAllSurah = async (req, res) => {
  return await quran_surah.find().sort('number').then(results => {
    res.status(200).json({
      code: 200,
      message: 'Getting For All Surah Successfully!',
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
  return await quran_surah.find({ number: req.params.no }).then(surah => {
    quran_ayah.find({ surah: req.params.no }).sort('ayah').then(ayah => {
      res.status(200).json({
        code: 200,
        message: `Getting For ${surah[0].name.en} Surah Successfully`,
        data: {
          surah: surah[0],
          ayah: ayah[0]
        }
      })
    })
  }).catch(err => {
    res.status(402).json({
      code: 402,
      message: err
    })
  })
}

export const getAyah = async (req, res) => {

  const ayah = req.query.no
  const surah = req.query.surah

  return await quran_surah.find({ number: surah }).then(surah => {
    quran_ayah.find({ ayah, surah: req.query.surah }).then(ayah => {

      let sort = 'th'

      switch (ayah[0].ayah) {
        case 1:
          sort = 'st'
          break
        case 2:
          sort = 'nd'
          break
        default:
          break
      }

      res.status(200).json({
        code: 200,
        message: `Getting For ${ayah[0].ayah}${sort} of ${surah[0].name.en} Surah Successfully`,
        data: {
          number: surah[0].number,
          name: surah[0].name,
          translation: surah[0].translation,
          ayah: ayah[0]
        }
      })
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
        number: ayah_data.number.inQuran,
        ayah: ayah_data.number.inSurah,
        surah: ayah_data.surah.number,
        juz: ayah_data.meta.juz,
        page: ayah_data.meta.page,
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