const File = require('../models/fileModel');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Generate a unique 6-digit code
const generateCode = () => {
    return crypto.randomBytes(3).toString('hex');
};

const uploadFile = async (req, res) => {
    try {
        const { userId } = req.user; // Assume userId is available from the authenticated user

        if (!req.file) {
            return res.status(400).json({
                message: 'File is required',
                success: false
            });
        }

        const code = generateCode();

        const newFile = new File({
            userId: userId,
            originalName: req.file.originalname,
            path: req.file.path,
            code: code
        });

        await newFile.save();

        res.status(200).json({
            message: 'File uploaded successfully',
            code: code,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

module.exports = { upload, uploadFile };
