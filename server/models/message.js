const mongoose = require('mongoose');
const {sendMail} = require('../config/nodemailer');

const messageSchema = new mongoose.Schema({
    email: String,
    name: String,
    subject: String,
    message: String,
});

messageSchema.pre('save', async function(next){
    try {
        const info = await sendMail(this.name,this.email,this.subject,this.message);
        console.log(info);
    } catch (error) {
        console.log("unable to send message");
    }
    next();
})

module.exports = mongoose.model("Message",messageSchema);