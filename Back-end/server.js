import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import {app,server} from "./Socket/socket.js"

dotenv.config({
  path: "./.env",
});



app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST","PUT","DELETE"],
    credentials: true,
  })
);




mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});



// routes import
import adminRouter from "./routes/admin.routes.js";
import userRouter from "./routes/user.routes.js";
import courseRouter from "./routes/course.routes.js";
import taskRouter from "./routes/task.routes.js";
import instructorRouter from "./routes/instructor.routes.js";
import feedRouter from "./routes/feed.routes.js";
import chatRouter from "./routes/chat.routes.js";
import paymentRouter from "./routes/payment.routes.js";

// routes declaration
app.use("/api/admin", adminRouter);
app.use("/api", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/feed", feedRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/chat", chatRouter);
app.use("/api/instructor", instructorRouter);
app.use("/api/payment",paymentRouter);

app.use((err, _, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const port = process.env.PORT || 3000;


server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
