import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, (err, buffer) => {
      if (err) {
        return cb(err);
      }
      const filename = buffer.toString("hex") + Date.now() + file.originalname;
      cb(null, filename);
    });
  },
});

const upload = multer({ storage: storage });
export default upload;