const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },

    filename:  (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb)=> {
    const ext = path.extname(file.originalname)

    if(ext !== ".jpeg" || ext !== ".jpeg.jpg" || ext !== ".png") {
        cb(null, new Error("file format not supported"), false)
    } else {
        cb(null, true)
    }
}

const logoUpload = multer({
    storage: storage,
    fileFilter: fileFilter,
    fileSize: {
        limits: 1024 * 1024 * 10
    }
}).single("logo")

module.exports = logoUpload