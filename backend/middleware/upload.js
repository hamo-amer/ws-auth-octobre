const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "../frontend/public/uploads",
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1000000,
    // },
    fileFilter: (req, file, cb) => {
        const filterTypes = /jpeg|jpg|png/i;
        const mimeType = filterTypes.test(file.mimetype);
        if (mimeType) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
});
module.exports = upload;
