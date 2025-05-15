const path = require("node:path");
const upload = require("multer-uploader");
const e = require("express");

const avatarUpload = (req, res, next) => {
  const uploadDir = path.join(__dirname, "../../../public/uploads");

  const MAX_FILE_SIZE = 1000000;
  const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/svg+xml",
  ];

  upload(uploadDir, MAX_FILE_SIZE, ALLOWED_MIME_TYPES).single("avatar")(
    req,
    res,
    (err) => {
      if (err) {
        // console.log("❌ This is an error from uploader ❌", err);
        const error = new Error(err);
        error.status = 400;
        console.log(
          "\n\n ❌ File upload error ❌\n",
          `status: ${error.status}\n massage: ${error.message} \n`
        );
        return next(error);
      }
      console.log("from uploader: ", req.file);
      console.log("from uploader: ", req.body);
      next();
    }
  );
};

module.exports = avatarUpload;
