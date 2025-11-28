const fs = require("fs");
const cloudinary = require("../utils/cloudinary");

exports.uploadFiles = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: "No files uploaded" 
      });
    }

    console.log("Files received:", req.files.length);
    
    const uploadedFiles = [];
    
    for (const file of req.files) {
      console.log("Uploading to Cloudinary:", file.originalname);
      
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "travel-app", // Optional: organize in folders
        resource_type: "auto", // Auto-detect file type
      });
      
      uploadedFiles.push({
        url: result.secure_url, // Direct image URL
        publicId: result.public_id, // For deletion later
        filename: file.originalname,
      });
      
      // Delete temp file
      fs.unlinkSync(file.path);
      console.log("✔ Uploaded:", result.secure_url);
    }
    
    return res.json({
      success: true,
      count: uploadedFiles.length,
      files: uploadedFiles,
    });
    
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    
    // Clean up temp files
    if (req.files) {
      req.files.forEach(file => {
        try {
          fs.unlinkSync(file.path);
        } catch (e) {}
      });
    }
    
    return res.status(500).json({ 
      success: false,
      error: err.message || "Upload failed" 
    });
  }
};

// Bonus: Delete image from Cloudinary
exports.deleteFile = async (req, res) => {
  try {
    const { publicId } = req.params;
    await cloudinary.uploader.destroy(publicId);
    
    res.json({ success: true, message: "File deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};