
const multer = require('multer');


module.exports = {
  createRecording: async (req, res) => {
    console.log("found createRecording");
    const storage = multer.diskStorage({
      destination(req, file, cb) {
        cb(null, '../uploads/');
      },
      filename(req, file, cb) {
        const fileNameArr = file.originalname.split('.');
        cb(null, `${Date.now()}.${fileNameArr[fileNameArr.length - 1]}`);
        console.log(filename);
      },
    });
    const upload = multer({ storage });
    upload.single('audio'), (req, res) => res.json({ success: true });
  },
  loadSeshRecordings: async (req, res) => {
    try {
      console.log("try loading current sessions");
      
      let files = fs.readdirSync('../uploads');
      files = files.filter((file) => {
        // check that the files are audio files
        const fileNameArr = file.split('.');
        return fileNameArr[fileNameArr.length - 1] === 'mp3';
      }).map((file) => `/${file}`);
      console.log(res);
      res.json({ success: true, files });
    } catch (err) {
    console.log(err);
    }
  },
}