const express = require("express");
const multer = require("multer");
const router = express.Router();

// Configure multer with limits
const upload = multer({ dest: "uploads/" });
const { uploadFiles, deleteFile } = require("../controllers/uploadController");

router.post("/upload", upload.array("photos", 100), uploadFiles);
router.delete("/:publicId", deleteFile);

//  test route
router.post("/test", upload.array("photos", 100), (req, res) => {
  console.log("Test route hit");
  console.log("Files:", req.files);
  res.json({ success: true, message: "Test successful", files: req.files });
});

module.exports = router;
