import quraa from "../models/quraa.js";

export const addQari = async (req, res) => {

  const {
    no,
    name,
    full_name,
    birth,
    death,
    his_shekh,
    his_students,
    name1,
    name2,
    full_name1,
    full_name2,
    birth1,
    birth2,
    death1,
    death2,
    his_shekh1,
    his_shekh2,
    his_students1,
    his_students2,
  } = req.body

  let usul_pdf;
  let usul_pdf1;
  let usul_pdf2;

  if (req.files[1]) {
    usul_pdf1 = req.files[0].path
    usul_pdf2 = req.files[1].path
    usul_pdf = ''
  } else if (req.files[0] && !req.files[1]) {
    usul_pdf = req.files[0].path
  }

  const qari = new quraa({
    no,
    qari: {
      name,
      full_name
    },
    birth,
    death,
    his_shekh,
    his_students,
    usul_pdf,
    rowi: [
      {
        rowi1: {
          name1,
          full_name1
        },
        birth1,
        death1,
        his_shekh1,
        his_students1,
        usul_pdf1
      },
      {
        rowi2: {
          name2,
          full_name2
        },
        birth2,
        death2,
        his_shekh2,
        his_students2,
        usul_pdf2
      },
    ]
  })

  return await qari.save().then(result => {
    res.status(201).json({
      code: 201,
      message: 'Qari Creating Success!',
      data: result
    })
  }).catch(err => {
    res.status(402).json({
      code: 402,
      message: err
    })
  })
}

export const Quraa = async (req, res) => {
  return await quraa.find().then(result => {
    res.status(200).json({
      message: 'Checking Success!',
      code: 200,
      data: result,
    })
  }).catch(err => res.json({
    message: 'Checking Failed',
    error: err.message
  }))
}

export const delQari = async (req, res) => {
  return await quraa.findByIdAndRemove(req.params.no).then(result => {
    res.status(200).json({
      message: 'Deleted Success!',
      code: 200,
      data: result,
    })
  }).catch(err => res.json({
    message: 'Deleted Failed',
    error: err.message
  }))
}

export const getOneQari = async (req, res) => {
  return await quraa.find({ no: req.params.no }).then(ress => {
    if (ress[0]) {
      res.status(200).json({
        message: 'Getting Successfully!',
        code: 200,
        data: ress,
      })
    }

    if (!ress[0]) {
      res.status(404).json({
        message: 'Getting Not Found!',
        code: 404,
      })
    }

  }).catch(err => res.json({
    message: 'Getting Failed',
    error: err.message
  })
  )
}