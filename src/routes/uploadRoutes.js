const express = require('express');
const multer = require('multer');

const uploadImage = require('../middlewares/uploadImage');
const router = express.Router();

const requireAuth = require('../middlewares/requireAuth');
router.use(requireAuth);

router.post('/upload', (req, res) => {
let upload = multer({ storage: uploadImage.storage, fileFilter: uploadImage.imageFilter }).single('img');
upload(req, res, function(err) {

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

res.json({'message': 'upload success'});
    });
});

module.exports = router;