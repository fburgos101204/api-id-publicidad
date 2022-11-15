/*
  Multer is a package that parses multipart/form-data
  and populates req.body and req.file|req.files
*/

const multer = require('multer')
// const path = require('path')

// reject any file that isnt an image
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new Error('Please upload only images'), false)
  }
}

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../../resources/static/assets/uploads/'))
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-homepharmacy-${file.originalname}`)
//   }
// })

// holds multipart/form-data in RAM
const storage = multer.memoryStorage()

exports.UploadFile = multer({ storage: storage, fileFilter: imageFilter })
