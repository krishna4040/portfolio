const express = require('express');
require('dotenv').config();
const { dbConnect } = require('./config/dbConnect')
const Message = require('./models/message');
const cors = require('cors');
const path = require('path');
const { sendMail } = require('./config/nodemailer')

const app = express();
const port = process.env.PORT;
dbConnect();

app.use(express.json());
app.listen(port, () => {
    console.log("app started succsesfully at port", port);
});
app.use(
    cors({
        origin: '*',
        credentials: true
    })
)

app.get('/', (req, res) => {
    res.send('<h1>Welcome to My API front page</h1>')
})
app.get('/api/download', (req, res) => {

    const fileURL = "./utils/Krishna's Resume-hackerresume.pdf";
    const fileName = 'resume.pdf';

    res.download(fileURL, fileName, (err) => {
        if (err) {
            console.error(err);
            res.status(404).send('File not found');
        }
    });
});

app.post('/api/createEntry', (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            throw new Error('All feilds are requiered');
        }
        const entry = Message.create({
            name,
            email,
            subject,
            message
        });
        sendMail(name, email, subject, message);
        res.status(200).json({
            success: true,
            info: 'Mail sent'
        });
        if (!entry) {
            throw new Error('Unable to enter data in db');
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    }
})