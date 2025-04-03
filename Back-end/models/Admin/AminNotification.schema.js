const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminNotificationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["CourseUploaded", "ApprovalPending", "InstructorRequest"],
    required: true,
  },
  icon: {
    type: String,
    enum: ["CheckCircle", "AlertTriangle", "UserPlus"],
    required: true,
  },

  isRead: {
    type: Boolean,
    default: false,
  },
},{timestamps:true});

const AdminNotification = mongoose.model(
  "AdminNotification",
  AdminNotificationSchema
);

module.exports = AdminNotification;
