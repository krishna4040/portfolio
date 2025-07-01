import express from "express"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import { dbConnect } from "./config/dbConnect.js"
import Message from "./models/message.js"
// import { sendMail } from "./config/nodemailer.js"

// Import routes
import authRoutes from "./routes/auth.js"
import projectRoutes from "./routes/projects.js"
import aboutRoutes from "./routes/about.js"
import skillRoutes from "./routes/skills.js"
import workExperienceRoutes from "./routes/workExperience.js"
import contactInfoRoutes from "./routes/contactInfo.js"
import uploadRoutes from "./routes/upload.js"
import { existsSync } from "fs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const env = process.env.NODE_ENV || "development"
const envFile = path.resolve(__dirname, "..", `.env.${env}`)
existsSync(envFile)
  ? dotenv.config({ path: envFile })
  : dotenv.config({ path: path.resolve(__dirname, "..", ".env") })

const app = express()
const port = process.env.PORT || 5000

dbConnect()

app.use(express.json())

// API Routes
app.use("/api/auth", authRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/about", aboutRoutes)
app.use("/api/skills", skillRoutes)
app.use("/api/work-experience", workExperienceRoutes)
app.use("/api/contact-info", contactInfoRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

if (env === "production") {
  app.use(express.static(path.join(__dirname, "dist")))

  app.get("*", (_, res) =>
    res.sendFile(path.join(__dirname, "dist", "index.html")),
  )
}

app.listen(port, () => {
  console.log(`Server started successfully at port ${port}`)
  console.log(
    `Environment: ${env === "production" ? "production" : "development"}`,
  )
})

// Contact form endpoint
app.post("/api/createEntry", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      })
    }

    await Message.create({
      name,
      email,
      subject,
      message,
    })

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    })
  } catch (error) {
    console.error("Error creating message:", error)
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    })
  }
})

// Resume download endpoint (optional)
app.get("/api/download", (_, res) => {
  const fileURL = "./utils/resume.pdf"
  const fileName = "resume.pdf"

  res.download(fileURL, fileName, (err) => {
    if (err) {
      console.error(err)
      res.status(404).send("File not found")
    }
  })
})
