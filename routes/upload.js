import express from "express";
import {
  upload,
  saveProfileImage,
  saveResume,
  saveBackgroundImage,
  deleteFile,
  getFileInfo,
} from "../utils/fileUpload.js";
import auth from "../middleware/auth.js";
import About from "../models/about.js";

const router = express.Router();

// Upload profile image
router.post(
  "/profile-image",
  auth,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "No file uploaded" });
      }

      // Save the new image
      const imageUrl = await saveProfileImage(
        req.file.buffer,
        req.file.originalname,
      );

      // Get current about info to delete old image
      const aboutInfo = await About.findOne({ isActive: true });
      const oldImageUrl = aboutInfo?.profileImage;

      // Update about info with new image URL
      if (aboutInfo) {
        aboutInfo.profileImage = imageUrl;
        await aboutInfo.save();
      } else {
        await About.create({
          name: "Your Name",
          title: "Your Title",
          description: "Your Description",
          bio: "Your Bio",
          profileImage: imageUrl,
          isActive: true,
        });
      }

      // Delete old image if it exists and is not the default
      if (oldImageUrl && oldImageUrl.startsWith("/uploads/")) {
        await deleteFile(oldImageUrl);
      }

      res.json({
        success: true,
        message: "Profile image uploaded successfully",
        imageUrl: imageUrl,
      });
    } catch (error) {
      console.error("Error uploading profile image:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  },
);

// Upload resume
router.post("/resume", auth, upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Save the new resume
    const resumeUrl = await saveResume(req.file.buffer, req.file.originalname);

    // Get current about info to delete old resume
    const aboutInfo = await About.findOne({ isActive: true });
    const oldResumeUrl = aboutInfo?.resumeUrl;

    // Update about info with new resume URL
    if (aboutInfo) {
      aboutInfo.resumeUrl = resumeUrl;
      await aboutInfo.save();
    } else {
      await About.create({
        name: "Your Name",
        title: "Your Title",
        description: "Your Description",
        bio: "Your Bio",
        resumeUrl: resumeUrl,
        isActive: true,
      });
    }

    // Delete old resume if it exists and is not the default
    if (oldResumeUrl && oldResumeUrl.startsWith("/uploads/")) {
      await deleteFile(oldResumeUrl);
    }

    res.json({
      success: true,
      message: "Resume uploaded successfully",
      resumeUrl: resumeUrl,
    });
  } catch (error) {
    console.error("Error uploading resume:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Upload background image
router.post(
  "/background",
  auth,
  upload.single("background"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "No file uploaded" });
      }

      // Save the new background
      const backgroundUrl = await saveBackgroundImage(
        req.file.buffer,
        req.file.originalname,
      );

      res.json({
        success: true,
        message: "Background image uploaded successfully",
        backgroundUrl: backgroundUrl,
      });
    } catch (error) {
      console.error("Error uploading background image:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  },
);

// Delete file
router.delete("/file", auth, async (req, res) => {
  try {
    const { filePath, type } = req.body;

    if (!filePath) {
      return res
        .status(400)
        .json({ success: false, message: "File path is required" });
    }

    const deleted = await deleteFile(filePath);

    if (deleted) {
      // If it's a profile image or resume, update the about info
      if (type === "profile" || type === "resume") {
        const aboutInfo = await About.findOne({ isActive: true });
        if (aboutInfo) {
          if (type === "profile") {
            aboutInfo.profileImage = ""; // Default image
          } else if (type === "resume") {
            aboutInfo.resumeUrl = ""; // Default download
          }
          await aboutInfo.save();
        }
      }

      res.json({
        success: true,
        message: "File deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "File not found or could not be deleted",
      });
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get file info
router.get("/file-info", auth, async (req, res) => {
  try {
    const { filePath } = req.query;

    if (!filePath) {
      return res
        .status(400)
        .json({ success: false, message: "File path is required" });
    }

    const fileInfo = await getFileInfo(filePath);

    res.json({
      success: true,
      fileInfo: fileInfo,
    });
  } catch (error) {
    console.error("Error getting file info:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// List uploaded files
router.get("/files", auth, async (req, res) => {
  try {
    const aboutInfo = await About.findOne({ isActive: true });

    const files = {
      profileImage: {
        url: aboutInfo?.profileImage,
        isUploaded: aboutInfo?.profileImage?.startsWith("/uploads/") || false,
      },
      resume: {
        url: aboutInfo?.resumeUrl,
        isUploaded: aboutInfo?.resumeUrl?.startsWith("/uploads/") || false,
      },
    };

    res.json({
      success: true,
      files: files,
    });
  } catch (error) {
    console.error("Error listing files:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

