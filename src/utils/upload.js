const multer = require("multer");
const cloudinary = require("./cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads",
        allowed_formats: ["jpg", "jpeg", "png"], 
        transformation: [{ width: 500, height: 500, crop: "limit" }]
    },
});

const upload = multer({
    storage: storage,
})

module.exports = upload;