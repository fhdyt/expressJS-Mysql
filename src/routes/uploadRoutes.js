const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const multer = require('multer');
const router = express.Router();

router.use(requireAuth);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 

var upload = multer({ storage: storage })

router.post('/upload', upload.single('file'), (req, res, next) => {
  const file = req
  console.log(file)
//   if (!file) {
//     const error = new Error('Please upload a file')
//     error.httpStatusCode = 400
//     return next(error)
//   }
    res.json(file)
  
})

module.exports = router;
