import mongoose from 'mongoose';
import { sendMail } from '../config/nodemailer.js';

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

export default mongoose.model("Message",messageSchema);