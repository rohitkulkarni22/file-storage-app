const express = require('express');
const router = express.Router();
const { upload, uploadFile } = require('../controllers/FileController');
const authMiddleware = require('../middlewares/authmiddleware'); 

// Route for file upload
router.post('/upload', authMiddleware, upload.single('file'), uploadFile);

module.exports = router;
