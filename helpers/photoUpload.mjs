import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img/users/");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    let reverse = fileName.split(".").reverse();
    let arrayFileName = req.user.id + "." + reverse[0];

    cb(null, arrayFileName);
  },
});

const upload = multer({ storage: storage })

export default upload