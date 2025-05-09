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


const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "video/mp4", "video/mpeg", "video/ogg", "video/webm", "video/avi", 
    "image/jpeg", "image/png", "image/gif", "image/webp"               
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(new Error("Invalid file type. Only videos and images are allowed."), false); // Reject the file
  }
};

export const upload = multer({
  
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, 
  fileFilter,
});
