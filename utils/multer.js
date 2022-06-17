import multer from "multer"

export const pdf = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname == 'usul_pdf1') {
      cb(null, 'public/usul')
    }

    if (file.fieldname == 'usul_pdf2') {
      cb(null, 'public/usul')
    }

    if (file.fieldname == 'usul_pdf') {
      cb(null, 'public/usul')
    }
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E5)
    cb(null, unique + '-' + file.originalname)
  }
})

export const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}