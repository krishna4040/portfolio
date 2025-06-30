import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dbConnect } from "./config/dbConnect.js";
import Message from "./models/message.js";
import { sendMail } from "./config/nodemailer.js";

// Import routes
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import aboutRoutes from "./routes/about.js";
import skillRoutes from "./routes/skills.js";
import workExperienceRoutes from "./routes/workExperience.js";
import contactInfoRoutes from "./routes/contactInfo.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

dbConnect();

app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/work-experience", workExperienceRoutes);
app.use("/api/contact-info", contactInfoRoutes);
app.use("/api/upload", uploadRoutes);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve static files in production
if (isProduction) {
  app.use(express.static(path.join(__dirname, "dist")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server started successfully at port ${port}`);
  console.log(`Environment: ${isProduction ? "production" : "development"}`);
});

// Contact form endpoint
app.post("/api/createEntry", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const entry = await Message.create({
      name,
      email,
      subject,
      message,
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
});

// Resume download endpoint (optional)
app.get("/api/download", (req, res) => {
  const fileURL = "./utils/resume.pdf";
  const fileName = "resume.pdf";

  res.download(fileURL, fileName, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send("File not found");
    }
  });
});

