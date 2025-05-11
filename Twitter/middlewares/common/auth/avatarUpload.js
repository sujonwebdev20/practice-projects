const path = require("node:path");
const upload = require("multer-uploader");

const avatarUpload = (req, res, next) => {
  const uploadDir = path.join(__dirname, "../../../public/uploads");

  const MAX_FILE_SIZE = 1000000;
  const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png, image/svg+xml",
  ];

  upload(uploadDir, MAX_FILE_SIZE, ALLOWED_MIME_TYPES).single("avatar")(
    req,
    res,
    (err) => {
      if (err) {
        console.log("This is an error", err);
        return next(err);
      } else {
        console.log("from uploader: ", req.file);
        console.log("from uploader: ", req.body);
        next();
      }
    }
  );
};

module.exports = avatarUpload;
