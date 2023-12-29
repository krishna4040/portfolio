const nodemailer = require('nodemailer');
require('dotenv').config();
const { template } = require('../utils/template');

const trnasporter = nodemailer.createTransport({
    host: process.env.HOST,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});

exports.sendMail = async (name, email, subject, message) => {
    try {
        const info = await trnasporter.sendMail({
            from: email,
            to: process.env.USER,
            subject: subject,
            html: template(name, email, subject, message)
        })
        if (!info) {
            throw new Error('Unable to send message');
        } else {
            return info
        }
    } catch (error) {
        console.log(error);
    }
}