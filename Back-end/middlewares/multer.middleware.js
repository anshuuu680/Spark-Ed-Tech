import multer from "multer";

// Multer storage configuration for videos and images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory for temporary uploads
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // Save the file with its original name
    cb(null, file.originalname);
  }
});

// File filter to allow only video and image formats
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "video/mp4", "video/mpeg", "video/ogg", "video/webm", "video/avi", // Video formats
    "image/jpeg", "image/png", "image/gif", "image/webp"               // Image formats
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Only videos and images are allowed."), false); // Reject the file
  }
};

// Multer instance for uploading both videos and images
export const upload = multer({
  
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50 MB
  fileFilter, // Validate file types
});
