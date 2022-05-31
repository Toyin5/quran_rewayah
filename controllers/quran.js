import quran_ayah from "../models/quran.js"

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
  const ayah = req.body.ayah
  const ayah_tr = req.body.ayah_tr
  const ayah_no = req.body.ayah_no
  const surah = req.body.surah
  const surah_tr = req.body.surah_tr
  const juz = req.body.juz
  const rewayah = req.body.rewayah

  const ayah_all = new quran_ayah({
    ayah,
    ayah_tr,
    ayah_no,
    surah,
    surah_tr,
    juz,
    rewayah
  })

  return await ayah_all.save().then(results => {
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

export const deleteAllAyah = async (req, res) => {
  return await quran_ayah.deleteMany({ __v: req.params.v })
    .then(results => {
      res.status(200).json({
        code: 200,
        message: `All Ayah Deleted Success!`,
        data: results
      })
    }).catch(err => {
      res.status(402).json({
        code: 402,
        message: err
      })
    })
}