import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  } ,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  }
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(file.mimetype);
    const mimetype = allowedTypes.test(file.originalname.split('.').pop().toLowerCase());

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed!"));
    }
  }
});
