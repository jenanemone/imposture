const path = require('path');
const fs = require('fs');
const multer = require('multer');


module.exports = {
  createRecording: async (req, res) => {
    const storage = multer.diskStorage({
      destination(req, file, cb) {
        cb(null, 'uploads/');
      },
      filename(req, file, cb) {
        const fileNameArr = file.originalname.split('.');
        cb(null, `${Date.now()}.${fileNameArr[fileNameArr.length - 1]}`);
      },
    });
    const upload = multer({ storage });
    upload.single('audio'), (req, res) => res.json({ success: true });
  },
  loadSeshRecordings: async (req, res) => {
    try {
      console.log("try loading current sessions");
      let files = fs.readdirSync(path.join(__dirname, 'uploads'));
      files = files.filter((file) => {
        // check that the files are audio files
        const fileNameArr = file.split('.');
        return fileNameArr[fileNameArr.length - 1] === 'mp3';
      }).map((file) => `/${file}`);
      return res.json({ success: true, files });
    } catch (err) {
    console.log(err);
    }
  },
}