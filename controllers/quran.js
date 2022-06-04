import fetch from "node-fetch"
import quran_ayah from "../models/ayah.js"
import quran_surah from "../models/surah.js"

export const getJuz = async (req, res) => {
  return await quran_ayah.find({ juz: req.params.no }).sort('number').then(ayah => {
    if (ayah[0]) {
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
    } else if (!ayah[0]) {
      res.status(404).json({
        code: 404,
        message: 'Juz not Found!'
      })
    }
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
    if (surah[0]) {
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
    } else if (!surah[0]) {
      res.status(404).json({
        code: 404,
        message: 'Surah not Found!'
      })
    }
  }).catch(err => {
    res.status(402).json({
      code: 402,
      message: err
    })
  })
}

export const getAyah = async (req, res) => {

  const ayah = req.params.no || 1
  const surah = req.query.surah || 2

  return await quran_surah.find({ number: surah }).then(surah => {
    quran_ayah.find({ ayah, surah: req.query.surah }).then(ayah => {
      if (ayah[0]) {
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
          message: `Getting For ${ayah[0].ayah}${sort} Ayah of ${surah[0].name.en} Surah Successfully`,
          data: {
            number: surah.number,
            name: surah.name,
            translation: surah.translation,
            ayah: ayah
          }
        })
      } else if (!ayah[0]) {
        res.status(404).json({
          code: 404,
          message: 'Ayah not Found!'
        })
      }
    })
  }).catch(err => {
    res.status(402).json({
      code: 402,
      message: err
    })
  })
}

export const postAyah = async (req, res) => {

  const ayah = req.params.no
  const surah = req.query.surah

  await fetch(`https://api.quran.sutanlab.id/surah/${surah}/${ayah}`)
    .then(r => r.json())
    .then(async (j) => {

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
        name: ayah_data.surah.name.transliteration.en,
        juz: ayah_data.meta.juz,
        page: ayah_data.meta.page,
        audio: ayah_data.audio.secondary[0],
        rewayah: req.body.rewayah
      })

      return quran_ayah.find({ number: ayah_data.number.inQuran }).then(result => {
        if (result[0]) {
          return res.status(400).json({
            code: 400,
            message: 'Ayah is Exist!',
          })
        } else if (!result[0]) {
          return ayah_one.save().then(results => {
            res.status(201).json({
              code: 201,
              message: 'Ayah Creating Success!',
              data: results
            })
          }).catch(err => {
            res.status(402).json({
              code: 402,
              message: err
            })
          })
        }
      })
    })
}

export const updateAyah = async (req, res) => {

  const ayah = req.params.no
  const surah = req.query.surah

  await fetch(`https://api.quran.sutanlab.id/surah/${surah}/${ayah}`)
    .then(r => r.json())
    .then(async (j) => {

      const ayah_data = j.data

      const ayah_one = {
        text: {
          ar: ayah_data.text.arab,
          en: ayah_data.translation.en,
          id: ayah_data.translation.id
        },
        number: ayah_data.number.inQuran,
        ayah: ayah_data.number.inSurah,
        surah: ayah_data.surah.number,
        name: ayah_data.surah.name.transliteration.en,
        juz: ayah_data.meta.juz,
        page: ayah_data.meta.page,
        audio: ayah_data.audio.secondary[0],
        rewayah: req.body.rewayah
      }

      return quran_ayah.find({ number: ayah_data.number.inQuran }).then(result => {
        if (!result[0]) {
          return res.status(404).json({
            code: 404,
            message: 'Ayah Not Found!',
          })
        } else if (result[0]) {
          return quran_ayah.findByIdAndUpdate(result[0]._id, ayah_one).then(results => {

            let sort = 'th'

            switch (results.ayah) {
              case 1:
                sort = 'st'
                break
              case 2:
                sort = 'nd'
                break
              default:
                break
            }

            res.status(201).json({
              code: 201,
              message: `Updating for ${results.ayah}${sort} Ayah of ${results.name} Successfully!`,
              data: ayah_one
            })
          }).catch(err => {
            res.status(402).json({
              code: 402,
              message: err
            })
          })
        }
      })
    })
}

export const deleteAyah = async (req, res) => {

  const ayah = req.params.no
  const surah = req.query.surah

  return await quran_ayah.find({ ayah, surah })
    .then(results => {
      if (results[0]) {
        return quran_ayah.deleteMany({ number: results[0].number }).then(ress => {

          let sort = 'th'

          switch (results[0].ayah) {
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
            message: `Deleting for ${results[0].ayah}${sort} of ${results[0].name} Successfully!`,
            data: ress
          })
        })
      } else if (!results[0]) {
        return res.status(404).json({
          code: 404,
          message: 'Ayah Not Found!',
        })
      }
    }).catch(err => {
      res.status(402).json({
        code: 402,
        message: err
      })
    })
}

export const deleteEverything = async (req, res) => {
  return await quran_ayah.deleteMany({ __v: req.params.v }).then(ress => {
    res.status(200).json({
      code: 200,
      message: `Deleting of All Ayah Successfully!`,
      data: ress
    })
  }).catch(err => {
    res.status(402).json({
      code: 402,
      message: err
    })
  })
}