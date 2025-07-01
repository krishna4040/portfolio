import multer from "multer"
import sharp from "sharp"
import path from "path"
import fs from "fs/promises"
import { v4 as uuidv4 } from "uuid"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../uploads")
const profileDir = path.join(uploadsDir, "profiles")
const resumeDir = path.join(uploadsDir, "resumes")
const backgroundsDir = path.join(uploadsDir, "backgrounds")

// Ensure directories exist
const ensureDirectories = async () => {
  try {
    await fs.mkdir(uploadsDir, { recursive: true })
    await fs.mkdir(profileDir, { recursive: true })
    await fs.mkdir(resumeDir, { recursive: true })
    await fs.mkdir(backgroundsDir, { recursive: true })
  } catch (error) {
    console.error("Error creating directories:", error)
  }
}

ensureDirectories()

// Storage configuration
const storage = multer.memoryStorage()

// File filter
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "profileImage") {
    // Accept only images
    if (file.mimetype.startsWith("image/")) {
      cb(null, true)
    } else {
      cb(new Error("Only image files are allowed for profile picture"), false)
    }
  } else if (file.fieldname === "resume") {
    // Accept only PDFs
    if (file.mimetype === "application/pdf") {
      cb(null, true)
    } else {
      cb(new Error("Only PDF files are allowed for resume"), false)
    }
  } else if (file.fieldname === "background") {
    // Accept only images
    if (file.mimetype.startsWith("image/")) {
      cb(null, true)
    } else {
      cb(new Error("Only image files are allowed for background"), false)
    }
  } else {
    cb(new Error("Invalid field name"), false)
  }
}

// Multer configuration
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
})

// Process and save profile image
export const saveProfileImage = async (buffer, originalName) => {
  try {
    const filename = `profile-${uuidv4()}.jpg`
    const filepath = path.join(profileDir, filename)

    // Process image with sharp
    await sharp(buffer)
      .resize(400, 400, {
        fit: "cover",
        position: "center",
      })
      .jpeg({ quality: 90 })
      .toFile(filepath)

    return `${process.env.BASE_URL}/uploads/profiles/${filename}`
  } catch (error) {
    throw new Error("Error processing profile image: " + error.message)
  }
}

// Save resume
export const saveResume = async (buffer, originalName) => {
  try {
    const ext = path.extname(originalName)
    const filename = `resume-${uuidv4()}${ext}`
    const filepath = path.join(resumeDir, filename)

    await fs.writeFile(filepath, buffer)

    return `${process.env.BASE_URL}/uploads/resumes/${filename}`
  } catch (error) {
    throw new Error("Error saving resume: " + error.message)
  }
}

// Process and save background image
export const saveBackgroundImage = async (buffer, originalName) => {
  try {
    const filename = `background-${uuidv4()}.jpg`
    const filepath = path.join(backgroundsDir, filename)

    // Process image with sharp
    await sharp(buffer)
      .resize(1200, 800, {
        fit: "cover",
        position: "center",
      })
      .jpeg({ quality: 85 })
      .toFile(filepath)

    return `/uploads/backgrounds/${filename}`
  } catch (error) {
    throw new Error("Error processing background image: " + error.message)
  }
}

// Delete file
export const deleteFile = async (filePath) => {
  try {
    if (filePath && filePath.startsWith("/uploads/")) {
      const fullPath = path.join(__dirname, "..", filePath)
      await fs.unlink(fullPath)
      return true
    }
    return false
  } catch (error) {
    console.error("Error deleting file:", error)
    return false
  }
}

// Get file info
export const getFileInfo = async (filePath) => {
  try {
    if (filePath && filePath.startsWith("/uploads/")) {
      const fullPath = path.join(__dirname, "..", filePath)
      const stats = await fs.stat(fullPath)
      return {
        exists: true,
        size: stats.size,
        modified: stats.mtime,
      }
    }
    return { exists: false }
  } catch (error) {
    return { exists: false }
  }
}
