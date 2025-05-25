import multer from "multer";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(6, (err, buffer) => {
      if (err) {
        return cb(err);
      }
      const filename =
        buffer.toString("hex") + "_" + Date.now() + "_" + file.originalname;
      cb(null, filename);
    });
  },
});

const upload = multer({ storage: storage });
export default upload;
