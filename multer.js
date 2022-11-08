import multer from "multer";

const lastImageName = ["idDefault"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const error = null;
    cb(error, "./public/img/productos");
  },
  filename: function (req, file, cb) {
    const error = null;
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    lastImageName[0] = `${uniqueSuffix}-${file.originalname
      .toLowerCase()
      .replaceAll(" ", "-")}`;
    cb(error, lastImageName[0]);
  },
});

const fileFilter = (req, file, cb) => {
  const validaMimeTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
  const mimeTypeIsOk = validaMimeTypes.includes(file.mimetype);
  cb(null, mimeTypeIsOk);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 0.5 * 1024 * 1024,
  },
});

export { upload };
