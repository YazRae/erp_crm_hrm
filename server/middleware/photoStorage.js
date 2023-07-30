import multer from "multer";
import { extname } from "path";

const adminPhotoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/admin");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + extname(file.originalname));
  },
});

const adminPhotoUpload = multer({ storage: adminPhotoStorage });

// post requests
// post: {
//   "/create": [[adminPhotoUpload.single("photo"), bodyPath], adminCreate],
//   "/photo": [[adminPhotoUpload.single("photo"), bodyPath], adminPhoto],
// },

export default adminPhotoUpload;
