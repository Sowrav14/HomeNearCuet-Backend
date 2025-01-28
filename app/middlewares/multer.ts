const multer = require('multer');

// Configure Multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

export default upload;
