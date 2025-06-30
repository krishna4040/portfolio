import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { template } from "../utils/template.js"

dotenv.config()

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
})

export const sendMail = async (name, email, subject, message) => {
  try {
    const info = await transporter.sendMail({
      from: email,
      to: process.env.USER,
      subject: subject,
      html: template(name, email, subject, message),
    })
    if (!info) {
      throw new Error("Unable to send message")
    } else {
      return info
    }
  } catch (error) {
    console.log(error)
  }
}
